import { PageShell } from "@/components/PageShell";
import { AboutSection } from "@/components/sections/AboutSection";
import { JourneySection } from "@/components/sections/JourneySection";
import { BookingSection } from "@/components/sections/BookingSection";

export default function AboutPage() {
  return (
    <PageShell active="about">
      <main className="page-main">
        <AboutSection standalone />
        <JourneySection />
        <BookingSection />
      </main>
    </PageShell>
  );
}
