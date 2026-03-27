import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import { SectionAnimate } from "./section-animate";
import { nbsp } from "./utils/nbsp";

const fluidBase = "clamp(1rem, 0.94rem + 0.3vw, 1.25rem)";
const fluidSmall = "clamp(0.8125rem, 0.78rem + 0.15vw, 1rem)";

export function NotFoundPage() {
  return (
    <div className="flex flex-col items-start" style={{ gap: "clamp(1.5rem, 1.25rem + 1.25vw, 2.5rem)" }}>
      <SectionAnimate>
        <h1
          style={{
            fontFamily: "var(--font-serif)",
            fontStyle: "italic",
            fontSize: "clamp(1.25rem, 1.1rem + 0.75vw, 1.9375rem)",
            lineHeight: 1.3,
            fontWeight: 400,
          }}
        >
          Page not found
        </h1>
      </SectionAnimate>
      <SectionAnimate delay={0.1}>
        <img
          src="/images/lost.gif"
          alt="Lost"
          style={{ width: "clamp(10rem, 8rem + 10vw, 18rem)", borderRadius: "0.5rem" }}
        />
      </SectionAnimate>
      <SectionAnimate delay={0.15}>
        <p style={{ fontSize: fluidBase, lineHeight: 1.5 }}>
          {nbsp("Sorry, the page you're looking for doesn't exist or has been moved.")}
        </p>
      </SectionAnimate>
      <SectionAnimate delay={0.2}>
        <Link
          to="/"
          data-goatcounter-click="back-to-home-404"
          className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
          style={{ fontSize: fluidSmall, lineHeight: 1 }}
        >
          <ArrowLeft size={14} />
          Back to Home
        </Link>
      </SectionAnimate>
    </div>
  );
}