import { Link } from "react-router";
import { YesimWordmark } from "./yesim-wordmark";

const NAV_ITEMS = ["eSIMs", "Orders", "Users", "API", "Reports"] as const;

export function DemoNavbar() {
  return (
    <header className="flex items-center justify-between rounded-2xl bg-ink-900 px-6 py-3">
      <YesimWordmark className="cursor-pointer text-white" />

      <nav className="hidden items-center gap-1 md:flex">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item}
            to="#"
            className="rounded-lg px-4 py-2 text-[14px] font-medium text-white/70 transition hover:text-white"
          >
            {item}
          </Link>
        ))}
      </nav>

      <Link
        to="#"
        className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-[14px] font-semibold text-ink-900 transition hover:bg-white/90"
      >
        Go to dashboard
        <svg
          viewBox="0 0 16 16"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3.5 8h9M8.5 3.5 13 8l-4.5 4.5" />
        </svg>
      </Link>
    </header>
  );
}
