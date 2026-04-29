import { useSyncExternalStore } from "react";
import { pageTransition } from "@/lib/page-transition";

export function PageTransitionOverlay() {
  const phase = useSyncExternalStore(
    pageTransition.subscribe,
    pageTransition.get,
    pageTransition.get
  );

  const transform =
    phase === "entering"
      ? "translateX(0)"
      : phase === "exiting"
      ? "translateX(100%)"
      : "translateX(-100%)";

  const transition =
    phase === "entering"
      ? "transform 300ms cubic-bezier(0.4, 0, 1, 1)"
      : phase === "exiting"
      ? "transform 300ms cubic-bezier(0, 0, 0.2, 1)"
      : "none";

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[100] bg-foreground"
      style={{ transform, transition }}
    />
  );
}
