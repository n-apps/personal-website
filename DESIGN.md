---
name: Roma Shuliatiev Portfolio
description: An understated, evidence-led product-design portfolio. Near-monochrome, one warm-orange signal.
colors:
  bg-base: '#fafafa'
  bg-base-dark: '#111111'
  ink: '#0a0a0a'
  ink-dark: '#eeeeee'
  card-surface: '#ffffff'
  card-surface-dark: '#1a1a1a'
  surface-secondary: '#f2f2f2'
  surface-secondary-dark: '#222222'
  surface-muted: '#e9e9e9'
  surface-muted-dark: '#2d2d2d'
  ink-muted: '#626262'
  ink-muted-dark: '#828282'
  accent: '#c74002'
  accent-dark: '#f14f03'
  on-accent: '#ffffff'
  on-accent-dark: '#111111'
  success: '#28a323'
  success-dark: '#50c249'
  hairline: 'oklch(0 0 0 / 0.08)'
  hairline-dark: 'oklch(1 0 0 / 0.08)'
typography:
  name-display:
    fontFamily: 'Newsreader, Georgia, serif'
    fontStyle: 'italic (home) / roman (case studies)'
    fontSize: 'clamp(1.3235rem, 1.147rem + 0.88vw, 1.985rem)'
    fontWeight: 400
    lineHeight: '1.15–1.2'
    letterSpacing: '-0.02em to -0.025em'
  section-serif:
    fontFamily: 'Newsreader, Georgia, serif'
    fontSize: 'clamp(0.993rem, 0.926rem + 0.35vw, 1.103rem)'
    fontWeight: 500
  lead:
    fontFamily: 'OpenRunde, system-ui, -apple-system, sans-serif'
    fontSize: 'clamp(0.993rem, 0.926rem + 0.35vw, 1.103rem)'
    fontWeight: 400
    lineHeight: 1.55
  body:
    fontFamily: 'OpenRunde, system-ui, -apple-system, sans-serif'
    fontSize: 'clamp(0.875rem, 0.84rem + 0.2vw, 0.9375rem)'
    fontWeight: 400
    lineHeight: '1.5 (home) / 1.6 (case studies)'
    letterSpacing: '-0.011em'
  section-label:
    fontFamily: 'OpenRunde, system-ui, -apple-system, sans-serif'
    fontSize: 'clamp(0.875rem, 0.84rem + 0.2vw, 0.9375rem)'
    fontWeight: 500
    lineHeight: 1.2
  small:
    fontFamily: 'OpenRunde, system-ui, -apple-system, sans-serif'
    fontSize: 'clamp(0.72rem, 0.688rem + 0.13vw, 0.8825rem)'
    fontWeight: 400
    lineHeight: '1.4–1.5'
  mono:
    fontFamily: "ui-monospace, 'SFMono-Regular', Consolas, 'Liberation Mono', monospace"
    fontSize: '0.875em'
    fontWeight: 400
rounded:
  sm: '6px'
  md: '8px'
  lg: '10px'
  xl: '14px'
  full: '9999px'
spacing:
  inner: 'clamp(0.75rem, 0.7rem + 0.25vw, 1rem)'
  section: 'clamp(2.5rem, 2rem + 2.5vw, 4rem)'
  home-section: 'clamp(3rem, 2.5rem + 2.5vw, 5rem)'
  content-max: '576px'
  media-max: '1100px'
components:
  link-inline:
    textColor: '{colors.accent}'
    decoration: 'none at rest, underline on hover/focus'
  link-nav:
    textColor: '{colors.ink-muted}'
    hover: '{colors.ink}'
  card-work:
    backgroundColor: '{colors.card-surface}'
    rounded: '{rounded.xl}'
    padding: '16px / 20px at sm'
  button-pill:
    backgroundColor: '{colors.surface-secondary}'
    hover: '{colors.accent}'
    rounded: '{rounded.full}'
    minHeight: '44px'
  button-toggle:
    backgroundColor: 'transparent'
    textColor: '{colors.ink}'
    rounded: '{rounded.full}'
    size: '44px'
  code-inline:
    backgroundColor: '{colors.surface-secondary}'
    textColor: '{colors.ink}'
    typography: '{typography.mono}'
    rounded: '0.3em'
    padding: '0.2em 0.4em'
