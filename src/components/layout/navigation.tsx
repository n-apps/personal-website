import { Link, useLocation } from "react-router";
import { ThemeToggle } from "./theme-toggle";
import { motion } from "motion/react";

export function Navigation() {
  const location = useLocation();

  return (
    <motion.nav
      className="pt-6 pb-12 sm:pt-10 sm:pb-16 flex items-center justify-between w-full"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
    >
      {location.pathname !== "/support" && (
        <Link
          to="/"
          data-goatcounter-click="nav-home-logo"
          className="group inline-block select-none text-foreground"
          aria-label="R—S"
        >
          <span
            className="inline-block tracking-normal transition-[letter-spacing] duration-[420ms] ease-[cubic-bezier(.2,.7,.2,1)] group-hover:tracking-[0.12em] group-focus-visible:tracking-[0.12em] motion-reduce:transition-none"
            style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(0.8125rem, 0.78rem + 0.15vw, 1rem)", lineHeight: 1 }}
          >
            R
            <span
              aria-hidden="true"
              className="inline-block w-[1em] text-center transition-[width] duration-[420ms] ease-[cubic-bezier(.2,.7,.2,1)] group-hover:w-[1.8em] group-focus-visible:w-[1.8em] motion-reduce:transition-none"
            >
              —
            </span>
            S
          </span>
        </Link>
      )}
      <div className="flex items-center gap-4">
        <ThemeToggle />
      </div>
    </motion.nav>
  );
}