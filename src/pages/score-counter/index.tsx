import { Link } from 'react-router';
import { RiArrowRightUpLine } from '@remixicon/react';
import { SectionAnimate } from '@/components/ui/section-animate';
import { nbsp } from '@/lib/nbsp';
import {
  fluidBase,
  fluidSmall,
  innerGap,
  sectionGap,
} from '@/lib/typography';
import {
  CaseFacts,
  CaseFigure,
  CaseHero,
  CaseNavigation,
  CaseVideo,
  OutcomeGrid,
  SectionHeading,
  SubHeading,
} from '@/components/case-study/case-study-components';

const facts = [
  { label: 'Role', value: 'Solo product owner' },
  { label: 'Since', value: '2016' },
  { label: 'Platform', value: 'Android' },
  { label: 'Scope', value: 'Design · code · releases · support' },
];

const outcomes = [
  { value: '1M+', label: 'installs' },
  { value: '100K+', label: 'MAU' },
  { value: '43%', label: 'store conversion' },
  { value: '4.7★', label: 'rating' },
];

function Body({ children }: { children: React.ReactNode }) {
  return (
    <p
      className='text-pretty text-foreground/80'
      style={{ fontSize: fluidBase, lineHeight: 1.6 }}>
      {children}
    </p>
  );
}

