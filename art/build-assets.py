#!/usr/bin/env python3
"""Packs the hand-cut artwork in art_manual/ into what the page actually loads.

The objects on the table were cut out by hand, in an image editor, from the
source photograph; this script does not cut anything. What it does is the
bookkeeping around them:

  * finds where each piece belongs, by correlating it against the original
    photograph, so the composition stays the photographer's arrangement and
    nobody has to type coordinates;
  * trims the dead transparent margin and writes a compressed WebP;
  * and separately, builds the table itself -- a seamless, evenly lit tile of
    the oak, taken from a clean patch of the same photograph.

The cutouts carry their own shadows, baked in from the photograph, so the
stylesheet adds none.

This is a one-off tool. It is not part of `npm run build` and it never runs in
the container -- art/ and art_manual/ are both excluded from the Docker build
context. Run it by hand when the artwork changes:

    python3 -m venv .venv
    .venv/bin/pip install numpy opencv-python-headless pillow
    .venv/bin/python art/build-assets.py          # the cutouts
    .venv/bin/python art/build-assets.py --tile   # ...and the oak tile too

It rewrites the cutouts in public/assets/table/, prints the SCSS map for
page.scss and the thumb outline for page.tsx.
"""
import json
import os
import sys

import cv2
import numpy as np
from PIL import Image

Image.MAX_IMAGE_PIXELS = None

HERE = os.path.dirname(os.path.abspath(__file__))
SOURCE = os.path.join(HERE, "desk-andrik-langfield.png")
ART = os.path.join(HERE, os.pardir, "art_manual")
OUT = os.path.join(HERE, os.pardir, "public", "assets", "table")
PHOTO_W, PHOTO_H = 4000, 6000

# art_manual/<file> -> the name the stylesheet uses. The right hand is cut
# twice: the whole hand, which goes under the sheet, and the thumb on its own,
# which goes over it, so the sheet passes between them and the hand reads as
# holding the page. They are separate files on separate canvases, and what
# keeps them in register is that each is placed where it sits in the
# photograph -- not by sharing a canvas.
ARTWORK = {
    "Notebook.png": "notebook",
    "Pen.png": "pen",
    "Left_hand.png": "hand-left",
    "Mug.png": "mug",
    "Right_hand.png": "hand-right",
    "Thumb.png": "hand-right-thumb",
}
ABOVE_SHEET = {"hand-right-thumb"}

# Alpha is where the bytes are: these pieces carry their photographed shadows,
# which are large, smooth, and stored in the alpha channel. Lossless alpha
# costs roughly double. 75 is the last setting before libwebp switches to
# properly lossy alpha -- measured against the originals it moves no pixel by
# more than 2 levels out of 255, including along the silhouettes, while 70
# moves them by 12 and starts to ripple the edges.
WEBP = dict(quality=78, method=6, alpha_quality=75)


def locate(rgba, photo_gray, window=170):
    """Where this piece sits in the photograph.

    Correlating a patch of the piece against the whole photograph, rather than
    trusting the canvas it was saved on, means a piece can be re-exported at
    any size or crop and still land in the same place. Three patches spread
    across the piece have to agree, which is what turns a best guess into a
    check.
    """
    alpha, rgb = rgba[..., 3], rgba[..., :3]
    gray = cv2.cvtColor(rgb, cv2.COLOR_RGB2GRAY)
    for side in (window, 110, 80, 50):
        solid = cv2.integral((alpha >= 250).astype(np.float32))
        found = []
        for y in range(0, alpha.shape[0] - side, 10):
            for x in range(0, alpha.shape[1] - side, 10):
                area = (solid[y + side, x + side] - solid[y, x + side]
                        - solid[y + side, x] + solid[y, x])
                if area == side * side:
                    found.append((float(gray[y:y + side, x:x + side].std()), x, y))
        if not found:
            continue
        found.sort(reverse=True)
        picked, votes = [], []
        for _, x, y in found:
            if any(abs(x - px) < side and abs(y - py) < side for px, py in picked):
                continue
            picked.append((x, y))
            match = cv2.matchTemplate(photo_gray, gray[y:y + side, x:x + side],
                                      cv2.TM_CCOEFF_NORMED)
            _, score, _, at = cv2.minMaxLoc(match)
            votes.append((at[0] - x, at[1] - y, score))
            if len(picked) == 3:
                break
        best = max(votes, key=lambda v: v[2])
        if best[2] < 0.9:
            raise SystemExit(f"no confident match (best {best[2]:.2f})")
        agree = [v for v in votes if (v[0], v[1]) == (best[0], best[1])]
        return best[0], best[1], best[2], len(agree), len(votes)
    # Nothing thicker than a pen: no square of it is opaque enough to cut a
    # patch from, so match the whole outline instead, through its own alpha.
    return locate_masked(rgba, photo_gray)


