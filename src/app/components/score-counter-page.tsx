import { useEffect, useRef } from "react";
import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import { useInView, useSpring, useTransform, motion } from "motion/react";
import { SectionAnimate } from "./section-animate";
import { ImageWithFallback } from "./image-with-fallback";
import { nbsp } from "./utils/nbsp";
import { fluidBase, fluidSmall, fluidH1, fluidH3, sectionGap, innerGap } from "./utils/typography";
import { SectionHeading, BoldLead, ImagePlaceholder } from "./case-study-components";
const problemImage = "/images/score-counter-problem.png";
const heroImage = "/images/score-counter-hero.png";
const testimonialsImage = "/images/score-counter-testimonials.png";
const flowImage = "/images/score-counter-flow.png";
const unexpectedUseCasesImage = "/images/score-counter-unexpected-uses.png";
const evolutionImage = "/images/score-counter-evolution.png";

/* ── Data ─────────────────────────────────────────────── */

const metadata = [
  { label: "Role", value: "Creator, Design & Development" },
  { label: "Timeframe", value: "2016 \u2013 Present" },
  { label: "Platform", value: "Android" },
  { label: "Team", value: "Solo (with\u00a0community contributors)" },
];

const snapshotRows = [
  {
    key: "What it\u00a0is",
    value:
      "A\u00a0scorekeeper app for\u00a0board games, card games, and\u00a0any activity that needs counting",
  },
  {
    key: "Audience",
    value:
      "Board game players, families, tabletop groups (anyone replacing pen\u00a0& paper score tracking)",
  },
  {
    key: "Key use cases",
    value:
      "Track scores for\u00a0multiple players, use timers for\u00a0turn-based games, sort players by\u00a0rank, count anything",
  },
  { key: "Installs", value: "600K+ (organic, zero ad\u00a0spend)" },
  {
    key: "Active users",
    value:
      "87.2K monthly active users; 205K average active devices",
  },
  {
    key: "Rating",
    value: "4.9 on\u00a0Google Play (maintained consistently)",
  },
  {
    key: "Monetization",
    value: "Zero ads, and\u00a0keeping it\u00a0that way",
  },
];

const impactStats = [
  { value: "600K+", label: "Installs" },
  { value: "87.2K", label: "Monthly active users" },
  { value: "205K", label: "Avg. active devices" },
  { value: "4.9", label: "Google Play rating" },
];

const proudOf = [
  "Sustained quality over nine years. This isn't a\u00a0portfolio piece I\u00a0shipped and\u00a0forgot. It's a\u00a0living product with\u00a0108 commits in\u00a02025 alone, real users, and\u00a0a\u00a04.9 rating that has been maintained, not inflated by\u00a0launch spikes.",
  "Growth without marketing. 600K installs through word-of-mouth alone. That's what you get when the product is the only thing doing the work.",
  "Community impact. A\u00a0contributor built a\u00a0web version. Others volunteer translations. The\u00a0app has become something people care about beyond just using it \u2014 which matters more to me than any metric.",
];

const doDifferently = [
  "Document the\u00a0design process earlier. For\u00a0years I\u00a0iterated without saving artifacts. If\u00a0I'd kept a\u00a0design journal from the\u00a0start, this case study would be\u00a0richer with\u00a0before/after evidence.",
  "Explore lightweight analytics sooner. Understanding which features people actually use \u2014 not just request \u2014 would have made it easier to say no.",
  "Consider cross-platform earlier. The\u00a0fan-made web version proved there's demand beyond Android. I\u00a0should have explored that signal sooner.",
];


/* ── Local sub-components ──────────────────────────────── */

function CalloutBox({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="rounded-xl bg-card card-shadow p-5 sm:p-6 flex flex-col gap-2 my-2"
    >
      {children}
    </div>
  );
}

/** Parse a display value like "600K+", "4.9", "$0" into parts for animation */
function parseStatValue(display: string): {
  prefix: string;
  numericValue: number;
  suffix: string;
  decimals: number;
} {
  const match = display.match(/^([^0-9]*)([0-9]+(?:\.[0-9]+)?)(.*)$/);
  if (!match) return { prefix: "", numericValue: 0, suffix: display, decimals: 0 };
  const prefix = match[1];
  const num = parseFloat(match[2]);
  const suffix = match[3];
  const decimalPart = match[2].split(".")[1];
  const decimals = decimalPart ? decimalPart.length : 0;
  return { prefix, numericValue: num, suffix, decimals };
}

