"use client";

import Image from "next/image";
import { Award, GraduationCap, HeartHandshake } from "lucide-react";
import { clinic } from "@/lib/clinic";
import { useLanguage } from "@/components/LanguageProvider";
import { Reveal } from "@/components/Reveal";

export function AboutSection({ standalone = false }) {
  const { t } = useLanguage();
  return (
    <section className={`about-section ${standalone ? "standalone" : ""}`} id="about">
      <Reveal className="doctor-portrait">
        <div className="portrait-photo">
          <Image
            src="/images/clinic/doctor-desk.jpeg"
            alt={`${clinic.doctor} at Global Smile & Care Dental Clinic`}
            fill
            sizes="(max-width: 760px) 100vw, 42vw"
            priority={standalone}
          />
        </div>
        <div className="doctor-badge">
          <Award size={18} />
          Ex-Army Dental Surgeon
        </div>
      </Reveal>
      <Reveal className="about-copy" delay={100}>
        <p className="eyebrow">{t.aboutEyebrow}</p>
        <h2>{t.aboutTitle}</h2>
        <p>{t.aboutBody}</p>
        <div className="credential-grid">
          <span>
            <GraduationCap size={21} />
            {clinic.degrees}
          </span>
          <span>
            <HeartHandshake size={21} />
            18 years of service, 26,000 patients treated
          </span>
        </div>
      </Reveal>
    </section>
  );
}
