"use client";

import { Award, MapPin, Star, UsersRound } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const trustItems = [
  { icon: UsersRound, value: "26,000+", label: "patients treated" },
  { icon: Award, value: "18 years", label: "of dental service" },
  { icon: Star, value: "8 years", label: "Dental Officer in Army" },
  { icon: MapPin, value: "Local", label: "Muzaffarnagar access" }
];

export function TrustSection() {
  return (
    <section className="trust-section" aria-label="Clinic trust signals">
      {trustItems.map((item, index) => {
        const Icon = item.icon;
        return (
          <Reveal key={item.label} delay={index * 80}>
            <div className="trust-card">
              <Icon size={24} />
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </div>
          </Reveal>
        );
      })}
    </section>
  );
}
