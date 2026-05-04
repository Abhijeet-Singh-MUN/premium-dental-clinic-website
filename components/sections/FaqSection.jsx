"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { Reveal } from "@/components/Reveal";

const faqs = [
  {
    question: "Does dental treatment hurt?",
    answer:
      "The first goal is comfort. The clinic can explain anesthesia, pain control, and expected recovery before you decide."
  },
  {
    question: "Can I ask a question before booking?",
    answer:
      "Yes. The WhatsApp buttons are designed for exactly that, especially for patients who are anxious or unsure."
  },
  {
    question: "What is Oral & Maxillofacial Surgery?",
    answer:
      "It is specialist treatment for complex concerns involving the mouth, jaw, face, wisdom teeth, implants, trauma, and related surgical problems."
  },
  {
    question: "Do I need to create an account?",
    answer:
      "No. V1 keeps booking simple: choose service, preferred time, and contact details. The clinic confirms directly."
  },
  {
    question: "Where is the clinic?",
    answer:
      "The placeholder location is Civil Lines, Muzaffarnagar. Replace it with the exact clinic address and Google Maps link."
  }
];

export function FaqSection({ standalone = false }) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(0);

  return (
    <section className={`content-section faq-section ${standalone ? "standalone" : ""}`} id="faq">
      <Reveal className="section-heading">
        <p className="eyebrow">FAQ</p>
        <h2>{t.faqTitle}</h2>
      </Reveal>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <Reveal key={faq.question} delay={index * 50}>
            <button
              className={`faq-item ${open === index ? "open" : ""}`}
              type="button"
              onClick={() => setOpen(open === index ? -1 : index)}
            >
              <span>
                <strong>{faq.question}</strong>
                {open === index && <p>{faq.answer}</p>}
              </span>
              <ChevronDown size={21} />
            </button>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
