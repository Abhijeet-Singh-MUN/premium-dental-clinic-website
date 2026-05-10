import "./globals.css";
import { LanguageProvider } from "@/components/LanguageProvider";
import { clinic, services } from "@/lib/clinic";

const siteUrl = "https://globalsmilemzn.vercel.app";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: "Global Smile & Care Dental Clinic Muzaffarnagar | Dr. Vivek Malik",
  description:
    "Global Smile & Care Dental Clinic in Muzaffarnagar with appointment booking, WhatsApp contact, teeth cleaning, polishing, laser composite fillings, and Oral & Maxillofacial Surgery expertise.",
  keywords: [
    "dentist in Muzaffarnagar",
    "dental clinic Muzaffarnagar",
    "Global Smile and Care Dental Clinic",
    "Dr Vivek Malik dentist",
    "teeth cleaning Muzaffarnagar",
    "dental filling Muzaffarnagar",
    "oral maxillofacial surgery Muzaffarnagar",
    "wisdom tooth removal Muzaffarnagar"
  ],
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "Global Smile & Care Dental Clinic Muzaffarnagar",
    description:
      "Book dental appointments without login. WhatsApp-first contact for cleaning, polishing, fillings, implants, emergency dental care, and surgical consultations.",
    url: siteUrl,
    siteName: "Global Smile & Care Dental Clinic",
    locale: "hi_IN",
    type: "website",
    images: [
      {
        url: "/images/global-smile-logo.png",
        width: 1200,
        height: 1200,
        alt: "Global Smile & Care Dental Clinic"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Global Smile & Care Dental Clinic Muzaffarnagar",
    description:
      "Trusted dental care in Muzaffarnagar with easy appointment booking and WhatsApp contact.",
    images: ["/images/global-smile-logo.png"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  }
};

export default function RootLayout({ children }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    name: clinic.name,
    alternateName: "Global Smile and Care Dental Hospital",
    url: siteUrl,
    image: `${siteUrl}/images/global-smile-logo.png`,
    telephone: clinic.phone,
    email: clinic.email,
    priceRange: "$$",
    medicalSpecialty: [
      "Dentistry",
      "Oral and Maxillofacial Surgery",
      "Dental Implants",
      "Emergency Dental Care"
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress:
        "Gali Number 10, near Gagan property dealers, Gandhi Colony, North Rampuri",
      addressLocality: "Muzaffarnagar",
      addressRegion: "Uttar Pradesh",
      postalCode: "251002",
      addressCountry: "IN"
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 29.492152944527806,
      longitude: 77.6930989749891
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        opens: "10:00",
        closes: "16:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        opens: "17:00",
        closes: "20:00"
      }
    ],
    hasMap: clinic.mapsUrl,
    sameAs: [clinic.mapsUrl],
    founder: {
      "@type": "Person",
      name: clinic.doctor,
      honorificPrefix: "Dr.",
      jobTitle: "Dental Surgeon",
      description: clinic.degrees
    },
    makesOffer: services.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "MedicalProcedure",
        name: service.title,
        description: service.description
      }
    }))
  };

  return (
    <html lang="hi">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c")
          }}
        />
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
