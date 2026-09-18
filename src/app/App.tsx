import { RouterProvider } from "react-router";
import { router } from "./routes";
import { Suspense } from "react";
import { PageTransitionOverlay } from "@/components/ui/page-transition-overlay";
import { RouteLoading } from "@/components/ui/route-status";

// Case study routes: /work/score-counter, /work/design-system
export default function App() {
  return (
    <>
      <Suspense fallback={<RouteLoading fullPage />}>
        <RouterProvider router={router} />
      </Suspense>
      <PageTransitionOverlay />
    </>
  );
}
