import { useEffect, useRef, useState } from 'react';
import { m } from 'motion/react';
import { RiArrowDownLine, RiCheckboxCircleFill } from '@remixicon/react';
import { Button } from './ui/Button';
import { useRandomCover } from '../hooks/useRandomCover';
import heroImg from '../assets/hero-image.png';
import heroHover from '../assets/hero-image-hover.jpeg';

const ease = [0.16, 1, 0.3, 1] as const;

const HOVER_FALLBACK = heroHover;

export function Hero() {
  // Easter egg: the flip's back face reveals a random real album cover, fetched
  // live and swapped for a new one each time you leave the card.
  const { cover, prefetchNext } = useRandomCover();
  const [hovering, setHovering] = useState(false);
  const [displayCover, setDisplayCover] = useState<string | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  // Kick off the first cover fetch only when the card is first hovered; every
  // later fetch happens on mouse-leave (below) so the back face never changes
  // under the user's eyes.
  const fetchStarted = useRef(false);

  useEffect(() => {
    const query = window.matchMedia('(min-width: 768px)');
    const update = () => setIsDesktop(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  // Reveal the first loaded cover as soon as it arrives — even mid-hover, since
  // that only replaces the generic fallback. Once a real cover is showing, swap
  // to the next one only while the back face is hidden, so it never changes
  // under the user's eyes.
  useEffect(() => {
    if (cover === null) return;
    if (displayCover === null || !hovering) setDisplayCover(cover);
  }, [cover, displayCover, hovering]);

  return (
    <section
      aria-labelledby='hero-heading'
      className='grid items-center gap-10 pt-10 md:grid-cols-[1.1fr_0.9fr] md:gap-12 md:pt-16'>
      <div className='flex flex-col gap-6'>
        <m.h1
          id='hero-heading'
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.42, delay: 0.05, ease }}
          className='text-balance text-4xl font-extrabold leading-[1.08] tracking-tight text-mt-text md:text-5xl lg:text-5xl'>
          The songs the labels quietly pulled from <span className='text-mt-green'>your library.</span>
        </m.h1>
        <m.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.42, delay: 0.1, ease }}
          className='max-w-[52ch] text-pretty text-base leading-relaxed text-mt-text-secondary md:text-lg'>
          It's usually temporary: licensing lapses, a label pulls its catalog,
          regions disagree. Save a track here, check back when it returns, and
          listen elsewhere in the meantime.
        </m.p>
        <m.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.42, delay: 0.15, ease }}
          className='flex flex-wrap items-center gap-2 pt-1'>
          <Button
            variant='primary'
            size='lg'
            trailingIcon={<RiArrowDownLine className='size-4' />}
            onClick={() => {
              document
                .getElementById('add-track')
                ?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
            }}>
            Add a missing track
          </Button>
        </m.div>
      </div>

      <m.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.1, ease }}
        onMouseEnter={() => {
          setHovering(true);
          if (!fetchStarted.current) {
            fetchStarted.current = true;
            prefetchNext();
          }
        }}
        onMouseLeave={() => {
          setHovering(false);
          prefetchNext();
        }}
        className='group relative mx-auto hidden aspect-square w-full max-w-sm rounded-mt-card border border-mt-border/40 bg-mt-surface md:block [perspective:1200px]'
        aria-hidden='true'>
        <div className='relative h-full w-full [transform-style:preserve-3d] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:[transform:rotateY(180deg)]'>
          <div className='absolute inset-0 overflow-hidden rounded-mt-card [backface-visibility:hidden]'>
            {isDesktop && (
              <img
                src={heroImg}
                width={1254}
                height={1254}
                alt=''
                decoding='async'
                className='h-full w-full object-cover'
              />
            )}
          </div>
          <div className='absolute inset-0 overflow-hidden rounded-mt-card [backface-visibility:hidden] [transform:rotateY(180deg)]'>
            {isDesktop && (
              <img
                src={displayCover ?? HOVER_FALLBACK}
                width={1050}
                height={1050}
                alt=''
                decoding='async'
                className='h-full w-full object-cover'
              />
            )}
            <RiCheckboxCircleFill className='absolute bottom-3 right-3 size-9 text-mt-green drop-shadow-[0_1px_4px_oklch(0.18_0.02_150/0.7)]' />
          </div>
        </div>
      </m.div>
    </section>
  );
}
