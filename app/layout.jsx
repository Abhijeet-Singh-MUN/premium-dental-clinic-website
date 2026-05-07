import "./globals.css";
import { LanguageProvider } from "@/components/LanguageProvider";

export const metadata = {
  title: "Global Smile & Care Dental Clinic Muzaffarnagar | Dr. Vivek Malik",
  description:
    "Global Smile & Care Dental Clinic in Muzaffarnagar with appointment booking, WhatsApp contact, teeth cleaning, polishing, laser composite fillings, and Oral & Maxillofacial Surgery expertise."
};

export default function RootLayout({ children }) {
  return (
    <html lang="hi">
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
