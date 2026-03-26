import { useEffect, useRef } from "react";
import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import { useInView, useSpring, useTransform, motion } from "motion/react";
import { SectionAnimate } from "./section-animate";
import { ImageWithFallback } from "./image-with-fallback";
import { nbsp } from "./utils/nbsp";
import { fluidBase, fluidSmall, fluidH1, fluidH3, sectionGap, innerGap } from "./utils/typography";
import { SectionHeading, BoldLead } from "./case-study-components";

const heroImage = "/images/score-counter-hero.png";
const evolutionImage = "/images/score-counter-evolution.png";
const flowImage = "/images/score-counter-flow.png";
const testimonialsImage = "/images/score-counter-testimonials.png";
const unexpectedUseCasesImage = "/images/score-counter-unexpected-uses.png";

/* ── Data ─────────────────────────────────────────────── */

const metadata = [
  { label: "Role", value: "Creator, Design & Development" },
  { label: "Timeframe", value: "2016 \u2013 Present" },
  { label: "Platform", value: "Android" },
  { label: "Team", value: "Solo (with\u00a0community contributors)" },
];

const impactStats = [
  { value: "600K+", label: "Installs" },
  { value: "87.2K", label: "Monthly active users" },
  { value: "205K", label: "Avg. active devices" },
  { value: "4.9", label: "Google Play rating" },
];

const constraints = [
  {
    title: "Simplicity over feature richness",
    text: "The primary flow is\u00a0three steps: open, add counters, count. If\u00a0a\u00a0feature adds cognitive load to\u00a0that path, it\u00a0doesn\u2019t ship.",
  },
  {
    title: "Never show ads",
    text: "No\u00a0ad placements means the\u00a0UI earns its keep on\u00a0usability alone \u2014 a\u00a0clean, fast experience users trust enough to\u00a0recommend.",
  },
  {
    title: "Respect the platform",
    text: "Material Design conventions, early Android version support, and\u00a0community-driven localization keep the\u00a0app native and\u00a0maintainable.",
  },
];

const reflections = [
  "Documenting decisions as\u00a0they happen matters. Building Score Counter taught me this the\u00a0hard way \u2014 my ideation process now lives in\u00a0Figma from day\u00a0one, and\u00a0the app has used git version control from the\u00a0start.",
  "Keep a\u00a0hand on\u00a0product health. I\u00a0now use Crashlytics to\u00a0monitor app stability and\u00a0crash patterns. No\u00a0plans for\u00a0complex analytics, but enough to\u00a0make informed decisions about what\u2019s working.",
  "Follow cross-platform demand signals early. The\u00a0fan-made web version proved there\u2019s demand beyond Android. I\u00a0explored building an\u00a0iOS version with\u00a0AI\u00a0tools, but SwiftUI code generation wasn\u2019t there yet in\u00a02025. The\u00a0project is\u00a0on\u00a0hold while I\u00a0look for a\u00a0human iOS developer to\u00a0collaborate with.",
];

/* ── Local sub-components ──────────────────────────────── */

function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl bg-card card-shadow p-5 sm:p-6 border-l-[3px] border-foreground/20">
      {children}
    </div>
  );
}

