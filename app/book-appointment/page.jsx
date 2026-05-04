import { PageShell } from "@/components/PageShell";
import { BookingSection } from "@/components/sections/BookingSection";

export default function BookAppointmentPage() {
  return (
    <PageShell active="book">
      <main className="page-main booking-page">
        <BookingSection standalone />
      </main>
    </PageShell>
  );
}
