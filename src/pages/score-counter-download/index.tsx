import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import {
  RiAppleFill,
  RiGooglePlayFill,
  RiPauseMiniFill,
  RiPlayMiniFill,
  RiRestartFill,
} from '@remixicon/react';
import { useReducedMotion } from 'motion/react';
import { ColorPanels } from '@paper-design/shaders-react';
import { ProductShowcase } from './product-showcase';
import './score-counter.css';
import { DashedDivider } from '@/components/ui/dashed-divider';
import { SectionAnimate } from '@/components/ui/section-animate';
import { applyScoreCounterMetadata, scoreCounterMetadata } from '@/lib/score-counter-metadata';

const stores = [
  {
    label: 'For iPhone & iPad',
    store: 'App Store',
    href: 'https://apps.apple.com/us/app/score-counter-count-anything/id6810694700',
    event: 'score-counter-download-ios',
    Icon: RiAppleFill,
  },
  {
    label: 'For Android',
    store: 'Google Play',
    href: 'https://play.google.com/store/apps/details?id=ua.napps.scorekeeper',
    event: 'score-counter-download-android',
    Icon: RiGooglePlayFill,
  },
];

function StoreButtons() {
  return (
    <>
      {stores.map(({ label, store, href, event, Icon }) => (
        <a
          key={event}
          href={href}
          data-goatcounter-click={event}
          aria-label={`Get Score Counter ${label.replace('For ', 'for ')} on ${store}`}
          className='group inline-flex min-h-14 min-w-[11.5rem] items-center gap-3 rounded-xl bg-primary px-4 text-primary-foreground shadow-[0_1px_1px_oklch(0_0_0/0.12),0_8px_20px_oklch(0_0_0/0.08)] transition-[opacity,transform,box-shadow] hover:opacity-90 hover:shadow-[0_2px_2px_oklch(0_0_0/0.14),0_12px_24px_oklch(0_0_0/0.12)] active:scale-[0.96] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground motion-reduce:transition-none motion-reduce:active:scale-100'>
          <Icon size={29} aria-hidden='true' className='shrink-0' />
          <span className='flex flex-col items-start justify-center text-left leading-none'>
            <span className='text-[0.62rem] font-normal tracking-tight opacity-80'>
              {store === 'App Store' ? 'Download on the' : 'Get it on'}
            </span>
            <span className='mt-1 text-[1.22rem] font-medium tracking-[-0.04em]'>
              {store}
            </span>
          </span>
        </a>
      ))}
    </>
  );
}

// Verbatim reviews from src/data/reviews.json. The source has no author names.
// Keep only these selected quotes in the initial landing-page bundle.
const testimonials = [
  "Great app for game night! I'm very pleased with the power and options. thank you!",
  "Simple, multipurpose, no ads, does what it says on the tin and then some, it's rare to find an app like this.",
  "I'm a pub quiz host and this is my go to! Super simple, not error prone, clean interface...I'm a fan!",
];

const useCases = [
  'game night',
  'friendly competition',
  'board games',
  'card games',
  'pub quizzes',
  'weekend matches',
  'every little victory',
  'daily habits',
  'family challenges',
  'household chores',
  'the things you keep track of',
];

