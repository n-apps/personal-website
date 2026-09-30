import { playTransitionSound } from "@/lib/ui-sounds";

export type TransitionPhase = "idle" | "entering" | "exiting";

let navigateRoute: (to: string) => Promise<void>;
export function configureTransitionNavigation(navigate: typeof navigateRoute) { navigateRoute = navigate; }

let phase: TransitionPhase = "idle";
const listeners = new Set<() => void>();

function set(next: TransitionPhase) {
  phase = next;
  listeners.forEach((fn) => fn());
}

export const pageTransition = {
  get: () => phase,
  subscribe: (fn: () => void) => {
    listeners.add(fn);
    return () => {
      listeners.delete(fn);
    };
  },
};

const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

const twoFrames = () =>
  new Promise<void>((r) =>
    requestAnimationFrame(() => requestAnimationFrame(() => r()))
  );

export async function navigateWithTransition(
  to: string,
  preload?: () => Promise<unknown>
) {
  if (phase !== "idle") return;

  try {
    playTransitionSound();
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) {
      await (preload?.() ?? Promise.resolve());
      await navigateRoute(to);
      return;
    }

    set("entering");
    const enterPromise = wait(300);
    await twoFrames();
    const preloadPromise = preload?.() ?? Promise.resolve();
    await Promise.all([enterPromise, preloadPromise]);
    await navigateRoute(to);
    await twoFrames();
    set("exiting");
    await wait(300);
  } finally {
    set("idle");
  }
}
