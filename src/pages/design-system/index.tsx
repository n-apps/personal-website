import { Link } from "react-router";
import { RiArrowLeftLine, RiArrowRightLine } from "@remixicon/react";
import { SectionAnimate } from "@/components/ui/section-animate";
import { nbsp } from "@/lib/nbsp";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";
import { fluidLead, fluidBase, fluidSmall, fluidH1, fluidH3, sectionGap, innerGap } from "@/lib/typography";
import { SectionHeading, BoldLead, PullQuote } from "@/components/case-study/case-study-components";

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
  { label: "Timeframe", value: "Sep \u2013 Dec 2025" },
  { label: "Platform", value: "Web (B2B products)" },
  { label: "Team", value: "Developer, PM, UX/UI Designer (myself)" },
];

const impactStats = [
  { value: "48", label: "Components" },
  { value: "140+", label: "Design tokens" },
  { value: "3", label: "Brand themes" },
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
  },
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

const whatWorked = [
  "Built a system that scales. Getting three products with distinct visual identities onto one shared library, without forking anything, was the hardest part. It held up.",
  "Teams trusted the governance. Busy product teams participated because the process was easy and produced results after one quarter.",
  "We treated documentation as a design artifact. Including the \u201cwhy\u201d in every component\u2019s documentation increased trust from the product team.",
];

const whatIdChange = [
  "Apply AI-powered tools from the start. Manual batch operations don\u2019t scale and allow errors to slip through.",
  "Use metrics for adoption early on. Tracking component usage, override frequency, and contribution activity would have made the system\u2019s value visible to leadership.",
  "Involve developers earlier. Some naming decisions that seemed logical in Figma caused problems in the code.",
];

