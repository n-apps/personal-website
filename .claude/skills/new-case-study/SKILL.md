---
name: new-case-study
description: Scaffold a new case-study page following this portfolio's conventions. Use when the user asks to "add a case study", "create a new case study", or "scaffold a /work/ page". Creates the page file, updates routes.ts, and lists required image assets.
disable-model-invocation: true
---

# New Case Study Scaffold

Conventions in this codebase (do not deviate):

- Page lives at `src/pages/<slug>/index.tsx` and exports `<PascalName>Page`
- Route `work/<slug>` is registered in `src/app/routes.ts` with `React.lazy()`
- Cover image: `public/images/<slug>-cover.png`; hero: `public/images/<slug>-hero.png`
- Sub-routes get their own subfolder: `src/pages/<slug>/<sub>/index.tsx` plus optional `layout.tsx`
- Shared case-study primitives live in `src/components/case-study/case-study-components.tsx` — import `SectionHeading`, `BoldLead`, `PullQuote`, `ImagePlaceholder`
- Typography helpers from `@/lib/typography`: `fluidH1`, `fluidH2`, `fluidH3`, `fluidLead`, `fluidBase`, `fluidSmall`, `sectionGap`, `innerGap`
- Use `nbsp()` from `@/lib/nbsp` to keep prepositions/short words attached
- Animations: `motion/react` + `SectionAnimate` from `@/components/ui/section-animate`
- Track interactive elements with `data-goatcounter-click="<slug>-<action>"`

## Steps

1. Ask the user for: slug (kebab-case), display title, role, timeframe, platform, team
2. Create `src/pages/<slug>/index.tsx` using the template below
3. Add the `lazy()` import + route entry in `src/app/routes.ts`
4. Print the image-asset checklist for the user to drop into `public/images/`
5. If the case study should appear on the home page, ask before adding the link

## Page template

```tsx
import { Link } from "react-router";
import { RiArrowLeftLine } from "@remixicon/react";
import { SectionAnimate } from "@/components/ui/section-animate";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";
import { nbsp } from "@/lib/nbsp";
import { fluidH1, fluidLead, sectionGap, innerGap } from "@/lib/typography";
import { SectionHeading, BoldLead } from "@/components/case-study/case-study-components";

const heroImage = "/images/<slug>-hero.png";

const metadata = [
  { label: "Role", value: "<Role>" },
  { label: "Timeframe", value: "<Year> – <Year>" },
  { label: "Platform", value: "<Platform>" },
  { label: "Team", value: "<Team>" },
];

export function <PascalName>Page() {
  return (
    <article className="flex flex-col" style={{ gap: sectionGap }}>
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-muted-foreground"
        data-goatcounter-click="<slug>-back-home"
      >
        <RiArrowLeftLine size={16} aria-hidden /> Back home
      </Link>

      <header className="flex flex-col" style={{ gap: innerGap }}>
        <h1 style={{ fontSize: fluidH1, lineHeight: 1.1 }}>
          {nbsp("<Display title>")}
        </h1>
        <p
          className="text-muted-foreground"
          style={{ fontSize: fluidLead, lineHeight: 1.4 }}
        >
          {nbsp("<One-line tagline.>")}
        </p>
      </header>

      <SectionAnimate>
        <ImageWithFallback
          src={heroImage}
          alt="<Alt text>"
          className="w-full rounded-xl"
        />
      </SectionAnimate>

      {/* Compose sections using SectionHeading + BoldLead + PullQuote */}
    </article>
  );
}
```

## Routes update

In `src/app/routes.ts`, add the lazy import next to the other case-study imports:

```ts
const <PascalName>Page = lazy(() =>
  import("@/pages/<slug>").then((m) => ({ default: m.<PascalName>Page }))
);
```

Add the route inside the root route's `children` array, alongside other `work/...` entries:

```ts
{ path: "work/<slug>", Component: <PascalName>Page },
```

## Image checklist

Tell the user to drop these files into `public/images/`:

- `<slug>-cover.png` — used in home grid (~1200 × 800)
- `<slug>-hero.png` — top of case study (~1600 × 900)
- Inline figures referenced from the page (one per section)

The PreToolUse hook blocks Claude from writing to `public/images/`, so the user copies images manually.
