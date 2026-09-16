# Welcome to React Router!

A modern, production-ready template for building full-stack React applications using React Router.

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/remix-run/react-router-templates/tree/main/default)

## Features

- 🚀 Server-side rendering
- ⚡️ Hot Module Replacement (HMR)
- 📦 Asset bundling and optimization
- 🔄 Data loading and mutations
- 🔒 TypeScript by default
- 🎉 TailwindCSS for styling
- 📖 [React Router docs](https://reactrouter.com/)

## Getting Started

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

## Building for Production

Create a production build:

```bash
npm run build
```

## Deployment

### Docker Deployment

To build and run using Docker:

```bash
docker build -t my-app .

# Run the container
docker run -p 3000:3000 my-app
```

The containerized application can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### DIY Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `npm run build`

```
├── package.json
├── package-lock.json (or pnpm-lock.yaml, or bun.lockb)
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

## The table under the CV

The CV sits on a photograph of a desk, but the photograph is not shipped. It
lives in `art/`, the objects cut out of it by hand live in `art_manual/`, and
both are excluded from the Docker build context — nothing here runs during
`npm run build` or in the container.

`art/build-assets.py` does the bookkeeping around the artwork. It finds where
each cutout belongs by correlating it against the original photograph, so a
piece can be re-exported at any size or crop and still land in the same place
and no coordinates are typed by hand; it trims the transparent margin and
writes a compressed WebP; and it builds the table itself, a seamless, evenly
lit tile of the oak taken from a clean patch of the same photograph.
`page.scss` repeats that tile, lights it again with gradients, and puts each
object back at the fraction of the frame it occupied in the photo.

The cutouts carry the shadows they were casting in the photograph, as black
with an alpha ramp, so they darken whatever ends up underneath and the
stylesheet draws no shadows of its own.

The right hand is cut twice: the whole hand, which goes under the sheet, and
the thumb on its own, which goes over it, so the sheet passes between the two
and the hand reads as holding the page. They are separate files on separate
canvases; what keeps them in register is that each is placed where it sits in
the photograph.

Run it when the artwork changes:

```bash
python3 -m venv .venv
.venv/bin/pip install numpy opencv-python-headless pillow
.venv/bin/python art/build-assets.py          # the cutouts
.venv/bin/python art/build-assets.py --tile   # ...and the oak tile too
```

It prints the `$objects` map to paste back into `app/routes/page.scss`, and the
thumb's outline to paste into `app/routes/page.tsx` (the page uses it to tuck the
print button away when it scrolls completely under the thumb). The oak tile was
hand-tuned after it was generated, so it is only rebuilt with `--tile`.

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever CSS framework you prefer.

---

Built with ❤️ using React Router.
