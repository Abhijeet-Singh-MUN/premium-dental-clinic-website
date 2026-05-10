"use client";

import Image from "next/image";
import { useLanguage } from "@/components/LanguageProvider";
import { Reveal } from "@/components/Reveal";

const gallery = [
  {
    label: "Doctor consultation",
    labelHi: "डॉक्टर कंसल्टेशन",
    type: "Real local clinic trust",
    typeHi: "असली लोकल क्लिनिक भरोसा",
    src: "/images/clinic/doctor-desk.jpeg",
    alt: "Dr. Vivek Malik seated at the clinic consultation desk"
  },
  {
    label: "Gentle child care",
    labelHi: "बच्चों के लिए सौम्य देखभाल",
    type: "Calm, friendly care for young patients",
    typeHi: "बच्चों के लिए शांत और दोस्ताना देखभाल",
    src: "/images/clinic/doctor-child-care.jpeg",
    alt: "Dental checkup for a child at Global Smile & Care Dental Clinic"
  },
  {
    label: "Treatment room",
    labelHi: "ट्रीटमेंट रूम",
    type: "More facility photos coming soon",
    typeHi: "क्लिनिक की और तस्वीरें जल्द",
    src: null
  },
  {
    label: "Clinic exterior",
    labelHi: "क्लिनिक बाहरी दृश्य",
    type: "Signboard photo to be added",
    typeHi: "साइनबोर्ड फोटो जोड़ी जाएगी",
    src: null
  }
];

export function GallerySection() {
  const { lang, t } = useLanguage();
  return (
    <section className="content-section" id="gallery">
      <Reveal className="section-heading">
        <p className="eyebrow">{lang === "hi" ? "असली क्लिनिक फोटो" : "Visual trust"}</p>
        <h2>{t.galleryTitle}</h2>
        <p>
          {lang === "hi"
            ? "मरीज बुकिंग से पहले असली क्लिनिक, डॉक्टर और देखभाल का भरोसा देखना चाहते हैं."
            : "Patients want proof before they book. Real clinic photos help build confidence before a visit."}
        </p>
      </Reveal>
      <div className="gallery-grid">
        {gallery.map((item, index) => (
          <Reveal key={item.label} delay={index * 70}>
            <article className={`gallery-card ${item.src ? "with-photo" : ""}`}>
              {item.src ? (
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 25vw"
                />
              ) : null}
              <div className="gallery-caption">
                <strong>{lang === "hi" ? item.labelHi : item.label}</strong>
                <span>{lang === "hi" ? item.typeHi : item.type}</span>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
