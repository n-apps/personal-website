import { Fragment } from "react";
import { Link } from "react-router";
import {
  RiArrowLeftLine,
  RiArrowRightLine,
  RiDoubleQuotesL,
  RiEraserFill,
  RiPauseMiniFill,
  RiPlayMiniFill,
} from "@remixicon/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";
import { useViewportVideo } from "@/components/ui/use-viewport-video";
import { nbsp } from "@/lib/nbsp";
import {
  fluidBase,
  fluidH1,
  fluidLead,
  fluidSmall,
  fluidStat,
  innerGap,
} from "@/lib/typography";

/** Renders `text` with `term` wrapped in <code>; applies nbsp to surrounding parts */
export function highlight(text: string, term: string): React.ReactNode {
  if (!text.includes(term)) return nbsp(text);
  const parts = text.split(term);
  return parts.map((part, i) => (
    <Fragment key={i}>
      {nbsp(part)}
      {i < parts.length - 1 && <code>{term}</code>}
    </Fragment>
  ));
}

/** Section label used as a category heading above content blocks */
export function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        fontSize: fluidLead,
        fontWeight: 500,
        fontFamily: "var(--font-serif)",
        lineHeight: 1.2,
        letterSpacing: "-0.01em",
      }}
    >
      {children}
    </h2>
  );
}

/** Sub-section heading inside a case-study section. Renders an <h3> so the
 * document outline stays intact (h1 → h2 → h3), styled to read as a bold lead. */
export function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 style={{ fontSize: fluidBase, fontWeight: 500, lineHeight: 1.4 }}>
      {children}
    </h3>
  );
}

/** Renders the first sentence in bold, rest as normal text */
export function BoldLead({
  text,
  highlightTerm,
}: {
  text: string;
  highlightTerm?: string;
}) {
  const render = (slice: string) =>
    highlightTerm ? highlight(slice, highlightTerm) : nbsp(slice);
  const i = text.indexOf(". ");
  if (i === -1) return <>{render(text)}</>;
  return (
    <>
      <strong>{render(text.slice(0, i + 1))}</strong> {render(text.slice(i + 2))}
    </>
  );
}

/** Standardized pull quote / callout: accent border + serif body text */
export function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-l-[3px] border-accent pl-5 sm:pl-6 py-1 flex flex-col gap-2">
      <RiDoubleQuotesL className="text-accent shrink-0" size={28} aria-hidden />
      <div
        className="text-foreground/90"
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: fluidBase,
          lineHeight: 1.5,
        }}
      >
        {children}
      </div>
    </div>
  );
}

/** Subtle footnote-style disclaimer for case studies covered by an NDA */
export function ConfidentialityNote() {
  return (
    <div
      className="flex items-start gap-2 text-muted-foreground italic"
      style={{ fontSize: fluidSmall, lineHeight: 1.5 }}
    >
      <RiEraserFill
        className="shrink-0"
        size={14}
        style={{ marginTop: "calc((1lh - 14px) / 2)" }}
        aria-hidden
      />
      <p>
        {nbsp(
          "Note: images and some details have been modified per agreement with Yesim.",
        )}
      </p>
    </div>
  );
}

/** Placeholder shown when a case study image is not available */
export function ImagePlaceholder({ label }: { label: string }) {
  return (
    <div
      className="w-full rounded-xl bg-secondary flex items-center justify-center overflow-hidden"
      style={{ aspectRatio: "772 / 320" }}
    >
      <span
        className="text-muted-foreground text-center px-4"
        style={{ fontSize: "0.875rem", lineHeight: 1.4 }}
      >
        {label}
      </span>
    </div>
  );
}

type Fact = {
  label: string;
  value: string;
};

type Outcome = {
  value: string;
  label: string;
  detail?: string;
};

/** Shared case-study opening with a balanced title and readable lead. */
export function CaseHero({
  title,
  lede,
}: {
  title: string;
  lede: string;
}) {
  return (
    <header className="flex flex-col" style={{ gap: innerGap }}>
      <h1
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: fluidH1,
          lineHeight: 1.15,
          letterSpacing: "-0.025em",
        }}
      >
        {nbsp(title)}
      </h1>
      <p className="max-w-[34rem] text-pretty" style={{ fontSize: fluidLead, lineHeight: 1.55 }}>
        {nbsp(lede)}
      </p>
    </header>
  );
}

