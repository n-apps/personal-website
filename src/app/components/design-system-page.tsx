import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import { SectionAnimate } from "./section-animate";
import { nbsp } from "./utils/nbsp";
import { ImageWithFallback } from "./image-with-fallback";
import { fluidBase, fluidSmall, fluidH1, fluidH3, sectionGap, innerGap } from "./utils/typography";
import { SectionHeading, BoldLead, ImagePlaceholder } from "./case-study-components";

const heroImage = "/images/design-system-hero.png";
const beforeAfterImage = "/images/design-system-before-after.png";
const semanticsImage = "/images/design-system-semantics.png";
const subBrandsImage = "/images/design-system-sub-brands.png";
const specsImage = "/images/design-system-specs.png";
const governanceImage = "/images/design-system-governance.png";
const prototypeImage = "/images/design-system-prototype.png";

/* ── Data ─────────────────────────────────────────────── */

const metadata = [
  { label: "Role", value: "Product Designer" },
  { label: "Timeframe", value: "Sep – Dec 2025" },
  { label: "Platform", value: "Web (B2B products)" },
  { label: "Team", value: "Developer, PM, UX/UI Designer (myself)" },
];

const snapshotRows = [
  {
    key: "What it\u00a0is",
    value:
      "A\u00a0multi-product brand-agnostic design system unifying three B2B web products under one shared component library and token architecture",
  },
  {
    key: "Audience",
    value:
      "Internal product teams, developers, and B2B end-users across three separate platforms",
  },
  {
    key: "Scope",
    value:
      "Token system (primitives, semantics, component tokens), Figma component library, coded component library, documentation, governance process",
  },
  {
    key: "Products\u00a0served",
    value: "Three B2B web products with distinct visual identities",
  },
  {
    key: "Key\u00a0outcome",
    value:
      "Faster time-to-design for new features, fewer UI inconsistencies reaching QA, improved developer handoff quality",
  },
];

const successMetrics = [
  "Get new features to market faster by starting with components and avoiding from-scratch design",
  "Spot UI inconsistencies at the design stage, before they reach QA",
  "Get all three products to use the same components",
  "Make developer handoffs better and faster",
];

const constraints = [
  "The system had to be integrated with the existing codebases, so a complete rewrite wasn't an option",
  "Each product had its own release cycle and team priorities",
  "Theming had to work at the token level (colours, typography) without requiring component forks",
  "There was no dedicated design-system team, and I led this alongside product design work",
];

const principles: { title: string; description: string }[] = [
  {
    title: "1. Be consistent where it matters, but be flexible where it doesn't",
    description:
      "Interaction patterns, accessibility, and spacing are universal. You can change the colours, fonts and branding. This is the core tradeoff that shapes the entire architecture.",
  },
  {
    title: "2. Prioritise composability over completeness",
    description:
      "Create small, composable building blocks (such as buttons, inputs and cards) that can be combined to form larger patterns.",
  },
  {
    title: "3. Tokens are the API",
    description:
      "Design tokens represent the agreement between the system and the products that consume it. If it's not a token, it's not themeable. If something is not themeable, this is a deliberate decision.",
  },
  {
    title: "4. Accessible by default",
    description:
      "WCAG 2.1 AA compliance is built into every component, including contrast ratios and keyboard navigation.",
  },
  {
    title: "5. Document the 'why', not just the 'what'",
    description:
      "Every component should include usage guidelines that explain when to use it, when not to use it, and how it works.",
  },
  {
    title: "6. Adoption is a product, not a mandate",
    description:
      "Teams adopt the system because it makes their work faster. If a team resists a component, the system is wrong, not the team.",
  },
  {
    title: "7. Ship incrementally",
    description:
      "Components are shipped as they are ready, with the product being migrated and validated in a real context before being declared stable.",
  },
];

