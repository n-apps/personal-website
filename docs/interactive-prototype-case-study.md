# Designing in code: an interactive prototype that replaced static mockups

**Summary:** I built a working prototype instead of a Figma file — and it surfaced constraints that static design tools hide. The result shipped closer to production than any mockup handoff could.

---

## Metadata

| Field | Value |
|---|---|
| Role | Product Designer |
| Timeframe | 2025–2026 |
| Platform | Web (B2B) |
| Team | Developer, PM, UX/UI Designer (myself) |
| Tools | Next.js, Tailwind CSS, TypeScript |

---

## Challenge

Yesim is a global eSIM platform with over 3 million customers. Among its B2B products is a brand customization tool — a screen where telecom operators upload their logo, pick brand colors, set contact details, and instantly see how their customers will experience a branded eSIM interface.

This kind of screen is deceptively hard to design statically. The preview depends on user input: brand colors affect text contrast, optional fields hide or reveal entire sections, file uploads change layouts. A Figma mockup can show one snapshot of that. It cannot show the system responding.

I had hit this wall before. On earlier projects, I would hand off polished static screens, only to watch developers re-discover problems during implementation — contrast failures on dark brand colors, empty states nobody thought to design, layout shifts when optional content appeared or disappeared. The mockup looked right. The built product didn't behave right.

> *How might we design a B2B customization experience where the design artifact itself captures the constraints that matter — not just the pixels?*

---

## Status Quo

The standard workflow was: design screens in Figma, annotate edge cases in comments, hand off, then spend review cycles catching things the static file couldn't express. For a feature like brand customization, that meant:

- **Color-dependent UI** — the operator picks a brand color, and all text on that background needs to stay readable. A mockup shows one color. The real product handles thousands.
- **Conditional sections** — the contact card only appears if the operator fills in at least one contact field. The promotion badge has a toggle. The footer is conditional. Static screens need a variant for each combination.
- **File uploads** — logos and banners change the layout. Aspect ratios vary. Fallbacks differ. You can annotate rules in Figma, but nobody reads annotations the way they read working software.

Every round of QA produced the same category of bug: things that worked in the mockup but broke under real input.

---

## Key Decisions

### Building the prototype in code, not Figma

I chose to design directly in Next.js and Tailwind CSS instead of producing static screens. This was not about skipping design — it was about designing in a medium that doesn't let you ignore interaction constraints.

When you design in Figma, you can place white text on a blue background and move on. When you design in code, the text is either readable or it isn't — and you have to write the logic that makes it readable for every color.

The trade-off: higher upfront effort, slower first iteration. The payoff: problems surfaced during design, not after handoff.

### Solving contrast at the system level

The prototype computes foreground text color from the operator's brand color using WCAG relative-luminance calculations. Light brand colors get dark text; dark brand colors get white text. This runs on every color change — no manual checking, no hoping the operator picks an accessible color.

In a static design, I would have noted "ensure contrast" in a comment. In the prototype, contrast is a function. It either passes or it doesn't.

### Conditional rendering as a design decision

Instead of creating 12 Figma variants to cover every toggle and optional-field combination, the prototype renders conditionally. The contact card appears when at least one contact field has content. The promotion badge respects its toggle. The footer shows only when relevant.

This means every combination is designed by definition — not because I remembered to create a variant for it, but because the rendering logic handles it.

### Real-time preview as the primary feedback loop

The screen is split: form on the left, live preview on the right. Every keystroke, color change, or file upload updates the preview instantly. Operators see their brand applied to a realistic mobile interface (with a desktop toggle) without saving or refreshing.

This made stakeholder reviews trivially fast. Instead of walking someone through annotated screens, I shared a URL. They typed, they saw.

---

## The Prototype in Action

The working prototype includes:

- **Live form-to-preview binding** — brand name, logo, color, banner, contact details, and policy links all update the preview as the operator types
- **Mobile and desktop preview modes** — toggle between an iPhone shell and a browser chrome mockup to see both experiences
- **Automatic contrast handling** — text color on brand backgrounds is derived from a luminance function, not hardcoded
- **File handling** — logo and banner uploads render immediately in-preview via data URLs, with clear/replace controls
- **Validation** — email format, URL structure, and brand alias sanitization happen inline, surfacing errors before save
- **Dirty-state tracking** — the form warns on navigation if there are unsaved changes, and save/reset operate per section
- **Loading states and transitions** — skeleton screens and CSS transitions give the preview realistic pacing

Every feature listed above would have been a comment or annotation in a static handoff. Here, it is working behavior that stakeholders can interact with.

---

## Impact

- **Zero contrast-related QA issues** — the luminance logic was validated during design, not discovered during review
- **Stakeholder alignment in one session** — PMs and partners tested the prototype directly instead of reviewing annotated screens across multiple rounds
- **Design-to-dev translation was near-zero** — the prototype used the same tech stack as production (Next.js, Tailwind), so the developer extended it rather than rebuilding from a mockup
- **Edge cases handled by default** — conditional rendering and validation logic meant every state combination was accounted for in the design artifact itself

---

## Reflection

**What worked:**

- **The medium enforced rigor.** Code doesn't let you hand-wave. Every state, every color, every conditional is either handled or it breaks. That discipline produced a better design than I would have reached in a static tool.
- **Stakeholders engaged differently.** When people can type into a prototype and see results, the feedback is about behavior — "what happens when I leave this blank?" — not about pixels. The conversations were more productive.
- **The prototype became the spec.** There was no separate document describing how the form and preview should interact. The prototype was the source of truth. The developer read the code, not a PDF.

**What I'd change:**

- **Pair with a developer from day one.** I built this solo, which worked for a focused feature but wouldn't scale. Having a developer in the room earlier would have caught architectural decisions I made as a designer that a developer would have structured differently.
- **Keep a lightweight Figma file for visual exploration.** Code is the wrong medium for early divergent thinking. I should have sketched in Figma first and moved to code once the direction was clear — not as a handoff, but as a transition.
- **Document the "why" alongside the code.** The prototype shows what happens, but not why it was designed that way. Adding lightweight decision records would have helped future team members understand the intent, not just the implementation.
