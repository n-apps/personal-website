import { type CSSProperties, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router';
import { AnimatePresence, m, useReducedMotion } from 'motion/react';
import { playPopSound } from '@/lib/ui-sounds';

const WHEEL_REVEAL_THRESHOLD = 600;
const TOUCH_REVEAL_THRESHOLD = 140;
const MIN_DELTA = 3;
const BOTTOM_TOLERANCE = 24;
const TOUCH_PROGRESS_TIMEOUT_MS = 1600;
const BORKS = [
  '(bork.)',
  '(woof.)',
  '(...)',
  '(🥎?)',
  "(yes, i'm annoying, but i'm also kinda special.)",
  '(do you have treats?)',
  '(...!)',
];
const BORK_DURATION_MS = 2200;
const DOG_WIDTH = 'clamp(30px, 4vw, 55px)';
const DOG_HEIGHT = 'clamp(24.78px, 3.3vw, 45.43px)';
const DOG_PEEK_HEIGHT = 'clamp(8.26px, 1.1vw, 15.14px)';
const DOG_REVEALED_BOTTOM = 'clamp(0.25rem, 1.5vw, 1rem)';
const REVEALED_HEIGHT = 'clamp(110px, 13.89vw, 200px)';
const REVEAL_EASE = 'cubic-bezier(0.16, 1, 0.3, 1)';
const REVEAL_DURATION_MS = 600;

export function EasterEggFooter() {
  const { pathname } = useLocation();
  const reduceMotion = useReducedMotion();
  const [revealed, setRevealed] = useState(false);
  const [bork, setBork] = useState<{ msg: string; key: number } | null>(null);
  const overshootRef = useRef(0);
  const lastTouchYRef = useRef<number | null>(null);
  const touchProgressTimerRef = useRef<number | null>(null);
  const borkIndexRef = useRef(-1);
  const borkTimerRef = useRef<number | null>(null);

  useEffect(() => {
    setRevealed(false);
    setBork(null);
    overshootRef.current = 0;
    lastTouchYRef.current = null;
    if (touchProgressTimerRef.current) {
      window.clearTimeout(touchProgressTimerRef.current);
      touchProgressTimerRef.current = null;
    }
    if (borkTimerRef.current) {
      window.clearTimeout(borkTimerRef.current);
      borkTimerRef.current = null;
    }
  }, [pathname]);

  useEffect(
    () => () => {
      if (borkTimerRef.current) window.clearTimeout(borkTimerRef.current);
      if (touchProgressTimerRef.current) {
        window.clearTimeout(touchProgressTimerRef.current);
      }
    },
    [],
  );

  const handleDogClick = () => {
    playPopSound();
    if (!revealed) {
      setRevealed(true);
      return;
    }

    if (borkTimerRef.current) window.clearTimeout(borkTimerRef.current);
    let next = Math.floor(Math.random() * BORKS.length);
    if (next === borkIndexRef.current) next = (next + 1) % BORKS.length;
    borkIndexRef.current = next;
    setBork({ msg: BORKS[next], key: Date.now() });
    borkTimerRef.current = window.setTimeout(
      () => setBork(null),
      BORK_DURATION_MS,
    );
  };

  useEffect(() => {
    if (!revealed) return;

    let frame: number;

    if (reduceMotion) {
      window.scrollTo(0, document.documentElement.scrollHeight);
      return;
    }

    const startedAt = performance.now();
    const followReveal = (now: number) => {
      window.scrollTo(0, document.documentElement.scrollHeight);
      if (now - startedAt <= REVEAL_DURATION_MS) {
        frame = window.requestAnimationFrame(followReveal);
      }
    };
    frame = window.requestAnimationFrame(followReveal);

    return () => window.cancelAnimationFrame(frame);
  }, [reduceMotion, revealed]);

  useEffect(() => {
    if (revealed) return;

    const isAtBottom = () => {
      const doc = document.documentElement;
      return (
        window.innerHeight + window.scrollY >=
        doc.scrollHeight - BOTTOM_TOLERANCE
      );
    };

    const push = (delta: number, threshold: number) => {
      if (delta <= 0 || !isAtBottom()) {
        overshootRef.current = 0;
        return;
      }
      if (delta < MIN_DELTA) return;
      overshootRef.current += delta;
      if (overshootRef.current >= threshold) {
        setRevealed(true);
      }
    };

    const onWheel = (e: WheelEvent) =>
      push(e.deltaY, WHEEL_REVEAL_THRESHOLD);

    const onTouchStart = (e: TouchEvent) => {
      if (touchProgressTimerRef.current) {
        window.clearTimeout(touchProgressTimerRef.current);
        touchProgressTimerRef.current = null;
      }
      lastTouchYRef.current = e.touches[0]?.clientY ?? null;
    };

    const onTouchMove = (e: TouchEvent) => {
      const prev = lastTouchYRef.current;
      const current = e.touches[0]?.clientY;
      if (prev == null || current == null) return;
      push(prev - current, TOUCH_REVEAL_THRESHOLD);
      lastTouchYRef.current = current;
    };

    const onTouchEnd = () => {
      lastTouchYRef.current = null;
      touchProgressTimerRef.current = window.setTimeout(() => {
        overshootRef.current = 0;
        touchProgressTimerRef.current = null;
      }, TOUCH_PROGRESS_TIMEOUT_MS);
    };

    window.addEventListener('wheel', onWheel, { passive: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    window.addEventListener('touchcancel', onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('touchcancel', onTouchEnd);
    };
  }, [revealed]);

  return (
    <div
      className='relative w-full overflow-hidden'
      style={{
        height: revealed ? REVEALED_HEIGHT : DOG_PEEK_HEIGHT,
        transition: reduceMotion
          ? 'none'
          : `height ${REVEAL_DURATION_MS}ms ${REVEAL_EASE}`,
      }}>
      <BlissClouds
        variant='day'
        className='absolute inset-0 h-full w-full dark:hidden'
      />
      <BlissDay
        aria-hidden='true'
        className='absolute inset-0 h-full w-full dark:hidden'
      />
      <BlissClouds
        variant='night'
        className='absolute inset-0 h-full w-full hidden dark:block'
      />
      <BlissNight
        aria-hidden='true'
        className='absolute inset-0 h-full w-full hidden dark:block'
      />
      <div
        style={{
          position: 'absolute',
          right: 'clamp(1rem, 5vw, 5rem)',
          top: 0,
          width: DOG_WIDTH,
          height: DOG_HEIGHT,
          transform: revealed
            ? `translateY(calc(${REVEALED_HEIGHT} - ${DOG_HEIGHT} - ${DOG_REVEALED_BOTTOM}))`
            : 'translateY(0)',
          transition: reduceMotion
            ? 'none'
            : `transform ${REVEAL_DURATION_MS}ms ${REVEAL_EASE}`,
          willChange: revealed ? 'transform' : undefined,
        }}>
        <button
          type='button'
          aria-label={revealed ? 'Make the dog bork' : 'Reveal the easter egg'}
          onClick={handleDogClick}
          data-goatcounter-click='annoying-dog'
          style={{
            display: 'block',
            width: '100%',
            height: '100%',
            padding: 0,
            border: 0,
            background: 'transparent',
            cursor: 'pointer',
          }}>
          <img
            src='/images/annoying_dog.gif'
            alt=''
            loading='lazy'
            decoding='async'
            style={{
              display: 'block',
              width: '100%',
              height: '100%',
              imageRendering: 'pixelated',
              outline: 'none',
              clipPath: revealed ? 'inset(0)' : 'inset(0 0 66.666% 0)',
              transition: reduceMotion
                ? 'none'
                : `clip-path ${REVEAL_DURATION_MS}ms ${REVEAL_EASE}`,
              userSelect: 'none',
            }}
          />
        </button>
        <AnimatePresence>
          {bork && (
            <m.div
              key={bork.key}
              initial={reduceMotion ? false : { opacity: 0, y: 4, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -2, scale: 0.96 }}
              transition={{ duration: reduceMotion ? 0 : 0.18, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: 'absolute',
                bottom: 'calc(100% + 8px)',
                right: 0,
                padding: '4px 8px',
                background: 'var(--background)',
                border: '1px solid var(--foreground)',
                borderRadius: '2px',
                color: 'var(--foreground)',
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                lineHeight: 1.3,
                whiteSpace: 'nowrap',
                pointerEvents: 'none',
              }}>
              {bork.msg}
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

const HILL_BACK_D =
  'M1440 200V83.5166C988.736 73.8096 582.598 112.637 221.587 200';
const HILL_FRONT_D = 'M0 200V112.637C480 105.357 912 134.478 1296 200';
const CLOUD_SMALL_D =
  'M747.354 82.0605C742.423 72.3201 747.354 67.4498 762.148 67.4498C762.148 62.5796 764.614 60.1445 769.545 60.1445C762.148 45.5337 791.736 38.2284 791.736 52.8391C796.667 52.8391 799.133 55.2742 799.133 60.1445C808.995 60.1445 811.461 67.4498 806.53 82.0605';
const CLOUD_LARGE_D =
  'M335.049 122.844C347.29 98.9647 335.049 87.0247 298.325 87.0247C298.325 75.0848 292.205 69.1149 279.964 69.1149C298.325 33.2951 224.879 15.3852 224.879 51.205C212.638 51.205 206.517 57.1749 206.517 69.1149C182.035 69.1149 175.914 87.0247 188.156 122.844';

function BlissClouds({
  className,
  variant,
}: {
  className: string;
  variant: 'day' | 'night';
}) {
  const isDay = variant === 'day';
  const strongColor = isDay ? '#bfdbfe' : '#cdd8ee';
  const softColor = isDay ? '#dbeafe' : '#cdd8ee';
  const strongOpacity = isDay ? 0.78 : 0.55;
  const softOpacity = isDay ? 0.08 : 0;

  const cloud = (
    path: string,
    viewBox: string,
    gradientId: string,
    style: CSSProperties,
  ) => (
    <svg
      viewBox={viewBox}
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      preserveAspectRatio='xMidYMid meet'
      style={style}>
      <path d={path} fill={`url(#${gradientId})`} />
      <defs>
        <linearGradient
          id={gradientId}
          x1='0'
          y1='0'
          x2='0'
          y2='1'
          gradientUnits='objectBoundingBox'>
          <stop stopColor={strongColor} stopOpacity={strongOpacity} />
          <stop
            offset='1'
            stopColor={softColor}
            stopOpacity={softOpacity}
          />
        </linearGradient>
      </defs>
    </svg>
  );

  return (
    <div aria-hidden='true' className={className}>
      {cloud(
        CLOUD_LARGE_D,
        '180 30 170 94',
        `bliss-${variant}-cloud-lg`,
        {
          position: 'absolute',
          left: 'clamp(4rem, 12.6vw, 11.5rem)',
          bottom: '38.5%',
          width: 'clamp(90px, 11.8vw, 170px)',
          height: 'auto',
        },
      )}
      {cloud(
        CLOUD_SMALL_D,
        '742 43 72 41',
        `bliss-${variant}-cloud-sm`,
        {
          position: 'absolute',
          left: '51.7%',
          bottom: '58.9%',
          width: 'clamp(38px, 5vw, 72px)',
          height: 'auto',
        },
      )}
    </div>
  );
}

function BlissDay({ className }: { className: string }) {
  return (
    <svg
      width='1440'
      height='200'
      viewBox='0 0 1440 200'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      preserveAspectRatio='none'
      className={className}>
      <path d={HILL_BACK_D} fill='url(#bliss-day-hill-back)' />
      <path d={HILL_FRONT_D} fill='url(#bliss-day-hill-front)' />
      <g style={{ mixBlendMode: 'overlay' }} opacity='0.5'>
        <path d={HILL_BACK_D} fill='url(#bliss-grain-day)' />
        <path d={HILL_FRONT_D} fill='url(#bliss-grain-day)' />
      </g>
      <defs>
        <linearGradient
          id='bliss-day-hill-back'
          x1='1440'
          y1='82.0605'
          x2='1440'
          y2='200'
          gradientUnits='userSpaceOnUse'>
          <stop stopColor='#22c55e' />
          <stop offset='1' stopColor='#16a34a' />
        </linearGradient>
        <linearGradient
          id='bliss-day-hill-front'
          x1='0'
          y1='111.545'
          x2='0'
          y2='200'
          gradientUnits='userSpaceOnUse'>
          <stop stopColor='#16a34a' />
          <stop offset='1' stopColor='#15803d' />
        </linearGradient>
        <pattern
          id='bliss-grain-day'
          patternUnits='userSpaceOnUse'
          width='100'
          height='100'>
          <image
            href='/images/grain.png'
            x='0'
            y='0'
            width='100'
            height='100'
            preserveAspectRatio='none'
          />
        </pattern>
      </defs>
    </svg>
  );
}

function BlissNight({ className }: { className: string }) {
  return (
    <svg
      width='1440'
      height='200'
      viewBox='0 0 1440 200'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      preserveAspectRatio='none'
      className={className}>
      <path d={HILL_BACK_D} fill='url(#bliss-night-hill-back)' />
      <path d={HILL_FRONT_D} fill='url(#bliss-night-hill-front)' />
      <g style={{ mixBlendMode: 'overlay' }} opacity='0.5'>
        <path d={HILL_BACK_D} fill='url(#bliss-grain-night)' />
        <path d={HILL_FRONT_D} fill='url(#bliss-grain-night)' />
      </g>
      <defs>
        <linearGradient
          id='bliss-night-hill-back'
          x1='1440'
          y1='82.0605'
          x2='1440'
          y2='200'
          gradientUnits='userSpaceOnUse'>
          <stop stopColor='#15803d' />
          <stop offset='1' stopColor='#166534' />
        </linearGradient>
        <linearGradient
          id='bliss-night-hill-front'
          x1='0'
          y1='111.545'
          x2='0'
          y2='200'
          gradientUnits='userSpaceOnUse'>
          <stop stopColor='#166534' />
          <stop offset='1' stopColor='#14532d' />
        </linearGradient>
        <pattern
          id='bliss-grain-night'
          patternUnits='userSpaceOnUse'
          width='100'
          height='100'>
          <image
            href='/images/grain.png'
            x='0'
            y='0'
            width='100'
            height='100'
            preserveAspectRatio='none'
          />
        </pattern>
      </defs>
    </svg>
  );
}
