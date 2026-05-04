"use client";

import { Camera, Images, PlayCircle } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { Reveal } from "@/components/Reveal";

const gallery = [
  { label: "Clinic reception", type: "Warm first impression", icon: Camera },
  { label: "Treatment room", type: "Clean technology signal", icon: Images },
  { label: "Doctor welcome video", type: "Human trust builder", icon: PlayCircle },
  { label: "Before / after case", type: "Consent required", icon: Images }
];

export function GallerySection() {
  const { t } = useLanguage();
  return (
    <section className="content-section" id="gallery">
      <Reveal className="section-heading">
        <p className="eyebrow">Visual trust</p>
        <h2>{t.galleryTitle}</h2>
        <p>
          Patients want proof before they book. Real clinic photos and consented
          results should replace these placeholders before launch.
        </p>
      </Reveal>
      <div className="gallery-grid">
        {gallery.map((item, index) => {
          const Icon = item.icon;
          return (
            <Reveal key={item.label} delay={index * 70}>
              <article className="gallery-card">
                <Icon size={28} />
                <strong>{item.label}</strong>
                <span>{item.type}</span>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
