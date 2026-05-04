"use client";

import { PageShell } from "@/components/PageShell";
import { HeroSection } from "@/components/sections/HeroSection";
import { TrustSection } from "@/components/sections/TrustSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { SpecialtySection } from "@/components/sections/SpecialtySection";
import { AboutSection } from "@/components/sections/AboutSection";
import { JourneySection } from "@/components/sections/JourneySection";
import { GallerySection } from "@/components/sections/GallerySection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { BookingSection } from "@/components/sections/BookingSection";

export function MainSite() {
  return (
    <PageShell active="home">
      <main>
        <HeroSection />
        <TrustSection />
        <ServicesSection />
        <SpecialtySection />
        <AboutSection />
        <JourneySection />
        <GallerySection />
        <TestimonialsSection />
        <FaqSection />
        <BookingSection />
        <ContactSection />
      </main>
    </PageShell>
  );
}