export function ScoreCounterDownloadPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduceMotion = useReducedMotion();
  const [isPlaying, setIsPlaying] = useState(false);
  const [visibleTestimonials, setVisibleTestimonials] = useState(testimonials);
  const [useCase, setUseCase] = useState(useCases[0]);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [reviewsError, setReviewsError] = useState(false);
  const [restartCount, setRestartCount] = useState(0);

  const showMoreReviews = async () => {
    if (reviewsLoading) return;
    setRestartCount((count) => count + 1);
    setReviewsLoading(true);
    setReviewsError(false);
    try {
      const { default: reviews } = await import('@/data/reviews.json');
      const candidates = reviews.filter(
        (review) =>
          review.length >= 30 &&
          review.length <= 160 &&
          !visibleTestimonials.includes(review),
      );
      // Pick without replacement so every click shows three different reviews.
      for (let index = 0; index < Math.min(3, candidates.length); index += 1) {
        const swapIndex =
          index + Math.floor(Math.random() * (candidates.length - index));
        [candidates[index], candidates[swapIndex]] = [
          candidates[swapIndex],
          candidates[index],
        ];
      }
      setVisibleTestimonials(candidates.slice(0, 3));
      const nextUseCases = useCases.filter(
        (candidate) => candidate !== useCase,
      );
      setUseCase(nextUseCases[Math.floor(Math.random() * nextUseCases.length)]);
    } catch {
      setReviewsError(true);
    } finally {
      setReviewsLoading(false);
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (reduceMotion !== false) video.pause();
    else void video.play().catch(() => setIsPlaying(false));
  }, [reduceMotion]);

  useEffect(() => {
    window.scrollTo(0, 0);
    return applyScoreCounterMetadata(scoreCounterMetadata);
  }, []);

  return (
    <div className='sc-download min-h-screen px-5 sm:px-8'>
      <main className='mx-auto flex max-w-[1260px] flex-col items-center pb-8 text-center'>
        <section aria-labelledby='download-heading' className='sc-hero'>
          <SectionAnimate delay={0.05}>
            <p className='mb-6 text-base font-bold lg:hidden'>Score Counter</p>
            <h1 id='download-heading'>
              Keep score.
              <br />
              Keep <em className='sc-highlight'>playing.</em>
            </h1>
            <p className='sc-hero-description mx-auto lg:mx-0'>
              A simple, intuitive score counter. With dice, a timer and score
              history built in.
            </p>
            <div className='mt-8 flex flex-wrap justify-center gap-4 lg:mt-14 lg:justify-start lg:gap-6'>
              <StoreButtons />
            </div>
            <p className='mt-4 text-sm text-[var(--sc-muted)]'>
              Ad-free. For iOS and Android.
            </p>
          </SectionAnimate>
          <SectionAnimate delay={0.15} className='sc-hero-visual'>
            <div className='sc-hero-shader' aria-hidden='true'>
              <ColorPanels
                speed={reduceMotion ? 0 : 1}
                scale={0.84}
                density={1.41}
                angle1={0}
                angle2={0.13}
                length={1}
                edges={false}
                blur={0}
                fadeIn={0.8}
                fadeOut={0.3}
                gradient={0}
                rotation={0}
                offsetX={0}
                offsetY={0}
                frame={103842.85699999995}
                colors={[
                  '#FFD667',
                  '#FFB196',
                  '#D88868',
                  '#C978A9',
                  '#8B9FCB',
                  '#05C889',
                  '#FFE45E',
                ]}
                colorBack='#00000000'
                style={{ width: '100%', height: '100%' }}
              />
            </div>
            <video
              ref={videoRef}
              width={238}
              height={459}
              aria-label='Score Counter app preview'
              className='sc-hero-video'
              muted
              loop
              playsInline
              preload='metadata'
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}>
              <source src='/videos/score-counter-hero.webm' type='video/webm' />
              <source src='/videos/score-counter-hero.mp4' type='video/mp4' />
              Your browser does not support this video.
            </video>
            <button
              type='button'
              aria-label={isPlaying ? 'Pause app preview' : 'Play app preview'}
              onClick={() => {
                const video = videoRef.current;
                if (!video) return;
                if (video.paused)
                  void video.play().catch(() => setIsPlaying(false));
                else video.pause();
              }}
              className='absolute bottom-0 right-0 flex size-11 items-center justify-center rounded-full bg-background text-foreground card-shadow focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground'>
              {isPlaying ?
                <RiPauseMiniFill size={22} aria-hidden='true' />
              : <RiPlayMiniFill size={22} aria-hidden='true' />}
            </button>
          </SectionAnimate>
        </section>
        <SectionAnimate inView className='w-full'>
          <section
            aria-labelledby='social-proof-heading'
            className='sc-social-proof w-full'>
            <h2 id='social-proof-heading'>
              Join the 1,100,000 users on Score Counter app
            </h2>
            <p>
              Rated{' '}
              <a
                href={stores[1].href}
                data-goatcounter-click='score-counter-rating-google-play'
                className='underline underline-offset-4 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground'>
                4.9 stars
              </a>{' '}
              on the Google Play Store
            </p>
          </section>
        </SectionAnimate>
        <SectionAnimate inView className='w-full'>
          <ProductShowcase />
        </SectionAnimate>
        <SectionAnimate inView className='w-full max-w-xl'>
          <section
            aria-labelledby='story-heading'
            className='my-20 w-full text-left sm:my-28'>
            <h2 id='story-heading' className='sc-story-title'>
              From my game nights
              <br />
              to <em className='sc-highlight'>yours.</em>
            </h2>
            <div className='mt-8 space-y-6 text-lg leading-[1.6] text-[var(--sc-body)] sm:mt-10 sm:text-xl'>
              <p>
                Hi, I’m Roma, a designer from Ukraine who loves board games. I
                built Score Counter in my free time because I wanted a simple, fun
                way to keep track of scores.
              </p>
              <p>
                It started as a small side project. The idea is still the same:
                less time keeping score, more time enjoying the game. No ads or
                pop-ups getting in the way.
              </p>
            </div>
          </section>
        </SectionAnimate>
        <div className='w-full max-w-3xl'>
          <DashedDivider />
        </div>
        <SectionAnimate inView className='w-full'>
          <section
            aria-labelledby='reviews-heading'
            className='w-full pb-12 pt-14 sm:pb-16 sm:pt-16'>
            <h2 id='reviews-heading' className='sc-reviews-title'>
              Good company for <span className='italic'>{useCase}.</span>
            </h2>
            <div
              id='score-counter-reviews'
              aria-live='polite'
              className='mt-10 grid gap-4 text-left md:grid-cols-3 md:gap-6 sm:mt-12'>
              {visibleTestimonials.map((quote) => (
                <figure
                  key={quote}
                  className='sc-review flex min-h-[216px] flex-col rounded-3xl p-6 sm:min-h-[282px] sm:rounded-[28px] sm:p-8'>
                  <span
                    aria-hidden='true'
                    className='sc-review-mark mb-5 flex size-10 items-center justify-center rounded-2xl pt-3 text-4xl font-bold leading-none'
                    style={{ fontFamily: 'var(--font-serif)' }}>
                    “
                  </span>
                  <blockquote className='flex-1 text-lg font-medium leading-[1.5] tracking-[-0.015em] lg:text-xl'>
                    <p>{quote}</p>
                  </blockquote>
                  <figcaption className='mt-8 text-sm text-[var(--sc-muted)]'>
                    Google Play review
                  </figcaption>
                </figure>
              ))}
            </div>
            <button
              type='button'
              onClick={showMoreReviews}
              disabled={reviewsLoading}
              data-goatcounter-click='score-counter-more-reviews'
              aria-controls='score-counter-reviews'
              className='mt-7 inline-flex min-h-11 cursor-pointer items-center gap-2 text-sm underline underline-offset-4 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground disabled:cursor-wait disabled:opacity-60'>
              {reviewsLoading ? 'Loading reviews…' : 'More from users'}
              <RiRestartFill
                key={restartCount}
                size={16}
                aria-hidden='true'
                className={restartCount > 0 ? 'sc-reviews-restart' : undefined}
              />
            </button>
            {reviewsError && (
              <p role='status' className='text-sm text-[var(--sc-muted)]'>
                Couldn’t load more reviews. Try again.
              </p>
            )}
          </section>
        </SectionAnimate>

        <SectionAnimate inView className='w-full'>
          <section
            aria-labelledby='closing-download-heading'
            className='w-full py-12 sm:py-16'>
            <h2 id='closing-download-heading' className='sc-section-title'>
              Keep score.
              <br />
              Keep playing.
            </h2>
            <div className='mt-7 flex flex-wrap justify-center gap-4'>
              <StoreButtons />
            </div>
          </section>
        </SectionAnimate>

        <div className='w-full pb-12 sm:pb-16'>
          {/* Decorative illustration – aria-hidden, purely visual */}
          <div
            aria-hidden='true'
            className='pointer-events-none mt-10 w-full overflow-hidden opacity-45 dark:opacity-25'>
            <svg
              viewBox='0 0 1448 520'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              className='w-full'
              preserveAspectRatio='xMidYMid meet'>
              <path
                d='M281.297 135.574C281.297 163.782 298.667 273.048 421.592 273.048C544.516 273.048 562.183 156.804 562.183 131.121C562.183 117.462 535.609 109.446 512.746 107.961'
                stroke='currentColor'
                strokeWidth='5.5672'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M343.204 107.367C305.347 111.969 281.891 121.768 281.891 133.199C281.891 150.569 346.174 162 421.591 162C497.009 162 562.182 148.936 562.182 133.199'
                stroke='currentColor'
                strokeWidth='5.5672'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M320.193 146.559C314.551 142.254 303.417 138.84 305.792 132.01C308.168 125.033 321.232 127.26 328.655 132.307'
                stroke='currentColor'
                strokeWidth='4.8669'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M319.895 146.264C329.99 131.715 342.758 104.398 351.22 101.577C361.464 98.0142 386.256 130.378 401.399 144.185'
                stroke='currentColor'
                strokeWidth='4.8669'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M377.648 122.806C371.264 109.89 366.513 94.1537 372.006 92.3721C378.687 90.2937 398.877 109.89 410.012 121.619'
                stroke='currentColor'
                strokeWidth='4.8669'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M404.965 125.777C417.881 107.071 436.438 72.777 442.971 72.6286C451.433 72.3316 462.122 103.805 470.584 117.315'
                stroke='currentColor'
                strokeWidth='4.8669'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M452.768 132.753C474.443 114.79 497.602 87.1763 505.025 87.7702C510.518 88.364 512.745 124.291 514.675 137.059L535.757 126.518L532.787 145.669'
                stroke='currentColor'
                strokeWidth='5.4381'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M390.118 150.123C396.65 146.412 406.152 142.106 410.606 141.958C414.02 141.958 414.911 147.005 416.692 146.857C420.998 146.263 438.664 134.98 442.821 136.316C446.978 137.801 442.079 152.35 434.062 159.328'
                stroke='currentColor'
                strokeWidth='4.8669'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M445.791 142.998L458.855 139.732'
                stroke='currentColor'
                strokeWidth='3.6198'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M454.994 138.098C459.299 143.74 471.473 148.342 478.896 148.936'
                stroke='currentColor'
                strokeWidth='4.8669'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M231.339 141.299C240.908 141.299 248.665 139.134 248.665 136.465C248.665 133.795 240.908 131.631 231.339 131.631C221.771 131.631 214.014 133.795 214.014 136.465C214.014 139.134 221.771 141.299 231.339 141.299Z'
                fill='currentColor'
              />
              <path
                d='M275.724 109.177C277.714 107.554 274.354 100.139 268.218 92.6162C262.082 85.0931 255.495 80.3102 253.505 81.9333C251.515 83.5563 254.876 90.9707 261.011 98.4937C267.147 106.017 273.734 110.8 275.724 109.177Z'
                fill='currentColor'
              />
              <path
                d='M647.492 101.982C636.998 99.9805 628.935 96.0294 629.483 93.1573C630.031 90.2853 638.982 89.5799 649.476 91.5818C659.971 93.5837 668.034 97.5348 667.486 100.407C666.938 103.279 657.987 103.984 647.492 101.982Z'
                fill='currentColor'
              />
              <path
                d='M668.073 75.9452C667.406 78.6072 655.84 78.0036 642.239 74.5969C628.639 71.1903 618.154 66.2706 618.821 63.6086C619.488 60.9465 631.054 61.5502 644.654 64.9569C658.255 68.3635 668.739 73.2831 668.073 75.9452Z'
                fill='currentColor'
              />
              <path
                d='M633.147 16.4284C634.623 14.1148 645.402 18.3518 657.222 25.8921C669.043 33.4323 677.428 41.4205 675.953 43.7341C674.477 46.0478 663.698 41.8107 651.878 34.2705C640.057 26.7302 631.671 18.742 633.147 16.4284Z'
                fill='currentColor'
              />
              <path
                d='M942.39 178.311C954.187 179.406 963.964 177.987 964.228 175.143C964.492 172.298 955.142 169.105 943.345 168.011C931.548 166.916 921.77 168.335 921.507 171.18C921.243 174.024 930.592 177.217 942.39 178.311Z'
                fill='currentColor'
              />
              <path
                d='M917.202 142.909C919.005 145.234 930.456 139.37 942.778 129.811C955.1 120.253 963.628 110.62 961.825 108.296C960.022 105.971 948.571 111.835 936.248 121.394C923.926 130.952 915.399 140.585 917.202 142.909Z'
                fill='currentColor'
              />
              <path
                d='M304.01 167.493C301.486 170.165 307.573 186.644 311.879 186.051C316.184 185.457 307.573 164.821 304.01 167.493Z'
                fill='currentColor'
              />
              <path
                d='M321.159 186.412C322.199 185.998 321.83 182.616 320.334 178.858C318.839 175.1 316.784 172.389 315.744 172.803C314.704 173.217 315.073 176.599 316.569 180.357C318.064 184.115 320.12 186.826 321.159 186.412Z'
                fill='currentColor'
              />
              <path
                d='M316.779 197.333C314.552 200.896 328.656 220.047 332.665 218.86C336.079 217.375 319.303 195.255 316.779 197.333Z'
                fill='currentColor'
              />
              <path
                d='M352.113 124.885C349.293 127.706 352.113 140.325 358.646 140.028C361.763 139.286 354.934 123.104 352.113 124.885Z'
                fill='currentColor'
              />
              <path
                d='M440.593 103.507C437.624 104.546 434.21 113.751 436.436 114.196C439.109 114.938 443.859 103.655 440.593 103.507Z'
                fill='currentColor'
              />
              <path
                d='M494.04 117.314C491.071 118.353 485.281 127.261 486.914 128.003C488.696 129.191 496.713 118.056 494.04 117.314Z'
                fill='currentColor'
              />
              <path
                d='M393.088 98.4588C400.956 97.1226 412.536 97.568 420.108 99.0526'
                stroke='currentColor'
                strokeWidth='4.8669'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M462.418 96.8266C470.732 96.6781 479.639 97.4204 486.023 99.2019'
                stroke='currentColor'
                strokeWidth='4.8669'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M317.225 232.815C252.348 234.448 65.5429 249.492 0.369141 254.688'
                stroke='currentColor'
                strokeWidth='4.3235'
              />
              <path
                d='M524.623 233.706C561.293 232.666 597.814 232.666 630.475 233.706'
                stroke='currentColor'
                strokeWidth='3.7724'
              />
              <path
                d='M889.389 235.785L1009.2 236.973'
                stroke='currentColor'
                strokeWidth='4.4994'
              />
              <path
                d='M914.33 290.715L1088.18 192.732C1091.44 190.802 1095.3 190.06 1099.16 190.06L1443.1 190.06'
                stroke='currentColor'
                strokeWidth='5.9981'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M917.15 326.79L1441.23 405.673'
                stroke='currentColor'
                strokeWidth='4.1320'
              />
              <path
                d='M1155.13 206.24L1101.98 206.092C1101.09 206.092 1100.05 206.389 1099.31 206.834L922.495 312.24C919.08 314.17 920.119 317.882 924.276 318.624L1370.26 387.179'
                stroke='currentColor'
                strokeWidth='2.8760'
              />
              <path
                d='M1047.8 237.496L1109.51 242.527L1104.36 267.095L1151.82 280.415L1141.54 312.53L1190.02 329.106L1181.94 357.669'
                stroke='currentColor'
                strokeWidth='2.5576'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M1151.42 280.172L1206.2 271.71L1224.61 246.324L1295.72 241.276L1318.44 249.738'
                stroke='currentColor'
                strokeWidth='2.5576'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M1270.19 291.456L1324.97 282.994L1343.38 257.607L1414.49 252.56L1437.2 261.022'
                stroke='currentColor'
                strokeWidth='2.5576'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M1295.72 241.278L1320.22 209.508L1198.33 207.281M1415.18 243.441L1439.67 211.671L1317.79 209.444'
                stroke='currentColor'
                strokeWidth='2.4552'
              />
              <path
                d='M1227.43 208.171L1211.55 219.899L1227.13 224.353L1198.78 234.151'
                stroke='currentColor'
                strokeWidth='2.5576'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M1209.91 233.558L1224.61 246.326'
                stroke='currentColor'
                strokeWidth='2.5576'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M1206.2 271.711L1228.62 283.291'
                stroke='currentColor'
                strokeWidth='2.8760'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M1141.03 312.389L1094.11 321.297L1081.94 334.064'
                stroke='currentColor'
                strokeWidth='2.5576'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M1190.02 329.018L1218.52 322.337'
                stroke='currentColor'
                strokeWidth='2.5576'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M1279.39 324.119L1315.62 340.598L1305.52 365.539'
                stroke='currentColor'
                strokeWidth='2.5576'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M1399.64 326.79L1363.42 343.269L1373.52 368.21'
                stroke='currentColor'
                strokeWidth='2.5576'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M1277.17 289.675L1320.07 284.627'
                stroke='currentColor'
                strokeWidth='1.9385'
              />
              <path
                d='M1103.47 266.813L1086.84 270.97'
                stroke='currentColor'
                strokeWidth='1.8784'
              />
              <path
                d='M1108.66 242.168L1129.15 232.519'
                stroke='currentColor'
                strokeWidth='2.3371'
              />
              <path
                d='M1124.99 216.931L1129.3 231.48L1144 232.371'
                stroke='currentColor'
                strokeWidth='2.1868'
              />
              <path
                d='M985.293 274.534L1031.17 281.214C1028.49 292.2 1028.79 304.077 1031.61 314.915L1015.13 324.862'
                stroke='currentColor'
                strokeWidth='2.6155'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M1031.17 281.214L1034.88 280.917'
                stroke='currentColor'
                strokeWidth='2.1000'
              />
              <path
                d='M1066.2 281.361C1069.77 279.877 1072.29 276.462 1072.29 272.157C1072.29 262.507 1065.61 259.686 1061.3 259.686C1054.77 259.686 1050.02 264.288 1050.02 271.117C1050.02 274.384 1051.21 277.65 1053.14 279.58C1046.9 280.619 1043.34 284.924 1043.34 289.378C1043.34 292.941 1045.42 295.762 1048.39 296.801C1044.82 302.888 1043.04 310.756 1043.34 315.358C1043.64 318.328 1050.02 318.921 1055.07 318.625C1059.08 318.328 1061.15 314.913 1062.34 311.647C1063.53 315.358 1065.61 318.625 1069.32 318.773C1073.48 319.07 1079.42 318.328 1079.71 315.21C1080.01 310.162 1078.52 301.849 1075.7 296.801C1079.27 295.91 1081.2 293.386 1081.2 289.823C1081.2 284.776 1073.77 281.361 1066.2 281.361Z'
                fill='currentColor'
              />
              <path
                d='M1179.78 220.493C1182 218.711 1183.34 215.891 1183.34 212.476C1183.34 205.35 1179.03 202.975 1173.99 202.975C1167.9 202.975 1165.37 208.022 1165.37 212.921C1165.37 215.445 1165.97 218.118 1167.16 220.047C1159.44 221.235 1156.17 225.244 1156.17 229.252C1156.17 232.221 1157.95 234.3 1160.18 235.19C1157.95 240.832 1156.47 247.364 1156.47 250.779C1156.47 253.154 1161.96 254.193 1166.56 254.193C1170.42 254.193 1172.35 251.076 1173.24 247.958C1174.43 251.224 1176.81 254.045 1180.81 254.193C1184.97 254.49 1189.28 253.599 1189.13 251.224C1189.13 247.067 1188.24 240.683 1186.75 235.339C1189.28 234.597 1190.32 232.667 1190.32 229.846C1190.32 224.947 1185.71 221.235 1179.78 220.493Z'
                fill='currentColor'
              />
              <path
                d='M1259.2 292.942C1261.13 290.863 1262.02 288.043 1262.02 284.331C1262.02 274.533 1256.53 271.118 1251.63 271.118C1243.61 271.118 1238.71 277.502 1238.71 284.925C1238.71 287.597 1239.31 290.121 1240.49 291.903C1232.63 293.684 1228.91 298.138 1228.91 302.889C1228.91 306.303 1230.84 308.827 1233.66 310.163C1230.1 317.141 1228.17 325.454 1228.62 330.651C1228.91 334.214 1234.26 335.104 1239.75 334.956C1245.39 334.659 1247.62 330.205 1249.1 325.751C1250.14 330.799 1252.22 334.807 1257.57 335.104C1263.36 335.401 1269.44 334.659 1269.44 331.096C1269.44 325.306 1267.96 316.398 1265.29 310.311C1268.85 309.272 1270.19 306.748 1270.19 303.037C1270.19 298.286 1265.29 294.129 1259.2 292.942Z'
                fill='currentColor'
              />
              <path
                d='M1077.61 378.309C1078.2 378.012 1079.24 377.864 1080.13 378.012L1231.41 404.587C1235.12 405.18 1236.31 408.744 1233.93 411.861L1194.15 462.189C1192.51 463.97 1189.84 464.861 1187.47 464.267L1030.99 431.903C1025.79 430.864 1024.61 425.816 1028.47 422.253L1077.61 378.309Z'
                stroke='currentColor'
                strokeWidth='5.3267'
              />
              <path
                d='M1032.03 433.388C1028.17 436.209 1027.28 444.225 1030.99 445.265L1194.29 483.567C1197.26 484.161 1200.38 483.122 1202.16 480.895L1241.21 431.012C1245.22 425.371 1241.5 422.105 1231.71 423.293'
                stroke='currentColor'
                strokeWidth='5.5962'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M1229.93 418.095L1233.34 425.37'
                stroke='currentColor'
                strokeWidth='5.0606'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M1226.36 432.644L1194.3 470.352C1192.81 471.837 1190.88 472.431 1188.95 471.985L1033.22 439.918'
                stroke='currentColor'
                strokeWidth='3.4238'
              />
              <path
                d='M1095.42 402.655C1113.68 403.694 1169.2 415.571 1179.75 419.431C1179.6 421.807 1099.58 405.921 1094.83 403.991C1093.94 403.694 1094.23 402.655 1095.42 402.655Z'
                fill='currentColor'
              />
              <path
                d='M1091.41 417.946C1109.67 419.579 1152.73 428.784 1159.56 432.347C1159.26 433.98 1095.57 420.47 1090.97 419.134C1090.37 418.837 1090.67 417.946 1091.41 417.946Z'
                fill='currentColor'
              />
              <path
                d='M679.466 194.66C673.973 193.472 671.152 194.66 668.183 197.778L617.706 248.848C606.423 261.318 599 272.898 596.18 280.173'
                stroke='currentColor'
                strokeWidth='5.6073'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M666.697 259.39C649.624 278.838 639.974 301.255 635.372 318.625L639.826 389.143C640.271 402.802 645.764 410.225 667.588 412.452C704.851 414.085 735.285 416.015 773.885 433.087'
                stroke='currentColor'
                strokeWidth='5.8311'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M823.176 399.24L892.804 78.1214C895.328 62.8301 887.905 52.4379 872.613 49.0234L747.313 24.5275C731.874 21.8553 722.521 28.8329 718.661 44.4211L640.125 380.534'
                stroke='currentColor'
                strokeWidth='6.0505'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M804.915 59.7085C808.522 59.7085 811.446 56.7846 811.446 53.1777C811.446 49.5709 808.522 46.647 804.915 46.647C801.308 46.647 798.384 49.5709 798.384 53.1777C798.384 56.7846 801.308 59.7085 804.915 59.7085Z'
                fill='currentColor'
              />
              <path
                d='M778.935 109.446L776.114 111.524L778.044 113.751L780.865 112.712L778.192 128.003L772.551 127.707L771.66 131.418L787.248 134.387L788.288 130.082L783.537 128.894L787.248 108.11L778.935 109.446Z'
                fill='currentColor'
              />
              <path
                d='M794.671 114.046C798.086 111.077 806.696 111.077 810.259 114.937C812.932 118.352 811.002 123.845 806.399 125.032C811.002 127.111 811.002 135.721 805.063 138.839C799.719 141.511 792.147 137.948 790.811 132.752L793.929 130.525C795.562 133.643 799.867 135.425 802.688 134.237C806.845 132.158 805.36 126.22 797.937 126.814L797.789 122.954C803.133 123.548 806.993 121.915 806.696 119.391C806.548 117.164 801.797 116.422 797.937 118.055L794.671 114.046Z'
                fill='currentColor'
              />
              <path
                d='M789.475 82.5759C786.209 80.7944 779.677 82.4275 778.044 88.8112C777.004 92.6712 778.934 95.3434 782.497 95.4919C786.357 95.6404 788.881 92.2258 789.03 88.9597L783.834 88.6628L783.388 91.0381L785.318 91.335C784.873 92.6712 782.943 93.4135 781.458 92.5227C780.122 91.632 780.567 88.6628 782.497 86.8812C783.982 85.3966 786.506 85.3966 788.139 85.9905L789.475 82.5759Z'
                fill='currentColor'
              />
              <path
                d='M790.069 90.2935L788.287 98.3103L791.108 98.6072L792.444 94.1534L795.265 94.4503L796.007 91.6296L790.069 90.2935Z'
                fill='currentColor'
              />
              <path
                d='M806.695 92.3724C804.32 91.1847 799.866 92.0755 798.975 95.6385C798.233 99.0531 801.796 100.835 804.914 100.092L805.211 97.717C803.874 98.0139 802.39 97.7169 802.093 96.8262L806.101 96.6777L806.695 92.3724Z'
                fill='currentColor'
              />
              <path
                d='M816.049 91.63C812.931 89.9969 807.586 91.1846 807.141 95.193C806.993 97.123 808.477 98.6076 810.556 98.9045L807.735 101.725L809.665 104.101C815.455 101.725 818.424 93.56 816.049 91.63ZM811.149 96.3807C810.259 96.2322 810.11 94.7476 810.853 94.1538C811.595 93.4115 813.228 93.5599 813.673 94.3022C814.119 95.3415 812.634 96.5292 811.149 96.3807Z'
                fill='currentColor'
              />
              <path
                d='M673.392 296.518L659.585 351.745C658.546 356.347 660.179 359.465 665.523 360.801L801.958 388.86C805.966 389.751 807.599 388.117 808.787 383.367L819.476 330.664C820.515 325.913 819.179 323.538 813.983 322.35L681.854 294.291C676.955 293.103 674.431 293.549 673.392 296.518Z'
                stroke='currentColor'
                strokeWidth='2.5687'
              />
              <path
                d='M735.731 314.023L727.565 325.009L730.683 325.9L733.058 322.634H737.215L737.512 325.9H740.63L739.591 314.023H735.731ZM734.395 320.407L736.028 317.438L736.325 320.407H734.395Z'
                fill='currentColor'
              />
              <path
                d='M744.046 315.063L741.67 327.237L744.64 327.682L746.867 315.36L744.046 315.063Z'
                fill='currentColor'
              />
              <path
                d='M748.797 320.801C749.753 320.801 750.528 320.026 750.528 319.07C750.528 318.114 749.753 317.339 748.797 317.339C747.841 317.339 747.066 318.114 747.066 319.07C747.066 320.026 747.841 320.801 748.797 320.801Z'
                fill='currentColor'
              />
              <path
                d='M746.866 320.556L745.233 328.869L748.5 329.166L749.984 320.704L746.866 320.556Z'
                fill='currentColor'
              />
              <path
                d='M743.601 353.067C746.867 352.176 748.797 349.949 748.797 346.535C748.797 341.636 744.194 339.26 739.592 339.26C734.396 339.26 731.575 342.526 731.575 346.089C731.575 348.613 732.615 350.692 734.396 351.879C729.497 352.77 726.676 355.739 726.676 359.896C726.676 364.647 731.427 367.468 737.068 367.468C743.155 367.468 746.718 364.053 746.718 359.748C746.867 356.779 745.679 354.403 743.601 353.067ZM739.741 342.823C741.968 342.823 743.452 343.863 743.452 345.941C743.452 347.871 741.968 349.356 739.592 349.356C737.365 349.356 736.178 348.019 736.178 346.089C736.178 344.011 737.662 342.823 739.741 342.823ZM737.365 362.42C734.545 362.42 733.06 361.232 733.06 359.154C733.06 356.778 734.842 355.145 737.811 355.145C740.631 355.145 741.968 356.482 741.968 358.708C741.968 360.935 740.335 362.42 737.365 362.42Z'
                fill='currentColor'
              />
              <path
                d='M746.421 409.037L700.992 399.387'
                stroke='currentColor'
                strokeWidth='1.9563'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M626.318 399.683C631.811 410.966 646.805 417.35 669.817 414.678C681.099 426.554 684.366 451.496 675.013 467.975'
                stroke='currentColor'
                strokeWidth='3.6076'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M673.23 414.53C685.404 428.782 689.561 450.458 683.771 465.452'
                stroke='currentColor'
                strokeWidth='5.8957'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M605.384 508.059C627.356 490.096 644.875 472.429 677.239 466.787C709.009 461.146 761.564 466.639 758.743 441.698C758.298 437.986 755.329 435.166 747.906 434.275C742.709 433.384 738.256 433.236 736.623 433.533C737.216 440.807 736.771 448.082 734.99 453.723'
                stroke='currentColor'
                strokeWidth='4.8591'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M805.805 511.773C795.561 476.439 772.401 433.089 765.869 405.476C761.267 384.098 769.581 362.719 784.575 363.759C800.906 366.282 816.197 393.747 830.152 424.182C839.654 444.372 855.539 466.641 868.158 477.479'
                stroke='currentColor'
                strokeWidth='5.0328'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M766.464 371.625C763.791 380.384 767.8 395.972 776.856 403.544C783.537 397.754 791.702 393.3 798.531 391.37C798.086 381.126 792.741 369.695 786.506 366.28C779.38 364.796 772.402 367.023 766.464 371.625Z'
                fill='currentColor'
              />
              <path
                d='M793.929 423.736L804.172 417.5'
                stroke='currentColor'
                strokeWidth='1.5789'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M795.412 429.525L807.883 423.884'
                stroke='currentColor'
                strokeWidth='1.5789'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M846.483 446.005C861.923 419.579 858.806 392.262 867.119 368.212C874.988 356.78 897.257 351.436 912.103 358.562C923.534 366.282 924.276 386.918 931.848 399.834C946.842 426.557 959.164 486.534 966.29 515.929'
                stroke='currentColor'
                strokeWidth='4.6141'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M923.089 373.702C926.652 360.489 923.98 348.761 912.103 346.237C893.249 341.635 871.425 347.425 865.338 360.935C861.775 328.274 858.361 281.657 859.4 246.472C859.697 224.797 866.971 213.366 877.66 213.663C879.887 213.514 882.263 217.671 884.341 227.767C896.663 266.811 908.688 308.974 916.111 346.98'
                stroke='currentColor'
                strokeWidth='4.8847'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M860.587 365.093L842.178 335.104L834.013 391.371L840.842 398.348C839.506 412.897 845.296 426.853 853.61 434.276'
                stroke='currentColor'
                strokeWidth='7.2641'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M857.617 220.492L823.62 397.753'
                stroke='currentColor'
                strokeWidth='4.1843'
              />
              <path
                d='M877.66 162.446C876.917 172.986 874.987 184.566 871.721 189.317'
                stroke='currentColor'
                strokeWidth='5.8122'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M873.948 354.107L875.581 362.718'
                stroke='currentColor'
                strokeWidth='4.6809'
              />
              <path
                d='M906.313 346.537L908.54 356.484'
                stroke='currentColor'
                strokeWidth='5.6385'
              />
              <path
                d='M582.077 300.069C574.951 316.251 472.959 454.764 444.604 496.926'
                stroke='currentColor'
                strokeWidth='4.5573'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M260.215 310.461L147.98 338.817C142.041 340.45 140.557 344.31 144.12 348.764L200.238 411.117C202.168 413.344 205.285 414.234 208.106 413.344L322.568 377.862C327.467 376.377 328.061 372.517 324.35 368.509L266.896 312.836C265.114 311.203 262.591 310.016 260.215 310.461Z'
                stroke='currentColor'
                strokeWidth='5.2120'
              />
              <path
                d='M145.308 355.294C141.003 357.521 139.964 361.678 143.082 365.538L198.16 430.712C200.535 433.384 204.247 434.572 207.513 433.533L324.054 398.645C329.695 396.863 328.953 390.182 322.718 387.213'
                stroke='currentColor'
                strokeWidth='5.2120'
              />
              <path
                d='M146.495 359.007L200.237 419.282C202.167 421.36 204.988 421.954 207.66 421.212L323.31 385.73'
                stroke='currentColor'
                strokeWidth='3.8692'
              />
              <path
                d='M191.626 356.78C207.066 350.841 249.971 339.707 258.582 339.707'
                stroke='currentColor'
                strokeWidth='2.4574'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M213.007 375.337C226.22 370.438 257.396 362.718 265.116 362.421'
                stroke='currentColor'
                strokeWidth='1.9296'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M413.871 295.762L348.697 339.855C344.986 342.23 345.877 345.645 350.924 346.832L443.118 366.281C444.751 366.726 446.384 366.281 447.571 365.241L506.51 316.547C509.331 314.32 508.588 311.499 504.135 310.757L417.286 295.614C416.098 295.465 414.91 295.317 413.871 295.762Z'
                stroke='currentColor'
                strokeWidth='4.9816'
              />
              <path
                d='M426.49 317.734C417.285 316.992 407.042 318.18 407.339 321.594C407.339 323.079 408.675 324.564 410.456 325.603C400.064 328.572 393.235 332.58 394.719 335.995C396.352 340.3 410.605 339.261 419.809 336.737C420.106 339.261 421.145 341.636 423.669 342.676C428.123 344.457 435.249 345.645 437.476 343.715C440 341.191 441.484 335.698 441.93 331.69C448.759 332.58 453.955 331.838 453.806 327.978C453.806 325.603 450.837 322.93 446.977 321.743C449.798 320.11 451.283 318.18 450.392 314.617C446.829 308.678 430.647 310.757 426.49 317.734Z'
                fill='currentColor'
              />
              <path
                d='M369.78 397.983V407.93C370.671 413.423 381.657 417.729 392.495 417.729C404.074 417.729 414.318 412.829 414.318 408.227V398.28'
                stroke='currentColor'
                strokeWidth='5.2120'
              />
              <path
                d='M391.751 406.311C403.877 406.311 413.708 402.118 413.708 396.946C413.708 391.774 403.877 387.582 391.751 387.582C379.624 387.582 369.793 391.774 369.793 396.946C369.793 402.118 379.624 406.311 391.751 406.311Z'
                stroke='currentColor'
                strokeWidth='5.2120'
              />
              <path
                d='M581.78 299.325C582.077 292.347 588.906 281.064 594.25 280.173C609.245 279.283 631.365 290.12 639.828 303.036C640.57 311.647 638.046 319.07 632.108 320.703C622.606 303.333 599.892 294.574 581.78 299.325Z'
                stroke='currentColor'
                strokeWidth='5.2421'
              />
              <path
                d='M601.821 280.621L593.804 298.436L609.986 300.515L615.924 284.036L601.821 280.621Z'
                fill='currentColor'
              />
              <path
                d='M637.451 299.475L630.622 321.15L632.849 330.652L643.241 320.556L643.835 303.187L637.451 299.475Z'
                fill='currentColor'
              />
              <path
                d='M673.38 415.57L678.428 430.565L687.484 428.783L682.881 416.461L673.38 415.57Z'
                fill='currentColor'
              />
              <path
                d='M733.951 432.345L733.208 454.911L753.102 454.168L754.587 436.056L733.951 432.345Z'
                fill='currentColor'
              />
              <path
                d='M690.302 220.343L676.496 275.57C675.456 280.172 677.089 283.29 682.434 284.626L818.868 312.685C822.877 313.576 824.51 311.943 825.698 307.192L836.387 254.489C837.426 249.738 836.09 247.363 830.894 246.175L698.765 218.116C693.865 216.929 691.342 217.374 690.302 220.343Z'
                stroke='currentColor'
                strokeWidth='2.5687'
              />
              <path
                d='M707.525 144.63L693.867 198.818C692.827 203.42 694.757 206.092 700.399 207.428L832.676 235.042C837.279 235.933 839.209 234.3 840.545 229.104L853.164 176.549C854.203 171.65 852.867 169.423 847.225 168.235L715.839 142.106C711.236 141.215 708.564 141.958 707.525 144.63Z'
                stroke='currentColor'
                strokeWidth='2.5687'
              />
              <path
                d='M724.793 68.9835L711.135 123.171C710.096 127.773 712.026 130.446 717.667 131.782L849.945 159.395C854.547 160.286 856.477 158.653 857.813 153.457L870.432 100.902C871.472 96.0031 870.135 93.7762 864.494 92.5885L733.107 66.4597C728.505 65.5689 725.833 66.3112 724.793 68.9835Z'
                stroke='currentColor'
                strokeWidth='2.5687'
              />
              <path
                d='M757.557 186.05C757.854 188.722 760.526 190.355 771.957 191.097C765.425 197.926 762.604 202.677 763.347 210.842C765.425 212.921 768.988 212.921 770.027 210.249C773.442 202.529 782.498 195.106 785.467 190.652C785.912 188.722 784.725 186.94 782.646 186.644L764.386 185.159C759.338 184.714 757.705 185.01 757.557 186.05Z'
                fill='currentColor'
              />
              <path
                d='M757.557 159.625L757.854 172.69L760.526 173.432L768.097 161.407L765.128 160.665L760.971 168.533L760.674 159.774L757.557 159.625Z'
                fill='currentColor'
              />
              <path
                d='M768.69 168.068C769.582 168.068 770.305 167.345 770.305 166.453C770.305 165.561 769.582 164.838 768.69 164.838C767.798 164.838 767.075 165.561 767.075 166.453C767.075 167.345 767.798 168.068 768.69 168.068Z'
                fill='currentColor'
              />
              <path
                d='M767.503 168.086L766.167 176.4L769.136 176.846L770.621 168.235L767.503 168.086Z'
                fill='currentColor'
              />
              <path
                d='M782.496 169.572C779.527 168.384 774.034 169.572 773.737 173.729C773.589 177.292 777.746 178.479 780.566 177.737L781.012 175.213C779.082 175.362 777.3 175.065 777.449 173.58C777.597 172.096 779.824 171.947 781.457 172.393L782.496 169.572Z'
                fill='currentColor'
              />
              <path
                d='M787.692 169.572L785.762 178.48L788.731 178.925L790.661 170.018L787.692 169.572Z'
                fill='currentColor'
              />
              <path
                d='M795.562 170.463L793.929 178.48L796.749 178.925L797.937 174.323L801.055 174.768L801.946 171.651L795.562 170.463Z'
                fill='currentColor'
              />
              <path
                d='M745.529 237.863L744.193 249.888L753.546 250.333L753.992 247.513L748.053 247.364L748.944 238.16L745.529 237.863Z'
                fill='currentColor'
              />
              <path
                d='M756.963 243.754C757.839 243.754 758.549 243.044 758.549 242.169C758.549 241.293 757.839 240.583 756.963 240.583C756.087 240.583 755.377 241.293 755.377 242.169C755.377 243.044 756.087 243.754 756.963 243.754Z'
                fill='currentColor'
              />
              <path
                d='M756.22 244.692L755.033 253.303L758.299 253.599L759.338 244.84L756.22 244.692Z'
                fill='currentColor'
              />
              <path
                d='M766.761 245.583C764.089 245.435 760.229 246.029 760.229 248.256C760.08 250.186 762.752 250.928 763.94 251.522L760.377 252.264L760.674 254.639L767.652 253.897L768.097 250.928L764.682 249.295L767.503 248.404L766.761 245.583Z'
                fill='currentColor'
              />
              <path
                d='M774.48 246.178C771.362 245.584 767.205 247.217 766.908 250.928C766.76 253.155 768.838 254.64 770.917 254.64L770.62 256.125L774.331 256.718L776.261 247.514L774.48 246.178ZM771.065 251.968C770.175 251.968 769.878 250.78 770.471 250.038C770.917 249.295 772.104 249.147 772.698 249.444L772.401 251.819C771.956 251.968 771.511 251.968 771.065 251.968Z'
                fill='currentColor'
              />
              <path
                d='M742.264 261.616L740.334 264.436L744.194 265.921L741.67 282.252H736.623L736.029 286.112L750.132 288.487L751.172 284.182L746.718 283.291L752.211 261.913L742.264 261.616Z'
                fill='currentColor'
              />
              <path
                d='M771.065 267.407L755.18 281.065L755.477 286.113L766.018 287.003L764.682 293.09L770.323 293.981L771.808 287.746L775.816 288.191L776.558 283.737L772.55 283.292L775.371 268.001L771.065 267.407ZM761.267 282.698L768.393 276.611L767.205 283.143L761.267 282.698Z'
                fill='currentColor'
              />
              <path
                d='M853.758 290.565L851.977 292.347'
                stroke='currentColor'
                strokeWidth='2.6723'
              />
            </svg>
          </div>
        </div>
      </main>
      <footer className='flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pb-8 text-center text-sm text-[var(--sc-muted)]'>
        <span className='inline-flex items-center gap-1'>
          Made by
          <Link
            to='/'
            data-goatcounter-click='score-counter-footer-portfolio'
            className='inline-flex min-h-11 items-center underline underline-offset-4 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground'>
            Roma
          </Link>
        </span>
        <Link
          to='/score-counter/privacy'
          data-goatcounter-click='score-counter-footer-privacy'
          className='inline-flex min-h-11 items-center underline underline-offset-4 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground'>
          Privacy Policy
        </Link>
      </footer>
    </div>
  );
}