---

# Design System: Roma Shuliatiev Portfolio

Source of truth for tokens is `src/styles/theme.css` (colours, base type, utilities) and `src/lib/typography.ts` (fluid type and spacing). Hex values in this file are sRGB conversions of the oklch tokens there; if the two disagree, the CSS wins and this file should be updated.

## 1. Overview

**Creative North Star: "The Annotated Specimen"**

This is a designer-who-codes spec sheet, not a marketing site. Claims arrive next to the number, the artifact, or the working prototype that proves them. A near-monochrome grayscale carries almost the entire surface so the one warm-orange accent reads as a deliberate annotation, never decoration. The work, the metrics, and the prose do the talking; the chrome gets out of the way.

Content lives in a single 576px column (`max-w-xl`) inside the `Layout` grid, with fluid `clamp()` type and varied vertical rhythm. Case-study media breaks out of that column to a 1100px measure at ≥1024px (`.content-media`). Depth is flat by default: hairlines and 1px image outlines define edges. A faint 42px background grid, masked to fade at the top and bottom, sits behind the first screen.

This system explicitly rejects the loud-SaaS-landing reflex (gradient heroes, animated metric counters, feature-grid cards), the generic portfolio template, the Dribbble showpiece, and the over-animated site (scroll-jacking, parallax, motion that performs rather than serves).

**Key characteristics:**

- Near-monochrome neutrals; one warm-orange accent used on ≤10% of any screen.
- Type-led hierarchy: OpenRunde for everything functional, Newsreader for names, page titles and case-study section headings, system monospace for dates, hex values and code.
- Flat by default, defined by hairlines and 1px outlines.
- 576px reading column; case-study media at up to 1100px.
- One ease-out curve for entrances and state changes.
- Light/dark theme, system-aware, user-toggleable, persisted in `localStorage`.

## 2. Colors

A crisp grayscale with a single warm-orange signal. Neutrals are untinted; the accent is the only chromatic UI colour. (Project covers, case-study figures and the footer easter egg carry their own colour; they are content, not UI.)

### Accent

- **Accent** (`#c74002` light / `#f14f03` dark, `--accent`): The system's one voice. It is darker in light mode so text and fills hold contrast on the off-white field, and brighter in dark mode. Used for inline links, work-card titles on hover, the contact pills on hover/focus, and the pull-quote mark and rule.
- **On Accent** (`#ffffff` light / `#111111` dark): Text on accent fills.

### Neutral

- **Base Background** (`#fafafa` / `#111111`): The page field. Never pure white or pure black.
- **Ink** (`#0a0a0a` / `#eeeeee`): Primary text.
- **Ink Muted** (`#626262` / `#828282`): Secondary text, metadata, dates, captions, nav links at rest.
- **Card Surface** (`#ffffff` / `#1a1a1a`): Work cards, case-study callouts, coded figures.
- **Surface Secondary** (`#f2f2f2` / `#222222`): Inline code, contact pills at rest.
- **Surface Muted** (`#e9e9e9` / `#2d2d2d`): The faintest fill tier.
- **Hairline** (`oklch(0 0 0 / 0.08)` / `oklch(1 0 0 / 0.08)`): Borders and dividers. Image outlines use `--image-outline` at 0.1.

### Functional

- **Success** (`#28a323` / `#50c249`): Reserved for the pulsing "open to roles" dot.

### Named rules

**The One Voice Rule.** The accent appears on no more than ~10% of any screen and marks one kind of thing at a time. On the homepage it appears only on interaction (hover/focus); at rest the page is monochrome apart from the covers and the availability dot.

**The Clean Neutral Rule.** Neutrals stay true grayscale; do not tint them toward the accent. Keep the field off-pure.

## 3. Typography

**Sans:** OpenRunde, weights 400 and 500 only (`system-ui, -apple-system, sans-serif` fallback).
**Serif:** Newsreader, self-hosted variable (roman and italic).
**Mono:** the system monospace stack (`ui-monospace, SFMono-Regular, Consolas, Liberation Mono`). No webfont is loaded for mono.

Most page type is set inline from the tokens in `src/lib/typography.ts`; the `h1`–`h4` base styles in `theme.css` apply only where a page does not override them.

