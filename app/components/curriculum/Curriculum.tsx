import { Fragment } from "react/jsx-runtime";
import "./Curriculum.scss";

const iconMapPin = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    style={{
      display: "inline",
      height: "1.25em",
      padding: "0 0.21em",
      margin: 0,
    }}
    viewBox="0 0 384 512"
  >
    <path d="M0 188.6C0 84.4 86 0 192 0S384 84.4 384 188.6c0 119.3-120.2 262.3-170.4 316.8-11.8 12.8-31.5 12.8-43.3 0-50.2-54.5-170.4-197.5-170.4-316.8zM192 256a64 64 0 1 0 0-128 64 64 0 1 0 0 128z" />
  </svg>
);

const iconPhone = (
  <svg
    style={{
      display: "inline",
      height: "1.5em",
      padding: 0,
      margin: "-0.3em 0 -0.3em -0.07em",
    }}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 640 640"
  >
    <path d="M160 96C124.7 96 96 124.7 96 160L96 480C96 515.3 124.7 544 160 544L480 544C515.3 544 544 515.3 544 480L544 160C544 124.7 515.3 96 480 96L160 96zM248 192.7C257.8 190 268.1 195.1 272 204.5L292.3 253.2C295.7 261.5 293.4 271 286.4 276.7L264.3 294.7C280.5 330.5 308.8 359.7 343.9 377.1L363.2 353.5C368.9 346.6 378.4 344.2 386.7 347.6L435.4 367.9C444.8 371.8 449.8 382.1 447.2 391.9L446.4 394.7C437.6 427 406.3 454.6 368.2 446.5C280.7 428 211.9 359.1 193.3 271.6C185.2 233.5 212.8 202.2 245.1 193.4L247.9 192.6z" />
  </svg>
);

