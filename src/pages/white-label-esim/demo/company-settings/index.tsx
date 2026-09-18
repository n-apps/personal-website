import { motion, useReducedMotion } from "motion/react";
import type { Variants } from "motion/react";
import { Link } from "react-router";
import { DemoNavbar } from "../components/demo-navbar";
import { EmptyBrandsIllustration } from "../components/empty-brands-illustration";

const pageReveal: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

const pageRevealReduced: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

const revealItem: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
};

const revealItemReduced: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

export function CompanySettingsDemoPage() {
  const reduceMotion = useReducedMotion();

  return (
    <main className="min-h-screen bg-white">
      <motion.div
        className="mx-auto w-full max-w-[1440px] px-6 py-10 sm:px-10 sm:py-12 lg:px-16 lg:py-12"
        variants={reduceMotion ? pageRevealReduced : pageReveal}
        initial="hidden"
        animate="show"
      >
        {/* Back to case study */}
        <motion.div variants={reduceMotion ? revealItemReduced : revealItem}>
          <Link
            to="/work/white-label-esim"
            data-goatcounter-click="white-label-demo-back-to-case-study"
            className="-ms-2 inline-flex min-h-11 select-none items-center gap-1.5 rounded-lg px-2 text-sm font-medium text-ink-600 transition-[background-color,color,scale] duration-150 ease-out hover:bg-surface-field hover:text-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-demo-accent/30 active:scale-[0.96]"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 16 16"
              className="h-3.5 w-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10 12.5 5.5 8 10 3.5" />
            </svg>
            Back to case study
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          className="mt-6"
          variants={reduceMotion ? revealItemReduced : revealItem}
        >
          <DemoNavbar />
        </motion.div>

        {/* Title row + primary action */}
        <motion.section
          className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
          variants={reduceMotion ? revealItemReduced : revealItem}
        >
          <h1 className="text-balance font-display text-4xl font-semibold leading-[1.1] tracking-tight text-ink-900">
            Company settings
          </h1>
          <Link
            to="/work/white-label-esim/demo/customize"
            data-goatcounter-click="white-label-demo-add-brand"
            className="inline-flex h-11 select-none items-center gap-2 self-start rounded-lg bg-ink-900 ps-3.5 pe-4 text-sm font-medium text-white shadow-[0_1px_2px_oklch(0_0_0/0.12),0_4px_12px_-6px_oklch(0_0_0/0.28)] transition-[background-color,scale] duration-150 ease-out hover:bg-ink-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-demo-accent/30 active:scale-[0.96] sm:self-auto"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 16 16"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
            >
              <path d="M8 3.5v9M3.5 8h9" />
            </svg>
            Add new brand
          </Link>
        </motion.section>

        {/* Brands table */}
        <motion.section
          className="mt-8 overflow-hidden rounded-2xl bg-surface-muted shadow-[0_0_0_1px_oklch(0_0_0/0.06),0_1px_2px_-1px_oklch(0_0_0/0.06),0_2px_4px_oklch(0_0_0/0.04)]"
          variants={reduceMotion ? revealItemReduced : revealItem}
        >
          {/* Table header */}
          <div className="hidden grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)_minmax(0,1.6fr)_120px] gap-4 border-b border-line px-7 py-3.5 sm:px-8 md:grid">
            <span className="text-xs font-medium uppercase tracking-wide text-ink-500">
              Brand
            </span>
            <span className="text-xs font-medium uppercase tracking-wide text-ink-500">
              Brand alias
            </span>
            <span className="text-xs font-medium uppercase tracking-wide text-ink-500">
              Default
            </span>
            <span className="text-end text-xs font-medium uppercase tracking-wide text-ink-500">
              Actions
            </span>
          </div>

          {/* Empty state */}
          <div className="flex flex-col items-center justify-center px-7 py-20 text-center sm:px-8">
            <EmptyBrandsIllustration className="h-32 w-32" />
            <p className="mt-6 max-w-sm text-pretty text-base leading-relaxed text-ink-600">
              <span className="font-medium text-ink-900">
                No brand setting yet.
              </span>{" "}
              You can add and manage your brand settings here.
            </p>
          </div>
        </motion.section>
      </motion.div>
    </main>
  );
}