### Hierarchy

- **Name / page title** (`fluidH1`, 1.32–1.99rem, 400): Newsreader. Italic for the name on the homepage, roman for case-study titles. One per page.
- **Case-study section heading** (`fluidLead`, 500): Newsreader roman.
- **Lead** (`fluidLead`, 400, lh 1.55): The case-study intro under the title, max 34rem.
- **Body** (`fluidBase`, 0.875–0.94rem, 400): lh 1.5 on the homepage, 1.6 and `foreground/80` in case studies. `text-wrap: pretty`.
- **Section label** (`fluidBase`, 500, lh 1.2): Homepage section titles ("Selected work", "Work experience", "Get in touch") and case-study subheadings. Same size as body; hierarchy comes from weight and space, not scale.
- **Small** (`fluidSmall`, 0.72–0.88rem): Captions, metadata, footer, experience descriptions.
- **Mono** (`0.875em` or `fluidSmall`): Inline code, experience dates (tabular), hex values in figures, case-study stat values.

### Named rules

**The Two-Weight Rule.** OpenRunde ships in 400 and 500 only. Build hierarchy from size, colour, and the serif/sans contrast. (Known exception: case-study stat values use `font-mono font-semibold` in the system mono.)

**The Serif-for-Human Rule.** Newsreader is for the name, page titles, case-study section headings, project subtitles ("Yesim", "Android and iOS app") and pull quotes. It never sets functional UI or running body copy.

## 4. Elevation

Flat by default. Images carry a 1px inset outline (`outline: 1px solid var(--image-outline); outline-offset: -1px`), except inside `.card-shadow`, `.work-card` and `.phone-preview`.

### Shadow vocabulary

- **card-shadow** (`0 0 0 1px --shadow-border-1, 0 1px 2px -1px --shadow-border-2, 0 2px 4px 0 --shadow-border-3`): A hairline ring with a barely-there lift. Used for case-study callout cards.
- **Experience hover image** (`0 12px 32px oklch(0 0 0 / 0.18)`, 0.4 in dark): The one floating element on the homepage, so it carries the one real drop shadow.

### Named rules

**The Hairline Rule.** Reach for a hairline or the next tonal tier before a shadow. Work cards use a 1px border, not a shadow.

## 5. Components

### Buttons

- **Theme toggle:** 44px round transparent button with a 16px contrast icon in Ink. `whileTap` scale 0.96. Plays a short toggle sound (`src/lib/ui-sounds.ts`, volume 0.12).
- **Contact pills:** Surface Secondary pills, min-height 44px, with a trailing `↗` (external) or `↓` (CV download). Hover/focus fills them with the accent and nudges the arrow; active scales to 0.96. A 2×2 grid of equal-width pills below `sm`, a wrapping row from `sm` up.
- **Demo CTA (eSIM case study):** A dark full-width link card ("Working artifact / Open the live configurator") over a soft multicolour `GlowEffect`. It is the only filled CTA and the only glow on the site; keep it unique.

### Links

- **Inline (case studies):** Accent text, no underline at rest, underline on hover/focus.
- **Case-study navigation (Home / Next work):** Ink Muted, Ink on hover/focus, 44px hit area.
- **Work card title:** Ink at rest, Accent on card hover.

### Cards / containers

- **Work cards** (homepage): Card Surface, `rounded.xl`, 1px Hairline border that deepens to `muted-foreground/30` on hover. A 16:9 cover on top scales to 1.02 on hover (500ms ease-out). Padding 16px, 20px at `sm`. The first cover loads eagerly with high priority; the rest are lazy.
- **Callout cards** (case studies): Card Surface, `rounded.xl`, `card-shadow`, 20px padding, small uppercase muted label over a short sentence. Uppercase is limited to these labels and the demo CTA's eyebrow.

### Figures

- **CaseFigure / CaseVideo:** Edge-to-edge on mobile, `rounded.xl` from `sm`, breaking out to 1100px at ≥1024px. They require intrinsic width/height (and a poster for video). Figures are light-only exports, so `.case-media` dims them to `brightness(0.82)` in dark mode.
- **Coded figures:** When a figure explains logic, build it in code rather than exporting an image, so values are computed, theme-aware and readable by screen readers. Example: `src/pages/white-label-esim/contrast-figure.tsx` scores sample brand colours with the same contrast rule the prototype uses.

