import { createBrowserRouter } from "react-router";
import { routeConfig } from "./route-config";
import { configureTransitionNavigation } from "@/lib/page-transition";

export const router = createBrowserRouter(routeConfig);
configureTransitionNavigation(router.navigate);
