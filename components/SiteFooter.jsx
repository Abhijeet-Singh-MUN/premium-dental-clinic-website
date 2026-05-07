"use client";

import Link from "next/link";
import { clinic, navItems, whatsappUrl } from "@/lib/clinic";
import { useLanguage } from "@/components/LanguageProvider";

export function SiteFooter() {
  const { lang } = useLanguage();

  return (
    <footer className="site-footer">
      <div>
        <strong>{clinic.name}</strong>
        <p>
          {lang === "hi"
            ? "मुजफ्फरनगर में भरोसेमंद डेंटल केयर, आसान अपॉइंटमेंट और WhatsApp-first संपर्क."
            : "Trusted dental care in Muzaffarnagar with easy appointments and WhatsApp-first contact."}
        </p>
        <small>
          3D anatomy model adapted from University of Dundee, School of
          Dentistry, CC-BY-4.0.
        </small>
      </div>
      <div>
        <span>{lang === "hi" ? "नेविगेशन" : "Navigate"}</span>
        {navItems.map((item) => (
          <Link key={item.id} href={item.href}>
            {lang === "hi" ? item.labelHi : item.label}
          </Link>
        ))}
      </div>
      <div>
        <span>{lang === "hi" ? "संपर्क" : "Contact"}</span>
        <a href={clinic.phoneHref}>{clinic.phone}</a>
        <a href={`mailto:${clinic.email}`}>{clinic.email}</a>
        <a
          href={whatsappUrl("Hello Doctor, I would like to book an appointment.")}
          target="_blank"
          rel="noreferrer"
        >
          {lang === "hi" ? "WhatsApp पर बात करें" : "WhatsApp the clinic"}
        </a>
      </div>
    </footer>
  );
}
