import { createBrowserRouter } from "react-router";
import { lazy } from "react";
import { Layout } from "@/components/layout/layout";
import { ReviewsLayout } from "@/pages/score-counter/reviews/layout";
import { HomePage } from "@/pages/home";
import { NotFoundPage } from "@/pages/not-found";

// These pages are only loaded when the user navigates to them
const ScoreCounterPage = lazy(() =>
  import("@/pages/score-counter").then((m) => ({ default: m.ScoreCounterPage }))
);
const DesignSystemPage = lazy(() =>
  import("@/pages/design-system").then((m) => ({ default: m.DesignSystemPage }))
);
const WhiteLabelEsimPage = lazy(() =>
  import("@/pages/white-label-esim").then((m) => ({ default: m.WhiteLabelEsimPage }))
);
const SupportPage = lazy(() =>
  import("@/pages/support").then((m) => ({ default: m.SupportPage }))
);
const WorkInProgress = lazy(() =>
  import("@/pages/coming-soon").then((m) => ({ default: m.WorkInProgress }))
);
const ReviewsPage = lazy(() =>
  import("@/pages/score-counter/reviews").then((m) => ({ default: m.ReviewsPage }))
);
const WhiteLabelDemoLayout = lazy(() =>
  import("@/pages/white-label-esim/demo/layout").then((m) => ({ default: m.WhiteLabelDemoLayout }))
);
const CompanySettingsDemoPage = lazy(() =>
  import("@/pages/white-label-esim/demo/company-settings").then((m) => ({ default: m.CompanySettingsDemoPage }))
);
const CustomizeEsimDemoPage = lazy(() =>
  import("@/pages/white-label-esim/demo/customize").then((m) => ({ default: m.CustomizeEsimDemoPage }))
);

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: "work/score-counter", Component: ScoreCounterPage },
      { path: "work/design-system", Component: DesignSystemPage },
      { path: "work/white-label-esim", Component: WorkInProgress },
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
      { path: "customize", Component: CustomizeEsimDemoPage },
    ],
  },
]);
