const scoreCounterCover = "/images/score-counter-cover.png";
const designSystemCover = "/images/design-system-cover.png";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { SectionAnimate } from "./section-animate";
import { nbsp } from "./utils/nbsp";
import { DashedDivider } from "./dashed-divider";

const fluidBase = "clamp(1rem, 0.94rem + 0.3vw, 1.25rem)";
const fluidSmall = "clamp(0.8125rem, 0.78rem + 0.15vw, 1rem)";

function ArrowLink({
  href,
  children,
  external,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  const cls =
    "inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors";
  if (external) {
    return (
      <a
        href={href}
        data-goatcounter-click={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cls}
        style={{ fontSize: fluidSmall, lineHeight: 1 }}
      >
        {children}
        <ArrowRight size={14} />
      </a>
    );
  }
  return (
    <Link
      to={href}
      data-goatcounter-click={href}
      className={cls}
      style={{ fontSize: fluidSmall, lineHeight: 1 }}
    >
      {children}
      <ArrowRight size={14} />
    </Link>
  );
}

const workExperience = [
  {
    title: "Product designer at Yesim",
    period: "Apr 2021 - Mar 2026",
    context: "Web and\u00a0mobile platforms - B2B and\u00a0B2C contexts",
    description: "Worldwide eSIM store serving 3M+ customers",
    link: { href: "https://yesim.app/", label: "Try Yesim" },
  },
  {
    title: "Product designer at\u00a0SMBF",
    period: "Aug 2020 - Apr 2021",
    context: "WEB",
    description: "Online reputation SaaS platform",
  },
  {
    title: "From Android dev to\u00a0product designer at\u00a0Eventssion",
    period: "Jan 2016 - Apr 2020",
    context: "WEB, iOS, Android - B2B and\u00a0B2C contexts",
    description:
      "Event management and\u00a0online ticketing platform. From scratch to\u00a050K users.",
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
      "A scorekeeper app I've built and maintained since\u00a02016. 600K+\u00a0installs, 87.2K monthly active users, 4.9\u00a0rating\u00a0— all organic, no\u00a0marketing spend.",
    caseStudy: "/work/score-counter",
    cover: scoreCounterCover,
  },
  {
    title: "B2B Design System",
    subtitle: "Yesim",
    description:
      "A shared component library and token system for\u00a0three B2B products with different visual identities. Built from scratch, including Figma, code, documentation, and\u00a0a governance process.",
    caseStudy: "/work/design-system",
    cover: designSystemCover,
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
              {nbsp("Product designer with 5 years across B2B SaaS and consumer products. I have a development background, which means I tend to think about design decisions in terms of how they'll actually get built — and I've led work across research, systems, and shipping.")}
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
              {nbsp("I'm open to new roles. Outside of work, I maintain Score Counter — a scorekeeper app I built in 2016 that now has 600K installs and 87.2K monthly active users.")}
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
            {nbsp("I've worked across research, systems design, and shipping — usually as the only designer on a team. Having started as an Android developer, I'm comfortable reading code and working directly in engineering reviews.")}
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