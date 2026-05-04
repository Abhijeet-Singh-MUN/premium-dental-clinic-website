import { PageShell } from "@/components/PageShell";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { SpecialtySection } from "@/components/sections/SpecialtySection";
import { BookingSection } from "@/components/sections/BookingSection";

export default function ServicesPage() {
  return (
    <PageShell active="services">
      <main className="page-main">
        <section className="page-hero compact">
          <p className="eyebrow">Dental services</p>
          <h1>Routine dentistry, specialist surgery, and clear guidance in one place.</h1>
          <p>
            Placeholder service content built for patient clarity: what the treatment solves,
            what to expect, and how to ask before booking.
          </p>
        </section>
        <ServicesSection />
        <SpecialtySection />
        <BookingSection />
      </main>
    </PageShell>
  );
}
