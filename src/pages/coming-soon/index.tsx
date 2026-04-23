import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import { SectionAnimate } from "@/components/ui/section-animate";

export function WorkInProgress() {
  return (
    <div className="flex flex-col items-center" style={{ gap: "clamp(2rem, 1.5rem + 2vw, 3rem)" }}>
      <SectionAnimate delay={0.05}>
        <div className="flex flex-col items-center text-center" style={{ gap: "clamp(1.5rem, 1.2rem + 1.5vw, 2.5rem)" }}>
          <img
            src="/images/coffee.gif"
            alt="Work in progress"
            className="rounded-xl w-full"
            style={{ maxWidth: "420px" }}
          />
          <div className="flex flex-col items-center gap-3">
            <h1
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(1.5rem, 1.3rem + 1vw, 2.25rem)",
                lineHeight: 1.25,
                letterSpacing: "-0.025em",
              }}
            >
              Work in progress
            </h1>
            <p
              className="text-muted-foreground"
              style={{
                fontSize: "clamp(0.8125rem, 0.78rem + 0.15vw, 1rem)",
                lineHeight: 1.6,
              }}
            >
              This case study is being polished. Check back soon.
            </p>
          </div>
        </div>
      </SectionAnimate>

      <SectionAnimate delay={0}>
        <Link
          to="/"
          data-goatcounter-click="back-to-home-top"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors self-start w-full"
          style={{ fontSize: "clamp(0.8125rem, 0.78rem + 0.15vw, 1rem)", lineHeight: 1 }}
        >
          <ArrowLeft size={16} />
          Back to Home Page
        </Link>
      </SectionAnimate>
    </div>
  );
}