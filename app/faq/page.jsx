import { PageShell } from "@/components/PageShell";
import { FaqSection } from "@/components/sections/FaqSection";
import { BookingSection } from "@/components/sections/BookingSection";

export default function FaqPage() {
  return (
    <PageShell active="faq">
      <main className="page-main">
        <FaqSection standalone />
        <BookingSection />
      </main>
    </PageShell>
  );
}
