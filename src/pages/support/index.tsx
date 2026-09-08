import { SectionAnimate } from '@/components/ui/section-animate';
import { ImageWithFallback } from '@/components/ui/image-with-fallback';
import { nbsp } from '@/lib/nbsp';
import { RiExternalLinkLine } from '@remixicon/react';
import { DashedDivider } from '@/components/ui/dashed-divider';
import {
  fluidLead,
  fluidBase,
  fluidSmall,
  fluidH1,
  sectionGap,
  innerGap,
} from '@/lib/typography';
import { SectionHeading } from '@/components/case-study/case-study-components';
const heroImage = '/images/support-hero.jpg';

const supportOptions = [
  {
    emoji: '💙',
    label: 'Donate with PayPal',
    href: 'https://www.paypal.com/donate/?hosted_button_id=QCHWF4FJLKQ34',
    description: 'One-time donation via PayPal',
  },
  {
    emoji: '🏦',
    label: 'Donate with Monobank (\u20B4)',
    href: 'https://send.monobank.ua/jar/8h1tmYhKTe',
    description: 'Support in Ukrainian hryvnia',
  },
  {
    emoji: '\u2B50',
    label: 'Rate 5 stars on Google Play',
    href: 'https://play.google.com/store/apps/details?id=ua.napps.scorekeeper',
    description: 'A review helps more than you think',
  },
];

const reasons = [
  {
    title: 'Ad-free experience',
    body: 'No annoying ads or pop-ups. Just straightforward scorekeeping.',
  },
  {
    title: 'Built with heart',
    body: 'A passion project, not a corporate product. Every feature is made with care.',
  },
  {
    title: 'Community-driven',
    body: 'User feedback shapes every update. Your voice matters.',
  },
];