def locate_masked(rgba, photo_gray, coarse=4, refine=12):
    """Correlate the whole piece, weighted by its alpha, coarse then fine."""
    ys, xs = np.nonzero(rgba[..., 3])
    top, left = ys.min(), xs.min()
    gray = cv2.cvtColor(rgba[..., :3], cv2.COLOR_RGB2GRAY)[ys.min():ys.max() + 1,
                                                           xs.min():xs.max() + 1]
    mask = rgba[..., 3][ys.min():ys.max() + 1, xs.min():xs.max() + 1]

    small = cv2.resize(photo_gray, None, fx=1 / coarse, fy=1 / coarse,
                       interpolation=cv2.INTER_AREA).astype(np.float32)
    t = cv2.resize(gray, None, fx=1 / coarse, fy=1 / coarse,
                   interpolation=cv2.INTER_AREA).astype(np.float32)
    m = cv2.resize(mask, None, fx=1 / coarse, fy=1 / coarse,
                   interpolation=cv2.INTER_AREA).astype(np.float32) / 255.0
    _, _, _, at = cv2.minMaxLoc(cv2.matchTemplate(small, t, cv2.TM_CCORR_NORMED, mask=m))

    # The coarse pass is only accurate to its own scale, so walk the full-size
    # neighbourhood for the offset that actually reproduces the photograph.
    g, w = gray.astype(np.float32), mask.astype(np.float32) / 255.0
    h0, w0 = g.shape
    best = None
    for dy in range(-refine, refine + 1):
        for dx in range(-refine, refine + 1):
            y, x = at[1] * coarse + dy, at[0] * coarse + dx
            if y < 0 or x < 0 or y + h0 > photo_gray.shape[0] or x + w0 > photo_gray.shape[1]:
                continue
            patch = photo_gray[y:y + h0, x:x + w0].astype(np.float32)
            err = float((w * (patch - g) ** 2).sum() / w.sum())
            if best is None or err < best[0]:
                best = (err, x - left, y - top)
    # Report the error as a 0..1 score on the same scale as the patch matches.
    score = max(0.0, 1.0 - np.sqrt(best[0]) / 255.0)
    return best[1], best[2], score, 1, 1


def trim(rgba):
    """Everything outside the piece is dead weight, and a piece saved on the
    full 4000x6000 canvas is nearly all dead weight."""
    ys, xs = np.nonzero(rgba[..., 3])
    return rgba[ys.min():ys.max() + 1, xs.min():xs.max() + 1], xs.min(), ys.min()


# The print button is fixed to the window and the thumb scrolls past it, over
# it. The thumb's edges are feathered, so a button under it shows through as a
# ghost; page.tsx hides the button once it is completely under the thumb, and
# needs the thumb's silhouette to know when that is.
OUTLINE_OF = "Thumb.png"
OUTLINE_ALPHA = 64       # the faintest quarter of the feathered rim covers nothing
OUTLINE_TOLERANCE = 2.0  # source pixels the polygon may stray from the silhouette


def outline(rgba):
    """The thumb's silhouette as a polygon, in fractions of its own image.

    Only the thumb counts, not the shadow baked in beside it: the shadow is
    black, anything with colour in it is thumb. Fractions of the image rather
    than pixels, so the page can lay it over the element at whatever size the
    element happens to be drawn.
    """
    alpha, lum = rgba[..., 3], rgba[..., :3].max(axis=2)
    flesh = ((alpha >= OUTLINE_ALPHA) & (lum >= 8)).astype(np.uint8) * 255
    flesh = cv2.morphologyEx(flesh, cv2.MORPH_CLOSE,
                             cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (9, 9)))
    contours, _ = cv2.findContours(flesh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)
    poly = cv2.approxPolyDP(max(contours, key=cv2.contourArea), OUTLINE_TOLERANCE, True)[:, 0, :]
    h, w = flesh.shape
    return [(round(float(x) / w, 4), round(float(y) / h, 4)) for x, y in poly]


def pack(photo_gray):
    placement = {}
    for source, name in ARTWORK.items():
        rgba = np.asarray(Image.open(os.path.join(ART, source)).convert("RGBA"))
        x, y, score, agree, total = locate(rgba, photo_gray)

        piece, left, top = trim(rgba)
        Image.fromarray(piece).save(f"{OUT}/{name}.webp", **WEBP)

        placement[name] = dict(x=int(x + left), y=int(y + top),
                               w=piece.shape[1], h=piece.shape[0],
                               above=name in ABOVE_SHEET)
        p = placement[name]
        kb = os.path.getsize(f"{OUT}/{name}.webp") // 1024
        print(f"  {name:17s} {p['w']:4d}x{p['h']:4d} at ({p['x']:4d},{p['y']:4d})"
              f"  {kb:3d} KB  match {score:.3f} ({agree}/{total} agree)")
    return placement


