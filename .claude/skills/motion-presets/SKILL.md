---
name: motion-presets
description: Animation defaults used across this portfolio - viewport-trigger reveals, stagger timings, easing curves, and reduced-motion handling. Reference when adding any motion/react animation so new motion stays consistent with existing pages.
---

# Motion Presets

This portfolio uses `motion/react` (the Framer Motion port). Animations should feel calm and premium, never bouncy or attention-grabbing, and must respect `prefers-reduced-motion`.

## Default reveal

For any in-view block reveal, wrap the block in `SectionAnimate` from `@/components/ui/section-animate`. Don't hand-roll `whileInView` per section — that path is for things `SectionAnimate` can't express.

```tsx
<SectionAnimate>
  <YourBlock />
</SectionAnimate>
```

## Stagger pattern

When a list of children should reveal one after another:

```tsx
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
};
```

## Timing tokens

| Use | Duration | Ease |
|---|---|---|
| Micro (hover, tap) | `0.18` | `"easeOut"` |
| Default (reveals, fades) | `0.35` | `[0.22, 1, 0.36, 1]` |
| Hero (large displacement) | `0.6` | `[0.16, 1, 0.3, 1]` |
| Stagger gap | `0.05`–`0.08` | — |

Don't exceed `0.7s` for a single tween — feels sluggish in this portfolio's voice.

## Reduced motion

Always honor the user setting:

```tsx
import { useReducedMotion } from "motion/react";

const reduce = useReducedMotion();
const variants = reduce
  ? { hidden: { opacity: 0 }, show: { opacity: 1 } }
  : fullVariants;
```

For decorative-only animations (parallax, ambient float), gate the entire effect with `useReducedMotion()` and render the static state.

## Spring vs tween

- **Springs** for direct user manipulation (drag, hover swap, gesture follow). House default: `useSpring(value, { stiffness: 200, damping: 30 })` — see Score Counter's animated stat counter.
- **Tweens** for entrance, reveal, route transition. Predictable duration matters more than physical feel.

## Don't

- No `bounce` springs on UI chrome — toy-like
- No infinite-loop animations except for genuine loading affordances
- No animating `box-shadow` or `filter` directly — animate the `opacity` of a wrapper layer instead
- No animating layout properties (`width`, `height`, `top`, `margin`) — use `transform` (`x`, `y`, `scale`) for 60fps
