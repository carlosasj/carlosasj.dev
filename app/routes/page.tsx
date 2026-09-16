import type { Route } from "./+types/home";
import { Welcome } from "../components/welcome/welcome";
import "./page.scss";
import "./reset.css";
import Curriculum from "~/components/curriculum/Curriculum";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Carlos Schneider" },
    { name: "description", content: "Carlos' home page" },
  ];
}

const IconDownload = (props: any) => (
  <svg
    width="24px"
    height="24px"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M3 15C3 17.8284 3 19.2426 3.87868 20.1213C4.75736 21 6.17157 21 9 21H15C17.8284 21 19.2426 21 20.1213 20.1213C21 19.2426 21 17.8284 21 15"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      stroke="currentcolor"
    />
    <path
      d="M12 3V16M12 16L16 11.625M12 16L8 11.625"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      stroke="currentcolor"
    />
  </svg>
);

const IconPrint = (props: any) => (
  <svg
    width="24px"
    height="24px"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M18 16.75H16C15.8011 16.75 15.6103 16.671 15.4697 16.5303C15.329 16.3897 15.25 16.1989 15.25 16C15.25 15.8011 15.329 15.6103 15.4697 15.4697C15.6103 15.329 15.8011 15.25 16 15.25H18C18.3315 15.25 18.6495 15.1183 18.8839 14.8839C19.1183 14.6495 19.25 14.3315 19.25 14V10C19.25 9.66848 19.1183 9.35054 18.8839 9.11612C18.6495 8.8817 18.3315 8.75 18 8.75H6C5.66848 8.75 5.35054 8.8817 5.11612 9.11612C4.8817 9.35054 4.75 9.66848 4.75 10V14C4.75 14.3315 4.8817 14.6495 5.11612 14.8839C5.35054 15.1183 5.66848 15.25 6 15.25H8C8.19891 15.25 8.38968 15.329 8.53033 15.4697C8.67098 15.6103 8.75 15.8011 8.75 16C8.75 16.1989 8.67098 16.3897 8.53033 16.5303C8.38968 16.671 8.19891 16.75 8 16.75H6C5.27065 16.75 4.57118 16.4603 4.05546 15.9445C3.53973 15.4288 3.25 14.7293 3.25 14V10C3.25 9.27065 3.53973 8.57118 4.05546 8.05546C4.57118 7.53973 5.27065 7.25 6 7.25H18C18.7293 7.25 19.4288 7.53973 19.9445 8.05546C20.4603 8.57118 20.75 9.27065 20.75 10V14C20.75 14.7293 20.4603 15.4288 19.9445 15.9445C19.4288 16.4603 18.7293 16.75 18 16.75Z"
      fill="currentcolor"
    />
    <path
      d="M16 8.75C15.8019 8.74741 15.6126 8.66756 15.4725 8.52747C15.3324 8.38737 15.2526 8.19811 15.25 8V4.75H8.75V8C8.75 8.19891 8.67098 8.38968 8.53033 8.53033C8.38968 8.67098 8.19891 8.75 8 8.75C7.80109 8.75 7.61032 8.67098 7.46967 8.53033C7.32902 8.38968 7.25 8.19891 7.25 8V4.5C7.25 4.16848 7.3817 3.85054 7.61612 3.61612C7.85054 3.3817 8.16848 3.25 8.5 3.25H15.5C15.8315 3.25 16.1495 3.3817 16.3839 3.61612C16.6183 3.85054 16.75 4.16848 16.75 4.5V8C16.7474 8.19811 16.6676 8.38737 16.5275 8.52747C16.3874 8.66756 16.1981 8.74741 16 8.75Z"
      fill="currentcolor"
    />
    <path
      d="M15.5 20.75H8.5C8.16848 20.75 7.85054 20.6183 7.61612 20.3839C7.3817 20.1495 7.25 19.8315 7.25 19.5V12.5C7.25 12.1685 7.3817 11.8505 7.61612 11.6161C7.85054 11.3817 8.16848 11.25 8.5 11.25H15.5C15.8315 11.25 16.1495 11.3817 16.3839 11.6161C16.6183 11.8505 16.75 12.1685 16.75 12.5V19.5C16.75 19.8315 16.6183 20.1495 16.3839 20.3839C16.1495 20.6183 15.8315 20.75 15.5 20.75ZM8.75 19.25H15.25V12.75H8.75V19.25Z"
      fill="currentcolor"
    />
  </svg>
);

function handleDownload() {}