function AnimatedStatValue({
  displayValue,
  isInView,
}: {
  displayValue: string;
  isInView: boolean;
}) {
  const { prefix, numericValue, suffix, decimals } = parseStatValue(displayValue);
  const spring = useSpring(0, { mass: 0.8, stiffness: 75, damping: 15 });
  const display = useTransform(spring, (current) => {
    const rounded = decimals > 0
      ? current.toFixed(decimals)
      : Math.round(current).toLocaleString();
    return `${prefix}${rounded}${suffix}`;
  });

  useEffect(() => {
    if (isInView) {
      spring.set(numericValue);
    }
  }, [isInView, spring, numericValue]);

  return <motion.span style={{ fontVariantNumeric: "tabular-nums" }}>{display}</motion.span>;
}

function ImpactStatsGrid() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
      {impactStats.map((s) => (
        <div
          key={s.label}
          className="rounded-xl bg-card card-shadow p-4 sm:p-5 flex flex-col gap-1 items-center text-center"
        >
          <span
            className="text-foreground"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem)",
              lineHeight: 1.3,
            }}
          >
            <AnimatedStatValue displayValue={s.value} isInView={isInView} />
          </span>
          <span
            className="text-muted-foreground"
            style={{ fontSize: "0.75rem", lineHeight: 1.3 }}
          >
            {s.label}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ── Page ─────────────────────────────────────────────── */

