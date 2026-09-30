import { RiArrowRightUpLine } from '@remixicon/react';
import { SectionAnimate } from '@/components/ui/section-animate';
import { GlowEffect } from '@/components/motion-primitives/glow-effect';
import { navigateWithTransition } from '@/lib/page-transition';
import { nbsp } from '@/lib/nbsp';
import {
  fluidBase,
  innerGap,
  sectionGap,
} from '@/lib/typography';
import {
  CaseFacts,
  CaseFigure,
  CaseHero,
  CaseNavigation,
  ConfidentialityNote,
  SectionHeading,
  SubHeading,
} from '@/components/case-study/case-study-components';

const facts = [
  { label: 'Role', value: 'Designer · prototype developer' },
  { label: 'Build', value: 'Roughly two working days' },
  { label: 'Prototype stack', value: 'Next.js · Tailwind' },
  { label: 'Team', value: 'PM · Engineering' },
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

function DemoButton() {
  return (
    <div className='relative isolate transition-transform duration-200 hover:-translate-y-0.5'>
      <GlowEffect
        colors={['#FF5733', '#33FF57', '#3357FF', '#F1C40F']}
        mode='colorShift'
        blur='strong'
        duration={3}
        scale={1.06}
        className='translate-y-1.5 opacity-50'
      />
      <button
        type='button'
        onClick={() => navigateWithTransition('/work/white-label-esim/demo/customize')}
        data-goatcounter-click='white-label-live-prototype'
        className='group relative z-10 flex w-full cursor-pointer items-center justify-between gap-4 rounded-xl bg-foreground p-5 text-left text-background transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:p-6'>
        <span>
          <span className='block text-xs font-medium uppercase tracking-wide text-background/65'>Working artifact</span>
          <span className='mt-1 block text-pretty text-lg leading-tight'>Open the live configurator</span>
        </span>
        <RiArrowRightUpLine className='shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5' aria-hidden />
      </button>
    </div>
  );
}

export function WhiteLabelEsimPage() {
  return (
    <div className='flex flex-col' style={{ gap: sectionGap }}>
      <SectionAnimate delay={0.05}>
        <CaseHero
          title='A working eSIM concept in roughly two days'
          lede='Starting from a PRD and known technical constraints, I designed and coded a functional Next.js and Tailwind concept that made the interaction model tangible for product review and client conversations.'
        />
      </SectionAnimate>

      <SectionAnimate delay={0.08}>
        <CaseFigure
          src='/images/white-label-esim-hero.png'
          width={1920}
          height={1080}
          alt='Partner configuration fields feed product rules and update a branded eSIM preview'
          caption='The design artifact accepted the same messy input as the product. Rules sat between the form and preview instead of living in handoff notes.'
          eager
        />
      </SectionAnimate>

      <SectionAnimate delay={0.1}>
        <CaseFacts items={facts} />
      </SectionAnimate>

      <SectionAnimate delay={0.11}>
        <ConfidentialityNote />
      </SectionAnimate>

      <SectionAnimate delay={0.13}>
        <div className='flex flex-col' style={{ gap: innerGap }}>
          <SectionHeading>The PRD described inputs, not behaviour</SectionHeading>
          <Body>
            {nbsp(
              'There was no Figma stage before the prototype. I started from the PRD, existing product context, and known technical constraints. The requirements described logos, banners, brand colours, and optional contact details, but they did not show how those inputs would change the customer experience.',
            )}
          </Body>
          <Body>
            {nbsp(
              'The two-day goal was a working concept, not implementation-ready UI. I needed something that could expose interaction and technical constraints, give the team a real product model to discuss, and make the idea credible in conversations with existing B2B clients.',
            )}
          </Body>
        </div>
      </SectionAnimate>

      <SectionAnimate delay={0.15}>
        <CaseFigure
          src='/images/white-label-esim-problem.png'
          width={1920}
          height={1080}
          alt='Concept illustration comparing a controlled screen with failures that appear under real partner input'
          caption='Concept illustration: a controlled screen can show the intended look, while real input exposes contrast, crop, empty-content, and layout behaviour. It explains the tool choice; it was not a pre-existing Figma handoff.'
        />
      </SectionAnimate>

      <SectionAnimate delay={0.17}>
        <div className='flex flex-col' style={{ gap: innerGap }}>
          <SectionHeading>Why I moved the design into code</SectionHeading>
          <Body>
            {nbsp(
              'I translated the PRD directly into a Next.js and Tailwind concept so the form, rules, and responsive preview ran together. In roughly two working days, I had a testable interaction model. Production-ready UI was outside that scope.',
            )}
          </Body>
          <div className='grid gap-3 sm:grid-cols-2'>
            <div className='rounded-xl bg-card p-5 card-shadow'>
              <p className='text-xs font-medium uppercase tracking-wide text-muted-foreground'>The PRD provided</p>
              <p className='mt-2 text-pretty text-sm leading-[1.55] text-foreground/80'>Requirements, existing product context, and known technical constraints.</p>
            </div>
            <div className='rounded-xl bg-card p-5 card-shadow'>
              <p className='text-xs font-medium uppercase tracking-wide text-muted-foreground'>Code resolved</p>
              <p className='mt-2 text-pretty text-sm leading-[1.55] text-foreground/80'>Live input, branching content, validation, cropping, loading, and responsive states.</p>
            </div>
          </div>
          <Body>
            {nbsp(
              'PM and stakeholders reviewed the working concept with real brand inputs. A colour that worked in one part of the preview could lose contrast or produce an unexpected state elsewhere. The PRD described the inputs, but not every combination.',
            )}
          </Body>
          <Body>
            {nbsp(
              'That review made contrast a piece of dynamic product logic rather than a set of manually designed exceptions. The prototype exposed those failures while there was still time to change the model, before implementation or design QA.',
            )}
          </Body>
        </div>
      </SectionAnimate>

      <SectionAnimate delay={0.19}>
        <div className='flex flex-col' style={{ gap: innerGap }}>
          <SectionHeading>Behaviour 1: choose text by contrast ratio</SectionHeading>
          <SubHeading>Accessibility became product logic</SubHeading>
          <Body>
            {nbsp(
              'Based on that review, the preview calculates both candidate foregrounds and uses the one with the higher contrast ratio against the partner colour. This avoids relying on a fixed light-or-dark threshold for colours near the middle.',
            )}
          </Body>
        </div>
      </SectionAnimate>

      <SectionAnimate delay={0.21}>
        <CaseFigure
          src='/images/white-label-esim-contrast.png'
          width={1920}
          height={1080}
          alt='The prototype compares the contrast of dark and white text against each partner colour and uses the higher ratio'
          caption='The preview now compares real contrast ratios and selects the better foreground. The rule is testable for every valid brand colour.'
        />
      </SectionAnimate>

      <SectionAnimate delay={0.22}>
        <DemoButton />
      </SectionAnimate>

      <SectionAnimate delay={0.24}>
        <div className='flex flex-col' style={{ gap: innerGap }}>
          <SectionHeading>Behaviour 2: optional input changes the preview</SectionHeading>
          <Body>
            {nbsp(
              'Contact links, promotion content, and partner branding appear only when the related settings are active and valid. The preview removes the region when the input disappears, so reviewers can see the resulting layout rather than infer it from annotations.',
            )}
          </Body>
        </div>
      </SectionAnimate>

      <SectionAnimate delay={0.26}>
        <CaseFigure
          src='/images/white-label-esim-logic.png'
          width={1920}
          height={1080}
          alt='Configuration inputs passing through conditional rules into visible or hidden preview regions'
          caption='Input → rule → output: optional settings determine whether whole preview regions exist.'
        />
      </SectionAnimate>

      <SectionAnimate delay={0.28}>
        <div className='flex flex-col' style={{ gap: innerGap }}>
          <SectionHeading>Behaviour 3: protect incomplete work</SectionHeading>
          <Body>
            {nbsp(
              'The prototype validates URLs, email addresses, colours, and required brand fields before save. Upload controls expose crop and file-shape problems. Save and reset actions track dirty state, and navigation warns when a change would be lost.',
            )}
          </Body>
          <Body>
            {nbsp(
              'I also added loading skeletons and separate mobile and desktop previews. These were not finishing touches. They were the states most likely to be absent from a static handoff and rediscovered during implementation.',
            )}
          </Body>
        </div>
      </SectionAnimate>

      <SectionAnimate delay={0.3}>
        <div className='flex flex-col' style={{ gap: innerGap }}>
          <SectionHeading>What the prototype delivered</SectionHeading>
          <div className='grid gap-3 sm:grid-cols-2'>
            {[
              ['Reviewable rules', 'The team could change real inputs and inspect the outcome in the browser.'],
              ['Responsive states', 'Mobile and desktop previews shared the same configuration.'],
              ['Edge-case coverage', 'Invalid fields, missing content, odd assets, and unsaved changes became visible.'],
              ['Client conversations', 'A behaving product concept made the proposal more concrete for existing B2B clients.'],
            ].map(([title, text]) => (
              <div key={title} className='rounded-xl bg-card p-5 card-shadow'>
                <h3 className='text-sm font-medium leading-[1.4]'>{title}</h3>
                <p className='mt-2 text-pretty text-sm leading-[1.55] text-foreground/75'>{text}</p>
              </div>
            ))}
          </div>
          <Body>
            {nbsp(
              'Engineering did not ship the prototype code directly. They reimplemented the experience in the production codebase, using the working concept as the reference for its interaction model and product rules.',
            )}
          </Body>
          <Body>
            {nbsp(
              'After launch, no contrast-related issues surfaced during design QA. I treat that as a qualitative observation, not a measured KPI, because there was no fixed reporting window or formal QA record.',
            )}
          </Body>
        </div>
      </SectionAnimate>

      <SectionAnimate delay={0.32}>
        <div className='flex flex-col' style={{ gap: innerGap }}>
          <SectionHeading>Reflection</SectionHeading>
          <Body>
            {nbsp(
              'I would make the same tool choice again. One polished state hides too much in a branching system. A small working model made the unresolved parts hard to ignore.',
            )}
          </Body>
        </div>
      </SectionAnimate>

      <SectionAnimate delay={0.34}>
        <CaseNavigation next='/work/saas-onboarding' />
      </SectionAnimate>
    </div>
  );
}