// The thumb's silhouette, in fractions of its own image, traced by
// art/build-assets.py (which prints it -- paste it back here if the thumb is
// ever re-cut). Only the thumb itself: not its baked shadow, and not the
// faintest quarter of its feathered rim.
const THUMB_OUTLINE: [number, number][] = [
  [0.2286, 0.2023], [0.1766, 0.2235], [0.1506, 0.2489], [0.1403, 0.2801], [0.1481, 0.3239],
  [0.1766, 0.3861], [0.2182, 0.4455], [0.2312, 0.4837], [0.2416, 0.4866], [0.2779, 0.529],
  [0.3247, 0.5516], [0.3948, 0.6379], [0.4052, 0.7228], [0.4052, 0.8388], [0.4701, 0.8741],
  [0.574, 0.9081], [0.6312, 0.9165], [0.6909, 0.9165], [0.7584, 0.9081], [0.8156, 0.8925],
  [0.8701, 0.8699], [0.9169, 0.8317], [0.9299, 0.802], [0.9299, 0.7624], [0.8987, 0.6874],
  [0.826, 0.6082], [0.7792, 0.6068], [0.7247, 0.5686], [0.6883, 0.5233], [0.6857, 0.505],
  [0.6519, 0.4399], [0.5896, 0.3734], [0.5377, 0.338], [0.4494, 0.2603], [0.387, 0.2221],
  [0.3247, 0.2023], [0.2883, 0.1966],
];

// The toolbar is fixed to the window and the thumb scrolls past it, drawn over
// it. On a short window the end of the page brings the thumb right across the
// print button, and the thumb's edges are feathered, so the button shows
// through as a ghost. Once a button is completely under the thumb it is marked
// .is-tucked and page.scss fades it out; while only partly under -- on its way
// in, half over the hand -- it stays. Nine points over each button are tested
// against the outline; at the scale of a button the outline is smooth, so if
// all nine are inside, all of the button is. Inline for the same reason as the
// print handler: the page is not hydrated.
const TUCK_UNDER_THUMB = `(() => {
  const outline = ${JSON.stringify(THUMB_OUTLINE)};
  const thumb = document.querySelector(".table-object--hand-right-thumb");
  const buttons = document.querySelectorAll("nav button");
  if (!thumb || !buttons.length) return;
  const inside = (x, y) => {
    let hit = false;
    for (let i = 0, j = outline.length - 1; i < outline.length; j = i++) {
      const [xi, yi] = outline[i], [xj, yj] = outline[j];
      if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) hit = !hit;
    }
    return hit;
  };
  let frame = 0;
  const check = () => {
    frame = 0;
    const t = thumb.getBoundingClientRect();
    for (const button of buttons) {
      const b = button.getBoundingClientRect();
      let under = t.width > 0 && t.height > 0;
      for (let i = 0; under && i < 9; i++) {
        under = inside(
          (b.left + (b.width * (i % 3)) / 2 - t.left) / t.width,
          (b.top + (b.height * Math.floor(i / 3)) / 2 - t.top) / t.height,
        );
      }
      button.classList.toggle("is-tucked", under);
    }
  };
  const schedule = () => {
    if (!frame) frame = requestAnimationFrame(check);
  };
  addEventListener("scroll", schedule, { passive: true });
  addEventListener("resize", schedule);
  // Web fonts can reflow the sheet, which moves the thumb without a scroll.
  addEventListener("load", schedule);
  document.fonts?.ready.then(schedule);
  check();
})();`;

// The things lying on the table, cut out of the original photograph by hand
// and packed by art/build-assets.py. page.scss knows where each one goes; all
// that matters here is which side of the sheet it is on. The right hand
// appears on both: the whole hand underneath, and the thumb again on top, so
// the sheet slides between them and the hand reads as holding it.
const TableScene: React.FC<{ over?: boolean; objects: string[] }> = ({
  over,
  objects,
}) => (
  <div
    className={`table-scene ${over ? "table-scene--over" : "table-scene--under"}`}
    aria-hidden="true"
  >
    <div className="table-frame">
      {objects.map((name) => (
        <span key={name} className={`table-object table-object--${name}`} />
      ))}
    </div>
  </div>
);

export const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="table-bg">
      <TableScene
        objects={["notebook", "pen", "hand-left", "mug", "hand-right"]}
      />
      <main className="page-wrapper">
        <div className="nav-wrapper-absolute">
          <div className="nav-wrapper-sticky">
            <nav>
              {/* <button aria-label="Download" onClick={handleDownload}>
                <IconDownload />
              </button> */}
              <button aria-label="Print" id="print">
                <IconPrint />
              </button>
              {/* The page isn't hydrated (see root.tsx), so React's onClick
                  would never be attached; wire the button up by hand. */}
              <script
                dangerouslySetInnerHTML={{
                  __html: `document.getElementById("print").onclick=()=>print()`,
                }}
              />
            </nav>
          </div>
        </div>
        <div className="page">
          <section className="content">{children}</section>
        </div>
      </main>
      <TableScene over objects={["hand-right-thumb"]} />
      {/* After the thumb, so the thumb exists by the time this runs. */}
      <script dangerouslySetInnerHTML={{ __html: TUCK_UNDER_THUMB }} />
    </div>
  );
};

export const CurriculumPage: React.FC<React.PropsWithChildren> = () => {
  return (
    <Layout>
      <Curriculum />
    </Layout>
  );
};

export default CurriculumPage;