export function ScoreCounterPage() {
  return (
    <div className="flex flex-col" style={{ gap: sectionGap }}>
      {/* Back link */}
      <SectionAnimate delay={0}>
        <Link
          to="/"
          data-goatcounter-click="back-to-home-top"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          style={{ fontSize: fluidSmall, lineHeight: 1 }}
        >
          <ArrowLeft size={16} />
          Back to Home Page
        </Link>
      </SectionAnimate>

      {/* Title + intro */}
      <SectionAnimate delay={0.05}>
        <div className="flex flex-col" style={{ gap: innerGap }}>
          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: fluidH1,
              lineHeight: 1.25,
              letterSpacing: "-0.025em",
            }}
          >
            {nbsp("Score Counter: From side project to 600K installs with zero marketing")}
          </h1>
          <p
            className="text-muted-foreground"
            style={{ fontSize: fluidBase, lineHeight: 1.5 }}
          >
            {nbsp("I built Score Counter as a side project in 2016. It now has 600K installs, 87.2K monthly active users, and a 4.9 rating on Google Play. No ads, no marketing spend \u2014 just the app.")}
          </p>
        </div>
      </SectionAnimate>

      {/* Hero image */}
      <SectionAnimate delay={0.08}>
        <div className="-mx-4 sm:mx-0">
          <ImageWithFallback
            src={heroImage}
            alt="Five smartphone screens showcasing Score Counter app features: player scores, dice roller, calculator input, and timer"
            className="w-full rounded-none sm:rounded-xl"
            loading="eager"
          />
        </div>
      </SectionAnimate>

      {/* Metadata grid */}
      <SectionAnimate delay={0.1}>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 rounded-xl bg-card card-shadow p-5 sm:p-6">
          {metadata.map((m) => (
            <div key={m.label} className="flex flex-col gap-1">
              <span
                className="text-muted-foreground tracking-wide uppercase"
                style={{ fontSize: "0.75rem", lineHeight: 1.3 }}
              >
                {m.label}
              </span>
              <span style={{ fontSize: "0.875rem", lineHeight: 1.4 }}>
                {m.value}
              </span>
            </div>
          ))}
        </div>
      </SectionAnimate>

      {/* Product Snapshot */}
      <SectionAnimate delay={0.12}>
        <div className="flex flex-col" style={{ gap: innerGap }}>
          <SectionHeading>Product Snapshot</SectionHeading>
          <div className="overflow-x-auto">
            <table className="w-full" style={{ fontSize: "0.875rem", lineHeight: 1.4 }}>
              <tbody>
                {snapshotRows.map((row) => (
                  <tr key={row.key} className="border-b border-border">
                    <td
                      className="text-muted-foreground py-3 pr-4 whitespace-nowrap align-top"
                      style={{ minWidth: "7rem" }}
                    >
                      {row.key}
                    </td>
                    <td className="py-3 text-foreground/80">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </SectionAnimate>

      {/* Context */}
      <SectionAnimate delay={0.14}>
        <div className="flex flex-col" style={{ gap: innerGap }}>
          <SectionHeading>Context</SectionHeading>
          <p className="text-foreground/80" style={{ fontSize: fluidBase, lineHeight: 1.75 }}>
            {nbsp("Score Counter started in 2016 as a personal itch: I needed a simple way to track scores during board game nights without fumbling for pen and paper. I was transitioning from Android development to product design at the time, so building this solo (owning everything from UX to release management) felt like a natural proving ground. The dual role as designer and developer gives me an unusual feedback loop: I can validate a decision in code within hours, ship it, and watch real usage data confirm or correct course. What surprised me was the demand: the app kept growing organically, year after year, eventually crossing 600K installs with zero marketing spend.")}
          </p>
        </div>
      </SectionAnimate>

      {/* App evolution image */}
      <SectionAnimate delay={0.145}>
        <div className="-mx-4 sm:mx-0">
          <ImageWithFallback
            src={evolutionImage}
            alt="Side-by-side comparison of Score Counter in 2018 (numbered rows with colored backgrounds and arrow controls) and 2025 (full-bleed player cards with large +/− buttons and named counters)"
            className="w-full rounded-none sm:rounded-xl"
            loading="lazy"
          />
        </div>
      </SectionAnimate>

      {/* Problem & Goals */}
      <SectionAnimate delay={0.16}>
        <div className="flex flex-col" style={{ gap: innerGap }}>
          <SectionHeading>Problem &amp; Goals</SectionHeading>
          <p className="text-foreground/80" style={{ fontSize: fluidBase, lineHeight: 1.75 }}>
            {nbsp("The core problem was straightforward: people playing board games, card games, or any group activity need a fast, reliable way to track scores. The existing solutions were either bloated with ads, overly complicated, or aesthetically dated. My goal was to build something that felt effortless: open it, add players, start counting.")}
          </p>
        </div>
      </SectionAnimate>

      {/* Problem & Goals image */}
      <SectionAnimate delay={0.165}>
        <div className="-mx-4 sm:mx-0">
          <ImageWithFallback
            src={problemImage}
            alt="Star Realms card game counters alongside the Score Counter app interface showing player setup and score tracking"
            className="w-full rounded-none sm:rounded-xl"
            loading="lazy"
          />
        </div>
      </SectionAnimate>

      {/* Design Constraints */}
      <SectionAnimate delay={0.22}>
        <div className="flex flex-col" style={{ gap: innerGap }}>
          <SectionHeading>Design Constraints</SectionHeading>
          <p className="text-foreground/80" style={{ fontSize: fluidBase, lineHeight: 1.75 }}>
            {nbsp("Three constraints have guided every decision over nine years of building Score Counter, especially when saying no to a feature request or resisting a monetization shortcut.")}
          </p>
          <div className="flex flex-col gap-4 mt-2">
            <div className="flex flex-col gap-1">
              <h3 style={{ fontSize: fluidH3, lineHeight: 1.5 }}>
                <strong>Simplicity over feature richness</strong>
              </h3>
              <p className="text-foreground/80" style={{ fontSize: fluidBase, lineHeight: 1.75 }}>
                {nbsp("The primary flow is three steps: open, add counters, count. Every feature request is measured against that loop. If it adds cognitive load to the core path, it doesn't ship. This constraint kept the app focused while competitors kept adding complexity.")}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <h3 style={{ fontSize: fluidH3, lineHeight: 1.5 }}>
                <strong>Never show ads</strong>
              </h3>
              <p className="text-foreground/80" style={{ fontSize: fluidBase, lineHeight: 1.75 }}>
                {nbsp("Not showing ads isn't just an ethical choice; it's a design constraint. Without ad placements competing for screen real estate, the UI has to earn its keep on usability alone. The result is a clean, fast experience that users trust enough to recommend, which is how the app grew to 600K installs with zero marketing spend.")}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <h3 style={{ fontSize: fluidH3, lineHeight: 1.5 }}>
                <strong>Respect the platform ecosystem</strong>
              </h3>
              <p className="text-foreground/80" style={{ fontSize: fluidBase, lineHeight: 1.75 }}>
                {nbsp("Score Counter follows Material Design conventions, supports the latest Android versions early (Android 16 compatibility shipped in 2025), and embraces community contributions for localization. Instead of fighting the platform, the app leans into it, which keeps maintenance sustainable and the experience native.")}
              </p>
            </div>
          </div>
        </div>
      </SectionAnimate>

      {/* Primary flow image */}
      <SectionAnimate delay={0.225}>
        <div className="-mx-4 sm:mx-0">
          <ImageWithFallback
            src={flowImage}
            alt="Hand-drawn primary flow diagram: 1. Open, 2. Add Counters, 3. Count"
            className="w-full rounded-none sm:rounded-xl"
            loading="lazy"
          />
        </div>
      </SectionAnimate>

      {/* Outcome & Impact */}
      <SectionAnimate delay={0.26}>
        <div className="flex flex-col" style={{ gap: innerGap }}>
          <SectionHeading>Outcome &amp; Impact</SectionHeading>
          <ImpactStatsGrid />
          <p className="text-foreground/80" style={{ fontSize: fluidBase, lineHeight: 1.75 }}>
            {nbsp("The app has 87.2K monthly active users across 205K average active devices, all through organic discovery. Volunteers have contributed translations, a developer built a fan web version, and it still holds a 4.9 rating after nine years.")}
          </p>
        </div>
      </SectionAnimate>

      {/* What I'm Proud Of */}
      <SectionAnimate delay={0.28}>
        <div className="flex flex-col" style={{ gap: innerGap }}>
          <SectionHeading>What I'm Proud Of</SectionHeading>
          <ul className="flex flex-col gap-3 pl-5 list-disc">
            {proudOf.map((item, i) => (
              <li
                key={i}
                className="text-foreground/80"
                style={{ fontSize: fluidBase, lineHeight: 1.7 }}
              >
                <BoldLead text={item} />
              </li>
            ))}
          </ul>
        </div>
      </SectionAnimate>

      {/* Testimonials */}
      <SectionAnimate delay={0.29}>
        <div className="-mx-4 sm:mx-0">
          <ImageWithFallback
            src={testimonialsImage}
            alt="Collection of user testimonials: Bounchanh says 'Best score tracker on the planet hands down', Brandon Wong says 'I love the UX. Does what it needs to do', Lou P says 'Where's the 6 star button? That's all you need to know.'"
            className="w-full rounded-none sm:rounded-xl"
            loading="lazy"
          />
        </div>
      </SectionAnimate>

      {/* What I'd Do Differently */}
      <SectionAnimate delay={0.32}>
        <div className="flex flex-col" style={{ gap: innerGap }}>
          <SectionHeading>What I'd Do Differently</SectionHeading>
          <ul className="flex flex-col gap-3 pl-5 list-disc">
            {doDifferently.map((item, i) => (
              <li
                key={i}
                className="text-foreground/80"
                style={{ fontSize: fluidBase, lineHeight: 1.7 }}
              >
                <BoldLead text={item} />
              </li>
            ))}
          </ul>
        </div>
      </SectionAnimate>

      {/* Bonus: Unexpected Use Cases */}
      <SectionAnimate delay={0.33}>
        <div className="flex flex-col" style={{ gap: innerGap }}>
          <SectionHeading>Bonus: Unexpected Use Cases</SectionHeading>
          <div className="flex flex-col gap-4">
            <p className="text-foreground/80" style={{ fontSize: fluidBase, lineHeight: 1.75 }}>
              {nbsp("I built Score Counter for board game nights. What I didn't expect was how far beyond that people would take it. Over the years, Play Store reviews and emails have revealed use cases I never designed for, such as scoring camogie matches in Ireland, counting beers, tracking vehicles on a road, and one user who created a tally called \"little spoiled brats\" to count every time a child annoyed them (227 reasons and counting).")}
            </p>
            <p className="text-foreground/80" style={{ fontSize: fluidBase, lineHeight: 1.75 }}>
              {nbsp("These stories are my favorite proof that simplicity scales. When you build a tool that does one thing well and stays out of the way, people will find uses you never imagined.")}
            </p>
          </div>
        </div>
      </SectionAnimate>

      {/* Unexpected use cases image */}
      <SectionAnimate delay={0.34}>
        <div className="-mx-4 sm:mx-0">
          <ImageWithFallback
            src={unexpectedUseCasesImage}
            alt="Screenshot grid of real Play Store reviews showing unexpected use cases: scoring camogie matches in Ireland, counting beers, tracking children's annoyances, and keeping track of swearing in front of kids"
            className="w-full rounded-none sm:rounded-xl"
            loading="lazy"
          />
        </div>
      </SectionAnimate>

      {/* CTA */}
      <SectionAnimate delay={0.4}>
        <a
          href="https://play.google.com/store/apps/details?id=ua.napps.scorekeeper"
          data-goatcounter-click="outbound-play-store"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-foreground text-background rounded-lg hover:opacity-90 transition-opacity"
          style={{ fontSize: fluidSmall, lineHeight: 1 }}
        >
          Get it on Google Play
          <span aria-hidden>↗</span>
        </a>
      </SectionAnimate>

      {/* Bottom back link */}
      <SectionAnimate delay={0.42}>
        <Link
          to="/"
          data-goatcounter-click="back-to-home-bottom"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          style={{ fontSize: fluidSmall, lineHeight: 1 }}
        >
          <ArrowLeft size={16} />
          Back to Home Page
        </Link>
      </SectionAnimate>
    </div>
  );
}