const tokenLayers = [
  {
    layer: "Raw values",
    purpose: "Hardcoded (legacy)",
    example: "#3B82F6",
    themeable: "No (shared)",
  },
  {
    layer: "Primitive",
    purpose: "The full palette",
    example: "blue-500: #3B82F6",
    themeable: "No (shared)",
  },
  {
    layer: "Semantic",
    purpose: "Role-based meanings",
    example: "color-primary: {blue-500}",
    themeable: "Yes (per product)",
  }
];

const subBrandThemes = [
  {
    token: "color-primary",
    productA: "Blue (#3B82F6)",
    productB: "Teal (#0D9488)",
    productC: "Purple (#7C3AED)",
  },
  {
    token: "font-heading",
    productA: "Inter",
    productB: "Plus Jakarta Sans",
    productC: "Inter",
  },
  {
    token: "radius-default",
    productA: "8px",
    productB: "4px",
    productC: "12px",
  },
  {
    token: "density",
    productA: "Default",
    productB: "Compact",
    productC: "Default",
  },
];

const priorityComponents = [
  {
    category: "Data display",
    components: "Tables, data cards, stat blocks, badges",
    why: "Every B2B product has a data table on its most-visited page",
  },
  {
    category: "Forms",
    components: "Inputs, selects, date pickers, form layouts, validation",
    why: "Forms are 40%+ of B2B surfaces",
  },
  {
    category: "Filters & search",
    components: "Filter bars, chips, search inputs, sort controls",
    why: "Paired with tables in nearly every list view",
  },
  {
    category: "Feedback & states",
    components: "Empty states, loading skeletons, toasts, error states",
    why: "Most-neglected category; huge impact on perceived quality",
  },
  {
    category: "Navigation",
    components: "Sidebar, breadcrumbs, tabs, page headers",
    why: "Structural: everything else lives inside navigation",
  },
];

const governanceSteps = [
  "Request: Any team can request a new component or variant via a dedicated Jira board",
  "Ranking: I review requests weekly and categorize them as \"add to the system\", \"requires analysis\", or \"not applicable.\"",
  "Design & review: New components are designed in Figma and reviewed by at least one product team that will use them",
  "Build & ship: Once approved, the component is built, documented, and released with a version bump",
  "Versioning: Semantic versioning. Breaking changes get a major bump, new components get a minor bump",
];

const crossProductChecks = [
  "Every component was tested with all three product themes before release",
  "Edge cases, such as long labels and empty data, were part of the standard QA checklist"
];

const outcomeDelivered = [
  "A complete token system — primitives, semantic tokens, and component tokens — with three product themes",
  "A Figma component library covering all priority categories, each component with  different versions, states, and documentation",
  "A coded component library that matches the Figma source exactly",
  "Documentation covering usage, accessibility and guidelines",
  "A process for requests, reviews and versioning",
];

const outcomeImpact = [
  "Developers and QA reported spending up to 30% less time addressing mismatched styles and specifications. Inconsistencies that had only surfaced during review or QA were now identified at the design stage.",
  "Product managers could prototype with real components, so concepts looked like the actual product from day one",
  "As a designer, I reduced the time it took to design new features by up to 90% by assembling them from components instead of designing them from scratch",
  "The system became the reference for \"how we build things here.\" New team members can read it instead of reverse-engineering decisions from code.",
];

const proudOf = [
  "Built a system that scales. Getting three products with distinct visual identities onto one shared library, without forking anything, was the hardest part — and it held up. Each product team could apply its brand without touching component code.",
  "Teams trusted the governance. Busy product teams participated because the process was easy and produced results after one quarter.",
  "We treated documentation as a design artifact. Including the \"why\" in every component's documentation increased trust from the product team.",
];

const doDifferently = [
  "Apply AI-powered tools from the start. Manual batch operations don't scale and allow errors to slip through.",
  "Use metrics for adoption early on. Tracking component usage, override frequency, and contribution activity would have made the system's value visible to leadership.",
  "Involve developers earlier. Some naming decisions that seemed logical in Figma caused problems in the code.  The codebase already uses established naming conventions inspired by popular frameworks.",
];

