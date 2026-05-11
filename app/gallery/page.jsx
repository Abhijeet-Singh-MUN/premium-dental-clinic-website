import { PageShell } from "@/components/PageShell";
import { GallerySection } from "@/components/sections/GallerySection";
import { BookingSection } from "@/components/sections/BookingSection";

export default function GalleryPage() {
  return (
    <PageShell active="gallery">
      <main className="page-main">
        <GallerySection />
        <BookingSection />
      </main>
    </PageShell>
  );
}
