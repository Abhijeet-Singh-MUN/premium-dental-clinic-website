"use client";

import { Activity, AlertCircle, Bone, MessageCircle, ShieldCheck, Sparkles, Stethoscope, Waves } from "lucide-react";
import { services, whatsappUrl } from "@/lib/clinic";
import { useLanguage } from "@/components/LanguageProvider";
import { Reveal } from "@/components/Reveal";

const icons = {
  surgery: Stethoscope,
  implant: Bone,
  tooth: Activity,
  shield: ShieldCheck,
  sparkle: Sparkles,
  align: Waves,
  alert: AlertCircle
};

export function ServicesSection() {
  const { lang, t } = useLanguage();

  return (
    <section className="content-section" id="services">
      <Reveal className="section-heading">
        <p className="eyebrow">{t.servicesEyebrow}</p>
        <h2>{t.servicesTitle}</h2>
        <p>{t.servicesBody}</p>
      </Reveal>
      <div className="service-grid">
        {services.map((service, index) => {
          const Icon = icons[service.icon] || Activity;
          const title = lang === "hi" ? service.titleHi : service.title;
          const description = lang === "hi" ? service.descriptionHi : service.description;
          return (
            <Reveal key={service.id} delay={index * 45}>
              <article className="service-card">
                <span className="service-icon">
                  <Icon size={24} />
                </span>
                <h3>{title}</h3>
                <p>{description}</p>
                <a
                  href={whatsappUrl(`Hello Doctor, I have a question about ${service.title}.`)}
                  target="_blank"
                  rel="noreferrer"
                >
                  <MessageCircle size={17} />
                  {t.whatsapp}
                </a>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
