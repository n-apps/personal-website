import { createBrowserRouter } from "react-router";
import { lazy } from "react";
import { Layout } from "./components/layout";
import { ReviewsLayout } from "./components/reviews-layout";
import { HomePage } from "./components/home-page";
import { NotFoundPage } from "./components/not-found-page";

// These pages are only loaded when the user navigates to them
const ScoreCounterPage = lazy(() =>
  import("./components/score-counter-page").then((m) => ({ default: m.ScoreCounterPage }))
);
const DesignSystemPage = lazy(() =>
  import("./components/design-system-page").then((m) => ({ default: m.DesignSystemPage }))
);
const WhiteLabelEsimPage = lazy(() =>
  import("./components/white-label-esim-page").then((m) => ({ default: m.WhiteLabelEsimPage }))
);
const SupportPage = lazy(() =>
  import("./components/support-page").then((m) => ({ default: m.SupportPage }))
);
const WorkInProgress = lazy(() =>
  import("./components/work-in-progress").then((m) => ({ default: m.WorkInProgress }))
);
const ReviewsPage = lazy(() =>
  import("./components/reviews-page").then((m) => ({ default: m.ReviewsPage }))
);
const WhiteLabelDemoLayout = lazy(() =>
  import("./components/white-label-esim-demo/demo-layout").then((m) => ({ default: m.WhiteLabelDemoLayout }))
);
const CompanySettingsDemoPage = lazy(() =>
  import("./components/white-label-esim-demo/company-settings-demo-page").then((m) => ({ default: m.CompanySettingsDemoPage }))
);

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: "work/score-counter", Component: ScoreCounterPage },
      { path: "work/design-system", Component: DesignSystemPage },
      { path: "work/white-label-esim", Component: WhiteLabelEsimPage },
      { path: "work/coming-soon", Component: WorkInProgress },
      { path: "support", Component: SupportPage },
      { path: "*", Component: NotFoundPage },
    ],
  },
  {
    path: "/work/score-counter/reviews",
    Component: ReviewsLayout,
    children: [{ index: true, Component: ReviewsPage }],
  },
  {
    path: "/work/white-label-esim/demo",
    Component: WhiteLabelDemoLayout,
    children: [
      { index: true, Component: CompanySettingsDemoPage },
      // customize child route added in a later task
    ],
  },
]);