const iconMail = (
  <svg
    style={{
      display: "inline",
      height: "1.3em",
      padding: 0,
      margin: "-0.3em 0",
    }}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 640 640"
  >
    <path d="M112 128C85.5 128 64 149.5 64 176C64 191.1 71.1 205.3 83.2 214.4L291.2 370.4C308.3 383.2 331.7 383.2 348.8 370.4L556.8 214.4C568.9 205.3 576 191.1 576 176C576 149.5 554.5 128 528 128L112 128zM64 260L64 448C64 483.3 92.7 512 128 512L512 512C547.3 512 576 483.3 576 448L576 260L377.6 408.8C343.5 434.4 296.5 434.4 262.4 408.8L64 260z" />
  </svg>
);
const iconGithub = (
  <svg
    style={{
      display: "inline",
      height: "1.3em",
      padding: 0,
      margin: "-0.3em 0",
    }}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 640 640"
  >
    <path d="M237.9 461.4C237.9 463.4 235.6 465 232.7 465C229.4 465.3 227.1 463.7 227.1 461.4C227.1 459.4 229.4 457.8 232.3 457.8C235.3 457.5 237.9 459.1 237.9 461.4zM206.8 456.9C206.1 458.9 208.1 461.2 211.1 461.8C213.7 462.8 216.7 461.8 217.3 459.8C217.9 457.8 216 455.5 213 454.6C210.4 453.9 207.5 454.9 206.8 456.9zM251 455.2C248.1 455.9 246.1 457.8 246.4 460.1C246.7 462.1 249.3 463.4 252.3 462.7C255.2 462 257.2 460.1 256.9 458.1C256.6 456.2 253.9 454.9 251 455.2zM316.8 72C178.1 72 72 177.3 72 316C72 426.9 141.8 521.8 241.5 555.2C254.3 557.5 258.8 549.6 258.8 543.1C258.8 536.9 258.5 502.7 258.5 481.7C258.5 481.7 188.5 496.7 173.8 451.9C173.8 451.9 162.4 422.8 146 415.3C146 415.3 123.1 399.6 147.6 399.9C147.6 399.9 172.5 401.9 186.2 425.7C208.1 464.3 244.8 453.2 259.1 446.6C261.4 430.6 267.9 419.5 275.1 412.9C219.2 406.7 162.8 398.6 162.8 302.4C162.8 274.9 170.4 261.1 186.4 243.5C183.8 237 175.3 210.2 189 175.6C209.9 169.1 258 202.6 258 202.6C278 197 299.5 194.1 320.8 194.1C342.1 194.1 363.6 197 383.6 202.6C383.6 202.6 431.7 169 452.6 175.6C466.3 210.3 457.8 237 455.2 243.5C471.2 261.2 481 275 481 302.4C481 398.9 422.1 406.6 366.2 412.9C375.4 420.8 383.2 435.8 383.2 459.3C383.2 493 382.9 534.7 382.9 542.9C382.9 549.4 387.5 557.3 400.2 555C500.2 521.8 568 426.9 568 316C568 177.3 455.5 72 316.8 72zM169.2 416.9C167.9 417.9 168.2 420.2 169.9 422.1C171.5 423.7 173.8 424.4 175.1 423.1C176.4 422.1 176.1 419.8 174.4 417.9C172.8 416.3 170.5 415.6 169.2 416.9zM158.4 408.8C157.7 410.1 158.7 411.7 160.7 412.7C162.3 413.7 164.3 413.4 165 412C165.7 410.7 164.7 409.1 162.7 408.1C160.7 407.5 159.1 407.8 158.4 408.8zM190.8 444.4C189.2 445.7 189.8 448.7 192.1 450.6C194.4 452.9 197.3 453.2 198.6 451.6C199.9 450.3 199.3 447.3 197.3 445.4C195.1 443.1 192.1 442.8 190.8 444.4zM179.4 429.7C177.8 430.7 177.8 433.3 179.4 435.6C181 437.9 183.7 438.9 185 437.9C186.6 436.6 186.6 434 185 431.7C183.6 429.4 181 428.4 179.4 429.7z" />
  </svg>
);
const iconLinkedin = (
  <svg
    style={{
      display: "inline",
      height: "1.3em",
      padding: "0 0.07em",
      margin: "-0.3em 0",
    }}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
  >
    <path d="M416 32L31.9 32C14.3 32 0 46.5 0 64.3L0 447.7C0 465.5 14.3 480 31.9 480L416 480c17.6 0 32-14.5 32-32.3l0-383.4C448 46.5 433.6 32 416 32zM135.4 416l-66.4 0 0-213.8 66.5 0 0 213.8-.1 0zM102.2 96a38.5 38.5 0 1 1 0 77 38.5 38.5 0 1 1 0-77zM384.3 416l-66.4 0 0-104c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9l0 105.8-66.4 0 0-213.8 63.7 0 0 29.2 .9 0c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9l0 117.2z" />
  </svg>
);

const experience = [
  {
    id: "mindera",
    name: "Mindera",
    href: "https://mindera.com/",
    since: ["November", 25],
    until: ["Today"],
    body: (
      <p>
        Being a Mindera's consultant, I worked for{" "}
        <a href="https://www.marksandspencer.com">M&amp;S</a> on their physical
        checkout solution as a Senior Frontend Engineer. I reinstated and
        modernized end-to-end tests (Protractor → Cypress), onboarded legacy
        projects to CI, migrated CI pipelines from Azure DevOps to GitHub
        Actions, and kept Angular's version updated across the repos.
      </p>
    ),
  },
  {
    id: "mollie",
    name: "Mollie",
    href: "https://mollie.com/",
    since: ["August", 22],
    until: ["July", 25],
    body: (
      <>
        <p>
          Initially contributed as a Frontend Web Developer in the Merchant
          Experience domain, where I improved the performance of statistics
          graphs and coordinated the dashboard redesign in collaboration with
          multiple teams.
        </p>
        <p>
          Later joined the Security and User Management team, focusing on
          strengthening authentication and account protection. I improved
          bot-detection during login, implemented App-based 2FA, and designed a
          middleware layer enabling developers to easily secure sensitive
          endpoints with configurable 2FA requirements. Developed an inactivity
          tracker that locks all web tabs after a period of inactivity and
          ensures seamless restoration to their previous state once unlocked via
          2FA.
        </p>
      </>
    ),
  },
  {
    id: "exame",
    name: "Exame.com",
    href: "https://exame.com/",
    since: ["July", 20],
    until: ["July", 22],
    body: (
      <p>
        Executed data migrations between multiple systems, built a Single Sign
        On solution with Social Login, reduced infrastructure costs through
        Serverless Architecture, and developed an API for lead capture.
        Supported the Frontend team in integrating Google Extended Access
        (providing free article access via Google News) and finalizing the
        website redesign.
      </p>
    ),
  },
  {
    id: "amaro",
    name: "AMARO",
    href: "https://amaro.com/",
    since: ["November", 19],
    until: ["June", 20],
    body: (
      <p>
        As a Frontend Web Developer at this "RetailTech" online store, I
        contributed to the internationalization of the website, checkout flow
        optimization, better error handling and JavaScript/CSS bundle reduction.
      </p>
    ),
  },
  {
    id: "tokenlab",
    name: "Tokenlab",
    href: "http://tokenlab.com.br",
    since: ["March", 16],
    until: ["October", 19],
    body: (
      <>
        <p>
          Primarily contributed as a Frontend Web Developer, while also
          delivering backend services, integrating payment solutions, optimizing
          for search engines, and managing AWS infrastructure.
        </p>
        <p className="hide-print">
          Additionally, participated in the Training Committee by curating
          technical upskilling resources for the engineers, and in the Selection
          Process Committee, where I helped design technical assessments,
          conduct interviews, and onboard new hires.
        </p>
      </>
    ),
  },
];

