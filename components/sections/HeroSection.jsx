"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowRight, CalendarCheck, MessageCircle, ShieldCheck } from "lucide-react";
import { clinic, whatsappUrl } from "@/lib/clinic";
import { useLanguage } from "@/components/LanguageProvider";

const HeroVisual = dynamic(
  () => import("@/components/HeroVisual").then((module) => module.HeroVisual),
  {
    ssr: false,
    loading: () => (
      <div className="hero-visual loading">
        <div className="hero-fallback">
          <span />
          <span />
          <span />
        </div>
      </div>
    )
  }
);

export function HeroSection() {
  const { lang, t } = useLanguage();

  return (
    <section className="hero-section" id="home">
      <div className="hero-scene-layer">
        <HeroVisual />
      </div>
      <div className="hero-content">
        <p className="eyebrow">{t.heroEyebrow}</p>
        <h1>{t.heroTitle}</h1>
        <p className="hero-copy">{t.heroBody}</p>
        <div className="hero-actions">
          <Link href="/book-appointment" className="primary-button large">
            <CalendarCheck size={20} />
            {t.book}
            <ArrowRight size={18} />
          </Link>
          <a
            className="secondary-button large"
            href={whatsappUrl("Hello Doctor, I would like to ask a question before booking.")}
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle size={20} />
            {t.whatsapp}
          </a>
        </div>
        <p className="reassurance">{t.noLogin}</p>
        <div className="hero-proof">
          {[t.heroTrust1, t.heroTrust2, t.heroTrust3].map((item) => (
            <span key={item}>
              <ShieldCheck size={17} />
              {item}
            </span>
          ))}
        </div>
      </div>
      <div className="hero-stage">
        <div className="stage-notes">
          <span>{lang === "hi" ? "सटीक जांच" : "Precise diagnosis"}</span>
          <span>{lang === "hi" ? "एडवांस तकनीक" : "Advanced technology"}</span>
          <span>{lang === "hi" ? "सहानुभूतिपूर्ण देखभाल" : "Compassionate care"}</span>
        </div>
      </div>
      <div className="hero-local">
        <strong>{clinic.city}</strong>
        <span>{clinic.degrees}</span>
      </div>
    </section>
  );
}
