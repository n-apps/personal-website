import { RouterProvider } from "react-router";
import { router } from "./routes";
import { AppShell } from './app-shell';

// Case study routes: /work/score-counter, /work/design-system
export default function App({ staticMarkup = false }: { staticMarkup?: boolean }) {
  return (
    <AppShell staticMarkup={staticMarkup}><RouterProvider router={router} /></AppShell>
  );
}
