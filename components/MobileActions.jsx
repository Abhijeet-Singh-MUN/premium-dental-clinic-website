"use client";

import Link from "next/link";
import { CalendarCheck, MessageCircle, Phone } from "lucide-react";
import { clinic, whatsappUrl } from "@/lib/clinic";
import { useLanguage } from "@/components/LanguageProvider";

export function MobileActions() {
  const { t } = useLanguage();
  return (
    <div className="mobile-actions" aria-label="Quick contact actions">
      <a href={clinic.phoneHref}>
        <Phone size={18} />
        {t.call}
      </a>
      <a
        href={whatsappUrl("Hello Doctor, I would like to ask a question before booking.")}
        target="_blank"
        rel="noreferrer"
      >
        <MessageCircle size={18} />
        WhatsApp
      </a>
      <Link href="/book-appointment">
        <CalendarCheck size={18} />
        {t.book}
      </Link>
    </div>
  );
}
