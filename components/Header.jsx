"use client";

import Link from "next/link";
import { CalendarDays, Languages, Menu, Phone, X } from "lucide-react";
import { useState } from "react";
import { clinic, navItems, whatsappUrl } from "@/lib/clinic";
import { useLanguage } from "@/components/LanguageProvider";

export function Header({ active }) {
  const [open, setOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();

  return (
    <header className="site-header">
      <a className="emergency-strip" href={clinic.phoneHref}>
        Dental emergency or severe pain? Call now: {clinic.phone}
      </a>
      <nav className="nav-shell" aria-label="Main navigation">
        <Link href="/" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-mark" aria-hidden="true">
            <span />
          </span>
          <span>
            <strong>{clinic.name}</strong>
            <small>{clinic.tagline}</small>
          </span>
        </Link>

        <div className="desktop-nav">
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={active === item.id ? "active" : ""}
            >
              {lang === "hi" ? item.labelHi : item.label}
            </Link>
          ))}
        </div>

        <div className="nav-actions">
          <button
            className="icon-button"
            type="button"
            onClick={() => setLang(lang === "en" ? "hi" : "en")}
            aria-label="Toggle Hindi English"
            title="Hindi / English"
          >
            <Languages size={18} />
            <span>{lang === "en" ? "हिंदी" : "EN"}</span>
          </button>
          <a className="call-button" href={clinic.phoneHref}>
            <Phone size={17} />
            <span>{t.call}</span>
          </a>
          <Link className="primary-button nav-book" href="/book-appointment">
            <CalendarDays size={17} />
            <span>{t.book}</span>
          </Link>
          <button
            className="menu-button"
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label="Open menu"
          >
            {open ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="mobile-menu">
          {navItems.map((item) => (
            <Link key={item.id} href={item.href} onClick={() => setOpen(false)}>
              {lang === "hi" ? item.labelHi : item.label}
            </Link>
          ))}
          <Link href="/book-appointment" onClick={() => setOpen(false)}>
            {t.book}
          </Link>
          <a
            href={whatsappUrl("Hello Doctor, I would like to ask a question before booking.")}
            target="_blank"
            rel="noreferrer"
          >
            {t.whatsapp}
          </a>
        </div>
      )}
    </header>
  );
}
