import { RiDoubleQuotesL } from "@remixicon/react";
import { nbsp } from "@/lib/nbsp";
import { fluidBase, fluidH2 } from "@/lib/typography";

/** Section label used as a category heading above content blocks */
export function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-muted-foreground tracking-widest uppercase"
      style={{ fontSize: fluidH2, lineHeight: 1.3, letterSpacing: "0.15em" }}
    >
      {children}
    </h2>
  );
}

/** Renders the first sentence in bold, rest as normal text */
export function BoldLead({ text }: { text: string }) {
  const i = text.indexOf(". ");
  if (i === -1) return <>{nbsp(text)}</>;
  return (
    <>
      <strong>{nbsp(text.slice(0, i + 1))}</strong>{" "}
      {nbsp(text.slice(i + 2))}
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