export default function Curriculum() {
  return (
    <div className="curriculum grid">
      <div data-cell="header">
        <h1 id="carlos-alberto-schneider">Carlos Alberto Schneider</h1>
        <div className="summary">
          <p>
            Full Stack Web Developer with extensive Frontend experience.
            Proficient in UX, test automation, and CI/CD.
          </p>
        </div>
      </div>
      <div className="contacts" data-cell="contacts">
        <p>
          <span>{iconMapPin} Lisbon, PT</span>
          <br />
          <strong>
            <a href="tel:+351915521972">{iconPhone} +351 915 521 972</a>
          </strong>
          <br />
          <strong>
            <a href="mailto:hire@carlosasj.dev">
              {iconMail} hire@carlosasj.dev
            </a>
          </strong>
          <br />
          <a href="https://github.com/carlosasj">
            {iconGithub} github.com/carlosasj
          </a>
          <br />
          <a href="https://linkedin.com/in/carlosasj">
            {iconLinkedin} linkedin.com/in/carlosasj
          </a>
        </p>
      </div>
      <div data-cell="experience">
        <h2 id="experience">Experience</h2>
        {experience.map((exp) => (
          <Fragment key={exp.id}>
            <h3 id={exp.id}>
              <a href={exp.href}>
                <strong>{exp.name}</strong>
              </a>{" "}
              | {exp.since.join("/")} ~ {exp.until.join("/")}
            </h3>
            {typeof exp.body === "string" ? <p>{exp.body}</p> : exp.body}
          </Fragment>
        ))}
        <h2 id="education">Education</h2>
        <h3 id="usp--august14--december18">
          <strong>USP</strong> | August/14 ~ December/18
        </h3>
        <p>
          Attended Computer Science course at University of São Paulo (campus
          São Carlos) after transferring from UFES. Transitioned to the
          Information Systems program in 2017. Studies paused at the end of
          2018.
        </p>
        <h3 id="ufes--march2013--july2014">
          <strong>UFES</strong> | March/2013 ~ July/2014
        </h3>
        <p>
          Began studies in Computer Engineering at Federal University of
          Espírito Santo before transferring to USP.
        </p>
      </div>

      <div data-cell="skills">
        <h2 id="skills">Skills</h2>
        <h3 id="languages">Languages</h3>
        <ul>
          <li>Javascript/Typescript (8+ years)</li>
          <li>HTML/CSS/SASS (9+ years)</li>
          <li>Python (2.5 years)</li>
          <li>Java/Groovy (1.5 years)</li>
        </ul>
        <h3 id="frontend">Frontend</h3>
        <ul>
          <li>React.js/Next.js (5+ years)</li>
          <li>React Native (1.5 years)</li>
          <li>Angular (2-8) (2.5 years)</li>
          <li>Bootstrap (3 years)</li>
        </ul>
        <h3 id="backend">Backend</h3>
        <ul>
          <li>Serverless Framework (2 years)</li>
          <li>NestJS (1.5 years)</li>
          <li>Django (2.5 years)</li>
        </ul>
        <h3 id="tools--devops">Tools &amp; DevOps</h3>
        <ul>
          <li>Git (9+ years)</li>
          <li>Linux (8+ years)</li>
          <li>Docker (5+ years)</li>
          <li>AWS (3 years)</li>
          <li>GitLab CI (3 years)</li>
          <li>CircleCI (2 years)</li>
          <li>Jenkins (1.5 years)</li>
        </ul>
      </div>
    </div>
  );
}

