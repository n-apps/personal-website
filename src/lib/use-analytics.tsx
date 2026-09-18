import { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router";

type GoatCounter = {
  no_onload: boolean;
  no_events: boolean;
  count?: (options: { path: string; event?: boolean }) => void;
};

declare global {
  interface Window {
    goatcounter?: GoatCounter;
  }
}

export function AnalyticsTracker() {
  const { pathname, search } = useLocation();
  const path = pathname + search;
  const currentPath = useRef(path);
  const countedPath = useRef<string | null>(null);
  const ready = useRef(false);
  currentPath.current = path;

  useEffect(() => {
    // Count pageviews ourselves so initial loading and SPA navigation share one path.
    window.goatcounter = { no_onload: true, no_events: true };

    const countPage = () => {
      if (!ready.current || countedPath.current === currentPath.current) return;
      window.goatcounter?.count?.({ path: currentPath.current });
      countedPath.current = currentPath.current;
    };

    const trackClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const element = target.closest<HTMLElement>("[data-goatcounter-click]");
      const name = element?.dataset.goatcounterClick;
      if (name) window.goatcounter?.count?.({ path: name, event: true });
    };

    const script = document.createElement("script");
    script.dataset.goatcounter = "https://romamakes.goatcounter.com/count";
    script.async = true;
    script.src = "https://gc.zgo.at/count.js";
    script.onload = () => {
      ready.current = true;
      countPage();
    };
    document.addEventListener("click", trackClick, true);
    document.body.appendChild(script);

    return () => {
      ready.current = false;
      document.removeEventListener("click", trackClick, true);
      script.remove();
    };
  }, []);

  useEffect(() => {
    if (!ready.current || countedPath.current === path) return;
    window.goatcounter?.count?.({ path });
    countedPath.current = path;
  }, [path]);

  return <Outlet />;
}
