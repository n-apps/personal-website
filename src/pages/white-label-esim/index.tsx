import { Link } from "react-router";
import { RiArrowLeftLine, RiArrowRightLine, RiMouseFill } from "@remixicon/react";
import { SectionAnimate } from "@/components/ui/section-animate";
import { navigateWithTransition } from "@/lib/page-transition";
import { nbsp } from "@/lib/nbsp";
import { fluidLead, fluidBase, fluidSmall, fluidH1, fluidH3, sectionGap, innerGap } from "@/lib/typography";
import { SectionHeading, ImagePlaceholder, PullQuote } from "@/components/case-study/case-study-components";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";

/* ── Data ─────────────────────────────────────────────── */

const metadata = [
  { label: "Role", value: "Product Designer" },
  { label: "Timeframe", value: "2025\u20132026" },
  { label: "Platform", value: "Web (B2B)" },
  { label: "Team", value: "PM, UX/UI Designer (myself)" },
];

const statusQuoItems = [
  {
    label: "Color-dependent UI",
    body: "an operator can pick almost any brand color. A mockup shows the one I chose. The product has to keep text readable on whatever they choose.",
  },
  {
    label: "Conditional sections",
    body: "the contact card appears only when there is contact info. The promotion badge has a toggle. The footer comes and goes. Static screens turn that into a pile of variants.",
  },
  {
    label: "File uploads",
    body: "logos and banners reshape the preview. Aspect ratios vary, fallbacks matter, and the layout needs to survive real assets.",
  },
];

const prototypeFeatures = [
  {
    label: "Live form-to-preview binding",
    body: "brand name, logo, color, banner, contact details, and policy links update the preview as the operator types",
  },
  {
    label: "Mobile and desktop preview modes",
    body: "the preview switches between an iPhone shell and a desktop browser frame",
  },
  {
    label: "Automatic contrast handling",
    body: "text color on brand backgrounds comes from a luminance function instead of a hardcoded choice",
  },
  {
    label: "File handling",
    body: "logo and banner uploads render immediately in the preview, with clear and replace controls",
  },
  {
    label: "Validation",
    body: "email format, URL structure, and brand alias cleanup happen inline, before save",
  },
  {
    label: "Dirty-state tracking",
    body: "the form warns before navigation when changes are unsaved, and save/reset work per section",
  },
  {
    label: "Loading states and transitions",
    body: "skeleton screens and CSS transitions make the preview feel closer to the product",
  },
];

const impactItems = [
  {
    label: "Zero contrast-related QA issues",
    body: "the luminance logic was tested in the prototype instead of being discovered during review",
  },
  {
    label: "Stakeholder alignment in one session",
    body: "PMs and partners tested the prototype directly instead of reviewing annotated screens for another round",
  },
  {
    label: "Less translation for development",
    body: "the prototype used the same stack as production (Next.js, Tailwind), so the developer could extend it instead of rebuilding from a mockup",
  },
  {
    label: "Edge cases handled by default",
    body: "conditional rendering and validation logic covered the state combinations inside the prototype itself",
  },
];

const whatWorked = [
  {
    label: "The medium enforced rigor",
    body: "Code doesn\u2019t let you hand-wave for long. Every state, color, and conditional is either handled or it breaks. That pressure made the design better.",
  },
  {
    label: "Stakeholders engaged differently",
    body: "When people can type into a prototype and see the result, the feedback shifts to behavior. People ask what happens when a field is blank instead of debating a static screen.",
  },
  {
    label: "The prototype became the spec",
    body: "There was no separate document explaining how the form and preview should interact. The prototype became the source of truth. The developer read the code, not a PDF.",
  },
];

const whatIdChange = [
  {
    label: "Pair with a developer from day one",
    body: "I built this solo, which worked for a focused feature but would not scale well. A developer in the room earlier would have caught a few structural choices I made like a designer.",
  },
  {
    label: "Keep a lightweight Figma file for visual exploration",
    body: "Code is a clumsy place for early divergent thinking. I should have sketched in Figma first, then moved to code once the direction was clearer.",
  },
  {
    label: "Document the \u201cwhy\u201d alongside the code",
    body: "The prototype shows what happens, but not always why. Short decision notes would have helped future teammates understand the intent behind the implementation.",
  },
];

/* ── Local sub-components ──────────────────────────────── */

