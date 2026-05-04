import { PageShell } from "@/components/PageShell";
import { ContactSection } from "@/components/sections/ContactSection";
import { BookingSection } from "@/components/sections/BookingSection";

export default function ContactPage() {
  return (
    <PageShell active="contact">
      <main className="page-main">
        <ContactSection standalone />
        <BookingSection />
      </main>
    </PageShell>
  );
}
