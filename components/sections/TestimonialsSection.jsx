"use client";

import { Quote, Star } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const testimonials = [
  {
    name: "Patient placeholder",
    treatment: "Wisdom tooth care",
    text: "The explanation was clear and I felt comfortable before the procedure."
  },
  {
    name: "Patient placeholder",
    treatment: "Dental implant",
    text: "The clinic helped me understand the complete process before booking."
  },
  {
    name: "Patient placeholder",
    treatment: "Emergency pain",
    text: "Quick WhatsApp response made it easier to visit without confusion."
  }
];

export function TestimonialsSection() {
  return (
    <section className="content-section testimonials-section">
      <Reveal className="section-heading">
        <p className="eyebrow">Social proof</p>
        <h2>Reviews should answer fear, cost, credibility, and convenience.</h2>
        <p>
          Replace these with real Google reviews, patient videos, and consented
          stories that show warmth as strongly as expertise.
        </p>
      </Reveal>
      <div className="testimonial-grid">
        {testimonials.map((item, index) => (
          <Reveal key={item.treatment} delay={index * 80}>
            <article className="testimonial-card">
              <Quote size={24} />
              <p>{item.text}</p>
              <div className="stars" aria-label="5 star placeholder rating">
                {[0, 1, 2, 3, 4].map((star) => (
                  <Star key={star} size={15} fill="currentColor" />
                ))}
              </div>
              <strong>{item.name}</strong>
              <span>{item.treatment}</span>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