export function CurriculumBkp() {
  return (
    <div className="curriculum grid">
      <div className="c">
        <h1 id="carlos-alberto-schneider">Carlos Alberto Schneider</h1>
        <div className="summary">
          <p>
            Full Stack Web Developer with extensive Frontend experience.
            Proficient in UX, test automation, and CI/CD.
          </p>
        </div>
        <h2 id="experience">Experience</h2>
        {experience.map((exp) => (
          <Fragment key={exp.id}>
            <h3 id={exp.id}>
              <a href={exp.href}>
                <strong>{exp.name}</strong>
              </a>{" "}
              | {exp.since.join("/")} ~ {exp.until.join("/")}
            </h3>
            {typeof exp.body === "string" ? <p>{exp.body}</p> : exp.body}
          </Fragment>
        ))}
        <h2 id="education">Education</h2>
        <h3 id="usp--august14--december18">
          <strong>USP</strong> | August/14 ~ December/18
        </h3>
        <p>
          Attended Computer Science course at University of São Paulo (campus
          São Carlos) after transferring from UFES. Transitioned to the
          Information Systems program in 2017. Studies paused at the end of
          2018.
        </p>
        <h3 id="ufes--march2013--july2014">
          <strong>UFES</strong> | March/2013 ~ July/2014
        </h3>
        <p>
          Began studies in Computer Engineering at Federal University of
          Espírito Santo before transferring to USP.
        </p>
      </div>
      <div className="c side">
        <div className="contacts">
          <p>
            {iconMapPin} Lisbon, PT
            <br />
            <strong>
              <a href="tel:+351915521972">{iconPhone} +351 915 521 972</a>
            </strong>
            <br />
            <strong>
              <a href="mailto:hire@carlosasj.dev">
                {iconMail} hire@carlosasj.dev
              </a>
            </strong>
            <br />
            <a href="https://github.com/carlosasj">
              {iconGithub} github.com/carlosasj
            </a>
            <br />
            <a href="https://linkedin.com/in/carlosasj">
              {iconLinkedin} linkedin.com/in/carlosasj
            </a>
          </p>
        </div>
        <h2 id="skills">Skills</h2>
        <h3 id="languages">Languages</h3>
        <ul>
          <li>
            Javascript/Typescript <br />
            (8+ years)
          </li>
          <li>HTML/CSS/SASS (9+ years)</li>
          <li>Python (2.5 years)</li>
          <li>Java/Groovy (1.5 years)</li>
        </ul>
        <h3 id="frontend">Frontend</h3>
        <ul>
          <li>React.js/Next.js (5+ years)</li>
          <li>React Native (1.5 years)</li>
          <li>Angular (2-8) (2.5 years)</li>
          <li>Bootstrap (3 years)</li>
        </ul>
        <h3 id="backend">Backend</h3>
        <ul>
          <li>Serverless Framework (2 years)</li>
          <li>NestJS (1.5 years)</li>
          <li>Django (2.5 years)</li>
        </ul>
        <h3 id="tools--devops">Tools &amp; DevOps</h3>
        <ul>
          <li>Git (9+ years)</li>
          <li>Linux (8+ years)</li>
          <li>Docker (5+ years)</li>
          <li>AWS (3 years)</li>
          <li>GitLab CI (3 years)</li>
          <li>CircleCI (2 years)</li>
          <li>Jenkins (1.5 years)</li>
        </ul>
      </div>
    </div>
  );
}