# --------------------------------------------------------------------------
# The table
# --------------------------------------------------------------------------
# A tile has to be evenly lit or its light and dark patches repeat as an
# obvious checkerboard. The photo is the opposite of evenly lit -- a pool of
# light in the middle, corners near black -- so the lighting is divided out
# here and put back in page.scss, once, as gradients over the repeat.
TILE_REGION = (400, 700, 2400)   # x, y, side, in source pixels
# The tile that ships was hand-tuned after it was generated (brought down to
# 800px), so the script leaves it alone unless asked: pass --tile to rebuild
# it, at the size that was settled on.
TILE_PX = 800


def flatten(img, sigma=220):
    """Divide the image by a heavily blurred copy of itself: the slow changes
    (vignette, pool of light) cancel, the grain survives."""
    f = img.astype(np.float32) + 1.0
    return (f / cv2.GaussianBlur(f, (0, 0), sigma)) * f.mean(axis=(0, 1))


def make_cyclic(tile, band=0.3):
    """Blend the tile with a copy of itself offset by half a tile, on a ramp,
    so opposite edges end up identical and the repeat has no visible seam."""
    h, w = tile.shape[:2]
    bh, bw = int(h * band), int(w * band)
    rx, ry = np.ones(w, np.float32), np.ones(h, np.float32)
    rx[:bw], rx[-bw:] = np.linspace(0, 1, bw), np.linspace(1, 0, bw)
    ry[:bh], ry[-bh:] = np.linspace(0, 1, bh), np.linspace(1, 0, bh)
    weight = (ry[:, None] * rx[None, :])[..., None]
    offset = np.roll(np.roll(tile, h // 2, 0), w // 2, 1)
    return tile * weight + offset * (1 - weight)


def build_tile(photo):
    x, y, side = TILE_REGION
    region = flatten(photo.astype(np.float32))[y:y + side, x:x + side]
    tile = cv2.resize(region, (TILE_PX, TILE_PX), interpolation=cv2.INTER_AREA)
    tile = np.clip(make_cyclic(tile), 0, 255).astype(np.uint8)
    # Sensor noise costs a third of the file and buys nothing on a surface
    # this dark, sitting this far behind the text.
    tile = cv2.bilateralFilter(tile, 7, 22, 7)
    Image.fromarray(cv2.cvtColor(tile, cv2.COLOR_BGR2RGB)).save(
        f"{OUT}/oak.webp", quality=74, method=6)
    kb = os.path.getsize(f"{OUT}/oak.webp") // 1024
    print(f"  oak               {TILE_PX}x{TILE_PX}  {kb:3d} KB  "
          f"covers {side}px of the photo")
    return side


def main():
    os.makedirs(OUT, exist_ok=True)
    photo = cv2.imread(SOURCE, cv2.IMREAD_COLOR)
    if photo is None:
        raise SystemExit(f"cannot read {SOURCE}")
    if photo.shape[:2] != (PHOTO_H, PHOTO_W):
        raise SystemExit(f"expected {PHOTO_W}x{PHOTO_H}, got {photo.shape[1]}x{photo.shape[0]}")
    print("placing the artwork")
    placement = pack(cv2.cvtColor(photo, cv2.COLOR_BGR2GRAY))
    x, y, tile_span = TILE_REGION
    if "--tile" in sys.argv:
        print("building the table")
        tile_span = build_tile(photo)
    else:
        print("leaving the table tile alone (pass --tile to rebuild it)")

    print("\n--- paste into page.scss ---\n")
    print(f"$tile-span: math.div({tile_span}, {PHOTO_W});")
    print("$objects: (")
    for name, p in placement.items():
        print(f'  "{name}": ({p["x"]}, {p["y"]}, {p["w"]}, {p["h"]}, '
              f'{"true" if p["above"] else "false"}),')
    print(");")
    # A record of what was placed where, next to the artwork rather than in
    # public/ -- the page never reads it, the stylesheet carries these numbers.
    json.dump(placement, open(os.path.join(HERE, "placement.json"), "w"), indent=1)

    thumb, _, _ = trim(np.asarray(Image.open(os.path.join(ART, OUTLINE_OF)).convert("RGBA")))
    print_outline(outline(thumb))


def print_outline(points):
    print("\n--- paste into page.tsx ---\n")
    print("const THUMB_OUTLINE: [number, number][] = [")
    for i in range(0, len(points), 5):
        print("  " + " ".join(f"[{x}, {y}]," for x, y in points[i:i + 5]))
    print("];")


if __name__ == "__main__":
    main()
