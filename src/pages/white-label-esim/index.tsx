import { Link } from "react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SectionAnimate } from "@/components/ui/section-animate";
import { nbsp } from "@/lib/nbsp";
import { fluidLead, fluidBase, fluidSmall, fluidH1, fluidH3, sectionGap, innerGap } from "@/lib/typography";
import { SectionHeading, ImagePlaceholder } from "@/components/case-study/case-study-components";

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
    body: "the operator picks a brand color, and all text on that background needs to stay readable. A mockup shows one color. The real product handles thousands.",
  },
  {
    label: "Conditional sections",
    body: "the contact card only appears if the operator fills in at least one contact field. The promotion badge has a toggle. The footer is conditional. Static screens need a variant for each combination.",
  },
  {
    label: "File uploads",
    body: "logos and banners change the layout. Aspect ratios vary. Fallbacks differ. You can annotate rules in Figma, but nobody reads annotations the way they read working software.",
  },
];

const prototypeFeatures = [
  {
    label: "Live form-to-preview binding",
    body: "brand name, logo, color, banner, contact details, and policy links all update the preview as the operator types",
  },
  {
    label: "Mobile and desktop preview modes",
    body: "toggle between an iPhone shell and a browser chrome mockup to see both experiences",
  },
  {
    label: "Automatic contrast handling",
    body: "text color on brand backgrounds is derived from a luminance function, not hardcoded",
  },
  {
    label: "File handling",
    body: "logo and banner uploads render immediately in-preview via data URLs, with clear/replace controls",
  },
  {
    label: "Validation",
    body: "email format, URL structure, and brand alias sanitization happen inline, surfacing errors before save",
  },
  {
    label: "Dirty-state tracking",
    body: "the form warns on navigation if there are unsaved changes, and save/reset operate per section",
  },
  {
    label: "Loading states and transitions",
    body: "skeleton screens and CSS transitions give the preview realistic pacing",
  },
];

const impactItems = [
  {
    label: "Zero contrast-related QA issues",
    body: "the luminance logic was validated during design, not discovered during review",
  },
  {
    label: "Stakeholder alignment in one session",
    body: "PMs and partners tested the prototype directly instead of reviewing annotated screens across multiple rounds",
  },
  {
    label: "Design-to-dev translation was near-zero",
    body: "the prototype used the same tech stack as production (Next.js, Tailwind), so the developer extended it rather than rebuilding from a mockup",
  },
  {
    label: "Edge cases handled by default",
    body: "conditional rendering and validation logic meant every state combination was accounted for in the design artifact itself",
  },
];

const whatWorked = [
  {
    label: "The medium enforced rigor",
    body: "Code doesn\u2019t let you hand-wave. Every state, every color, every conditional is either handled or it breaks. That discipline produced a better design than I would have reached in a static tool.",
  },
  {
    label: "Stakeholders engaged differently",
    body: "When people can type into a prototype and see the results, the feedback is about behavior (\u201cwhat happens when I leave this blank?\u201d) instead of pixels. The conversations were more productive.",
  },
  {
    label: "The prototype became the spec",
    body: "There was no separate document describing how the form and preview should interact. The prototype was the source of truth. The developer read the code, not a PDF.",
  },
];

const whatIdChange = [
  {
    label: "Pair with a developer from day one",
    body: "I built this solo, which worked for a focused feature but wouldn\u2019t scale. Having a developer in the room earlier would have caught architectural decisions I made as a designer that a developer would have structured differently.",
  },
  {
    label: "Keep a lightweight Figma file for visual exploration",
    body: "Code is the wrong medium for early divergent thinking. I should have sketched in Figma first and moved to code once the direction was clear, treating the move as a transition rather than a handoff.",
  },
  {
    label: "Document the \u201cwhy\u201d alongside the code",
    body: "The prototype shows what happens but not why it was designed that way. Adding short decision records would have helped future team members understand the intent behind the implementation.",
  },
];

/* ── Local sub-components ──────────────────────────────── */

function CalloutBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl bg-card card-shadow p-5 sm:p-6 flex flex-col gap-3 my-2 border-l-[3px] border-foreground/20">
      {children}
    </div>
  );
}

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
          {" — "}
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
          <ArrowLeft size={16} />
          Back to Home Page
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
            {nbsp("I built a working prototype instead of a Figma file, and it surfaced constraints static design tools hide. It shipped closer to production than any mockup handoff could.")}
          </p>
        </div>
      </SectionAnimate>

      <SectionAnimate delay={0.08}>
        <div className="-mx-4 sm:mx-0">
          <ImagePlaceholder label="Hero — interactive prototype overview (form + live preview)" />
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
            {nbsp("Yesim is a global eSIM platform with over 3\u00a0million customers. One of its B2B products is a brand customization tool: a screen where telecom operators upload their logo, pick brand colors, set contact details, and see how their customers will experience a branded eSIM interface.")}
          </p>
          <p
            className="text-foreground/80"
            style={{ fontSize: fluidBase, lineHeight: 1.75 }}
          >
            {nbsp("This kind of screen is hard to design statically. The preview depends on user input: brand colors affect text contrast, optional fields hide or reveal sections, file uploads change the layout. A Figma mockup can show one snapshot of that. It cannot show the system responding.")}
          </p>
          <p
            className="text-foreground/80"
            style={{ fontSize: fluidBase, lineHeight: 1.75 }}
          >
            {nbsp("I had hit this wall before. On earlier projects, I would hand off polished static screens and then watch developers re-discover problems during implementation: contrast failures on dark brand colors, empty states nobody thought to design, layout shifts when optional content appeared or disappeared. The mockup looked right. The built product didn\u2019t behave right.")}
          </p>
          <CalloutBox>
            <p style={{ fontSize: fluidLead, fontWeight: 500, lineHeight: 1.5, fontStyle: "italic" }}>
              {nbsp("How do we design a B2B customization experience so the design artifact captures the constraints that matter, not only the pixels?")}
            </p>
          </CalloutBox>
        </div>
      </SectionAnimate>

      {/* ── 3. Status Quo ──────────────────────────────── */}
      <SectionAnimate delay={0.14}>
        <div className="flex flex-col" style={{ gap: innerGap }}>
          <SectionHeading>Status Quo</SectionHeading>
          <p
            className="text-foreground/80"
            style={{ fontSize: fluidBase, lineHeight: 1.75 }}
          >
            {nbsp("The standard workflow was: design screens in Figma, annotate edge cases in comments, hand off, then spend review cycles catching things the static file couldn\u2019t express. For a feature like brand customization, that meant:")}
          </p>
          <LabeledList items={statusQuoItems} />
          <p
            className="text-foreground/80"
            style={{ fontSize: fluidBase, lineHeight: 1.75 }}
          >
            {nbsp("Every round of QA produced the same category of bug: things that worked in the mockup but broke under real input.")}
          </p>
        </div>
      </SectionAnimate>

      <SectionAnimate delay={0.16}>
        <div className="-mx-4 sm:mx-0">
          <ImagePlaceholder label="Before — static mockup vs. real input (contrast failure, broken layout)" />
        </div>
      </SectionAnimate>

      {/* ── 4. Key Decisions ───────────────────────────── */}
      <SectionAnimate delay={0.18}>
        <div className="flex flex-col" style={{ gap: sectionGap }}>
          {/* Decision 1: Code, not Figma */}
          <div className="flex flex-col" style={{ gap: innerGap }}>
            <SectionHeading>Key Decisions</SectionHeading>
            <h3 style={{ fontSize: fluidH3, fontWeight: 600, lineHeight: 1.3, letterSpacing: "-0.005em" }}>
              Building the prototype in code, not Figma
            </h3>
            <p
              className="text-foreground/80"
              style={{ fontSize: fluidBase, lineHeight: 1.75 }}
            >
              {nbsp("I designed directly in Next.js and Tailwind CSS instead of producing static screens. I wasn\u2019t skipping design. I was moving it into a medium that doesn\u2019t let you ignore interaction constraints.")}
            </p>
            <p
              className="text-foreground/80"
              style={{ fontSize: fluidBase, lineHeight: 1.75 }}
            >
              {nbsp("In Figma, you can place white text on a blue background and move on. In code, the text is either readable or it isn\u2019t, and you have to write the logic that keeps it readable for every color.")}
            </p>
            <p
              className="text-foreground/80"
              style={{ fontSize: fluidBase, lineHeight: 1.75 }}
            >
              {nbsp("The trade-off: higher upfront effort, slower first iteration. The payoff: problems surfaced during design, not after handoff.")}
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
              {nbsp("The prototype computes foreground text color from the operator\u2019s brand color using WCAG relative-luminance calculations. Light brand colors get dark text; dark brand colors get white text. This runs on every color change. No manual checking, no hoping the operator picks an accessible color.")}
            </p>
            <p
              className="text-foreground/80"
              style={{ fontSize: fluidBase, lineHeight: 1.75 }}
            >
              {nbsp("In a static design, I would have noted \u201censure contrast\u201d in a comment. In the prototype, contrast is a function. It either passes or it doesn\u2019t.")}
            </p>
          </div>

          <div className="-mx-4 sm:mx-0">
            <ImagePlaceholder label="Automatic contrast — light and dark brand colors resolving to accessible text" />
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
              {nbsp("Instead of creating 12 Figma variants to cover every toggle and optional-field combination, the prototype renders conditionally. The contact card appears when at least one contact field has content. The promotion badge respects its toggle. The footer shows only when relevant.")}
            </p>
            <p
              className="text-foreground/80"
              style={{ fontSize: fluidBase, lineHeight: 1.75 }}
            >
              {nbsp("Every combination is designed by definition. The rendering logic handles it, not my memory of which variants to build.")}
            </p>
          </div>

          <div className="-mx-4 sm:mx-0">
            <ImagePlaceholder label="Conditional sections — contact card, promo badge, and footer appearing based on input" />
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
              {nbsp("The screen is split: form on the left, live preview on the right. Every keystroke, color change, or file upload updates the preview instantly. Operators see their brand applied to a realistic mobile interface (with a desktop toggle) without saving or refreshing.")}
            </p>
            <p
              className="text-foreground/80"
              style={{ fontSize: fluidBase, lineHeight: 1.75 }}
            >
              {nbsp("That made stakeholder reviews fast. Instead of walking someone through annotated screens, I shared a URL. They typed, they saw.")}
            </p>
          </div>
        </div>
      </SectionAnimate>

      {/* ── 5. The Prototype in Action ─────────────────── */}
      <SectionAnimate delay={0.22}>
        <div className="flex flex-col" style={{ gap: innerGap }}>
          <SectionHeading>The Prototype in Action</SectionHeading>
          <p
            className="text-foreground/80"
            style={{ fontSize: fluidBase, lineHeight: 1.75 }}
          >
            {nbsp("The working prototype includes:")}
          </p>
          <LabeledList items={prototypeFeatures} />
          <p
            className="text-foreground/80"
            style={{ fontSize: fluidBase, lineHeight: 1.75 }}
          >
            {nbsp("Every feature listed above would have been a comment or annotation in a static handoff. Here, it is working behavior that stakeholders can interact with.")}
          </p>
        </div>
      </SectionAnimate>

      <SectionAnimate delay={0.24}>
        <Link
          to="/work/white-label-esim/demo"
          data-goatcounter-click="launch-white-label-demo"
          className="group flex items-center justify-between gap-4 rounded-xl bg-card card-shadow p-5 sm:p-6 border-l-[3px] border-foreground/20 transition-colors hover:border-foreground/40"
        >
          <div className="flex flex-col gap-1">
            <span
              className="font-medium"
              style={{ fontSize: fluidBase, lineHeight: 1.4 }}
            >
              Launch the interactive prototype
            </span>
            <span
              className="text-muted-foreground"
              style={{ fontSize: fluidSmall, lineHeight: 1.5 }}
            >
              Open the working demo in a new view and edit the form to see the preview update.
            </span>
          </div>
          <ArrowRight
            size={20}
            className="shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground"
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
            <ArrowLeft size={16} />
            Back to Home Page
          </Link>
          <Link
            to="/work/score-counter"
            data-goatcounter-click="next-case-study"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            style={{ fontSize: fluidSmall, lineHeight: 1 }}
          >
            Next Case Study
            <ArrowRight size={16} />
          </Link>
        </div>
      </SectionAnimate>
    </div>
  );
}
