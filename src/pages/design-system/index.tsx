import { SectionAnimate } from '@/components/ui/section-animate';
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
  OutcomeGrid,
  SectionHeading,
  SubHeading,
} from '@/components/case-study/case-study-components';

const facts = [
  { label: 'Role', value: 'Product designer' },
  { label: 'Timeframe', value: 'Sep–Dec 2025' },
  { label: 'Scope', value: 'Three B2B products' },
  { label: 'Team', value: 'PM · Engineering' },
];

const outcomes = [
  { value: '≈4×', label: 'faster Figma preparation · operational estimate' },
  { value: '≈30%', label: 'fewer recurring style QA issues · operational estimate' },
  { value: '48', label: 'components in the mature library' },
  { value: '140+', label: 'tokens in the mature library' },
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

export function DesignSystemPage() {
  return (
    <div className='flex flex-col' style={{ gap: sectionGap }}>
      <SectionAnimate delay={0.05}>
        <CaseHero
          title='One design system for three B2B products'
          lede='I replaced three drifting UI libraries with one shared foundation. Similar Figma setup work took about one quarter of the previous effort, and we saw around 30% fewer recurring style issues during design QA.'
        />
      </SectionAnimate>

      <SectionAnimate delay={0.08}>
        <CaseFigure
          src='/images/design-system-hero.png'
          width={1920}
          height={1080}
          alt='Shared values and semantic tokens feed one component library, which supports three product themes'
          caption="One structural library; semantic themes preserve each product's identity without component forks."
          eager
        />
      </SectionAnimate>

      <SectionAnimate delay={0.1}>
        <OutcomeGrid items={outcomes} />
      </SectionAnimate>

      <SectionAnimate delay={0.11}>
        <CaseFacts items={facts} />
      </SectionAnimate>

      <SectionAnimate delay={0.12}>
        <ConfidentialityNote />
      </SectionAnimate>

      <SectionAnimate delay={0.14}>
        <div className='flex flex-col' style={{ gap: innerGap }}>
          <SectionHeading>Three products kept solving the same UI problems</SectionHeading>
          <Body>
            {nbsp(
              'Yesim’s B2B products shared workflows and engineering foundations, but their interfaces had grown independently. Similar tables, fields, filters, and status patterns used different structures and visual rules. A small change could trigger the same design discussion three times.',
            )}
          </Body>
          <Body>
            {nbsp(
              'The products needed the same component structure without being forced into the same visual theme. I kept identity in semantic tokens, where it could change without duplicating the library.',
            )}
          </Body>
        </div>
      </SectionAnimate>

      <SectionAnimate delay={0.16}>
        <CaseFigure
          src='/images/design-system-before-after.png'
          width={1920}
          height={1080}
          alt='Audit of recurring interface patterns across three Yesim B2B products'
          caption='The audit grouped repeated patterns and exposed where teams were paying for the same decision more than once. High-use tables, forms, and feedback states became the first migration targets.'
        />
      </SectionAnimate>

      <SectionAnimate delay={0.18}>
        <div className='flex flex-col' style={{ gap: innerGap }}>
          <SectionHeading>Success meant adoption, not a complete catalogue</SectionHeading>
          <div className='grid gap-3 sm:grid-cols-2'>
            <div className='rounded-xl bg-card p-5 card-shadow'>
              <p className='text-xs font-medium uppercase tracking-wide text-muted-foreground'>My ownership</p>
              <p className='mt-2 text-pretty text-sm leading-[1.55] text-foreground/80'>
                I owned the Figma architecture: shared component structure, reusable patterns, token hierarchy, and theming. I also worked through product-specific cases with engineers and handled design QA during adoption.
              </p>
            </div>
            <div className='rounded-xl bg-card p-5 card-shadow'>
              <p className='text-xs font-medium uppercase tracking-wide text-muted-foreground'>Engineering ownership</p>
              <p className='mt-2 text-pretty text-sm leading-[1.55] text-foreground/80'>
                Engineers implemented the components and styles in the products. I clarified the design logic, worked through technical constraints and edge cases with them, and reviewed the result against the system.
              </p>
            </div>
          </div>
          <Body>
            {nbsp(
              'Adoption happened product by product with PMs, engineers, and relevant stakeholders. There was no single design-system owner who formally approved all three. I used two practical success signals: less setup for designers and fewer visual inconsistencies during design QA.',
            )}
          </Body>
        </div>
      </SectionAnimate>

      <SectionAnimate delay={0.2}>
        <div className='flex flex-col' style={{ gap: innerGap }}>
          <SectionHeading>Decision 1: name tokens by purpose</SectionHeading>
          <SubHeading>Move product identity out of component structure</SubHeading>
          <Body>
            {nbsp(
              'Raw colour values were too brittle, and primitive names such as blue-500 still described appearance. Semantic names such as color-action-primary described the job a value performed. Each product could point that token to a different primitive while the component kept the same anatomy and behaviour.',
            )}
          </Body>
          <Body>
            {nbsp(
              'The extra token layer added naming work up front. It paid for itself by preventing a brand change from becoming a component fork.',
            )}
          </Body>
          <Body>
            {nbsp(
              'Engineering challenged my first interactive-state names because they described the states from a design perspective. Production used CSS terminology such as',
            )}{' '}
            <code>:hover</code> {nbsp('and')} <code>:focus-visible</code>
            {nbsp(
              '. I renamed the Figma variants to match. That small change gave both teams one vocabulary and became a rule for the wider system: use implementation semantics when they make the design-to-code mapping clearer.',
            )}
          </Body>
        </div>
      </SectionAnimate>

      <SectionAnimate delay={0.22}>
        <CaseFigure
          src='/images/design-system-semantics.png'
          width={1920}
          height={1080}
          alt='Token architecture mapping values to primitives and semantic product roles'
          caption='Semantic tokens carry intent. Product themes can change colour, type, radius, and density without changing the component API.'
        />
      </SectionAnimate>

      <SectionAnimate delay={0.24}>
        <div className='flex flex-col' style={{ gap: innerGap }}>
          <SectionHeading>Decision 2: share anatomy, vary the theme</SectionHeading>
          <Body>
            {nbsp(
              'Buttons, fields, tables, and feedback states used one structural definition. The theme changed the values that belonged to the product: colour, type, radius, and density. Teams gained a distinct surface without maintaining a distinct component set.',
            )}
          </Body>
        </div>
      </SectionAnimate>

      <SectionAnimate delay={0.26}>
        <CaseFigure
          src='/images/design-system-sub-brands.png'
          width={1920}
          height={1080}
          alt='The same design-system components rendered across three Yesim product themes'
          caption='The same component structure across three themes. Identity changes through semantics; interaction and accessibility rules remain shared.'
        />
      </SectionAnimate>

      <SectionAnimate delay={0.28}>
        <div className='flex flex-col' style={{ gap: innerGap }}>
          <SectionHeading>Ship the system without pausing product work</SectionHeading>
          <Body>
            {nbsp(
              'A full rewrite would have delayed feature work and made the library feel like an external programme. I started with recurring, visible surfaces and let teams migrate them as related product work moved through delivery.',
            )}
          </Body>
          <Body>
            {nbsp(
              'Forms and tables made up the first high-frequency scope. As each product adopted the system, I added patterns that proved reusable in real work and adjusted the architecture with engineering. The totals below describe the library at maturity.',
            )}
          </Body>
          <Body>
            {nbsp(
              'Each component included anatomy, states, usage guidance, accessibility notes, and implementation-facing specifications. That gave design and engineering one place to resolve a rule before it appeared in three products.',
            )}
          </Body>
        </div>
      </SectionAnimate>

      <SectionAnimate delay={0.3}>
        <CaseFigure
          src='/images/design-system-specs.png'
          width={1920}
          height={1080}
          alt='Design-system component specification with anatomy, variants, states, and implementation notes'
          caption='Delivery evidence: component anatomy and state documentation turned a Figma asset into a repeatable implementation reference.'
        />
      </SectionAnimate>

      <SectionAnimate delay={0.32}>
        <div className='flex flex-col' style={{ gap: innerGap }}>
          <SectionHeading>Result</SectionHeading>
          <Body>
            {nbsp(
              'The mature library grew to 48 components and more than 140 tokens across three product themes. In repeated, comparable setup work, Figma preparation typically took about one quarter of the previous effort. Comparable releases across all three products also surfaced around 30% fewer recurring style issues during design QA, including spacing, typography, colour, and component styling. Neither result came from a formal experiment or fixed reporting window, so I treat both as operational estimates.',
            )}
          </Body>
          <Body>
            {nbsp(
              'I learned that adoption is mostly an operations problem. Teams used the system when it helped them finish current product work. Naming, documentation, and migration order mattered as much as the components.',
            )}
          </Body>
        </div>
      </SectionAnimate>

      <SectionAnimate delay={0.34}>
        <CaseNavigation next='/work/white-label-esim' />
      </SectionAnimate>
    </div>
  );
}
