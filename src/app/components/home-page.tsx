const scoreCounterCover = "/images/score-counter-cover.png";
const designSystemCover = "/images/design-system-cover.png";
const comingSoonCover = "/images/coming-soon-cover.png";
import { Link } from "react-router";
import { SectionAnimate } from "./section-animate";
import { nbsp } from "./utils/nbsp";
import { DashedDivider } from "./dashed-divider";

const fluidBase = "clamp(1rem, 0.94rem + 0.3vw, 1.25rem)";
const fluidSmall = "clamp(0.8125rem, 0.78rem + 0.15vw, 1rem)";

const workExperience = [
  {
    title: "Product designer at Yesim",
    period: "Apr 2021 - Mar 2026",
    context: " Web and mobile · B2B and B2C. eSIM platform with 3M+ customers",
    description: "Led product design for B2B products. Created multi-brand design system",
    link: { href: "https://yesim.app/", label: "Try Yesim" },
  },
  {
    title: "Product designer at\u00a0SMBF",
    period: "Aug 2020 - Apr 2021",
    context: "Online reputation SaaS platform · B2B",
    description: "Designed user flows, wireframes, and prototypes for a B2B SaaS product",
  },
  {
    title: "From Android dev to\u00a0product designer at\u00a0Eventssion",
    period: "Jan 2016 - Apr 2020",
    context: "Web and mobile · B2B and B2C. Event management and ticketing platform",
    description:
      "Transitioned from Android development into product design. Led the design team and shaped UX as the product grew from zero to 50,000 users.",
    link: {
      href: "https://betalist.com/startups/eventssion",
      label: "View project",
    },
  },
];

const personalProjects = [
  {
    title: "Score Counter",
    subtitle: "Android App",
    description:
      "A score and tally tracker I built and have maintained since 2016. 600K+ installs, 87K monthly active users, 4.9 rating — all organic, zero marketing spend.",
    caseStudy: "/work/score-counter",
    cover: scoreCounterCover,
  },
  {
    title: "B2B Design System",
    subtitle: "Yesim",
    description: "A token-based component library spanning three B2B products with different visual identities — built from scratch, including Figma, code, documentation, and a governance process. Result: 4x faster feature design, 30% fewer style-related QA issues.",
    caseStudy: "/work/design-system",
    cover: designSystemCover,
  },
  {
    title: "White-label eSIM distribution interface",
    subtitle: "Yesim",
    description: "I designed a white-label web interface inside the Partners Platform that handles eSIM detail management and shareable delivery in one flow.",
    caseStudy: "/work/coming-soon",
    cover: comingSoonCover,
  },
];

const connectLinks = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/romashuliatiev",
    display: "romashuliatiev",
  },
  {
    label: "Telegram",
    href: "https://t.me/artificially_busy",
    display: "@artificially_busy",
  },
  {
    label: "Email",
    href: "mailto:hi@romamakes.com",
    display: "hi@romamakes.com",
  },
];