/** Plain-text role, scope, timeframe, and team facts near the opening. */
export function CaseFacts({ items }: { items: Fact[] }) {
  return (
    <dl className="grid grid-cols-2 gap-x-4 gap-y-6 sm:gap-x-6">
      {items.map((item) => (
        <div key={item.label} className="min-w-0">
          <dt className="text-sm leading-[1.4] text-muted-foreground">
            {item.label}
          </dt>
          <dd className="mt-1 text-pretty text-base leading-[1.4]">{nbsp(item.value)}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Plain-text outcome metrics for supported results or clearly labelled delivery scope. */
export function OutcomeGrid({ items }: { items: Outcome[] }) {
  return (
    <dl className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-4 sm:gap-x-6">
      {items.map((item) => (
        <div key={item.label}>
          <dt
            className="font-mono font-semibold text-foreground tabular-nums"
            style={{
              fontSize: fluidStat,
              lineHeight: 1.15,
            }}
          >
            {item.value}
          </dt>
          <dd className="mt-1 text-pretty text-xs leading-[1.4] text-muted-foreground">
            {item.label}
          </dd>
          {item.detail ? (
            <dd className="mt-1.5 text-pretty text-xs leading-[1.45] text-foreground/70">
              {item.detail}
            </dd>
          ) : null}
        </div>
      ))}
    </dl>
  );
}

/** Image plus an evidence-led caption. */
export function CaseFigure({
  src,
  width,
  height,
  alt,
  caption,
  eager = false,
}: {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
  eager?: boolean;
}) {
  return (
    <figure className="-mx-4 sm:mx-0">
      <ImageWithFallback
        src={src}
        width={width}
        height={height}
        alt={alt}
        className="w-full rounded-none sm:rounded-xl"
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : "auto"}
        decoding="async"
      />
      <figcaption
        className="px-4 pt-3 text-pretty text-muted-foreground sm:px-0"
        style={{ fontSize: fluidSmall, lineHeight: 1.5 }}
      >
        {nbsp(caption)}
      </figcaption>
    </figure>
  );
}

/** Video plus a caption so motion is treated as product evidence. */
export function CaseVideo({
  src,
  poster,
  width,
  height,
  label,
  caption,
}: {
  src: string;
  poster: string;
  width: number;
  height: number;
  label: string;
  caption: string;
}) {
  const reduceMotion = useReducedMotion() === true;
  const { videoRef, posterReady, isPlaying, togglePlayback, onPlay, onPause } =
    useViewportVideo(!reduceMotion, src);

  return (
    <figure className="-mx-4 sm:mx-0">
      <div className="relative bg-secondary rounded-none sm:rounded-xl" style={{ aspectRatio: `${width} / ${height}` }}>
        <video
          ref={videoRef}
          width={width}
          height={height}
          poster={posterReady ? poster : undefined}
          aria-label={label}
          className="block h-full w-full rounded-none outline outline-1 -outline-offset-1 outline-[var(--image-outline)] sm:rounded-xl"
          preload="none"
          loop
          muted
          playsInline
          onPlay={onPlay}
          onPause={onPause}
        />
        <motion.button
          type="button"
          onClick={togglePlayback}
          aria-label={isPlaying ? "Pause video" : "Play video"}
          className="absolute bottom-3 right-3 z-10 flex size-11 items-center justify-center rounded-full bg-background/90 text-foreground card-shadow backdrop-blur-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          whileTap={reduceMotion ? undefined : { scale: 0.96 }}
        >
          <AnimatePresence initial={false} mode="popLayout">
            <motion.span
              key={isPlaying ? "pause" : "play"}
              className="flex items-center justify-center"
              initial={
                reduceMotion
                  ? false
                  : { opacity: 0, scale: 0.25, filter: "blur(4px)" }
              }
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={
                reduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, scale: 0.25, filter: "blur(4px)" }
              }
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { type: "spring", duration: 0.3, bounce: 0 }
              }
            >
              {isPlaying ? (
                <RiPauseMiniFill size={20} aria-hidden />
              ) : (
                <RiPlayMiniFill
                  size={20}
                  className="translate-x-px"
                  aria-hidden
                />
              )}
            </motion.span>
          </AnimatePresence>
        </motion.button>
      </div>
      <figcaption
        className="px-4 pt-3 text-pretty text-muted-foreground sm:px-0"
        style={{ fontSize: fluidSmall, lineHeight: 1.5 }}
      >
        {nbsp(caption)}
      </figcaption>
    </figure>
  );
}

/** Visible evidence status for cases whose outcome is not yet documented. */
export function EvidenceStatus({ children }: { children: React.ReactNode }) {
  return (
    <aside className="rounded-xl border border-border bg-secondary/55 p-5 sm:p-6">
      <p className="text-xs font-medium uppercase leading-[1.3] tracking-wide text-muted-foreground">
        Evidence status
      </p>
      <div className="mt-2 text-pretty text-foreground/80" style={{ fontSize: fluidBase, lineHeight: 1.55 }}>
        {children}
      </div>
    </aside>
  );
}

/** Consistent case-study navigation. */
export function CaseNavigation({ next }: { next: string }) {
  return (
    <nav className="flex items-center justify-between" aria-label="Case-study navigation">
      <Link
        to="/"
        data-goatcounter-click="back-to-home-bottom"
        className="inline-flex min-h-11 items-center gap-2 text-muted-foreground transition-colors hover:text-foreground focus-visible:text-foreground"
        style={{ fontSize: fluidSmall, lineHeight: 1 }}
      >
        <RiArrowLeftLine size={16} aria-hidden />
        Home
      </Link>
      <Link
        to={next}
        data-goatcounter-click="next-case-study"
        className="inline-flex min-h-11 items-center gap-2 text-muted-foreground transition-colors hover:text-foreground focus-visible:text-foreground"
        style={{ fontSize: fluidSmall, lineHeight: 1 }}
      >
        Next work
        <RiArrowRightLine size={16} aria-hidden />
      </Link>
    </nav>
  );
}
