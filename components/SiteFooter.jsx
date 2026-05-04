import Link from "next/link";
import { clinic, navItems, whatsappUrl } from "@/lib/clinic";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div>
        <strong>{clinic.name}</strong>
        <p>
          Placeholder premium dental clinic website for Muzaffarnagar. Replace
          all details before publishing.
        </p>
        <small>
          3D anatomy model adapted from University of Dundee, School of
          Dentistry, CC-BY-4.0.
        </small>
      </div>
      <div>
        <span>Navigate</span>
        {navItems.map((item) => (
          <Link key={item.id} href={item.href}>
            {item.label}
          </Link>
        ))}
      </div>
      <div>
        <span>Contact</span>
        <a href={clinic.phoneHref}>{clinic.phone}</a>
        <a href={`mailto:${clinic.email}`}>{clinic.email}</a>
        <a
          href={whatsappUrl("Hello Doctor, I would like to book an appointment.")}
          target="_blank"
          rel="noreferrer"
        >
          WhatsApp the clinic
        </a>
      </div>
    </footer>
  );
}
