import { Link } from "react-router";
import { DemoNavbar } from "../components/demo-navbar";
import { EmptyBrandsIllustration } from "../components/empty-brands-illustration";

export function CompanySettingsDemoPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto w-full max-w-[1440px] px-6 py-10 sm:px-10 sm:py-12 lg:px-16 lg:py-12">
        {/* Back to case study */}
        <Link
          to="/work/white-label-esim"
          data-goatcounter-click="white-label-demo-back-to-case-study"
          className="inline-flex items-center gap-1.5 text-[13px] font-medium text-ink-600 transition hover:text-ink-900"
        >
          <svg
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

        {/* Header */}
        <div className="mt-6">
          <DemoNavbar />
        </div>

        {/* Title row + primary action */}
        <section className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="font-display text-[36px] font-semibold leading-[1.15] tracking-tight text-ink-900">
            Company settings
          </h1>
          <Link
            to="/work/white-label-esim/demo/customize"
            className="inline-flex h-11 items-center gap-2 self-start rounded-lg bg-ink-900 px-4 text-sm font-medium text-white shadow-sm transition hover:bg-ink-800 active:scale-[0.99] sm:self-auto"
          >
            <svg
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
        </section>

        {/* Brands table */}
        <section className="mt-8 overflow-hidden rounded-2xl bg-surface-muted">
          {/* Table header */}
          <div className="grid grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)_minmax(0,1.6fr)_120px] gap-4 border-b border-line px-7 py-3.5 sm:px-8">
            <span className="text-[12px] font-medium uppercase tracking-wide text-ink-500">
              Brand
            </span>
            <span className="text-[12px] font-medium uppercase tracking-wide text-ink-500">
              Brand alias
            </span>
            <span className="text-[12px] font-medium uppercase tracking-wide text-ink-500">
              Default
            </span>
            <span className="text-right text-[12px] font-medium uppercase tracking-wide text-ink-500">
              Actions
            </span>
          </div>

          {/* Empty state */}
          <div className="flex flex-col items-center justify-center px-7 py-20 text-center sm:px-8">
            <EmptyBrandsIllustration className="h-32 w-32" />
            <p className="mt-6 max-w-sm text-[15px] leading-6 text-ink-600">
              <span className="font-medium text-ink-900">
                No brand setting yet.
              </span>{" "}
              You can add and manage your brand settings here.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