### Navigation

- A bare top bar: the `R—S` wordmark on the left, the theme toggle on the right. Fades down from `y: -10` over 0.4s on client renders; static on prerendered and reduced-motion visits. The wordmark is hidden on `/support`.

### Footer

- Three small muted dots, then a three-column row: Kyiv time (updates each minute while visible), current Kyiv weather with an icon (falls back to 🇺🇦), and a typewriter cycling "Ship fast. / Iterate. / Repeat." (static first phrase under reduced motion).

### Signature components

- **The `R—S` wordmark.** On hover/focus the em-dash widens (`1em → 1.8em`) and letter-spacing opens to `0.12em` (420ms, `cubic-bezier(.2,.7,.2,1)`).
- **Pulsing availability dot.** A 0.375em Success dot with an expanding ring (3s loop) before "Currently open for full-time roles". Off under reduced motion.
- **Experience hover image.** On desktop with a fine pointer, hovering a work-experience row shows a 224×280 photo that follows the cursor on a spring (stiffness 200, damping 30), flips left near the viewport edge, and fades in only once loaded. Decorative (`aria-hidden`); no keyboard equivalent.
- **Dashed divider.** A 1px dashed rule at `muted-foreground/30` between experience rows.
- **Pull quote.** Accent `RiDoubleQuotesL` mark over Newsreader body, with a 3px accent left rule. The only coloured vertical rule in the system.
- **Easter egg footer.** Fully hidden at rest (zero height, `inert`). Overscrolling past the bottom of a page (600px of wheel, 140px of touch) reveals a 200px hill scene with day/night variants and a pixel dog; clicking the dog shows a short bark message with a pop sound. Resets on route change.

## 6. Motion

- **Entrances:** `SectionAnimate` fades sections up from `y: 16` over 0.5s with `cubic-bezier(0.4, 0, 0.2, 1)`, staggered by small per-section delays. Prerendered pages run this in CSS on first paint; viewport-triggered reveals start after hydration and never replay on content that was already visible.
- **Page transitions:** `navigateWithTransition` slides a full-screen Ink panel across (300ms in, 300ms out). Used only for the jump into the eSIM demo.
- **Feedback:** Press scales of 0.96, hover colour changes of 200ms, card image zoom of 1.02.
- **Reduced motion:** Every animation above is disabled or made instant under `prefers-reduced-motion`; videos require an explicit Play.
- **Sound:** The theme toggle and the easter-egg dog play short UI sounds. Nothing else makes sound.

### Known exceptions

These ship today and do not follow the single-curve, feedback-only intent. Review them before adding more of the same: the spring on the experience hover image, the continuous typewriter and cursor blink in the footer, the multicolour glow behind the demo CTA, and the pulsing dot loop.

## 7. Do's and don'ts

### Do

- **Do** keep the accent to ≤10% of any screen, marking one kind of thing at a time.
- **Do** take colours and type from `theme.css` and `typography.ts`, not hard-coded values.
- **Do** build hierarchy from weight, space and the serif/sans contrast with OpenRunde 400/500.
- **Do** define edges with hairlines and 1px outlines before reaching for a shadow.
- **Do** hold running text to the 576px column and let only media break out to 1100px.
- **Do** gate every animation behind `prefers-reduced-motion`.
- **Do** check both themes for any new figure; build explanatory figures in code where possible.
- **Do** keep hit targets at 44px minimum.

### Don't

- **Don't** build a loud SaaS landing: no gradient heroes, animated metric counters, or feature-grid cards.
- **Don't** add another glowing or filled CTA; the eSIM demo button is the one exception.
- **Don't** ship mockups floating on gradients; every visual ties to a real problem and outcome.
- **Don't** add scroll-jacking, parallax, or bounce. Don't add new continuous ambient motion.
- **Don't** use a coloured `border-left`/`border-right` over 1px except on the pull quote.
- **Don't** use gradient text, decorative blur, or the big-number hero-metric template.
- **Don't** tint the neutrals toward the accent or add a second UI accent.
- **Don't** let a diagram contradict its copy. If the text describes a rule, the figure shows that rule.
