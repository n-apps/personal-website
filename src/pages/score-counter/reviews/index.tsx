import { Link } from "react-router";
import { RiArrowLeftLine } from "@remixicon/react";
import { SectionAnimate } from "@/components/ui/section-animate";
import { fluidSmall, sectionGap } from "@/lib/typography";
import { MasonryGrid } from "@/components/ui/masonry-grid";
import reviewsData from "@/data/reviews.json";

const reviews = [...reviewsData].sort(() => Math.random() - 0.5);

export function ReviewsPage() {
  return (
    <div className="flex flex-col" style={{ gap: sectionGap }}>

      {/* Masonry grid — full width, no constraint */}
      <SectionAnimate delay={0.1}>
        <MasonryGrid items={reviews} />
      </SectionAnimate>

      {/* Bottom back link */}
      <SectionAnimate delay={0.12}>
        <Link
          to="/work/score-counter"
          data-goatcounter-click="reviews-back-to-case-study-bottom"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          style={{ fontSize: fluidSmall, lineHeight: 1 }}
        >
          <RiArrowLeftLine size={16} />
          Back to Score Counter
        </Link>
      </SectionAnimate>
    </div>
  );
}
