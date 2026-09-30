import { m } from 'motion/react';
import { useNavigate } from 'react-router';
import { RiArrowRightLine } from '@remixicon/react';
import { Button } from '../components/ui/Button';
import { Footer } from '../components/Footer';
import { cn } from '../lib/cn';

const ease = [0.16, 1, 0.3, 1] as const;
const HOME_PATH = '/missing-tracks-project';

type Step = {
  n: string;
  tone: 'green' | 'red';
  title: string;
  desc: string;
};

// The flow the page narrates: spot a track → Spotify can't play it (the dead end,
// flagged red) → save it → recheck later.
const STEPS: Step[] = [
  {
    n: '01',
    tone: 'green',
    title: 'You spot a track',
    desc: 'It catches you at a bar or in a set, and Shazam finally puts a name to it.',
  },
  {
    n: '02',
    tone: 'red',
    title: "Spotify won't play it",
    desc: 'You search and hit a wall: greyed out, region-locked, or gone from the catalog.',
  },
  {
    n: '03',
    tone: 'green',
    title: 'Save it to the list',
    desc: "Add the title, artist, and the link that wouldn't play. Takes a few seconds.",
  },
  {
    n: '04',
    tone: 'green',
    title: 'Recheck later',
    desc: 'Re-run it later. Licensing shifts, and often the song is quietly back.',
  },
];

const toneSlash: Record<Step['tone'], string> = {
  green: 'text-mt-green',
  red: 'text-mt-red',
};

function AboutHero() {
  return (
    <section
      aria-labelledby='about-hero-heading'
      className='flex flex-col gap-7 pt-10 md:pt-16'>
      <m.h1
        id='about-hero-heading'
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.42, delay: 0.05, ease }}
        className='text-balance text-4xl font-extrabold leading-[1.08] tracking-tight text-mt-text md:text-5xl lg:text-5xl'>
        <span className='block'>The track you found isn't on Spotify yet.</span>
        <span className='block text-mt-green'>Don't lose it.</span>
      </m.h1>
      <m.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.42, delay: 0.12, ease }}
        className='text-pretty text-base leading-relaxed text-mt-text-secondary md:text-lg'>
        Have you ever been in a situation like that? You heard a cool track,
        bookmarked it, and want to add it to your Spotify library, but bam—the
        track isn't available and you hit a dead end. Save it to a small
        watchlist so it isn't forgotten, then recheck when it comes back.
      </m.p>
    </section>
  );
}

function HowItWorks() {
  return (
    <m.section
      aria-labelledby='how-it-works-heading'
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.42, ease }}
      className='rounded-mt-card bg-mt-surface px-6 py-8 text-mt-text shadow-mt-card ring-1 ring-mt-border sm:px-9 sm:py-10 lg:px-12 lg:py-12'>
      <m.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.42, ease }}
        className='flex max-w-3xl flex-col gap-4'>
        <h2
          id='how-it-works-heading'
          className='text-balance text-4xl font-black uppercase leading-[0.96] tracking-normal text-mt-text sm:text-5xl lg:text-6xl'>
          How it works
        </h2>
        <p className='max-w-2xl text-pretty text-lg font-bold leading-snug text-mt-text-secondary sm:text-xl'>
          From a dead end to a song you can play again.
        </p>
      </m.div>

      <ol className='mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-9'>
        {STEPS.map((step, i) => {
          return (
            <li
              key={step.n}
              className='min-w-0'>
              <m.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.42, delay: 0.08 + i * 0.04, ease }}
                className='flex flex-col gap-4'>
                <div className='flex items-baseline gap-3 text-sm font-bold leading-none tracking-normal'>
                  <span className={cn('text-lg', toneSlash[step.tone])}>/</span>
                  <span>{step.n}</span>
                </div>
                <h3 className='text-balance text-base font-extrabold leading-tight tracking-normal sm:text-lg'>
                  {step.title}
                </h3>
                <p className='text-pretty text-[15px] font-medium leading-relaxed text-mt-text-secondary sm:text-base lg:text-[15px] xl:text-base'>
                  {step.desc}
                </p>
              </m.div>
            </li>
          );
        })}
      </ol>
    </m.section>
  );
}

function ClosingCta() {
  const navigate = useNavigate();
  return (
    <m.section
      aria-labelledby='about-cta-heading'
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.42, ease }}>
      <div className='flex flex-col items-start gap-7 rounded-mt-card border border-mt-border bg-mt-mint p-8 sm:flex-row sm:items-center sm:justify-between sm:gap-10 sm:p-12'>
        <h2
          id='about-cta-heading'
          className='text-balance text-2xl font-extrabold leading-tight tracking-tight text-mt-bg sm:text-3xl'>
          Start with the song you just looked up.
        </h2>
        <Button
          variant='primary'
          size='lg'
          className='shrink-0'
          trailingIcon={<RiArrowRightLine className='size-4' />}
          onClick={() => navigate(HOME_PATH)}
          data-goatcounter-click='missing-tracks-about-cta'>
          Open the watchlist
        </Button>
      </div>
    </m.section>
  );
}

export function MissingTracksAboutPage() {
  return (
    <main className='mx-auto flex w-full max-w-[1024px] flex-col gap-[clamp(4rem,8vw,8rem)] px-6 pb-16 md:px-8'>
      <AboutHero />
      <HowItWorks />
      <ClosingCta />
      <Footer />
    </main>
  );
}
