import { createBrowserRouter } from "react-router";
import { lazy } from "react";
import { Layout } from "@/components/layout/layout";
import { ReviewsLayout } from "@/pages/score-counter/reviews/layout";
import { HomePage } from "@/pages/home";
import { NotFoundPage } from "@/pages/not-found";
import { AnalyticsTracker } from "@/lib/use-analytics";
import { RouteLoadError } from "@/components/ui/route-status";

// These pages are only loaded when the user navigates to them
const ScoreCounterPage = lazy(() =>
  import("@/pages/score-counter").then((m) => ({ default: m.ScoreCounterPage }))
);
const ScoreCounterDownloadPage = lazy(() =>
  import("@/pages/score-counter-download").then((m) => ({ default: m.ScoreCounterDownloadPage }))
);
const ScoreCounterPrivacyPage = lazy(() =>
  import("@/pages/score-counter-privacy").then((m) => ({ default: m.ScoreCounterPrivacyPage }))
);
const DesignSystemPage = lazy(() =>
  import("@/pages/design-system").then((m) => ({ default: m.DesignSystemPage }))
);
const WhiteLabelEsimPage = lazy(() =>
  import("@/pages/white-label-esim").then((m) => ({ default: m.WhiteLabelEsimPage }))
);
const SaasOnboardingPage = lazy(() =>
  import("@/pages/saas-onboarding").then((m) => ({ default: m.SaasOnboardingPage }))
);
const SupportPage = lazy(() =>
  import("@/pages/support").then((m) => ({ default: m.SupportPage }))
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
// Standalone full-width experience — renders outside the 576px Layout shell via
// its own MissingTracksLayout (nav + self-scoped dark theme,
// src/styles/missing-tracks-theme.css). The layout hosts the watchlist app at the
// index and an About page.
const MissingTracksLayout = lazy(() =>
  import("@/pages/missing-tracks-project/layout").then((m) => ({ default: m.MissingTracksLayout }))
);
const MissingTracksApp = lazy(() => import("@/pages/missing-tracks-project"));
const MissingTracksAboutPage = lazy(() =>
  import("@/pages/missing-tracks-project/about").then((m) => ({ default: m.MissingTracksAboutPage }))
);

export const router = createBrowserRouter([
  {
    Component: AnalyticsTracker,
    children: [
      {
        path: "/score-counter",
        Component: ScoreCounterDownloadPage,
        ErrorBoundary: RouteLoadError,
      },
      {
        path: "/score-counter/privacy",
        Component: ScoreCounterPrivacyPage,
        ErrorBoundary: RouteLoadError,
      },
      {
        path: "/",
        Component: Layout,
        children: [
          { index: true, Component: HomePage },
          {
            path: "work/score-counter",
            Component: ScoreCounterPage,
            ErrorBoundary: RouteLoadError,
          },
          {
            path: "work/design-system",
            Component: DesignSystemPage,
            ErrorBoundary: RouteLoadError,
          },
          {
            path: "work/white-label-esim",
            Component: WhiteLabelEsimPage,
            ErrorBoundary: RouteLoadError,
          },
          {
            path: "work/saas-onboarding",
            Component: SaasOnboardingPage,
            ErrorBoundary: RouteLoadError,
          },
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
      {
        path: "/missing-tracks-project",
        Component: MissingTracksLayout,
        children: [
          { index: true, Component: MissingTracksApp },
          { path: "about", Component: MissingTracksAboutPage },
        ],
      },
    ],
  },
]);
