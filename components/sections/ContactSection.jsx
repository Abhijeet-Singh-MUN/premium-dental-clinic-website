"use client";

import { Mail, MapPin, MessageCircle, Phone, Timer } from "lucide-react";
import { clinic, whatsappUrl } from "@/lib/clinic";
import { useLanguage } from "@/components/LanguageProvider";
import { Reveal } from "@/components/Reveal";

export function ContactSection({ standalone = false }) {
  const { t } = useLanguage();
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(clinic.mapQuery)}&output=embed`;

  return (
    <section className={`contact-section ${standalone ? "standalone" : ""}`} id="contact">
      <Reveal className="contact-copy">
        <p className="eyebrow">Contact</p>
        <h2>{t.contactTitle}</h2>
        <p>{t.contactBody}</p>
        <div className="contact-list">
          <a href={clinic.phoneHref}>
            <Phone size={20} />
            {clinic.phone}
          </a>
          <a
            href={whatsappUrl("Hello Doctor, I would like to book an appointment.")}
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle size={20} />
            WhatsApp: {clinic.phone}
          </a>
          <a href={`mailto:${clinic.email}`}>
            <Mail size={20} />
            {clinic.email}
          </a>
          <span>
            <MapPin size={20} />
            {clinic.address}
          </span>
          <span>
            <Timer size={20} />
            {clinic.hours}
          </span>
        </div>
      </Reveal>
      <Reveal className="map-card" delay={120}>
        <iframe
          title="Clinic location map"
          src={mapSrc}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </Reveal>
    </section>
  );
}
