import { createBrowserRouter } from "react-router";
import { lazy } from "react";
import { Layout } from "./components/layout";
import { HomePage } from "./components/home-page";
import { NotFoundPage } from "./components/not-found-page";

// These pages are only loaded when the user navigates to them
const ScoreCounterPage = lazy(() =>
  import("./components/score-counter-page").then((m) => ({ default: m.ScoreCounterPage }))
);
const DesignSystemPage = lazy(() =>
  import("./components/design-system-page").then((m) => ({ default: m.DesignSystemPage }))
);
const SupportPage = lazy(() =>
  import("./components/support-page").then((m) => ({ default: m.SupportPage }))
);
const WorkInProgress = lazy(() =>
  import("./components/work-in-progress").then((m) => ({ default: m.WorkInProgress }))
);

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: "work/score-counter", Component: ScoreCounterPage },
      { path: "work/design-system", Component: DesignSystemPage },
      { path: "support", Component: SupportPage },
      { path: "*", Component: NotFoundPage },
    ],
  },
]);