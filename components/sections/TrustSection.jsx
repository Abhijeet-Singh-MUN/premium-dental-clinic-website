"use client";

import { Award, MapPin, Star, UsersRound } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { Reveal } from "@/components/Reveal";

const trustItems = [
  { icon: UsersRound, valueKey: "trustPatientsValue", labelKey: "trustPatientsLabel" },
  { icon: Award, valueKey: "trustServiceValue", labelKey: "trustServiceLabel" },
  { icon: Star, valueKey: "trustArmyValue", labelKey: "trustArmyLabel" },
  { icon: MapPin, valueKey: "trustLocalValue", labelKey: "trustLocalLabel" }
];

export function TrustSection() {
  const { t } = useLanguage();

  return (
    <section className="trust-section" aria-label="Clinic trust signals">
      {trustItems.map((item, index) => {
        const Icon = item.icon;
        return (
          <Reveal key={item.labelKey} delay={index * 80}>
            <div className="trust-card">
              <Icon size={24} />
              <strong>{t[item.valueKey]}</strong>
              <span>{t[item.labelKey]}</span>
            </div>
          </Reveal>
        );
      })}
    </section>
  );
}
