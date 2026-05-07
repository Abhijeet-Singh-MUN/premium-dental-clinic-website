"use client";

import { ExternalLink, Mail, MapPin, MessageCircle, Phone, Timer } from "lucide-react";
import { clinic, whatsappUrl } from "@/lib/clinic";
import { useLanguage } from "@/components/LanguageProvider";
import { Reveal } from "@/components/Reveal";

export function ContactSection({ standalone = false }) {
  const { lang, t } = useLanguage();
  const mapSrc = clinic.mapEmbedUrl;

  return (
    <section className={`contact-section ${standalone ? "standalone" : ""}`} id="contact">
      <Reveal className="contact-copy">
        <p className="eyebrow">{lang === "hi" ? "संपर्क" : "Contact"}</p>
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
            {lang === "hi" ? `WhatsApp: ${clinic.phone}` : `WhatsApp: ${clinic.phone}`}
          </a>
          <a href={`mailto:${clinic.email}`}>
            <Mail size={20} />
            {clinic.email}
          </a>
          <span>
            <MapPin size={20} />
            {clinic.address}
          </span>
          <a href={clinic.mapsUrl} target="_blank" rel="noreferrer">
            <ExternalLink size={20} />
            {lang === "hi" ? "Google Maps में खोलें" : "Open in Google Maps"}
          </a>
          <span>
            <Timer size={20} />
            {lang === "hi" ? clinic.hoursHi : clinic.hours}
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
