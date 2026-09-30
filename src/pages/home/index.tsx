import { ResponsiveImage } from '@/components/ui/responsive-image';
const scoreCounterCover = '/images/score-counter-cover.png';
const designSystemCover = '/images/design-system-cover.png';
const whiteLabelEsimCover = '/images/white-label-esim-cover.png';
const saasOnboardingCover = '/images/saas-onboarding-cover.png';

import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router';
import {
  AnimatePresence,
  m,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'motion/react';
import { SectionAnimate } from '@/components/ui/section-animate';
import { nbsp } from '@/lib/nbsp';
import { DashedDivider } from '@/components/ui/dashed-divider';
import { fluidBase, fluidH1, fluidSmall } from '@/lib/typography';

const DESKTOP_HOVER_QUERY =
  '(min-width: 768px) and (hover: hover) and (pointer: fine)';
const EXPERIENCE_POPOVER_WIDTH = 224;
const EXPERIENCE_POPOVER_HEIGHT = 280;

const workExperience = [
  {
    title: 'Yesim',
    period: '2021–26',
    image: '/images/exp_04.png',
    context:
      'Designed the B2C web experience for an eSIM platform with 3M users. Led the design of Yesim’s B2B platform, design systems, and self-service onboarding.',
  },
  {
    title: 'SMBF',
    period: '2020–21',
    image: '/images/exp_03.png',
    context:
      'Designed 0→1 B2B SaaS product that helped businesses manage their online reputation.',
  },
  {
    title: 'Eventssion',
    period: '2018–20',
    image: '/images/exp_02.png',
    context:
      'Designed B2B and B2C web and mobile products for event management, community management, time booking and ticketing. Led a team of 2 designers.',
  },
  {
    title: 'Eventssion',
    period: '2016–18',
    image: '/images/exp_01.png',
    context:
      'Worked as an Android developer on Eventssion’s early-stage B2C app, building features for event and community management, time booking, and ticketing.',
  },
];

const selectedWorks = [
  {
    title: 'Design system',
    subtitle: 'Yesim',
    description:
      'Unified 3 B2B products; about 4× faster Figma setup and around 30% fewer style QA issues',
    caseStudy: '/work/design-system',
    cover: designSystemCover,
  },
  {
    title: 'White-label eSIM',
    subtitle: 'Yesim',
    description:
      'Used a working prototype to resolve contrast, validation, and conditional states',
    caseStudy: '/work/white-label-esim',
    cover: whiteLabelEsimCover,
  },
  {
    title: 'Self-serve onboarding',
    subtitle: 'Yesim',
    description:
      'Designed the path from an empty account to the first assigned eSIM',
    caseStudy: '/work/saas-onboarding',
    cover: saasOnboardingCover,
  },
  {
    title: 'Score Counter',
    subtitle: 'Android app',
    description: 'Designed, built, and ran a solo app to 1M+ installs and 100K MAU',
    caseStudy: '/work/score-counter',
    cover: scoreCounterCover,
  },
];

type ConnectLink = {
  label: string;
  href: string;
  download?: boolean;
};

const connectLinks: ConnectLink[] = [
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/romashuliatiev',
  },
  {
    label: 'Email',
    href: [
      109, 97, 105, 108, 116, 111, 58, 104, 105, 64, 114, 111, 109, 97, 109, 97,
      107, 101, 115, 46, 99, 111, 109,
    ]
      .map((c) => String.fromCharCode(c))
      .join(''),
  },
  {
    label: 'Telegram',
    href: 'https://t.me/artificially_busy',
  },
  {
    label: 'CV',
    href: '/Roma_Shuliatiev_Product_Designer_Resume.pdf',
    download: true,
  },
];

function useDesktopHover() {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(DESKTOP_HOVER_QUERY);
    const updateMatches = () => setMatches(mediaQuery.matches);

    updateMatches();
    mediaQuery.addEventListener('change', updateMatches);

    return () => mediaQuery.removeEventListener('change', updateMatches);
  }, []);

  return matches;
}

