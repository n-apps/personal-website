import { createBrowserRouter } from "react-router";
import { Layout } from "./components/layout";
import { HomePage } from "./components/home-page";
import { NotFoundPage } from "./components/not-found-page";
import { ScoreCounterPage } from "./components/score-counter-page";
import { DesignSystemPage } from "./components/design-system-page";
import { SupportPage } from "./components/support-page";
import { WorkInProgress } from "./components/work-in-progress";

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