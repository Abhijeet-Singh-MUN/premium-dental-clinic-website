"use client";

import Image from "next/image";
import { useLanguage } from "@/components/LanguageProvider";
import { Reveal } from "@/components/Reveal";

const gallery = [
  {
    label: "Doctor consultation",
    labelHi: "डॉक्टर कंसल्टेशन",
    type: "Real local clinic trust",
    typeHi: "असली लोकल क्लिनिक भरोसा",
    src: "/images/clinic/doctor-desk.jpeg",
    alt: "Dr. Vivek Malik seated at the clinic consultation desk"
  },
  {
    label: "Gentle child care",
    labelHi: "बच्चों की सौम्य देखभाल",
    type: "Calm, friendly care for young patients",
    typeHi: "बच्चों के लिए शांत और दोस्ताना देखभाल",
    src: "/images/clinic/doctor-child-care.jpeg",
    alt: "Dental checkup for a child at Global Smile & Care Dental Clinic"
  },
  {
    label: "Clinic exterior",
    labelHi: "क्लिनिक का बाहरी दृश्य",
    type: "Easy to recognize before arrival",
    typeHi: "विजिट से पहले पहचानना आसान",
    src: "/images/clinic/clinic-exterior.jpeg",
    alt: "Exterior signboard and entrance of Global Smile & Care Dental Clinic"
  },
  {
    label: "Sterilized instruments",
    labelHi: "स्टरलाइज्ड इंस्ट्रूमेंट्स",
    type: "Clean instruments and clinical preparation",
    typeHi: "साफ उपकरण और क्लिनिकल तैयारी",
    src: "/images/clinic/sterilization-instruments.jpeg",
    alt: "Dental instruments arranged in a sterilization cabinet"
  },
  {
    label: "Certificates & credentials",
    labelHi: "सर्टिफिकेट और योग्यता",
    type: "Visible proof of training and registration",
    typeHi: "ट्रेनिंग और रजिस्ट्रेशन का भरोसा",
    src: "/images/clinic/clinic-certificates.jpeg",
    alt: "Certificates displayed inside Global Smile & Care Dental Clinic"
  },
  {
    label: "Clinic walkthrough",
    labelHi: "क्लिनिक वॉकथ्रू",
    type: "Short look inside the clinic",
    typeHi: "क्लिनिक के अंदर की छोटी झलक",
    video: "/images/clinic/clinic-walkthrough.mp4"
  }
];

export function GallerySection() {
  const { lang, t } = useLanguage();

  return (
    <section className="content-section" id="gallery">
      <Reveal className="section-heading">
        <p className="eyebrow">
          {lang === "hi" ? "क्लिनिक की असली झलक" : "Real clinic confidence"}
        </p>
        <h2>{t.galleryTitle}</h2>
        <p>
          {lang === "hi"
            ? "विजिट से पहले मरीज डॉक्टर, क्लिनिक, उपकरण और जगह को देखकर ज्यादा भरोसा महसूस करते हैं. ये असली तस्वीरें क्लिनिक को पहले से परिचित बनाती हैं."
            : "Before booking, patients want to recognize the place, see the doctor, and feel confident about cleanliness and care. These real visuals make the clinic feel familiar before the visit."}
        </p>
      </Reveal>
      <div className="gallery-grid">
        {gallery.map((item, index) => (
          <Reveal key={item.label} delay={index * 70}>
            <article
              className={`gallery-card ${item.src ? "with-photo" : ""} ${
                item.video ? "with-video" : ""
              }`}
            >
              {item.src ? (
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 25vw"
                />
              ) : null}
              {item.video ? (
                <video controls preload="metadata" playsInline>
                  <source src={item.video} type="video/mp4" />
                </video>
              ) : null}
              <div className="gallery-caption">
                <strong>{lang === "hi" ? item.labelHi : item.label}</strong>
                <span>{lang === "hi" ? item.typeHi : item.type}</span>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