const nextSteps = [
  "Extend the system to support future B2B products without requiring customization for each product",
  "Set up a visual catalog with production components (e.g., Storybook)",
  "Run regular retros with product teams to surface friction points and keep the system from going stale.",
];

/* ── Local sub-components ──────────────────────────────── */

function CalloutBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl bg-card card-shadow p-5 sm:p-6 flex flex-col gap-3 my-2 border-l-[3px] border-foreground/20">
      {children}
    </div>
  );
}

function PrincipleCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl bg-card card-shadow p-5 flex flex-col gap-1">
      <p style={{ fontSize: fluidH3, lineHeight: 1.5 }}>
        <strong>{title}</strong>
      </p>
      <p
        className="text-foreground/70"
        style={{ fontSize: "0.875rem", lineHeight: 1.6 }}
      >
        {nbsp(description)}
      </p>
    </div>
  );
}

function DataTable({
  headers,
  rows,
  mono,
}: {
  headers: string[];
  rows: string[][];
  mono?: number[];
}) {
  return (
    <div className="overflow-x-hidden sm:overflow-x-auto -mx-4 sm:mx-0">
      <table
        className="w-full min-w-0 table-fixed"
        style={{ fontSize: "0.875rem", lineHeight: 1.4 }}
      >
        <thead>
          <tr className="border-b border-border/60">
            {headers.map((h) => (
              <th
                key={h}
                className="text-left text-muted-foreground tracking-wide uppercase py-3 pr-4 break-words whitespace-normal"
                style={{ fontSize: "0.75rem" }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-border">
              {row.map((cell, j) => (
                <td
                  key={j}
                  className={`py-3 pr-4 ${j === 0 ? "text-foreground" : "text-foreground/80"} break-words whitespace-normal`}
                  style={
                    mono?.includes(j)
                      ? { fontFamily: "monospace", fontSize: "0.75rem" }
                      : undefined
                  }
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ── Page ─────────────────────────────────────────────── */

export function DesignSystemPage() {
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
            Building a scalable design system for three B2B products from scratch
          </h1>
          <p
            className="text-muted-foreground"
            style={{ fontSize: fluidBase, lineHeight: 1.5 }}
          >
            {nbsp("I built Yesim's B2B design system from scratch — a shared foundation for three products with different visual identities but the same codebase.")}
          </p>
        </div>
      </SectionAnimate>

      {/* Hero image */}
      <SectionAnimate delay={0.08}>
        <div className="-mx-4 sm:mx-0">
          <ImageWithFallback
            src={heroImage}
            alt="Design system overview — components, tokens, and theme variations side by side"
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

      {/* Confidentiality note */}
      <SectionAnimate delay={0.11}>
        <CalloutBox>
          <p
            className="text-muted-foreground"
            style={{
              fontSize: fluidSmall,
              fontWeight: 500,
              lineHeight: 1.65,
              fontStyle: "italic",
            }}
          >
            {nbsp("Note: Some details have been generalized to respect confidentiality. Product names, internal metrics, and sensitive business logic are omitted or abstracted.")}
          </p>
        </CalloutBox>
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
          <div className="flex flex-col gap-4">
            <p
              className="text-foreground/80"
              style={{ fontSize: fluidBase, lineHeight: 1.75 }}
            >
              {nbsp("Yesim is a global eSIM platform used by over 3 million customers. Alongside its consumer app, Yesim runs several B2B products: web apps, an API integration, and white-label solutions. All of them share the same tech stack and component patterns.")}
            </p>
            <p
              className="text-foreground/80"
              style={{ fontSize: fluidBase, lineHeight: 1.75 }}
            >
              {nbsp("When I joined the Partners product team, these products were growing independently. Each had its own UI patterns, colour schemes and legacy implementations. It was fine with two products, but with three it became a real problem. Even small changes can slow things down and turn design reviews into a negotiation instead of a quick reference check.")}
            </p>
            <p
              className="text-foreground/80"
              style={{ fontSize: fluidBase, lineHeight: 1.75 }}
            >
              {nbsp("I led the design of Yesim's B2B products from the start, including the shared design system. The goal was a basic structure — variables, naming rules, core components — so the team could go from brief to shipped in days rather than weeks. The system also needed to support theming: letting each product apply its own visual identity through variable modes without touching component code.")}
            </p>
          </div>
        </div>
      </SectionAnimate>

      {/* Context image */}
      <SectionAnimate delay={0.145}>
        <div className="-mx-4 sm:mx-0">
          <ImageWithFallback
            src={beforeAfterImage}
            alt="Before/after UI audit — three products with inconsistent components vs. unified system output"
            className="w-full rounded-none sm:rounded-xl"
          />
        </div>
      </SectionAnimate>

      {/* Problem & Goals */}
      <SectionAnimate delay={0.16}>
        <div className="flex flex-col" style={{ gap: innerGap }}>
          <SectionHeading>Problem &amp; Goals</SectionHeading>
          <p
            className="text-foreground/80"
            style={{ fontSize: fluidBase, lineHeight: 1.75 }}
          >
            {nbsp("The main challenge was finding the right balance between consistency and flexibility. We needed a shared component library that felt unified — the same interaction patterns, the same accessibility standards, the same quality — but looked different enough per product to support distinct brand identities (similar to sub-brands under one umbrella).")}
          </p>
          <CalloutBox>
            <p style={{ fontSize: fluidBase, fontWeight: 500, lineHeight: 1.65, fontStyle: "italic" }}>
              {nbsp("How do we build one design system that underpins three (and eventually more) products with different visual identities — without needing a dedicated person to keep it running?")}
            </p>
          </CalloutBox>
          <div className="flex flex-col gap-2">
            <p style={{ fontSize: fluidBase, lineHeight: 1.75 }}>
              <strong>Success metrics:</strong>
            </p>
            <ul className="flex flex-col gap-2 pl-5 list-disc">
              {successMetrics.map((m, i) => (
                <li
                  key={i}
                  className="text-foreground/80"
                  style={{ fontSize: fluidBase, lineHeight: 1.6 }}
                >
                  {nbsp(m)}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-2">
            <p style={{ fontSize: fluidBase, lineHeight: 1.75 }}>
              <strong>Constraints:</strong>
            </p>
            <ul className="flex flex-col gap-2 pl-5 list-disc">
              {constraints.map((c, i) => (
                <li
                  key={i}
                  className="text-foreground/80"
                  style={{ fontSize: fluidBase, lineHeight: 1.6 }}
                >
                  {nbsp(c)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SectionAnimate>

      {/* System Goals & Principles */}
      <SectionAnimate delay={0.18}>
        <div className="flex flex-col" style={{ gap: innerGap }}>
          <SectionHeading>System Goals &amp; Principles</SectionHeading>
          <p
            className="text-foreground/80"
            style={{ fontSize: fluidBase, lineHeight: 1.75 }}
          >
            {nbsp("Before I started building, I wrote down a set of principles to guide decisions.")}
          </p>
          <div className="flex flex-col gap-3">
            {principles.map((p) => (
              <PrincipleCard
                key={p.title}
                title={p.title}
                description={p.description}
              />
            ))}
          </div>
        </div>
      </SectionAnimate>

      {/* Architecture */}
      <SectionAnimate delay={0.2}>
        <div className="flex flex-col" style={{ gap: sectionGap }}>
          <div className="flex flex-col" style={{ gap: innerGap }}>
            <SectionHeading>Architecture</SectionHeading>
            <h3 style={{ fontSize: fluidH3, lineHeight: 1.5 }}>
              <strong>Token strategy</strong>
            </h3>
            <p
              className="text-foreground/80"
              style={{ fontSize: fluidBase, lineHeight: 1.75 }}
            >
              {nbsp("The token architecture has three layers: raw values, primitives and semantic tokens. This layered approach is what makes theming possible: if you swap a product's theme, you only override the semantic tokens, while the primitives and the component structure stay the same.")}
            </p>
            <DataTable
              headers={["Layer", "Purpose", "Example", "Themeable?"]}
              rows={tokenLayers.map((t) => [
                t.layer,
                t.purpose,
                t.example,
                t.themeable,
              ])}
              mono={[2]}
            />
          </div>

          {/* Token image */}
          <div className="-mx-4 sm:mx-0">
            <ImageWithFallback
              src={semanticsImage}
              alt="Token and theming model — three-layer diagram showing primitives → semantics → component tokens"
              className="w-full rounded-none sm:rounded-xl"
            />
          </div>

          {/* Theming for sub-brands */}
          <div className="flex flex-col" style={{ gap: innerGap }}>
            <h3 style={{ fontSize: fluidH3, lineHeight: 1.5 }}>
              <strong>Theming for sub-brands</strong>
            </h3>
            <p
              className="text-foreground/80"
              style={{ fontSize: fluidBase, lineHeight: 1.75 }}
            >
              {nbsp("Each B2B product has a theme file that overrides semantic tokens. The component library itself doesn't care about the product — it only uses semantic tokens. If you switch from \"Product A\" to \"Product B\", you only need to change one theme configuration, not rebuild components.")}
            </p>
            <DataTable
              headers={["Token", "Product A", "Product B", "Product C"]}
              rows={subBrandThemes.map((t) => [
                t.token,
                t.productA,
                t.productB,
                t.productC,
              ])}
              mono={[0]}
            />

          </div>

          {/* Sub-brand themes image */}
          <div className="-mx-4 sm:mx-0">
            <ImageWithFallback
              src={subBrandsImage}
              alt="Sub-brand themes comparison — same component rendered in three product themes side by side"
              className="w-full rounded-none sm:rounded-xl"
            />
          </div>

          {/* Naming conventions */}
          <div className="flex flex-col" style={{ gap: innerGap }}>
            <h3 style={{ fontSize: fluidH3, lineHeight: 1.5 }}>
              <strong>Naming conventions</strong>
            </h3>
            <p
              className="text-foreground/80"
              style={{ fontSize: fluidBase, lineHeight: 1.75 }}
            >
              {nbsp("I created a function-first naming convention. Tokens are named by what they do, not what they look like.")}{" "}
              <code className="px-1.5 py-0.5 rounded bg-secondary text-foreground/80" style={{ fontSize: "0.75rem" }}>
                color-fg-secondary
              </code>{" "}
              {nbsp("tells you it's a secondary foreground color — no need to look up the hex. It means the same thing to a designer in Figma and a developer in code.")}
            </p>
          </div>
        </div>
      </SectionAnimate>

      {/* Component Library */}
      <SectionAnimate delay={0.22}>
        <div className="flex flex-col" style={{ gap: innerGap }}>
          <SectionHeading>Component Library</SectionHeading>
          <p
            className="text-foreground/80"
            style={{ fontSize: fluidBase, lineHeight: 1.75 }}
          >
            {nbsp("The component library was designed with B2B usage patterns in mind. While consumer apps focus on carousels and hero sections, B2B products rely on dense data tables, complex forms, and permission-aware states. For that reason, extending the consumer library wasn't a viable option.")}
          </p>
          <h3 style={{ fontSize: fluidH3, lineHeight: 1.5 }}>
            <strong>Priority components (Phase 1)</strong>
          </h3>
          <DataTable
            headers={["Category", "Components", "Why first"]}
            rows={priorityComponents.map((p) => [
              p.category,
              p.components,
              p.why,
            ])}
          />
          <p
            className="text-muted-foreground"
            style={{
              fontSize: "0.75rem",
              lineHeight: 1.3,
              fontStyle: "italic",
            }}
          >
            Exact component list may differ from what was shipped.
          </p>
        </div>
      </SectionAnimate>

      {/* Handling density */}
      <SectionAnimate delay={0.23}>
        <div className="flex flex-col" style={{ gap: innerGap }}>
          <h3 style={{ fontSize: fluidH3, lineHeight: 1.5 }}>
            <strong>Handling density</strong>
          </h3>
          <p
            className="text-foreground/80"
            style={{ fontSize: fluidBase, lineHeight: 1.75 }}
          >
            {nbsp("B2B users work with dense information layouts. I built density as a system-level token — components respond to a density setting (default, compact, spacious) without requiring separate variants. In \"compact\" mode, a table will tighten the padding and reduce the height of each row. The component API will stay the same.")}
          </p>
        </div>
      </SectionAnimate>

      {/* Process */}
      <SectionAnimate delay={0.24}>
        <div className="flex flex-col" style={{ gap: innerGap }}>
          <SectionHeading>Process</SectionHeading>
          <div className="flex flex-col gap-4">
            <p
              className="text-foreground/80"
              style={{ fontSize: fluidBase, lineHeight: 1.75 }}
            >
              {nbsp("I started with an audit. Before designing a single component, I listed every unique UI element across all three products. This included buttons in five different styles, three different table implementations, and form fields that looked similar but behaved differently. The audit made the problem clear to stakeholders and showed why a shared system was worth investing in.")}
            </p>
            <p
              className="text-foreground/80"
              style={{ fontSize: fluidBase, lineHeight: 1.75 }}
            >
              {nbsp("From the audit, I created the token architecture and a prioritized component roadmap. The idea was to ship the components that eliminated the most inconsistency first. Tables and forms were the most important because they appeared on every product's most-visited pages.")}
            </p>
            <p
              className="text-foreground/80"
              style={{ fontSize: fluidBase, lineHeight: 1.75 }}
            >
              {nbsp("Here's how we did it: first, we checked existing implementations; then, we defined the API (props, variants, states); next, we designed in Figma with tokens; then, we reviewed with the product teams; finally, we built and validated in code and documented everything. The Figma library and the code library were kept the same. A component wasn't \"done\" until it existed in both and had documentation.")}
            </p>
          </div>
        </div>
      </SectionAnimate>

      {/* Documentation & Governance */}
      <SectionAnimate delay={0.26}>
        <div className="flex flex-col" style={{ gap: sectionGap }}>
          <div className="flex flex-col" style={{ gap: innerGap }}>
            <SectionHeading>Documentation &amp; Governance</SectionHeading>
            <h3 style={{ fontSize: fluidH3, lineHeight: 1.5 }}>
              <strong>Documentation approach</strong>
            </h3>
            <p
              className="text-foreground/80"
              style={{ fontSize: fluidBase, lineHeight: 1.75 }}
            >
              {nbsp("Each component has a documentation page that includes a live preview, a prop/variant table, usage guidelines (including when to use and when not to use), accessibility notes and a changelog.")}
            </p>
          </div>

          {/* Documentation image */}
          <SectionAnimate delay={0.225}>
            <div className="-mx-4 sm:mx-0">
              <ImageWithFallback
                src={specsImage}
                alt="Component anatomy — button dissected with token labels mapped to visual properties"
                className="w-full rounded-none sm:rounded-xl"
              />
            </div>
          </SectionAnimate>

          {/* Contribution and governance model */}
          <div className="flex flex-col" style={{ gap: innerGap }}>
            <h3 style={{ fontSize: fluidH3, lineHeight: 1.5 }}>
              <strong>Contribution and governance model</strong>
            </h3>
            <p
              className="text-foreground/80"
              style={{ fontSize: fluidBase, lineHeight: 1.75 }}
            >
              {nbsp("I designed a lightweight governance process to balance speed with quality:")}
            </p>
            <ul className="flex flex-col gap-2 pl-5 list-disc">
              {governanceSteps.map((s, i) => (
                <li
                  key={i}
                  className="text-foreground/80"
                  style={{ fontSize: fluidBase, lineHeight: 1.6 }}
                >
                  {nbsp(s)}
                </li>
              ))}
            </ul>
          </div>

          {/* Governance image */}
          <div className="-mx-4 sm:mx-0">
            <ImageWithFallback
              src={governanceImage}
              alt="Governance workflow diagram — one team submits requests, the design system team processes and ships components, and two product teams consume them"
              className="w-full rounded-none sm:rounded-xl"
            />
          </div>
        </div>
      </SectionAnimate>

      {/* Adoption Across Products */}
      <SectionAnimate delay={0.28}>
        <div className="flex flex-col" style={{ gap: sectionGap }}>
          <div className="flex flex-col" style={{ gap: innerGap }}>
            <SectionHeading>Adoption Across Products</SectionHeading>
            <p
              className="text-foreground/80"
              style={{ fontSize: fluidBase, lineHeight: 1.75 }}
            >
              {nbsp("If nobody uses a design system, it's just a Figma file. Adoption requires deliberate effort, not just a side effect.")}
            </p>
          </div>

          <div className="flex flex-col" style={{ gap: innerGap }}>
            <h3 style={{ fontSize: fluidH3, lineHeight: 1.5 }}>
              <strong>Migration strategy</strong>
            </h3>
            <p
              className="text-foreground/80"
              style={{ fontSize: fluidBase, lineHeight: 1.75 }}
            >
              {nbsp("Instead of mandating a full migration, I worked with each product team to identify high-impact, low-risk surfaces to migrate first \u2014 typically settings pages and list views. This approach proved the system's value without disrupting active feature work. As teams saw the time savings, adoption accelerated organically.")}
            </p>
          </div>

          <div className="flex flex-col" style={{ gap: innerGap }}>
            <h3 style={{ fontSize: fluidH3, lineHeight: 1.5 }}>
              <strong>Ensuring cross-product compatibility</strong>
            </h3>
            <ul className="flex flex-col gap-2 pl-5 list-disc">
              {crossProductChecks.map((c, i) => (
                <li
                  key={i}
                  className="text-foreground/80"
                  style={{ fontSize: fluidBase, lineHeight: 1.6 }}
                >
                  {nbsp(c)}
                </li>
              ))}
            </ul>
          </div>

          {/* Before/after image */}
          <div className="-mx-4 sm:mx-0">
            <ImageWithFallback
              src={prototypeImage}
              alt="Figma library connected to an AI-powered prototype tool — design system enabling rapid prototyping"
              className="w-full rounded-none sm:rounded-xl"
            />
          </div>
        </div>
      </SectionAnimate>

      {/* Outcome & Impact */}
      <SectionAnimate delay={0.32}>
        <div className="flex flex-col" style={{ gap: innerGap }}>
          <SectionHeading>Outcome &amp; Impact</SectionHeading>
          <div className="flex flex-col gap-2">
            <p style={{ fontSize: fluidBase, lineHeight: 1.75 }}>
              <strong>What was delivered:</strong>
            </p>
            <ul className="flex flex-col gap-2 pl-5 list-disc">
              {outcomeDelivered.map((item, i) => (
                <li
                  key={i}
                  className="text-foreground/80"
                  style={{ fontSize: fluidBase, lineHeight: 1.6 }}
                >
                  {nbsp(item)}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-2">
            <p style={{ fontSize: fluidBase, lineHeight: 1.75 }}>
              <strong>Impact on the organization:</strong>
            </p>
            <ul className="flex flex-col gap-2 pl-5 list-disc">
              {outcomeImpact.map((item, i) => (
                <li
                  key={i}
                  className="text-foreground/80"
                  style={{ fontSize: fluidBase, lineHeight: 1.7 }}
                >
                  {nbsp(item)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SectionAnimate>

      {/* What I'm Proud Of */}
      <SectionAnimate delay={0.34}>
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

      {/* What I'd Do Differently */}
      <SectionAnimate delay={0.36}>
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

      {/* Next Steps */}
      <SectionAnimate delay={0.38}>
        <div className="flex flex-col" style={{ gap: innerGap }}>
          <SectionHeading>Next Steps</SectionHeading>
          <ul className="flex flex-col gap-2 pl-5 list-disc">
            {nextSteps.map((item, i) => (
              <li
                key={i}
                className="text-foreground/80"
                style={{ fontSize: fluidBase, lineHeight: 1.7 }}
              >
                {nbsp(item)}
              </li>
            ))}
          </ul>
        </div>
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