export function HomePage() {
  return (
    <div className="flex flex-col" style={{ gap: "clamp(3rem, 2.5rem + 2.5vw, 5rem)" }}>
      {/* Introduction */}
      <SectionAnimate delay={0}>
        <section className="flex flex-col" style={{ gap: "clamp(1.5rem, 1.25rem + 1.25vw, 2.5rem)" }}>
          <div className="flex flex-col" style={{ gap: "clamp(0.75rem, 0.7rem + 0.25vw, 1rem)" }}>
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                fontSize: fluidBase,
                lineHeight: 1.5,
              }}
              aria-label="Who is Roma Shuliatiev"
            >
              Roma Shuliatiev
            </h2>
            <p style={{ fontSize: fluidBase, lineHeight: 1.5 }}>
              {nbsp("Product designer with a dev background. I close the gap between design and what engineers actually build.")}
            </p>
          </div>
          <div className="flex flex-col" style={{ gap: "clamp(0.375rem, 0.35rem + 0.1vw, 0.5rem)" }}>
            <h3
              className="text-muted-foreground"
              style={{ fontSize: fluidSmall, lineHeight: 1 }}
            >
              Now
            </h3>
            <p style={{ fontSize: fluidBase, lineHeight: 1.5 }}>
              {"Open to product designer roles, full-time."}
            </p>
          </div>
        </section>
      </SectionAnimate>

      {/* Work Experience */}
      <SectionAnimate delay={0.1}>
        <section className="flex flex-col" style={{ gap: "clamp(0.75rem, 0.7rem + 0.25vw, 1.25rem)" }}>
          <div className="flex justify-between items-center">
            <h2 style={{ fontSize: fluidBase, lineHeight: 1 }}>
              Work experience
            </h2>
          </div>
          <div className="flex flex-col" style={{ gap: "clamp(1rem, 0.9rem + 0.5vw, 1.5rem)" }}>
            {workExperience.map((job, i) => (
              <div key={i}>
                <div className="flex flex-col" style={{ gap: "clamp(0.125rem, 0.1rem + 0.1vw, 0.25rem)" }}>
                  <span style={{ fontSize: fluidSmall, lineHeight: 1.4 }}>
                    {job.title}
                  </span>
                  <span
                    className="text-muted-foreground"
                    style={{ fontSize: fluidSmall, lineHeight: 1.4 }}
                  >
                    {job.period} · {job.context}
                  </span>
                  <p
                    className="text-muted-foreground mt-1"
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontStyle: "italic",
                      fontSize: fluidSmall,
                      lineHeight: 1.4,
                    }}
                  >
                    {job.description}
                  </p>
                  {job.link && (
                    <a
                      href={job.link.href}
                      data-goatcounter-click={`outbound-${job.link.label.toLowerCase().replace(/\s+/g, '-')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent no-underline hover:underline underline-offset-2 hover:opacity-80 transition-opacity mt-1 inline-flex items-center gap-1"
                      style={{ fontSize: fluidSmall, lineHeight: 1 }}
                    >
                      {job.link.label}{" "}
                      <span aria-hidden className="text-xs">
                        ↗
                      </span>
                    </a>
                  )}
                </div>
                {i < workExperience.length - 1 && (
                  <div className="mt-4">
                    <DashedDivider />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </SectionAnimate>

      {/* Selected Work */}
      <SectionAnimate delay={0.15}>
        <section className="flex flex-col" style={{ gap: "clamp(0.75rem, 0.7rem + 0.25vw, 1.25rem)" }}>
          <h2 style={{ fontSize: fluidBase, lineHeight: 1 }}>
            Selected work
          </h2>
          <div className="flex flex-col" style={{ gap: "clamp(1.25rem, 1rem + 1vw, 2rem)" }}>
            {personalProjects.map((project) => (
              <Link
                key={project.title}
                to={project.caseStudy}
                data-goatcounter-click={`case-study-${project.title.toLowerCase().replace(/\s+/g, '-')}`}
                className="group block rounded-xl overflow-hidden card-shadow bg-card hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="overflow-hidden">
                  <img
                    src={project.cover}
                    alt={project.title}
                    className="w-full aspect-[16/9] object-cover group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                  />
                </div>
                <div className="p-4 sm:p-5 flex flex-col" style={{ gap: "clamp(0.25rem, 0.2rem + 0.15vw, 0.375rem)" }}>
                  <div className="flex items-baseline gap-2">
                    <span
                      className="group-hover:text-accent transition-colors"
                      style={{ fontSize: fluidSmall, lineHeight: 1.4 }}
                    >
                      {project.title}
                    </span>
                    <span
                      className="text-muted-foreground"
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontStyle: "italic",
                        fontSize: fluidSmall,
                      }}
                    >
                      {project.subtitle}
                    </span>
                  </div>
                  <p
                    className="text-muted-foreground"
                    style={{ fontSize: fluidSmall, lineHeight: 1.5 }}
                  >
                    {project.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </SectionAnimate>

      {/* Skills */}
      <SectionAnimate delay={0.2}>
        <section className="flex flex-col" style={{ gap: "clamp(0.75rem, 0.7rem + 0.25vw, 1.25rem)" }}>
          <h2 style={{ fontSize: fluidBase, lineHeight: 1 }}>
            Skills & tools
          </h2>
          <p style={{ fontSize: fluidBase, lineHeight: 1.5 }}>
            {nbsp("I've led work across user research, systems design, and end-to-end shipping — from building products solo to leading a design team.")}
          </p>
          <p style={{ fontSize: fluidBase, lineHeight: 1.5 }}>
            {nbsp("Strong proficiency with Figma. Familiarity with AI, analytics and A/B testing tools.")}
          </p>
        </section>
      </SectionAnimate>

      {/* Connect */}
      <SectionAnimate delay={0.25}>
        <section className="flex flex-col" style={{ gap: "clamp(0.75rem, 0.7rem + 0.25vw, 1.25rem)" }}>
          <h2 style={{ fontSize: fluidBase, lineHeight: 1 }}>Get in touch</h2>
          <div className="flex flex-col" style={{ gap: "clamp(1.5rem, 1.25rem + 1.25vw, 2.5rem)" }}>
            <ul className="flex flex-col" style={{ gap: "clamp(0.75rem, 0.7rem + 0.25vw, 1rem)" }}>
              {connectLinks.map(({ label, href, display }) => (
                <li
                  key={label}
                  className="grid items-center"
                  style={{
                    gridTemplateColumns: "1fr 2fr",
                    gap: "clamp(0.75rem, 0.7rem + 0.25vw, 1rem)",
                  }}
                >
                  <span
                    style={{
                      fontSize: fluidSmall,
                      lineHeight: 1,
                    }}
                  >
                    {label}
                  </span>
                  <a
                    href={href}
                    data-goatcounter-click={label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground no-underline hover:underline underline-offset-2 hover:opacity-80 transition-opacity mt-1 inline-flex items-center gap-1"
                    style={{
                      fontSize: fluidSmall,
                      lineHeight: 1,
                    }}
                  >
                    {display}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </SectionAnimate>
    </div>
  );
}