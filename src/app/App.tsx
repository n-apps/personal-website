import { RouterProvider } from "react-router";
import { router } from "./routes";
import { useEffect } from "react";
import { PageTransitionOverlay } from "@/components/ui/page-transition-overlay";

// Case study routes: /work/score-counter, /work/design-system
export default function App() {
  useEffect(() => {
    const script = document.createElement("script");
    script.dataset.goatcounter = "https://romamakes.goatcounter.com/count";
    script.async = true;
    script.src = "//gc.zgo.at/count.js";
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <RouterProvider router={router} />
      <PageTransitionOverlay />
    </>
  );
}