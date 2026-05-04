import { PageShell } from "@/components/PageShell";
import { GallerySection } from "@/components/sections/GallerySection";
import { BookingSection } from "@/components/sections/BookingSection";

export default function GalleryPage() {
  return (
    <PageShell active="gallery">
      <main className="page-main">
        <section className="page-hero compact">
          <p className="eyebrow">Gallery</p>
          <h1>Clinic, treatment, and result placeholders ready for real assets.</h1>
          <p>
            Replace these panels with real clinic photos, consented before-after cases, and a
            calm video walkthrough when available.
          </p>
        </section>
        <GallerySection />
        <BookingSection />
      </main>
    </PageShell>
  );
}
