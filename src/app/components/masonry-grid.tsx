import { useRef, useState, useEffect, useMemo } from "react";
import { prepare, layout, type PreparedText } from "@chenglou/pretext";

/* ── Config ───────────────────────────────────────────── */

const font = "400 14px Inter, system-ui, -apple-system, sans-serif";
const lineHeight = 21;
const cardPadding = 16;
const gap = 10;

type PositionedCard = {
  index: number;
  x: number;
  y: number;
  w: number;
  h: number;
};

/* ── Hooks ────────────────────────────────────────────── */

function useContainerWidth(ref: React.RefObject<HTMLDivElement | null>) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setWidth(entry!.contentRect.width);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return width;
}

function useFontsReady() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    document.fonts.ready.then(() => setReady(true));
  }, []);
  return ready;
}

function useColumnCount(containerWidth: number) {
  if (containerWidth < 480) return 1;
  if (containerWidth < 768) return 2;
  if (containerWidth < 1024) return 3;
  if (containerWidth < 1280) return 4;
  return 6;
}

/* ── Layout computation ───────────────────────────────── */

function computeMasonryLayout(
  prepared: PreparedText[],
  containerWidth: number,
  colCount: number
): { cards: PositionedCard[]; height: number } {
  if (containerWidth <= 0 || colCount <= 0) return { cards: [], height: 0 };

  const colWidth = (containerWidth - gap * (colCount - 1)) / colCount;
  const textWidth = colWidth - cardPadding * 2;

  const colHeights = new Float64Array(colCount);

  const cards: PositionedCard[] = [];

  for (let i = 0; i < prepared.length; i++) {
    // Find shortest column
    let shortest = 0;
    for (let c = 1; c < colCount; c++) {
      if (colHeights[c]! < colHeights[shortest]!) shortest = c;
    }

    const { height } = layout(prepared[i]!, textWidth, lineHeight);
    const totalH = height + cardPadding * 2;

    cards.push({
      index: i,
      x: shortest * (colWidth + gap),
      y: colHeights[shortest]!,
      w: colWidth,
      h: totalH,
    });

    colHeights[shortest]! += totalH + gap;
  }

  let maxHeight = 0;
  for (let c = 0; c < colCount; c++) {
    if (colHeights[c]! > maxHeight) maxHeight = colHeights[c]!;
  }

  return { cards, height: maxHeight };
}

/* ── Component ────────────────────────────────────────── */

export function MasonryGrid({ items }: { items: string[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const containerWidth = useContainerWidth(containerRef);
  const fontsReady = useFontsReady();
  const colCount = useColumnCount(containerWidth);

  const prepared = useMemo(() => {
    if (!fontsReady) return [];
    return items.map((text) => prepare(text, font));
  }, [items, fontsReady]);

  const { cards, height } = useMemo(
    () => computeMasonryLayout(prepared, containerWidth, colCount),
    [prepared, containerWidth, colCount]
  );

  return (
    <div ref={containerRef} className="relative w-full" style={{ height }}>
      {cards.map((card) => (
        <div
          key={card.index}
          className="absolute rounded-xl bg-card card-shadow"
          style={{
            transform: `translate3d(${card.x}px, ${card.y}px, 0)`,
            width: card.w,
            height: card.h,
            padding: cardPadding,
            fontSize: 14,
            lineHeight: `${lineHeight}px`,
            color: "var(--foreground)",
            opacity: "0.8",
          }}
        >
          {items[card.index]}
        </div>
      ))}
    </div>
  );
}