/** Parse a display value like "600K+", "4.9" into parts for animation */
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

      {/* ── Section 1: Hero ── */}
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
            {nbsp("I built Score Counter as a side project in 2016. It now has 600K installs, 87.2K monthly active users, and a 4.9 rating on Google Play \u2014 designing for simplicity across nine years of growth.")}
          </p>
        </div>
      </SectionAnimate>

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

      {/* ── Section 2: The Brief ── */}
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

      <SectionAnimate delay={0.12}>
        <div className="flex flex-col" style={{ gap: innerGap }}>
          <SectionHeading>The Brief</SectionHeading>
          <p className="text-foreground/80" style={{ fontSize: fluidBase, lineHeight: 1.75 }}>
            {nbsp("Score Counter is an Android app for tracking scores during board games, card games, and any group activity that needs counting. It serves everyone from families at game night to tabletop groups and anyone replacing pen and paper. The core design challenge: how do you keep an app dead-simple when users keep requesting complex features?")}
          </p>
        </div>
      </SectionAnimate>

      <SectionAnimate delay={0.14}>
        <div className="-mx-4 sm:mx-0">
          <ImageWithFallback
            src={evolutionImage}
            alt="Side-by-side comparison of Score Counter in 2018 (numbered rows with colored backgrounds and arrow controls) and 2025 (full-bleed player cards with large +/\u2212 buttons and named counters)"
            className="w-full rounded-none sm:rounded-xl"
            loading="lazy"
          />
        </div>
      </SectionAnimate>

      {/* ── Section 3: Design in Action ── */}
      <SectionAnimate delay={0.16}>
        <div className="flex flex-col" style={{ gap: innerGap }}>
          <SectionHeading>Design in Action</SectionHeading>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <h3 style={{ fontSize: fluidH3, lineHeight: 1.5 }}>
                <strong>Protecting the three-step flow</strong>
              </h3>
              <p className="text-foreground/80" style={{ fontSize: fluidBase, lineHeight: 1.75 }}>
                {nbsp("The primary flow is sacred: open the app, add counters, start counting. Every feature request gets measured against that loop. If it adds a step or a decision to the core path, it doesn\u2019t ship. This single constraint is what kept Score Counter focused while competitors kept adding complexity \u2014 and it\u2019s the reason users describe the experience as \u2018does what it needs to do.\u2019")}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <h3 style={{ fontSize: fluidH3, lineHeight: 1.5 }}>
                <strong>Saying no to game sessions</strong>
              </h3>
              <p className="text-foreground/80" style={{ fontSize: fluidBase, lineHeight: 1.75 }}>
                {nbsp("One of the most requested features was the ability to save an active game session and load it later. I said no. Shipping it would have fixed Score Counter conceptually as a board game companion \u2014 a narrower product than what it actually is. People use it to count anything, not just board game scores. Adding save/load would also mean extra steps before starting a quick session, breaking the three-step flow for a feature that serves only a subset of users.")}
              </p>
            </div>
          </div>
        </div>
      </SectionAnimate>

      <SectionAnimate delay={0.18}>
        <div className="-mx-4 sm:mx-0">
          <ImageWithFallback
            src={flowImage}
            alt="Hand-drawn primary flow diagram: 1. Open, 2. Add Counters, 3. Count"
            className="w-full rounded-none sm:rounded-xl"
            loading="lazy"
          />
        </div>
      </SectionAnimate>

      {/* ── Section 4: Constraints & Principles ── */}
      <SectionAnimate delay={0.2}>
        <div className="flex flex-col" style={{ gap: innerGap }}>
          <SectionHeading>Constraints &amp; Principles</SectionHeading>
          <div className="flex flex-col gap-4">
            {constraints.map((c) => (
              <div key={c.title} className="flex flex-col gap-1">
                <h3 style={{ fontSize: fluidH3, lineHeight: 1.5 }}>
                  <strong>{c.title}</strong>
                </h3>
                <p className="text-foreground/80" style={{ fontSize: fluidBase, lineHeight: 1.75 }}>
                  {c.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </SectionAnimate>

      {/* ── Section 5: Outcome & Impact ── */}
      <SectionAnimate delay={0.22}>
        <div className="flex flex-col" style={{ gap: innerGap }}>
          <SectionHeading>Outcome &amp; Impact</SectionHeading>
          <ImpactStatsGrid />
          <p className="text-foreground/80" style={{ fontSize: fluidBase, lineHeight: 1.75 }}>
            {nbsp("600K installs through word-of-mouth alone \u2014 no ads, no marketing spend. Volunteers have contributed translations, a developer built a fan web version, and the app still holds a 4.9 rating after nine years. The system that makes this possible is simple: build something people trust enough to recommend.")}
          </p>
        </div>
      </SectionAnimate>

      <SectionAnimate delay={0.24}>
        <div className="-mx-4 sm:mx-0">
          <ImageWithFallback
            src={testimonialsImage}
            alt="Collection of user testimonials: Bounchanh says 'Best score tracker on the planet hands down', Brandon Wong says 'I love the UX. Does what it needs to do', Lou P says 'Where's the 6 star button? That's all you need to know.'"
            className="w-full rounded-none sm:rounded-xl"
            loading="lazy"
          />
        </div>
      </SectionAnimate>

      <SectionAnimate delay={0.26}>
        <PullQuote>
          <p
            className="text-foreground/80 italic"
            style={{ fontSize: fluidBase, lineHeight: 1.75 }}
          >
            {nbsp("One user created a tally called \"little spoiled brats\" to count every time a child annoyed them \u2014 227 reasons and counting. When you build a tool that does one thing well and stays out of the way, people find uses you never imagined.")}
          </p>
        </PullQuote>
      </SectionAnimate>

      <SectionAnimate delay={0.28}>
        <div className="-mx-4 sm:mx-0">
          <ImageWithFallback
            src={unexpectedUseCasesImage}
            alt="Screenshot grid of real Play Store reviews showing unexpected use cases: scoring camogie matches in Ireland, counting beers, tracking children's annoyances, and keeping track of swearing in front of kids"
            className="w-full rounded-none sm:rounded-xl"
            loading="lazy"
          />
        </div>
      </SectionAnimate>

      {/* ── Section 6: Reflection ── */}
      <SectionAnimate delay={0.3}>
        <div className="flex flex-col" style={{ gap: innerGap }}>
          <SectionHeading>Reflection</SectionHeading>
          <ul className="flex flex-col gap-3 pl-5 list-disc">
            {reflections.map((item, i) => (
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

      {/* ── CTA ── */}
      <SectionAnimate delay={0.32}>
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
      <SectionAnimate delay={0.34}>
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
