"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { Reveal } from "@/components/Reveal";

const faqs = [
  {
    question: "Does dental treatment hurt?",
    questionHi: "क्या डेंटल ट्रीटमेंट में दर्द होता है?",
    answer:
      "The first goal is comfort. The clinic can explain anesthesia, pain control, and expected recovery before you decide.",
    answerHi:
      "सबसे पहला लक्ष्य आराम है. इलाज से पहले एनेस्थीसिया, दर्द नियंत्रण और रिकवरी के बारे में साफ बताया जा सकता है."
  },
  {
    question: "Can I ask a question before booking?",
    questionHi: "क्या बुकिंग से पहले सवाल पूछ सकते हैं?",
    answer:
      "Yes. The WhatsApp buttons are designed for exactly that, especially for patients who are anxious or unsure.",
    answerHi:
      "हां. WhatsApp बटन इसी के लिए हैं, खासकर अगर आप घबराए हुए हैं या इलाज को लेकर unsure हैं."
  },
  {
    question: "What services are available?",
    questionHi: "कौन-कौन सी सेवाएं उपलब्ध हैं?",
    answer:
      "Current highlighted services include teeth cleaning, teeth polishing, laser composite teeth filling, emergency dental care, implants, and Oral & Maxillofacial Surgery.",
    answerHi:
      "मुख्य सेवाओं में दांतों की सफाई, पॉलिशिंग, लेजर कंपोजिट फिलिंग, इमरजेंसी डेंटल केयर, इम्प्लांट और ओरल व मैक्सिलोफेशियल सर्जरी शामिल हैं."
  },
  {
    question: "Do I need to create an account?",
    questionHi: "क्या अकाउंट बनाना जरूरी है?",
    answer:
      "No. Booking stays simple: choose service, preferred time, and contact details. The clinic confirms directly.",
    answerHi:
      "नहीं. बस सेवा, पसंदीदा समय और संपर्क जानकारी दें. क्लिनिक सीधे कन्फर्म करेगा."
  },
  {
    question: "Where is the clinic?",
    questionHi: "क्लिनिक कहां है?",
    answer:
      "Global Smile and Care Dental Hospital is at Gali Number 10, near Gagan property dealers, Gandhi Colony, North Rampuri, Muzaffarnagar, Uttar Pradesh 251002.",
    answerHi:
      "Global Smile and Care Dental Hospital, Gali Number 10, near Gagan property dealers, Gandhi Colony, North Rampuri, Muzaffarnagar, Uttar Pradesh 251002 पर है."
  }
];

export function FaqSection({ standalone = false }) {
  const { lang, t } = useLanguage();
  const [open, setOpen] = useState(0);

  return (
    <section className={`content-section faq-section ${standalone ? "standalone" : ""}`} id="faq">
      <Reveal className="section-heading">
        <p className="eyebrow">FAQ</p>
        <h2>{t.faqTitle}</h2>
      </Reveal>
      <div className="faq-list">
        {faqs.map((faq, index) => {
          const question = lang === "hi" ? faq.questionHi : faq.question;
          const answer = lang === "hi" ? faq.answerHi : faq.answer;

          return (
            <Reveal key={faq.question} delay={index * 50}>
              <button
                className={`faq-item ${open === index ? "open" : ""}`}
                type="button"
                onClick={() => setOpen(open === index ? -1 : index)}
              >
                <span>
                  <strong>{question}</strong>
                  {open === index && <p>{answer}</p>}
                </span>
                <ChevronDown size={21} />
              </button>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