export function SupportPage() {
  return (
    <div className='flex flex-col' style={{ gap: sectionGap }}>
      {/* Hero */}
      <SectionAnimate delay={0}>
        <section className='flex flex-col' style={{ gap: innerGap }}>
          <span
            className='text-muted-foreground'
            style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontSize: fluidSmall,
              lineHeight: 1.4,
            }}>
            Score Counter app
          </span>
          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: fluidH1,
              lineHeight: 1.15,
              letterSpacing: '-0.025em',
            }}>
            {nbsp('Support your favorite scorekeeper')}
          </h1>
          <p
            className='text-muted-foreground'
            style={{ fontSize: fluidLead, lineHeight: 1.5 }}>
            {nbsp(
              "If Score Counter makes your game nights better, here's how you can help keep it alive and growing.",
            )}
          </p>
        </section>
      </SectionAnimate>

      {/* Image */}
      <SectionAnimate delay={0.05}>
        <div className='-mx-4 sm:mx-0'>
          <ImageWithFallback
            src={heroImage}
            alt='Board game pieces and cards'
            className='w-full aspect-[16/9] object-cover rounded-none sm:rounded-xl'
            loading='eager'
          />
        </div>
      </SectionAnimate>

      {/* About */}
      <SectionAnimate delay={0.1}>
        <section className='flex flex-col' style={{ gap: innerGap }}>
          <SectionHeading>The story</SectionHeading>
          <div
            className='flex flex-col'
            style={{ gap: 'clamp(0.5rem, 0.45rem + 0.25vw, 0.75rem)' }}>
            <p style={{ fontSize: fluidBase, lineHeight: 1.6 }}>
              {nbsp(
                "Hi, I'm Roma, a designer from Ukraine who loves board games. I built Score Counter in my free time as a simple, fun way to keep track of scores. What started as a small side project is now used by 180,000+ people every month.",
              )}
            </p>
            <p style={{ fontSize: fluidBase, lineHeight: 1.6 }}>
              {nbsp(
                'Despite tough times, I continue to improve this app for everyone who loves board games as much as I do.',
              )}
            </p>
          </div>
        </section>
      </SectionAnimate>

      {/* Why players love it */}
      <SectionAnimate delay={0.15}>
        <section className='flex flex-col' style={{ gap: innerGap }}>
          <SectionHeading>Why users love it</SectionHeading>
          <div
            className='flex flex-col'
            style={{ gap: 'clamp(0.75rem, 0.7rem + 0.25vw, 1rem)' }}>
            {reasons.map((reason, i) => (
              <div key={reason.title}>
                <div className='flex flex-col gap-1'>
                  <h3
                    style={{
                      fontSize: fluidBase,
                      fontWeight: 500,
                      lineHeight: 1.4,
                    }}>
                    {reason.title}
                  </h3>
                  <p
                    className='text-muted-foreground'
                    style={{ fontSize: fluidSmall, lineHeight: 1.5 }}>
                    {nbsp(reason.body)}
                  </p>
                </div>
                {i < reasons.length - 1 && (
                  <div className='mt-4'>
                    <DashedDivider />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </SectionAnimate>

      {/* Support CTAs */}
      <SectionAnimate delay={0.2}>
        <section
          id='donate'
          className='flex flex-col'
          style={{ gap: 'clamp(1rem, 0.9rem + 0.5vw, 1.5rem)' }}>
          <div className='flex flex-col' style={{ gap: innerGap }}>
            <SectionHeading>How to support</SectionHeading>
            <p
              className='text-muted-foreground'
              style={{ fontSize: fluidBase, lineHeight: 1.6 }}>
              {nbsp(
                'Every donation, review, or kind message keeps the app alive. Pick whatever feels right.',
              )}
            </p>
          </div>
          <ul
            className='flex flex-col'
            style={{ gap: 'clamp(0.5rem, 0.45rem + 0.25vw, 0.75rem)' }}>
            {supportOptions.map((option) => (
              <li key={option.label}>
                <a
                  href={option.href}
                  data-goatcounter-click={`support-${option.label.toLowerCase().replace(/\s+/g, '-')}`}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='group flex items-center gap-3 p-4 rounded-xl border border-border bg-card hover:border-muted-foreground/30 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background'>
                  <span aria-hidden='true' className='text-xl shrink-0'>
                    {option.emoji}
                  </span>
                  <div className='flex-1 min-w-0'>
                    <h3
                      className='group-hover:text-accent transition-colors'
                      style={{
                        fontSize: fluidBase,
                        fontWeight: 500,
                        lineHeight: 1.4,
                      }}>
                      {option.label}
                    </h3>
                    <p
                      className='text-muted-foreground'
                      style={{ fontSize: fluidSmall, lineHeight: 1.4 }}>
                      {option.description}
                    </p>
                  </div>
                  <RiExternalLinkLine
                    size={14}
                    aria-hidden
                    className='text-muted-foreground group-hover:text-foreground transition-colors shrink-0'
                  />
                </a>
              </li>
            ))}
          </ul>
        </section>
      </SectionAnimate>

      {/* Translations CTA */}
      <SectionAnimate delay={0.25}>
        <section
          className='flex flex-col items-center text-center'
          style={{ gap: 'clamp(0.375rem, 0.35rem + 0.1vw, 0.5rem)' }}>
          <p
            className='text-muted-foreground'
            style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontSize: fluidBase,
              lineHeight: 1.6,
            }}>
            {nbsp('Want to help translate Score Counter into your language?')}
          </p>
          <a
            href={[
              109, 97, 105, 108, 116, 111, 58, 100, 101, 118, 101, 108, 111,
              112, 101, 114, 46, 115, 99, 111, 114, 101, 99, 111, 117, 110,
              116, 101, 114, 64, 103, 109, 97, 105, 108, 46, 99, 111, 109,
            ]
              .map((c) => String.fromCharCode(c))
              .join('')}
            data-goatcounter-click='support-email'
            className='text-accent no-underline hover:underline focus-visible:underline decoration-from-font [text-underline-position:from-font] [text-decoration-skip-ink:auto]'
            style={{ fontSize: fluidBase, lineHeight: 1.6 }}>
            {[
              100, 101, 118, 101, 108, 111, 112, 101, 114, 46, 115, 99, 111,
              114, 101, 99, 111, 117, 110, 116, 101, 114, 64, 103, 109, 97,
              105, 108, 46, 99, 111, 109,
            ]
              .map((c) => String.fromCharCode(c))
              .join('')}
          </a>
        </section>
      </SectionAnimate>
    </div>
  );
}