/* ── Local sub-components ──────────────────────────────── */

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
          <RiArrowLeftLine size={16} />
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
            Building a scalable design system for three B2B products from scratch
          </h1>
          <p
            className="text-muted-foreground"
            style={{ fontSize: fluidLead, lineHeight: 1.5 }}
          >
            {nbsp("I designed a shared design system for 3 B2B products, reducing feature design time by up to 90% and cutting style-related QA issues by 30%.")}
          </p>
        </div>
      </SectionAnimate>

      <SectionAnimate delay={0.08}>
        <div className="-mx-4 sm:mx-0">
          <ImageWithFallback
            src={heroImage}
            alt="Design system overview \u2014 components, tokens, and theme variations side by side"
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

      {/* ── 2. Context & Challenge ─────────────────────── */}
      <SectionAnimate delay={0.12}>
        <div className="flex flex-col" style={{ gap: innerGap }}>
          <SectionHeading>Context &amp; Challenge</SectionHeading>
          <p
            className="text-foreground/80"
            style={{ fontSize: fluidBase, lineHeight: 1.75 }}
          >
            {nbsp("Yesim is a global eSIM platform with over 3\u00a0million customers and several B2B web products sharing the same tech stack. When I joined, three products were growing independently, each with its own UI patterns, colour schemes, and legacy implementations. Even small changes slowed things down, and design reviews became negotiations instead of quick reference checks.")}
          </p>
          <PullQuote>
            {nbsp("How do we build one design system that underpins three (and eventually more) products with different visual identities, without needing a dedicated person to keep it running?")}
          </PullQuote>
        </div>
      </SectionAnimate>

      <SectionAnimate delay={0.14}>
        <div className="-mx-4 sm:mx-0">
          <ImageWithFallback
            src={beforeAfterImage}
            alt="Before/after UI audit \u2014 three products with inconsistent components vs. unified system output"
            className="w-full rounded-none sm:rounded-xl"
          />
        </div>
      </SectionAnimate>

      {/* ── 3. Key Decisions ───────────────────────────── */}
      <SectionAnimate delay={0.16}>
        <div className="flex flex-col" style={{ gap: sectionGap }}>
          {/* Decision 1: Token architecture */}
          <div className="flex flex-col" style={{ gap: innerGap }}>
            <SectionHeading>Key Decisions</SectionHeading>
            <h3 style={{ fontSize: fluidH3, fontWeight: 600, lineHeight: 1.3, letterSpacing: "-0.005em" }}>
              Three-layer token architecture
            </h3>
            <p
              className="text-foreground/80"
              style={{ fontSize: fluidBase, lineHeight: 1.75 }}
            >
              {nbsp("I chose a three-layer token architecture (raw values \u2192 primitives \u2192 semantic tokens) so products could re-skin without forking components. Swap a product\u2019s theme and you only override the semantic tokens. Primitives and component structure stay the same.")}
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

          <div className="-mx-4 sm:mx-0">
            <ImageWithFallback
              src={semanticsImage}
              alt="Token and theming model \u2014 three-layer diagram showing primitives \u2192 semantics \u2192 component tokens"
              className="w-full rounded-none sm:rounded-xl"
            />
          </div>

          {/* Decision 2: One library, three themes */}
          <div className="flex flex-col" style={{ gap: innerGap }}>
            <h3 style={{ fontSize: fluidH3, fontWeight: 600, lineHeight: 1.3, letterSpacing: "-0.005em" }}>
              One library, three themes
            </h3>
            <p
              className="text-foreground/80"
              style={{ fontSize: fluidBase, lineHeight: 1.75 }}
            >
              {nbsp("Each product gets a theme file that overrides semantic tokens. The component library doesn\u2019t care about the product. Switch themes by changing one configuration, not rebuilding components.")}
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

          <div className="-mx-4 sm:mx-0">
            <ImageWithFallback
              src={subBrandsImage}
              alt="Sub-brand themes comparison \u2014 same component rendered in three product themes side by side"
              className="w-full rounded-none sm:rounded-xl"
            />
          </div>

          {/* Decision 3: B2B-first component priorities */}
          <div className="flex flex-col" style={{ gap: innerGap }}>
            <h3 style={{ fontSize: fluidH3, fontWeight: 600, lineHeight: 1.3, letterSpacing: "-0.005em" }}>
              B2B-first component priorities
            </h3>
            <p
              className="text-foreground/80"
              style={{ fontSize: fluidBase, lineHeight: 1.75 }}
            >
              {nbsp("I audited every UI element across all three products \u2014 buttons in five styles, three table implementations, form fields that looked similar but behaved differently \u2014 then used the results to build a prioritized roadmap. Tables and forms came first because they appeared on every product\u2019s most-visited pages.")}
            </p>
            <DataTable
              headers={["Category", "Components", "Why first"]}
              rows={priorityComponents.map((p) => [
                p.category,
                p.components,
                p.why,
              ])}
            />
            <p
              className="text-foreground/80"
              style={{ fontSize: fluidBase, lineHeight: 1.75 }}
            >
              {nbsp("Density is a system-level token \u2014 components respond to a density setting (default, compact, spacious) without separate variants. And tokens are named by function, not appearance:")}{" "}
              <code className="px-1.5 py-0.5 rounded bg-secondary text-foreground/80" style={{ fontSize: "0.75rem" }}>
                color-fg-secondary
              </code>{" "}
              {nbsp("tells you it\u2019s a secondary foreground color without looking up the hex.")}
            </p>
          </div>
        </div>
      </SectionAnimate>

      {/* ── 4. The System in Action ────────────────────── */}
      <SectionAnimate delay={0.2}>
        <div className="flex flex-col" style={{ gap: sectionGap }}>
          <div className="flex flex-col" style={{ gap: innerGap }}>
            <SectionHeading>The System in Action</SectionHeading>
            <p
              className="text-foreground/80"
              style={{ fontSize: fluidBase, lineHeight: 1.75 }}
            >
              {nbsp("Each component includes a live preview, prop/variant table, usage guidelines (when to use and when not to), accessibility notes, and a changelog.")}
            </p>
          </div>

          <div className="-mx-4 sm:mx-0">
            <ImageWithFallback
              src={specsImage}
              alt="Component anatomy \u2014 button dissected with token labels mapped to visual properties"
              className="w-full rounded-none sm:rounded-xl"
            />
          </div>

          <div className="flex flex-col" style={{ gap: innerGap }}>
            <p
              className="text-foreground/80"
              style={{ fontSize: fluidBase, lineHeight: 1.75 }}
            >
              {nbsp("Product managers could prototype with real components, so concepts looked like the actual product from day one \u2014 not a rough wireframe that needed to be redesigned later.")}
            </p>
          </div>

          <div className="-mx-4 sm:mx-0">
            <ImageWithFallback
              src={prototypeImage}
              alt="Figma library connected to an AI-powered prototype tool \u2014 design system enabling rapid prototyping"
              className="w-full rounded-none sm:rounded-xl"
            />
          </div>
        </div>
      </SectionAnimate>

      {/* ── 5. Adoption & Impact ───────────────────────── */}
      <SectionAnimate delay={0.24}>
        <div className="flex flex-col" style={{ gap: sectionGap }}>
          <div className="flex flex-col" style={{ gap: innerGap }}>
            <SectionHeading>Adoption &amp; Impact</SectionHeading>
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
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
                    {s.value}
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
            <ul className="flex flex-col gap-3 pl-5 list-disc">
            <li
              className="text-foreground/80"
              style={{ fontSize: fluidBase, lineHeight: 1.7 }}
            >
              <strong>Up to 90% faster feature design:</strong>{" "}
              {nbsp("assembling from components instead of designing from scratch")}
            </li>
            <li
              className="text-foreground/80"
              style={{ fontSize: fluidBase, lineHeight: 1.7 }}
            >
              <strong>~30% less time on style-related QA:</strong>{" "}
              {nbsp("inconsistencies caught at the design stage, not in review")}
            </li>
            <li
              className="text-foreground/80"
              style={{ fontSize: fluidBase, lineHeight: 1.7 }}
            >
              <strong>Single source of truth:</strong>{" "}
              {nbsp("the system became the reference for \u201chow we build things here.\u201d New team members read it instead of reverse-engineering decisions from code.")}
            </li>
            </ul>
          </div>

          <div className="flex flex-col" style={{ gap: innerGap }}>
            <h3 style={{ fontSize: fluidH3, fontWeight: 600, lineHeight: 1.3, letterSpacing: "-0.005em" }}>
              Migration strategy
            </h3>
            <p
              className="text-foreground/80"
              style={{ fontSize: fluidBase, lineHeight: 1.75 }}
            >
              {nbsp("Instead of mandating a full migration, I worked with each product team to migrate high-impact, low-risk surfaces first \u2014 settings pages and list views. As teams saw the time savings, adoption accelerated organically.")}
            </p>
          </div>

          <div className="flex flex-col" style={{ gap: innerGap }}>
            <h3 style={{ fontSize: fluidH3, fontWeight: 600, lineHeight: 1.3, letterSpacing: "-0.005em" }}>
              Governance
            </h3>
            <p
              className="text-foreground/80"
              style={{ fontSize: fluidBase, lineHeight: 1.75 }}
            >
              {nbsp("To sustain adoption, I designed a lightweight governance process: teams submit component requests via Jira, I review and rank weekly, new components go through design review with at least one consuming team, then get built, documented, and shipped with semantic versioning. Every component was tested with all three product themes before release.")}
            </p>
          </div>

          <div className="-mx-4 sm:mx-0">
            <ImageWithFallback
              src={governanceImage}
              alt="Governance workflow diagram \u2014 one team submits requests, the design system team processes and ships components, and two product teams consume them"
              className="w-full rounded-none sm:rounded-xl"
            />
          </div>
        </div>
      </SectionAnimate>

      {/* ── 6. Reflection ──────────────────────────────── */}
      <SectionAnimate delay={0.28}>
        <div className="flex flex-col" style={{ gap: innerGap }}>
          <SectionHeading>Reflection</SectionHeading>
          <div className="flex flex-col gap-2">
            <p style={{ fontSize: fluidBase, lineHeight: 1.75 }}>
              <strong>What worked:</strong>
            </p>
            <ul className="flex flex-col gap-3 pl-5 list-disc">
              {whatWorked.map((item, i) => (
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
          <div className="flex flex-col gap-2">
            <p style={{ fontSize: fluidBase, lineHeight: 1.75 }}>
              <strong>What I'd change:</strong>
            </p>
            <ul className="flex flex-col gap-3 pl-5 list-disc">
              {whatIdChange.map((item, i) => (
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
        </div>
      </SectionAnimate>

      {/* Bottom back link */}
      <SectionAnimate delay={0.32}>
        <div className="flex items-center justify-between">
          <Link
            to="/"
            data-goatcounter-click="back-to-home-bottom"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            style={{ fontSize: fluidSmall, lineHeight: 1 }}
          >
            <RiArrowLeftLine size={16} />
            Back to Home Page
          </Link>
          <Link
            to="/work/white-label-esim"
            data-goatcounter-click="next-case-study"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            style={{ fontSize: fluidSmall, lineHeight: 1 }}
          >
            Next Case Study
            <RiArrowRightLine size={16} />
          </Link>
        </div>
      </SectionAnimate>
    </div>
  );
}
