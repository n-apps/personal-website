import { Outlet, useLocation } from "react-router";
import { Navigation } from "./navigation";
import { Footer } from "./footer";
import { useEffect, Suspense } from "react";

export function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="w-full min-h-screen flex items-center flex-col px-4 sm:px-5">
      <div className="grid w-full max-w-[700px] min-h-screen relative" style={{ gridTemplateAreas: "'nav' 'main' 'footer'", gridTemplateColumns: "1fr", gridTemplateRows: "auto 1fr auto" }}>
        <div style={{ gridArea: "nav" }}>
          <Navigation />
        </div>
        <main className="w-full" style={{ gridArea: "main" }}>
          <Suspense fallback={null}>
            <Outlet />
          </Suspense>
        </main>
        <div style={{ gridArea: "footer" }}>
          <Footer />
        </div>
      </div>
    </div>
  );
}