import { PageShell } from "@/components/PageShell";
import { GallerySection } from "@/components/sections/GallerySection";
import { BookingSection } from "@/components/sections/BookingSection";

export default function GalleryPage() {
  return (
    <PageShell active="gallery">
      <main className="page-main">
        <section className="page-hero compact">
          <p className="eyebrow">Gallery</p>
          <h1>Real clinic photos that help patients feel familiar before visiting.</h1>
          <p>
            More chair, exterior, team, and short clinic walkthrough visuals can be added as
            they become available.
          </p>
        </section>
        <GallerySection />
        <BookingSection />
      </main>
    </PageShell>
  );
}
