import { RiCheckLine } from '@remixicon/react';
import { nbsp } from '@/lib/nbsp';
import { fluidBase, fluidSmall } from '@/lib/typography';

// Same rule as the prototype's phone preview: compare black and white text
// against the brand colour and keep the higher WCAG contrast ratio.
const BLACK = '#000000';
const WHITE = '#ffffff';
const NAIVE_CUTOFF = 0.5;

const SAMPLE_BRANDS = [
  '#1D1B4B',
  '#7B3FE4',
  '#E4002B',
  '#0088FF',
  '#0BBCD6',
  '#F4B942',
];

function luminance(hex: string) {
  const value = parseInt(hex.slice(1), 16);
  const channel = (c: number) => {
    const s = c / 255;
    return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return (
    0.2126 * channel((value >> 16) & 0xff) +
    0.7152 * channel((value >> 8) & 0xff) +
    0.0722 * channel(value & 0xff)
  );
}

function ratio(a: number, b: number) {
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

const samples = SAMPLE_BRANDS.map((hex) => {
  const l = luminance(hex);
  const black = ratio(l, 0);
  const white = ratio(l, 1);
  const pickBlack = black >= white;
  const naivePicksBlack = l > NAIVE_CUTOFF;
  return {
    hex,
    black,
    white,
    foreground: pickBlack ? BLACK : WHITE,
    // Mid-tones darker than the cut-off but still better with black text.
    naiveMiss: pickBlack && !naivePicksBlack ? white : null,
  };
});

const format = (value: number) => `${value.toFixed(1)}:1`;

function RatioRow({ label, value, chosen }: { label: string; value: number; chosen: boolean }) {
  return (
    <div
      className={`flex items-center justify-between ${chosen ? 'text-foreground' : 'text-muted-foreground'}`}
      style={{ fontSize: fluidSmall, lineHeight: 1.4, fontVariantNumeric: 'tabular-nums' }}>
      <span className='inline-flex items-center gap-1'>
        {label}
        {chosen && (
          <>
            <RiCheckLine size={14} aria-hidden='true' />
            <span className='sr-only'>(used)</span>
          </>
        )}
      </span>
      <span>{format(value)}</span>
    </div>
  );
}

export function ContrastFigure() {
  return (
    <figure className='-mx-4 sm:mx-0'>
      <div className='content-media rounded-none border-y border-border bg-card p-4 sm:rounded-xl sm:border sm:p-6 lg:p-8'>
        <p
          className='text-pretty text-foreground'
          style={{ fontSize: fluidBase, lineHeight: 1.5 }}>
          {nbsp('Text colour = whichever of black or white has the higher contrast ratio against the brand colour')}
        </p>
        <ul className='mt-5 grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 lg:mt-6 lg:grid-cols-6'>
          {samples.map((sample) => (
            <li key={sample.hex} className='flex flex-col gap-2'>
              <div
                className='flex aspect-[4/3] flex-col justify-between rounded-lg p-3 outline outline-1 -outline-offset-1 outline-[var(--image-outline)]'
                style={{ backgroundColor: sample.hex, color: sample.foreground }}>
                <span aria-hidden='true' style={{ fontSize: '1.75rem', lineHeight: 1 }}>
                  Aa
                </span>
                <span style={{ fontSize: fluidSmall, lineHeight: 1, fontFamily: 'var(--font-mono)' }}>
                  {sample.hex}
                </span>
              </div>
              <RatioRow label='Black' value={sample.black} chosen={sample.foreground === BLACK} />
              <RatioRow label='White' value={sample.white} chosen={sample.foreground === WHITE} />
              {sample.naiveMiss !== null && (
                <p className='text-pretty text-muted-foreground' style={{ fontSize: fluidSmall, lineHeight: 1.4 }}>
                  {nbsp(`A ${NAIVE_CUTOFF} luminance cut-off picks white at ${format(sample.naiveMiss)}`)}
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>
      <figcaption
        className='px-4 pt-3 text-pretty text-muted-foreground sm:px-0'
        style={{ fontSize: fluidSmall, lineHeight: 1.5 }}>
        {nbsp(
          'Six sample brand colours, scored with the rule the prototype uses. A fixed cut-off would put white text on both blues, where black reads better.',
        )}
      </figcaption>
    </figure>
  );
}
