import { PageShell } from "@/components/PageShell";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { SpecialtySection } from "@/components/sections/SpecialtySection";
import { BookingSection } from "@/components/sections/BookingSection";

export default function ServicesPage() {
  return (
    <PageShell active="services">
      <main className="page-main services-page">
        <ServicesSection />
        <SpecialtySection />
        <BookingSection />
      </main>
    </PageShell>
  );
}
