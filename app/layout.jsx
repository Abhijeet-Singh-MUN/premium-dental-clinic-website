import "./globals.css";
import { LanguageProvider } from "@/components/LanguageProvider";

export const metadata = {
  title: "Lumine Dental Muzaffarnagar | Oral & Maxillofacial Care",
  description:
    "A premium dental clinic website for Muzaffarnagar with appointment booking, WhatsApp contact, and Oral & Maxillofacial Surgery expertise."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
