"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, Microscope, ShieldPlus } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { Reveal } from "@/components/Reveal";

const points = [
  {
    en: "Wisdom tooth and complex extractions",
    hi: "अकल दाढ़ और जटिल दांत निकालना"
  },
  {
    en: "Dental implant surgical planning",
    hi: "डेंटल इम्प्लांट की सर्जिकल प्लानिंग"
  },
  {
    en: "Jaw, facial trauma, cyst, and oral surgery concerns",
    hi: "जबड़े, चेहरे की चोट, सिस्ट और ओरल सर्जरी से जुड़ी समस्याएं"
  },
  {
    en: "Patient-friendly explanations before treatment",
    hi: "इलाज से पहले मरीज को आसान भाषा में पूरी जानकारी"
  }
];

export function SpecialtySection() {
  const { lang, t } = useLanguage();

  return (
    <section className="specialty-section" id="omfs">
      <Reveal className="specialty-copy">
        <p className="eyebrow">{t.specialtyEyebrow}</p>
        <h2>{t.specialtyTitle}</h2>
        <p>{t.specialtyBody}</p>
        <div className="specialty-list">
          {points.map((point) => (
            <span key={point.en}>
              <CheckCircle2 size={18} />
              {lang === "hi" ? point.hi : point.en}
            </span>
          ))}
        </div>
        <Link className="text-link" href="/book-appointment">
          {lang === "hi" ? "विशेषज्ञ कंसल्टेशन बुक करें" : "Book a specialist consultation"}
          <ArrowRight size={17} />
        </Link>
      </Reveal>
      <Reveal className="specialty-panel" delay={120}>
        <div className="tech-card primary">
          <Microscope size={30} />
          <strong>{lang === "hi" ? "तकनीकी विशेषज्ञता" : "Technical expertise"}</strong>
          <p>
            {lang === "hi"
              ? "जटिल इलाज को समझने योग्य, प्लान्ड और सुरक्षित महसूस कराना."
              : "Make complex treatment feel understandable, planned, and safe."}
          </p>
        </div>
        <div className="tech-card">
          <ShieldPlus size={30} />
          <strong>{lang === "hi" ? "मानवीय भरोसा" : "Human reassurance"}</strong>
          <p>
            {lang === "hi"
              ? "साफ स्टेप्स, दर्द से जुड़े जवाब और WhatsApp एक्सेस से डर कम करना."
              : "Reduce fear with clear steps, pain concern answers, and WhatsApp access."}
          </p>
        </div>
      </Reveal>
    </section>
  );
}