function WorkExperienceList() {
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [readyImage, setReadyImage] = useState<string | null>(null);
  const isDesktopHover = useDesktopHover();
  const reduceMotion = useReducedMotion();
  const hasPosition = useRef(false);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const popoverX = useSpring(pointerX, { stiffness: 200, damping: 30 });
  const popoverY = useSpring(pointerY, { stiffness: 200, damping: 30 });

  useEffect(() => {
    if (!isDesktopHover) {
      setActiveImage(null);
      hasPosition.current = false;
    }
  }, [isDesktopHover]);

  const positionPopover = (event: MouseEvent<HTMLDivElement>) => {
    if (!isDesktopHover) return;

    const edgePadding = 16;
    const cursorGap = 20;
    const fitsToRight =
      event.clientX + cursorGap + EXPERIENCE_POPOVER_WIDTH <=
      window.innerWidth - edgePadding;
    const nextX =
      event.clientX +
      (fitsToRight ? cursorGap : -cursorGap - EXPERIENCE_POPOVER_WIDTH);
    const maxY = Math.max(
      edgePadding,
      window.innerHeight - EXPERIENCE_POPOVER_HEIGHT - edgePadding,
    );
    const nextY = Math.min(
      Math.max(event.clientY - EXPERIENCE_POPOVER_HEIGHT / 2, edgePadding),
      maxY,
    );

    pointerX.set(nextX);
    pointerY.set(nextY);

    if (!hasPosition.current || reduceMotion) {
      popoverX.jump(nextX);
      popoverY.jump(nextY);
      hasPosition.current = true;
    }
  };

  return (
    <>
      <div
        className='flex flex-col'
        style={{ gap: 'clamp(1rem, 0.9rem + 0.5vw, 1.5rem)' }}>
        {workExperience.map((job, i) => (
          <div
            key={`${job.title}-${job.period}`}
            onMouseEnter={(event) => {
              positionPopover(event);
              if (isDesktopHover) setActiveImage(job.image);
            }}
            onMouseMove={positionPopover}
            onMouseLeave={() => {
              setActiveImage(null);
              hasPosition.current = false;
            }}>
            <div
              className='flex flex-col'
              style={{ gap: 'clamp(0.125rem, 0.1rem + 0.1vw, 0.25rem)' }}>
              <div
                className='grid grid-cols-[minmax(0,1fr)_auto] items-baseline'
                style={{ columnGap: 'clamp(1rem, 0.8rem + 1vw, 2rem)' }}>
                <span style={{ fontSize: fluidBase, lineHeight: 1.4 }}>
                  {job.title}
                </span>
                <span
                  className='text-muted-foreground text-right'
                  style={{
                    fontSize: fluidSmall,
                    fontFamily: 'var(--font-mono)',
                    fontVariantNumeric: 'tabular-nums',
                    lineHeight: 1.4,
                    whiteSpace: 'nowrap',
                  }}>
                  {job.period}
                </span>
              </div>
              <p
                className='text-muted-foreground'
                style={{ fontSize: fluidSmall, lineHeight: 1.4 }}>
                {nbsp(job.context)}
              </p>
            </div>
            {i < workExperience.length - 1 && (
              <div className='mt-4'>
                <DashedDivider />
              </div>
            )}
          </div>
        ))}
      </div>

      {isDesktopHover &&
        createPortal(
          <AnimatePresence initial={false}>
            {activeImage && (
              <m.div
                key={activeImage}
                initial={
                  reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }
                }
                animate={{ opacity: readyImage === activeImage ? 1 : 0, scale: 1 }}
                exit={
                  reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98 }
                }
                transition={{
                  duration: reduceMotion ? 0 : 0.18,
                  ease: 'easeOut',
                }}
                className='pointer-events-none fixed left-0 top-0 z-50 overflow-hidden rounded-xl shadow-[0_12px_32px_oklch(0_0_0_/_0.18)] dark:shadow-[0_12px_32px_oklch(0_0_0_/_0.4)]'
                style={{
                  x: popoverX,
                  y: popoverY,
                  width: EXPERIENCE_POPOVER_WIDTH,
                  height: EXPERIENCE_POPOVER_HEIGHT,
                }}>
                <ResponsiveImage
                  src={activeImage}
                  sizes="224px"
                  width={672}
                  height={840}
                  alt=''
                  aria-hidden='true'
                  decoding='async'
                  onLoad={() => setReadyImage(activeImage)}
                  className='size-full object-cover outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10'
                />
              </m.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}

function ConnectListItem({ label, href, download }: ConnectLink) {
  return (
    <li>
      <a
        href={href}
        data-goatcounter-click={label}
        {...(download ?
          { download: true }
        : { target: '_blank', rel: 'noopener noreferrer' })}
        className='group inline-flex min-h-11 items-center gap-1.5 rounded-full bg-secondary px-4 py-2 text-foreground no-underline transition-[background-color,color,transform] duration-200 ease-out hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:scale-[0.96]'
        style={{ fontSize: fluidSmall, lineHeight: 1.2 }}>
        <span>{label}</span>
        <span
          aria-hidden
          className='text-xs leading-none transition-transform duration-200 ease-out group-hover:-translate-y-px group-hover:translate-x-px group-focus-visible:-translate-y-px group-focus-visible:translate-x-px'>
          {download ? '↓' : '↗'}
        </span>
      </a>
    </li>
  );
}

export function HomePage() {
  return (
    <div
      className='flex flex-col'
      style={{ gap: 'clamp(3rem, 2.5rem + 2.5vw, 5rem)' }}>
      {/* Introduction */}
      <SectionAnimate delay={0}>
        <section
          className='flex flex-col'
          style={{ gap: 'clamp(1.5rem, 1.25rem + 1.25vw, 2.5rem)' }}>
          <div
            className='flex flex-col'
            style={{ gap: 'clamp(0.75rem, 0.7rem + 0.25vw, 1rem)' }}>
            <h1
              style={{
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontSize: fluidH1,
                lineHeight: 1.2,
                letterSpacing: '-0.02em',
              }}>
              Roma Shuliatiev
            </h1>
            <p style={{ fontSize: fluidBase, lineHeight: 1.5 }}>
              {nbsp(
                'Product designer with a dev background. I close the gap between design and what engineers actually build.',
              )}
            </p>
          </div>
          <p
            className='text-muted-foreground'
            style={{ fontSize: fluidBase, lineHeight: 1.5 }}>
            <span className='pulsing-dot' aria-hidden='true' />
            {'Currently open for full-time roles'}
          </p>
        </section>
      </SectionAnimate>

      {/* Selected Work */}
      <SectionAnimate delay={0.1}>
        <section
          className='flex flex-col'
          style={{ gap: 'clamp(0.75rem, 0.7rem + 0.25vw, 1.25rem)' }}>
          <h2
            style={{
              fontSize: fluidBase,
              fontWeight: 500,
              lineHeight: 1.2,
              letterSpacing: '-0.01em',
            }}>
            Selected work
          </h2>
          <div
            className='flex flex-col'
            style={{ gap: 'clamp(1.25rem, 1rem + 1vw, 2rem)' }}>
            {selectedWorks.map((project, index) => (
              <Link
                key={project.title}
                to={project.caseStudy}
                data-goatcounter-click={`case-study-${project.title.toLowerCase().replace(/\s+/g, '-')}`}
                className='work-card group block rounded-xl overflow-hidden bg-card border border-border transition-colors hover:border-muted-foreground/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background'>
                <div className='overflow-hidden'>
                  <ResponsiveImage
                    src={project.cover}
                    alt={project.title}
                    width={1920}
                    height={1080}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    fetchPriority={index === 0 ? 'high' : 'auto'}
                    decoding='async'
                    className='w-full aspect-[16/9] object-cover group-hover:scale-[1.02] transition-transform duration-500 ease-out'
                  />
                </div>
                <div
                  className='p-4 sm:p-5 flex flex-col'
                  style={{ gap: 'clamp(0.25rem, 0.2rem + 0.15vw, 0.375rem)' }}>
                  <div className='flex items-baseline gap-2'>
                    <h3
                      className='group-hover:text-accent transition-colors'
                      style={{ fontSize: fluidBase, lineHeight: 1.3 }}>
                      {project.title}
                    </h3>
                    <span
                      className='text-muted-foreground'
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontStyle: 'italic',
                        fontSize: fluidSmall,
                      }}>
                      {project.subtitle}
                    </span>
                  </div>
                  <p
                    className='text-muted-foreground'
                    style={{ fontSize: fluidBase, lineHeight: 1.5 }}>
                    {nbsp(project.description)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </SectionAnimate>

      {/* Work Experience */}
      <SectionAnimate delay={0.15}>
        <section
          className='flex flex-col'
          style={{ gap: 'clamp(0.75rem, 0.7rem + 0.25vw, 1.25rem)' }}>
          <div className='flex justify-between items-center'>
            <h2
              style={{
                fontSize: fluidBase,
                fontWeight: 500,
                lineHeight: 1.2,
                letterSpacing: '-0.01em',
              }}>
              Work experience
            </h2>
          </div>
          <WorkExperienceList />
        </section>
      </SectionAnimate>

      {/* Skills */}
      <SectionAnimate delay={0.2}>
        <section
          className='flex flex-col'
          style={{ gap: 'clamp(0.75rem, 0.7rem + 0.25vw, 1.25rem)' }}>
          <h2
            style={{
              fontSize: fluidBase,
              fontWeight: 500,
              lineHeight: 1.2,
              letterSpacing: '-0.01em',
            }}>
            Skills & tools
          </h2>
          <p style={{ fontSize: fluidBase, lineHeight: 1.5 }}>
            {nbsp(
              'I work across product discovery, UX systems and end-to-end delivery — from complex B2B flows to solo-shipped mobile products.',
            )}
          </p>
          <p style={{ fontSize: fluidBase, lineHeight: 1.5 }}>
            {nbsp(
              'Strong in Figma, design systems, UX logic, prototyping, analytics and A/B testing. I also use AI coding tools to turn concepts into realistic product prototypes.',
            )}
          </p>
        </section>
      </SectionAnimate>

      {/* Connect */}
      <SectionAnimate delay={0.25}>
        <section
          className='flex flex-col'
          style={{ gap: 'clamp(0.75rem, 0.7rem + 0.25vw, 1.25rem)' }}>
          <h2
            style={{
              fontSize: fluidBase,
              fontWeight: 500,
              lineHeight: 1.2,
              letterSpacing: '-0.01em',
            }}>
            Get in touch
          </h2>
          <div
            className='flex flex-col'
            style={{ gap: 'clamp(1.5rem, 1.25rem + 1.25vw, 2.5rem)' }}>
            <ul
              className='flex flex-wrap'
              style={{
                rowGap: 'clamp(0.75rem, 0.7rem + 0.25vw, 1rem)',
                columnGap: 'clamp(1rem, 0.75rem + 0.5vw, 1.5rem)',
              }}>
              {connectLinks.map((item) => (
                <ConnectListItem key={item.label} {...item} />
              ))}
            </ul>
          </div>
        </section>
      </SectionAnimate>
    </div>
  );
}
