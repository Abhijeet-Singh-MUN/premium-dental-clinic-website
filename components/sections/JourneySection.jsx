"use client";

import { CalendarDays, ClipboardCheck, SmilePlus } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { Reveal } from "@/components/Reveal";

const steps = [
  {
    icon: CalendarDays,
    title: "Book or ask first",
    body: "Use the form, call, or WhatsApp. No login and no payment barrier."
  },
  {
    icon: ClipboardCheck,
    title: "Get a clear consultation",
    body: "The clinic confirms timing and explains what to expect before treatment."
  },
  {
    icon: SmilePlus,
    title: "Start the right treatment",
    body: "You receive a treatment plan matched to your concern, comfort, and timeline."
  }
];

export function JourneySection() {
  const { t } = useLanguage();
  return (
    <section className="content-section warm-band">
      <Reveal className="section-heading">
        <p className="eyebrow">{t.journeyEyebrow}</p>
        <h2>{t.journeyTitle}</h2>
      </Reveal>
      <div className="journey-grid">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <Reveal key={step.title} delay={index * 80}>
              <article className="journey-step">
                <span>{index + 1}</span>
                <Icon size={28} />
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
