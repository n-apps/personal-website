import { Outlet, useLocation } from "react-router";
import { Navigation } from "./navigation";
import { Footer } from "./footer";
import { useEffect, Suspense } from "react";

export function ReviewsLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* Nav — constrained */}
      <div className="w-full flex justify-center px-4 sm:px-5">
        <div className="w-full max-w-[700px]">
          <Navigation />
        </div>
      </div>

      {/* Main — full width */}
      <main className="flex-1 w-full px-4 sm:px-5">
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </main>

      {/* Footer — constrained */}
      <div className="w-full flex justify-center px-4 sm:px-5">
        <div className="w-full max-w-[700px]">
          <Footer />
        </div>
      </div>
    </div>
  );
}
