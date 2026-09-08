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
  SectionHeading,
  SubHeading,
} from '@/components/case-study/case-study-components';

const facts = [
  { label: 'Role', value: 'Product designer · sole design owner' },
  { label: 'Timeframe', value: '2025' },
  { label: 'Platform', value: 'Web · B2B SaaS' },
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

export function SaasOnboardingPage() {
  return (
    <div className='flex flex-col' style={{ gap: sectionGap }}>
      <SectionAnimate delay={0.05}>
        <CaseHero
          title='Designing a self-serve path to the first active eSIM'
          lede='I worked on moving manual B2B account creation to self-service signup. The flow shipped, but the repository does not contain a measured conversion result.'
        />
      </SectionAnimate>

      <SectionAnimate delay={0.1}>
        <CaseFigure
          src='/images/saas-onboarding-hero.jpg'
          alt='Yesim business dashboard with onboarding guidance and account status'
          caption='The intended destination: a dashboard that explains account status and gives a new admin a concrete next action.'
          eager
        />
      </SectionAnimate>

      <SectionAnimate delay={0.11}>
        <CaseFacts items={facts} />
      </SectionAnimate>

      <SectionAnimate delay={0.12}>
        <ConfidentialityNote />
      </SectionAnimate>

      <SectionAnimate delay={0.14}>
        <div className='flex flex-col' style={{ gap: innerGap }}>
          <SectionHeading>Account creation was moving into the product</SectionHeading>
          <Body>
            {nbsp(
              'The work started because Yesim was moving from manually created business accounts to self-service signup. The product now had to guide account creation and initial setup instead of relying on the manual process.',
            )}
          </Body>
          <Body>
            {nbsp(
              'A new admin could still reach an empty dashboard with no employee, assigned plan, or explanation of which prerequisite came next. The archived material establishes that interface problem, but it does not show how often people abandoned the flow.',
            )}
          </Body>
          <Body>
            {nbsp(
              'I was the sole designer on the flow. I owned the UX structure, interaction design, and prototype, then coordinated with product and engineering through delivery.',
            )}
          </Body>
        </div>
      </SectionAnimate>

      <SectionAnimate delay={0.16}>
        <CaseFigure
          src='/images/saas-onboarding-before.png'
          alt='The previous Yesim business dashboard with no employees, plans, or guided next action'
          caption='Before: the account was valid, but the page did not connect the missing employee and plan to a useful next step.'
        />
      </SectionAnimate>

      <SectionAnimate delay={0.18}>
        <div className='flex flex-col' style={{ gap: innerGap }}>
          <SectionHeading>Choose an activation point the interface could explain</SectionHeading>
          <Body>
            {nbsp(
              'The working hypothesis was that setup should not end at account creation. A business admin reaches a meaningful product state when an employee has an eSIM plan assigned and can use it. That became the spine of the shipped onboarding flow.',
            )}
          </Body>
          <Body>
            {nbsp(
              'This was a design criterion, not a measured result. It gave each step a reason to exist and gave the dashboard a clear way to describe incomplete setup.',
            )}
          </Body>
        </div>
      </SectionAnimate>

      <SectionAnimate delay={0.2}>
        <CaseFigure
          src='/images/saas-onboarding-flow.png'
          alt='A manual account-creation route handed users to an empty dashboard; the shipped self-serve route connects account creation to the first active eSIM'
          caption='The shipped path used the first assigned eSIM as the activation point. It connected self-service signup to a visible product outcome instead of an empty account.'
        />
      </SectionAnimate>

      <SectionAnimate delay={0.22}>
        <div className='flex flex-col' style={{ gap: innerGap }}>
          <SectionHeading>Decision 1: collect the company context first</SectionHeading>
          <SubHeading>Keep compliance information inside the setup sequence</SubHeading>
          <Body>
            {nbsp(
              'Company details were placed before employee and plan setup because the account needed an identifiable business context. The screen grouped required fields, explained document input, and kept the next action visible.',
            )}
          </Body>
          <Body>
            {nbsp(
              'The shipped flow let admins skip the initial form and return to complete it later. A separate draft-saving state is not confirmed.',
            )}
          </Body>
        </div>
      </SectionAnimate>

      <SectionAnimate delay={0.24}>
        <CaseFigure
          src='/images/saas-onboarding-draft.png'
          alt='Company information step with business details and document requirements'
          caption='Admins could skip this initial form and resume it later. The screen is not evidence of a separate saved-draft state.'
        />
      </SectionAnimate>

      <SectionAnimate delay={0.26}>
        <div className='flex flex-col' style={{ gap: innerGap }}>
          <SectionHeading>Decision 2: let the dashboard continue the flow</SectionHeading>
          <Body>
            {nbsp(
              'Onboarding continued on the dashboard through a shipped checklist. It kept the account identity visible and showed which task would move the admin toward the first active eSIM.',
            )}
          </Body>
          <Body>
            {nbsp(
              'That approach trades a cleaner empty dashboard for a more explicit one. For a new admin, the extra guidance is useful until the account has an employee and assigned plan; after activation, normal product data can take over.',
            )}
          </Body>
        </div>
      </SectionAnimate>

      <SectionAnimate delay={0.28}>
        <CaseFigure
          src='/images/saas-onboarding-dashboard.png'
          alt='Shipped business dashboard with account identity and an onboarding checklist'
          caption='The shipped checklist keeps incomplete setup visible and gives the admin a next action.'
        />
      </SectionAnimate>

      <SectionAnimate delay={0.3}>
        <div className='flex flex-col' style={{ gap: innerGap }}>
          <SectionHeading>What would make this a growth case</SectionHeading>
          <Body>
            {nbsp(
              'The shipped flow was not user-tested before or after launch, and there was no formal experiment. That means there was no control, variant, defined cohort, observation window, or primary metric.',
            )}
          </Body>
          <div className='grid gap-3 sm:grid-cols-2'>
            {[
              ['Start', 'New business account enters setup'],
              ['Company', 'Required company information is completed'],
              ['Employee', 'The first employee is added'],
              ['Activation', 'The first eSIM plan is assigned'],
            ].map(([title, text]) => (
              <div key={title} className='rounded-xl bg-card p-5 card-shadow'>
                <p className='text-xs font-medium uppercase tracking-wide text-muted-foreground'>{title}</p>
                <p className='mt-2 text-pretty text-sm leading-[1.55] text-foreground/80'>{text}</p>
              </div>
            ))}
          </div>
          <Body>
            {nbsp(
              'The primary evaluation would have been the share of eligible accounts that reached an assigned eSIM, supported by the time between steps and reasons for stopping. No post-launch result exists, so this remains a case about the shipped activation model. It cannot demonstrate a lift.',
            )}
          </Body>
        </div>
      </SectionAnimate>

      <SectionAnimate delay={0.32}>
        <div className='flex flex-col' style={{ gap: innerGap }}>
          <SectionHeading>Reflection</SectionHeading>
          <Body>
            {nbsp(
              'I can explain the product logic from the archived material: the flow ends at a usable state and the dashboard explains missing prerequisites. I cannot show whether it moved the funnel. I would instrument the steps and agree on a decision rule before calling the design successful.',
            )}
          </Body>
        </div>
      </SectionAnimate>

      <SectionAnimate delay={0.34}>
        <CaseNavigation next='/work/score-counter' />
      </SectionAnimate>
    </div>
  );
}