function LabeledList({
  items,
}: {
  items: { label: string; body: string }[];
}) {
  return (
    <ul className="flex flex-col gap-3 pl-5 list-disc">
      {items.map((item, i) => (
        <li
          key={i}
          className="text-foreground/80"
          style={{ fontSize: fluidBase, lineHeight: 1.7 }}
        >
          <strong>{nbsp(item.label)}</strong>
          {": "}
          {nbsp(item.body)}
        </li>
      ))}
    </ul>
  );
}

/* ── Page ─────────────────────────────────────────────── */

export function WhiteLabelEsimPage() {
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
          <RiArrowLeftLine size={16} />
          Back to home
        </Link>
      </SectionAnimate>

      {/* ── 1. Hero + TL;DR ────────────────────────────── */}
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
            Designing in code: an interactive prototype that replaced static mockups
          </h1>
          <p
            className="text-muted-foreground"
            style={{ fontSize: fluidLead, lineHeight: 1.5 }}
          >
            {nbsp("I built a working prototype instead of another Figma file. It exposed the awkward parts that static screens tend to hide, and it landed much closer to production code. A live demo is available below.")}
          </p>
        </div>
      </SectionAnimate>

      <SectionAnimate delay={0.08}>
        <div className="-mx-4 sm:mx-0">
          <ImageWithFallback
            src="/images/white-label-esim-hero.png"
            alt="Interactive prototype overview with form and live preview"
            className="w-full rounded-none sm:rounded-xl"
            loading="eager"
          />
        </div>
      </SectionAnimate>

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

      {/* ── 2. Challenge ───────────────────────────────── */}
      <SectionAnimate delay={0.12}>
        <div className="flex flex-col" style={{ gap: innerGap }}>
          <SectionHeading>Challenge</SectionHeading>
          <p
            className="text-foreground/80"
            style={{ fontSize: fluidBase, lineHeight: 1.75 }}
          >
            {nbsp("Yesim is a global eSIM platform with over 3\u00a0million customers. One B2B product lets telecom operators upload a logo, pick brand colors, add contact details, and preview the eSIM experience their customers will see.")}
          </p>
          <p
            className="text-foreground/80"
            style={{ fontSize: fluidBase, lineHeight: 1.75 }}
          >
            {nbsp("That kind of screen gets messy in static design. Brand colors change text contrast. Optional fields hide or reveal sections. File uploads can change the layout. A Figma mockup can show a snapshot, but the product is all response.")}
          </p>
          <p
            className="text-foreground/80"
            style={{ fontSize: fluidBase, lineHeight: 1.75 }}
          >
            {nbsp("I had run into this before. I would hand off polished screens, then watch implementation surface the real problems: contrast failures on dark brand colors, empty states nobody designed, layout shifts when optional content appeared or disappeared. The mockup looked right. The built product did not behave right.")}
          </p>
          <PullQuote>
            {nbsp("How do we design a B2B customization flow so the artifact captures the behavior, not only the pixels?")}
          </PullQuote>
        </div>
      </SectionAnimate>

      {/* ── 3. Status Quo ──────────────────────────────── */}
      <SectionAnimate delay={0.14}>
        <div className="flex flex-col" style={{ gap: innerGap }}>
          <SectionHeading>Status quo</SectionHeading>
          <p
            className="text-foreground/80"
            style={{ fontSize: fluidBase, lineHeight: 1.75 }}
          >
            {nbsp("The usual workflow was simple enough: design screens in Figma, annotate the edge cases, hand off, then spend review cycles catching things the static file could not express. For brand customization, that meant:")}
          </p>
          <LabeledList items={statusQuoItems} />
          <p
            className="text-foreground/80"
            style={{ fontSize: fluidBase, lineHeight: 1.75 }}
          >
            {nbsp("QA kept finding the same kind of issue: things that worked in the mockup but broke under real input.")}
          </p>
        </div>
      </SectionAnimate>

      <SectionAnimate delay={0.16}>
        <div className="-mx-4 sm:mx-0">
          <ImageWithFallback
            src="/images/white-label-esim-problem.png"
            alt="Static mockup compared with real input showing contrast and layout issues"
            className="w-full rounded-none sm:rounded-xl"
          />
        </div>
      </SectionAnimate>

      {/* ── 4. Key Decisions ───────────────────────────── */}
      <SectionAnimate delay={0.18}>
        <div className="flex flex-col" style={{ gap: sectionGap }}>
          {/* Decision 1: Code, not Figma */}
          <div className="flex flex-col" style={{ gap: innerGap }}>
            <SectionHeading>Key decisions</SectionHeading>
            <h3 style={{ fontSize: fluidH3, fontWeight: 600, lineHeight: 1.3, letterSpacing: "-0.005em" }}>
              Building the prototype in code, not Figma
            </h3>
            <p
              className="text-foreground/80"
              style={{ fontSize: fluidBase, lineHeight: 1.75 }}
            >
              {nbsp("I designed directly in Next.js and Tailwind CSS instead of producing static screens. I wasn\u2019t skipping design. I was putting it somewhere the interaction constraints had to be dealt with.")}
            </p>
            <p
              className="text-foreground/80"
              style={{ fontSize: fluidBase, lineHeight: 1.75 }}
            >
              {nbsp("In Figma, you can place white text on a blue background and move on. In code, the text is either readable or it isn\u2019t. If operators can pick their own colors, the logic has to handle that.")}
            </p>
            <p
              className="text-foreground/80"
              style={{ fontSize: fluidBase, lineHeight: 1.75 }}
            >
              {nbsp("The trade-off was obvious: more effort upfront and a slower first pass. The upside was worth it. The awkward problems showed up while I was still designing.")}
            </p>
          </div>

          {/* Decision 2: Contrast at the system level */}
          <div className="flex flex-col" style={{ gap: innerGap }}>
            <h3 style={{ fontSize: fluidH3, fontWeight: 600, lineHeight: 1.3, letterSpacing: "-0.005em" }}>
              Solving contrast at the system level
            </h3>
            <p
              className="text-foreground/80"
              style={{ fontSize: fluidBase, lineHeight: 1.75 }}
            >
              {nbsp("The prototype computes foreground text color from the operator\u2019s brand color using WCAG relative-luminance calculations. Light brand colors get dark text. Dark brand colors get white text. It runs every time the color changes, so nobody has to hope the chosen color happens to work.")}
            </p>
            <p
              className="text-foreground/80"
              style={{ fontSize: fluidBase, lineHeight: 1.75 }}
            >
              {nbsp("In a static design, I would have left a comment saying \u201censure contrast.\u201d In the prototype, contrast is a function. It passes or it fails.")}
            </p>
          </div>

          <div className="-mx-4 sm:mx-0">
            <ImageWithFallback
              src="/images/white-label-esim-contrast.png"
              alt="Automatic contrast for light and dark brand colors"
              className="w-full rounded-none sm:rounded-xl"
            />
          </div>

          {/* Decision 3: Conditional rendering */}
          <div className="flex flex-col" style={{ gap: innerGap }}>
            <h3 style={{ fontSize: fluidH3, fontWeight: 600, lineHeight: 1.3, letterSpacing: "-0.005em" }}>
              Conditional rendering as a design decision
            </h3>
            <p
              className="text-foreground/80"
              style={{ fontSize: fluidBase, lineHeight: 1.75 }}
            >
              {nbsp("Instead of creating a dozen Figma variants for toggles and optional fields, the prototype renders conditionally. The contact card appears when at least one contact field has content. The promotion badge follows its toggle. The footer appears only when it has something useful to show.")}
            </p>
            <p
              className="text-foreground/80"
              style={{ fontSize: fluidBase, lineHeight: 1.75 }}
            >
              {nbsp("That made the combinations much harder to miss. The rendering logic handled them instead of relying on my memory of which variants to draw.")}
            </p>
          </div>

          <div className="-mx-4 sm:mx-0">
            <ImageWithFallback
              src="/images/white-label-esim-logic.png"
              alt="Conditional sections appearing based on input"
              className="w-full rounded-none sm:rounded-xl"
            />
          </div>

          {/* Decision 4: Real-time preview */}
          <div className="flex flex-col" style={{ gap: innerGap }}>
            <h3 style={{ fontSize: fluidH3, fontWeight: 600, lineHeight: 1.3, letterSpacing: "-0.005em" }}>
              Real-time preview as the primary feedback loop
            </h3>
            <p
              className="text-foreground/80"
              style={{ fontSize: fluidBase, lineHeight: 1.75 }}
            >
              {nbsp("The screen is split between the form and the live preview. Every keystroke, color change, or file upload updates the preview instantly. Operators can see their brand inside a realistic mobile interface, with a desktop toggle, without saving or refreshing.")}
            </p>
            <p
              className="text-foreground/80"
              style={{ fontSize: fluidBase, lineHeight: 1.75 }}
            >
              {nbsp("That made reviews faster. I did not have to walk people through annotations. I shared a URL, they typed into the form, and the product answered back.")}
            </p>
          </div>
        </div>
      </SectionAnimate>

      {/* ── 5. The Prototype in Action ─────────────────── */}
      <SectionAnimate delay={0.22}>
        <div className="flex flex-col" style={{ gap: innerGap }}>
          <SectionHeading>The prototype in action</SectionHeading>
          <p
            className="text-foreground/80"
            style={{ fontSize: fluidBase, lineHeight: 1.75 }}
          >
            {nbsp("The prototype covered the parts that usually get shoved into annotations:")}
          </p>
          <LabeledList items={prototypeFeatures} />
          <p
            className="text-foreground/80"
            style={{ fontSize: fluidBase, lineHeight: 1.75 }}
          >
            {nbsp("In a static handoff, most of that would have been comments. In the prototype, people could try the behavior themselves.")}
          </p>
        </div>
      </SectionAnimate>

      <SectionAnimate delay={0.24}>
        <Link
          to="/work/white-label-esim/demo"
          data-goatcounter-click="launch-white-label-demo"
          onClick={(e) => {
            if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
            e.preventDefault();
            navigateWithTransition("/work/white-label-esim/demo", () =>
              Promise.all([
                import("@/pages/white-label-esim/demo/layout"),
                import("@/pages/white-label-esim/demo/company-settings"),
              ])
            );
          }}
          className="group flex items-center gap-4 rounded-xl bg-foreground p-4 text-background transition-transform duration-200 hover:-translate-y-0.5 sm:gap-5 sm:p-5"
        >
          <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-background/10 ring-1 ring-inset ring-background/15 transition-colors duration-200 group-hover:bg-background/15">
            <RiMouseFill size={20} />
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <span
              className="font-medium"
              style={{ fontSize: fluidBase, lineHeight: 1.4 }}
            >
              Launch the interactive prototype
            </span>
            <span
              className="text-background/70"
              style={{ fontSize: fluidSmall, lineHeight: 1.5 }}
            >
              Edit the form and watch the preview respond.
            </span>
          </div>
          <RiArrowRightLine
            size={20}
            className="shrink-0 text-background/60 transition-[transform,color] duration-200 group-hover:translate-x-0.5 group-hover:text-background"
          />
        </Link>
      </SectionAnimate>

      {/* ── 6. Impact ──────────────────────────────────── */}
      <SectionAnimate delay={0.26}>
        <div className="flex flex-col" style={{ gap: innerGap }}>
          <SectionHeading>Impact</SectionHeading>
          <LabeledList items={impactItems} />
        </div>
      </SectionAnimate>

      {/* ── 7. Reflection ──────────────────────────────── */}
      <SectionAnimate delay={0.3}>
        <div className="flex flex-col" style={{ gap: innerGap }}>
          <SectionHeading>Reflection</SectionHeading>
          <div className="flex flex-col gap-2">
            <p style={{ fontSize: fluidBase, lineHeight: 1.75 }}>
              <strong>What worked:</strong>
            </p>
            <LabeledList items={whatWorked} />
          </div>
          <div className="flex flex-col gap-2">
            <p style={{ fontSize: fluidBase, lineHeight: 1.75 }}>
              <strong>What I'd change:</strong>
            </p>
            <LabeledList items={whatIdChange} />
          </div>
        </div>
      </SectionAnimate>

      {/* Bottom back link */}
      <SectionAnimate delay={0.34}>
        <div className="flex items-center justify-between">
          <Link
            to="/"
            data-goatcounter-click="back-to-home-bottom"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            style={{ fontSize: fluidSmall, lineHeight: 1 }}
          >
            <RiArrowLeftLine size={16} />
            Back to home
          </Link>
          <Link
            to="/work/score-counter"
            data-goatcounter-click="next-case-study"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            style={{ fontSize: fluidSmall, lineHeight: 1 }}
          >
            Next case study
            <RiArrowRightLine size={16} />
          </Link>
        </div>
      </SectionAnimate>
    </div>
  );
}
