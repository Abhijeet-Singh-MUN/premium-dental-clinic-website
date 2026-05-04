export const clinic = {
  name: "Lumine Dental",
  tagline: "Precision. Care. Confidence.",
  doctor: "Dr. Placeholder Name",
  degrees: "BDS, MDS - Oral & Maxillofacial Surgery",
  city: "Muzaffarnagar, Uttar Pradesh",
  phone: "+91 98765 43210",
  phoneHref: "tel:+919876543210",
  whatsappNumber: "919876543210",
  email: "care@luminedental.example",
  address:
    "Near Placeholder Landmark, Civil Lines, Muzaffarnagar, Uttar Pradesh 251001",
  hours: "Mon-Sat, 10:00 AM - 7:00 PM",
  emergency: "+91 98765 43210",
  mapQuery: "Civil Lines Muzaffarnagar Uttar Pradesh dental clinic"
};

export const services = [
  {
    id: "omfs",
    icon: "surgery",
    title: "Oral & Maxillofacial Surgery",
    titleHi: "ओरल और मैक्सिलोफेशियल सर्जरी",
    description:
      "Specialist care for complex jaw, face, wisdom tooth, trauma, and surgical dental concerns.",
    descriptionHi:
      "जबड़ा, चेहरा, अक्ल दाढ़, चोट और जटिल सर्जिकल डेंटल समस्याओं के लिए विशेषज्ञ देखभाल."
  },
  {
    id: "implants",
    icon: "implant",
    title: "Dental Implants",
    titleHi: "डेंटल इम्प्लांट",
    description:
      "Stable tooth replacement planned with precision, comfort, and long-term function in mind.",
    descriptionHi:
      "मजबूत दांत रिप्लेसमेंट, जिसे आराम, सही प्लानिंग और लंबे समय के उपयोग के लिए बनाया जाता है."
  },
  {
    id: "wisdom",
    icon: "tooth",
    title: "Wisdom Tooth Removal",
    titleHi: "अक्ल दाढ़ निकालना",
    description:
      "Clear diagnosis and gentle removal planning for painful, impacted, or infected wisdom teeth.",
    descriptionHi:
      "दर्द, फंसी हुई या इन्फेक्टेड अक्ल दाढ़ के लिए साफ सलाह और सावधानीपूर्वक इलाज."
  },
  {
    id: "root-canal",
    icon: "shield",
    title: "Root Canal Treatment",
    titleHi: "रूट कैनाल",
    description:
      "Pain-relief focused treatment to save infected teeth and restore normal chewing.",
    descriptionHi:
      "दांत बचाने और दर्द कम करने के लिए आरामदायक रूट कैनाल उपचार."
  },
  {
    id: "cosmetic",
    icon: "sparkle",
    title: "Cosmetic Dentistry",
    titleHi: "कॉस्मेटिक डेंटिस्ट्री",
    description:
      "Whitening, veneers, smile design, and careful improvements that still look natural.",
    descriptionHi:
      "व्हाइटनिंग, विनियर और स्माइल डिजाइन, जिससे मुस्कान सुंदर लेकिन प्राकृतिक दिखे."
  },
  {
    id: "orthodontics",
    icon: "align",
    title: "Braces & Aligners",
    titleHi: "ब्रेसेज़ और अलाइनर्स",
    description:
      "Straightening options for children, teens, and adults with practical follow-up planning.",
    descriptionHi:
      "बच्चों, युवाओं और बड़ों के लिए दांत सीधा करने के आसान विकल्प और फॉलो-अप प्लान."
  },
  {
    id: "emergency",
    icon: "alert",
    title: "Emergency Dental Care",
    titleHi: "इमरजेंसी डेंटल केयर",
    description:
      "Quick help for swelling, tooth pain, broken teeth, bleeding, and sudden dental trauma.",
    descriptionHi:
      "सूजन, तेज दांत दर्द, टूटे दांत, खून आने या अचानक चोट लगने पर जल्दी सहायता."
  }
];

export const navItems = [
  { href: "/", id: "home", label: "Home", labelHi: "होम" },
  { href: "/services", id: "services", label: "Services", labelHi: "सेवाएं" },
  { href: "/about", id: "about", label: "About", labelHi: "डॉक्टर" },
  { href: "/gallery", id: "gallery", label: "Gallery", labelHi: "गैलरी" },
  { href: "/faq", id: "faq", label: "FAQ", labelHi: "सवाल" },
  { href: "/contact", id: "contact", label: "Contact", labelHi: "संपर्क" }
];

export function whatsappUrl(message) {
  return `https://wa.me/${clinic.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