export function ScoreCounterPage() {
  return (
    <div className='flex flex-col' style={{ gap: sectionGap }}>
      <SectionAnimate delay={0.05}>
        <CaseHero
          title='Score Counter, built and run solo since 2016'
          lede='I taught myself Android to replace pen and paper during game nights. The app grew to 1M+ installs and 100K monthly active users without paid marketing.'
        />
      </SectionAnimate>

      <SectionAnimate delay={0.08}>
        <div className='flex flex-col gap-3'>
          <OutcomeGrid items={outcomes} />
          <p className='text-pretty text-xs leading-[1.5] text-muted-foreground'>
            Install and monthly active user figures: Google Play Console KPI trends, August 2026.
          </p>
        </div>
      </SectionAnimate>

      <SectionAnimate delay={0.1}>
        <CaseFigure
          src='/images/score-counter-hero.jpg'
          alt='People using Score Counter on a phone during a tabletop game'
          caption='The original job stayed simple: replace a paper score sheet without interrupting the game.'
          eager
        />
      </SectionAnimate>

      <SectionAnimate delay={0.11}>
        <CaseFacts items={facts} />
      </SectionAnimate>

      <SectionAnimate delay={0.13}>
        <div className='flex flex-col' style={{ gap: innerGap }}>
          <SectionHeading>A personal utility became a product</SectionHeading>
          <Body>
            {nbsp(
              'The counter apps I tried were crowded with ads or made a quick score change feel like setup work. I had no Android experience, so I learned enough to design, build, publish, and support the version I wanted to use.',
            )}
          </Body>
          <Body>
            {nbsp(
              'Discovery came through Play search, recommendations, and volunteer translations. Reviews also showed that people were using the app outside board games: sports, household tasks, habits, and any situation that needed a few named counters.',
            )}
          </Body>
        </div>
      </SectionAnimate>

      <SectionAnimate delay={0.15}>
        <div className='flex flex-col' style={{ gap: innerGap }}>
          <SectionHeading>The design problem was feature pressure</SectionHeading>
          <Body>
            {nbsp(
              'Requests for saved sessions, deeper customisation, timers, graphs, and game-specific rules were often reasonable on their own. Together, they could have buried the action that made the app useful: open it, add counters, start counting.',
            )}
          </Body>
          <SubHeading>Protect the start path, move depth around it</SubHeading>
          <Body>
            {nbsp(
              'I kept the active counter immediate and treated everything else as optional depth. Session history, graphs, and extra controls could evolve without becoming gates before the first score change.',
            )}
          </Body>
        </div>
      </SectionAnimate>

      <SectionAnimate delay={0.17}>
        <CaseVideo
          src='/videos/score-counter-flow.mp4'
          label='Score Counter core interaction from opening the app to changing a score'
          caption='The core loop stays direct: open → add counters → count. Extra tools remain outside that first interaction.'
        />
      </SectionAnimate>

      <SectionAnimate delay={0.19}>
        <div className='flex flex-col' style={{ gap: innerGap }}>
          <SectionHeading>Iteration changed the product, not its job</SectionHeading>
          <Body>
            {nbsp(
              'The interface moved from numbered rows and small controls to large, named counter surfaces that are easier to scan across a table. Later releases added history, visual summaries, and more control without turning the app into a tool for one specific game.',
            )}
          </Body>
          <Body>
            {nbsp(
              'The timer, graph history visualisation, and custom colour picker are three shipped examples.',
            )}
          </Body>
          <SubHeading>2026: add a timer without slowing the score flow</SubHeading>
          <Body>
            {nbsp(
              'Two Google Play reviews asked for a timer. One reviewer described the small hourglasses included with board games as easy to lose or break and wanted the app to replace them.',
            )}
          </Body>
          <Body>
            {nbsp(
              'I checked popular game-assistant tools and found that timers were common. I shipped the timer on a separate screen so it would not interrupt the main counting flow. I did not measure a post-release result, so the evidence ends at shipment.',
            )}
          </Body>
          <SubHeading>January 2026: add custom colours after user requests</SubHeading>
          <Body>
            {nbsp(
              'Users asked to choose their own counter colours, and I shipped a custom colour picker in January 2026. I did not measure a post-release result.',
            )}
          </Body>
          <SubHeading>August 2026: add graph history after user requests</SubHeading>
          <Body>
            {nbsp(
              'Users asked for graph history, and I shipped the feature in August 2026. I did not measure what changed after release.',
            )}
          </Body>
        </div>
      </SectionAnimate>

      <SectionAnimate delay={0.21}>
        <CaseFigure
          src='/images/score-counter-evolution.png'
          alt='Score Counter interface in 2018 and 2025, showing the change from small score rows to large named counter cards'
          caption='2018 → 2025: larger targets, clearer player identity, and optional controls improved use at a distance while the basic counting model stayed intact.'
        />
      </SectionAnimate>

      <SectionAnimate delay={0.23}>
        <div className='flex flex-col' style={{ gap: innerGap }}>
          <SectionHeading>One feedback loop, one owner</SectionHeading>
          <div className='grid gap-3 sm:grid-cols-2'>
            {[
              ['Listen', 'Read Play reviews, answer support, and group repeated requests.'],
              ['Choose', 'Check whether a request helps broad counting use without slowing the start path.'],
              ['Ship', 'Design, build, test, release, and update the store listing myself.'],
              ['Watch', 'Use ratings, adoption, support, and new requests to shape the next release.'],
            ].map(([title, text]) => (
              <div key={title} className='rounded-xl bg-card p-5 card-shadow'>
                <p className='text-xs font-medium uppercase tracking-wide text-muted-foreground'>{title}</p>
                <p className='mt-2 text-pretty text-sm leading-[1.55] text-foreground/80'>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionAnimate>

      <SectionAnimate delay={0.25}>
        <CaseVideo
          src='/videos/score-counter-bonus.mp4'
          label='Real Score Counter reviews and messages describing unexpected counting uses'
          caption='Direct user evidence: a general counting model supported use cases I did not plan, from sport to household tallies.'
        />
      </SectionAnimate>

      <SectionAnimate delay={0.27}>
        <div className='flex flex-col' style={{ gap: innerGap }}>
          <SectionHeading>Proof from long-term iteration</SectionHeading>
          <Body>
            {nbsp(
              'Score Counter has passed 1M installs, serves 100K monthly active users, and holds a 4.9 Play rating. Paid marketing spend remains zero. On August 24, 2026, it ranked #1 in Google Play for "score counter" in the US/en-US locale.',
            )}
          </Body>
          <div className='grid gap-3 sm:grid-cols-2'>
            <blockquote className='rounded-xl bg-card p-5 card-shadow'>
              <p className='text-pretty font-serif text-lg leading-[1.4]'>“Does what it needs to do.”</p>
              <footer className='mt-3 text-xs text-muted-foreground'>Google Play review</footer>
            </blockquote>
            <blockquote className='rounded-xl bg-card p-5 card-shadow'>
              <p className='text-pretty font-serif text-lg leading-[1.4]'>“Where’s the 6 star button?”</p>
              <footer className='mt-3 text-xs text-muted-foreground'>Google Play review</footer>
            </blockquote>
          </div>
          <Link
            to='/work/score-counter/reviews'
            data-goatcounter-click='testimonials-see-all-reviews'
            className='group inline-flex min-h-11 items-center gap-2 self-start text-sm text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground'>
            Read the review wall
            <RiArrowRightUpLine size={16} className='transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5' aria-hidden />
          </Link>
        </div>
      </SectionAnimate>

      <SectionAnimate delay={0.29}>
        <div className='flex flex-col' style={{ gap: innerGap }}>
          <SectionHeading>Reflection</SectionHeading>
          <Body>
            {nbsp(
              'Long-term ownership changed how I judge feature requests. A small tool can grow more capable without making its first action harder. The constraint has to hold release after release.',
            )}
          </Body>
          <Body>
            {nbsp(
              'As LLMs take on more of the implementation work, I think it is inevitable that more companies will experiment with native apps. Lower development costs make native performance and a more cohesive customer experience easier to justify.',
            )}
          </Body>
        </div>
      </SectionAnimate>

      <SectionAnimate delay={0.31}>
        <Link
          to='/score-counter'
          data-goatcounter-click='score-counter-get-app'
          target='_blank'
          rel='noopener noreferrer'
          className='inline-flex min-h-11 items-center gap-2 self-start rounded-lg bg-foreground px-4 py-2.5 text-background transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background'
          style={{ fontSize: fluidSmall, lineHeight: 1 }}>
          Get Score Counter app
          <RiArrowRightUpLine size={16} aria-hidden />
        </Link>
      </SectionAnimate>

      <SectionAnimate delay={0.33}>
        <CaseNavigation next='/work/design-system' />
      </SectionAnimate>
    </div>
  );
}
