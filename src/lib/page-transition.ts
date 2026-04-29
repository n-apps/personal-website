import { router } from "@/app/routes";

export type TransitionPhase = "idle" | "entering" | "exiting";

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

  const preloadPromise = preload?.() ?? Promise.resolve();
  set("entering");
  await Promise.all([wait(300), preloadPromise]);
  await router.navigate(to);
  await twoFrames();
  set("exiting");
  await wait(300);
  set("idle");
}
