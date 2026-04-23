import { SectionAnimate } from "@/components/ui/section-animate";
import { nbsp } from "@/lib/nbsp";
import { Heart, Star, MessageCircle, ExternalLink } from "lucide-react";
import { DashedDivider } from "@/components/ui/dashed-divider";
import { fluidLead, fluidBase, fluidSmall, fluidH1, sectionGap, innerGap } from "@/lib/typography";
import { SectionHeading } from "@/components/case-study/case-study-components";
const heroImage = "/images/support-hero.png";

const supportOptions = [
  {
    emoji: "💛",
    label: "Donate with PayPal",
    href: "https://www.paypal.com/donate/?hosted_button_id=QCHWF4FJLKQ34",
    description: "One-time donation via PayPal",
  },
  {
    emoji: "🏦",
    label: "Donate with Monobank (\u20B4)",
    href: "https://send.monobank.ua/jar/8h1tmYhKTe",
    description: "Support in Ukrainian hryvnia",
  },
  {
    emoji: "\u2B50",
    label: "Rate 5 stars on Google Play",
    href: "https://play.google.com/store/apps/details?id=ua.napps.scorekeeper",
    description: "A review helps more than you think",
  },
];

export function SupportPage() {
  return (
    <div className="flex flex-col" style={{ gap: sectionGap }}>
      {/* Hero */}
      <SectionAnimate delay={0}>
        <section className="flex flex-col" style={{ gap: innerGap }}>
          <span
            className="text-muted-foreground"
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontSize: fluidSmall,
              lineHeight: 1.4,
            }}
          >
            Score Counter App
          </span>
          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: fluidH1,
              lineHeight: 1.2,
              letterSpacing: "-0.025em",
            }}
          >
            {nbsp("Support your favorite scorekeeper")}
          </h1>
          <p
            className="text-muted-foreground"
            style={{ fontSize: fluidLead, lineHeight: 1.5 }}
          >
            {nbsp(
              "If Score Counter makes your game nights better, here's how you can help keep it alive and growing."
            )}
          </p>
        </section>
      </SectionAnimate>

      {/* Image */}
      <SectionAnimate delay={0.05}>
        <div className="rounded-xl overflow-hidden border border-border">
          <img
            src={heroImage}
            alt="Board game pieces and cards"
            className="w-full aspect-[16/9] object-cover"
          />
        </div>
      </SectionAnimate>

      {/* About */}
      <SectionAnimate delay={0.1}>
        <section className="flex flex-col" style={{ gap: innerGap }}>
          <SectionHeading>The story</SectionHeading>
          <div
            className="flex flex-col"
            style={{ gap: "clamp(0.5rem, 0.45rem + 0.25vw, 0.75rem)" }}
          >
            <p style={{ fontSize: fluidBase, lineHeight: 1.6 }}>
              {nbsp(
                "Hi, I'm Roma, a designer from Ukraine who loves board games. I built Score Counter in my free time as a simple, fun way to keep track of scores. What started as a small side project is now used by 180,000+ people every month."
              )}
            </p>
            <p style={{ fontSize: fluidBase, lineHeight: 1.6 }}>
              {nbsp(
                "Even through tough times \uD83C\uDDFA\uD83C\uDDE6, I keep improving this app for everyone who loves board games as much as I do."
              )}
            </p>
          </div>
        </section>
      </SectionAnimate>

      {/* Why players love it */}
      <SectionAnimate delay={0.15}>
        <section className="flex flex-col" style={{ gap: innerGap }}>
          <SectionHeading>Why players love it</SectionHeading>
          <div
            className="flex flex-col"
            style={{ gap: "clamp(0.75rem, 0.7rem + 0.25vw, 1rem)" }}
          >
            <div className="flex gap-3 items-start">
              <Star
                size={18}
                className="text-accent mt-0.5 shrink-0"
              />
              <div>
                <span style={{ fontSize: fluidBase, lineHeight: 1.4 }}>
                  Ad-free experience
                </span>
                <p
                  className="text-muted-foreground"
                  style={{ fontSize: fluidSmall, lineHeight: 1.5 }}
                >
                  {nbsp(
                    "No annoying ads or pop-ups. Just you and your game."
                  )}
                </p>
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <Heart
                size={18}
                className="text-accent mt-0.5 shrink-0"
              />
              <div>
                <span style={{ fontSize: fluidBase, lineHeight: 1.4 }}>
                  Built with heart
                </span>
                <p
                  className="text-muted-foreground"
                  style={{ fontSize: fluidSmall, lineHeight: 1.5 }}
                >
                  {nbsp(
                    "A passion project, not a corporate product. Every feature is made with care."
                  )}
                </p>
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <MessageCircle
                size={18}
                className="text-accent mt-0.5 shrink-0"
              />
              <div>
                <span style={{ fontSize: fluidBase, lineHeight: 1.4 }}>
                  Community-driven
                </span>
                <p
                  className="text-muted-foreground"
                  style={{ fontSize: fluidSmall, lineHeight: 1.5 }}
                >
                  {nbsp(
                    "Player feedback shapes every update. Your voice matters."
                  )}
                </p>
              </div>
            </div>
          </div>
        </section>
      </SectionAnimate>

      <DashedDivider />

      {/* Support CTAs */}
      <SectionAnimate delay={0.2}>
        <section
          id="donate"
          className="flex flex-col"
          style={{ gap: "clamp(1rem, 0.9rem + 0.5vw, 1.5rem)" }}
        >
          <div className="flex flex-col" style={{ gap: innerGap }}>
            <SectionHeading> How to support</SectionHeading>
            <p
              className="text-muted-foreground"
              style={{ fontSize: fluidBase, lineHeight: 1.6 }}
            >
              {nbsp(
                "Every donation, review, or kind message keeps the app alive. Pick whatever feels right"
              )}
            </p>
          </div>
          <div
            className="flex flex-col"
            style={{ gap: "clamp(0.5rem, 0.45rem + 0.25vw, 0.75rem)" }}
          >
            {supportOptions.map((option) => (
              <a
                key={option.label}
                href={option.href}
                data-goatcounter-click={`support-${option.label.toLowerCase().replace(/\s+/g, '-')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 p-4 rounded-xl card-shadow bg-card hover:border-foreground/20 transition-all duration-200"
              >
                <span className="text-xl shrink-0">{option.emoji}</span>
                <div className="flex-1 min-w-0">
                  <span
                    className="group-hover:text-accent transition-colors"
                    style={{ fontSize: fluidBase, lineHeight: 1.4 }}
                  >
                    {option.label}
                  </span>
                  <p
                    className="text-muted-foreground"
                    style={{ fontSize: fluidSmall, lineHeight: 1.4 }}
                  >
                    {option.description}
                  </p>
                </div>
                <ExternalLink
                  size={14}
                  className="text-muted-foreground group-hover:text-foreground transition-colors shrink-0"
                />
              </a>
            ))}
          </div>
        </section>
      </SectionAnimate>

      {/* Translations CTA */}
      <SectionAnimate delay={0.25}>
        <section
          className="flex flex-col items-center text-center"
          style={{ gap: "clamp(0.375rem, 0.35rem + 0.1vw, 0.5rem)" }}
        >
          <p
            className="text-muted-foreground"
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontSize: fluidBase,
              lineHeight: 1.6,
            }}
          >
            {nbsp("Want to help translate Score Counter into your language?")}
          </p>
          <a
            href={[109,97,105,108,116,111,58,115,99,111,114,101,107,101,101,112,101,114,46,102,101,101,100,98,97,99,107,64,103,109,97,105,108,46,99,111,109].map(c => String.fromCharCode(c)).join('')}
            data-goatcounter-click="support-email"
            className="text-accent no-underline hover:underline underline-offset-2 transition-opacity hover:opacity-80"
            style={{ fontSize: fluidBase, lineHeight: 1.6 }}
          >
            {[115,99,111,114,101,107,101,101,112,101,114,46,102,101,101,100,98,97,99,107,64,103,109,97,105,108,46,99,111,109].map(c => String.fromCharCode(c)).join('')}
          </a>
        </section>
      </SectionAnimate>
    </div>
  );
}