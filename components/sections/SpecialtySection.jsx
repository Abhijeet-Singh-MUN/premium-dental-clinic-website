"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, Microscope, ShieldPlus } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { Reveal } from "@/components/Reveal";

const points = [
  "Wisdom tooth and complex extractions",
  "Dental implant surgical planning",
  "Jaw, facial trauma, cyst, and oral surgery concerns",
  "Patient-friendly explanations before treatment"
];

export function SpecialtySection() {
  const { t } = useLanguage();
  return (
    <section className="specialty-section" id="omfs">
      <Reveal className="specialty-copy">
        <p className="eyebrow">{t.specialtyEyebrow}</p>
        <h2>{t.specialtyTitle}</h2>
        <p>{t.specialtyBody}</p>
        <div className="specialty-list">
          {points.map((point) => (
            <span key={point}>
              <CheckCircle2 size={18} />
              {point}
            </span>
          ))}
        </div>
        <Link className="text-link" href="/book-appointment">
          Book a specialist consultation
          <ArrowRight size={17} />
        </Link>
      </Reveal>
      <Reveal className="specialty-panel" delay={120}>
        <div className="tech-card primary">
          <Microscope size={30} />
          <strong>Technical expertise</strong>
          <p>Make complex treatment feel understandable, planned, and safe.</p>
        </div>
        <div className="tech-card">
          <ShieldPlus size={30} />
          <strong>Human reassurance</strong>
          <p>Reduce fear with clear steps, pain concern answers, and WhatsApp access.</p>
        </div>
      </Reveal>
    </section>
  );
}
