# Global Smile & Care Dental Clinic Website

A publishable V1 business website for **Global Smile & Care Dental Clinic** in Muzaffarnagar, Uttar Pradesh. The site is designed to feel premium, calm, trustworthy, locally familiar, and easy to use, with a strong focus on converting visitors into appointment requests without login or payment friction.

Production site: `https://globalsmilemzn.vercel.app/`

GitHub repository: `https://github.com/Abhijeet-Singh-MUN/premium-dental-clinic-website`

## Current V1 Features

- Responsive Next.js website for desktop, tablet, Android, and iOS
- Hindi-first customer experience with an English toggle
- No-login appointment request flow with service, date/time, name, phone, and message fields
- WhatsApp click-to-chat flows for booking, questions, service concerns, and pain/emergency intent
- Real clinic contact details, Google Maps embed, clinic hours, FAQ, gallery, services, and about pages
- Immersive React Three Fiber / Three.js dental hero scene with interactive anatomy highlights
- Warm clinical visual system using deep teal, ivory, soft neutrals, and professional readable typography
- Real clinic photos, walkthrough video, and patient review snippets for stronger trust-building

## Pages

- `/` - landing page with hero, trust signals, services, specialist focus, booking, reviews, gallery, FAQ, and contact
- `/services` - service tiles plus specialty and booking sections
- `/about` - doctor/clinic introduction
- `/gallery` - real clinic visuals and walkthrough video
- `/faq` - patient questions before booking
- `/contact` - call, WhatsApp, email, map, address, and hours
- `/book-appointment` - no-login appointment request flow

## 3D Assets

The active hero uses optimized local GLB assets with custom Three.js materials for a polished dental-clinic presentation. Asset notes and attribution are maintained in [`public/models/README.md`](public/models/README.md).

## Content And Assets

- Core clinic/service/contact data lives in [`lib/clinic.js`](lib/clinic.js).
- Hindi/English UI copy lives in [`lib/i18n.js`](lib/i18n.js).
- Clinic photos and video live in [`public/images/clinic`](public/images/clinic).
- The booking form stores requests locally for V1 and is structured so a real backend can be added later.

## Local Development

```bash
npm install
npm run dev -- -p 3001
```

Open `http://localhost:3001`.

If the local dev server behaves strangely after repeated restarts, stop any old Node/Next process using the port and remove the local `.next` cache. The production build is the source of truth for deploy health.

Useful Windows port cleanup:

```powershell
netstat -ano | Select-String ':3001'
Stop-Process -Id <PID> -Force
```

## Verification

```bash
npm run lint
npm run build
```

## Documentation

- [`PLAN.md`](PLAN.md) tracks product priorities and later-phase backlog.
- [`ARCHITECTURE.md`](ARCHITECTURE.md) records the current site structure, interaction decisions, deployment notes, and local development caveats.

## Notes

This repository intentionally keeps V1 simple: no patient login, no online payments, no admin dashboard, and no production database yet. Those can come later after the website proves the core traffic and appointment conversion experience.

Before deploying, verify:

- Hindi and English toggle both read naturally.
- Booking form works without login.
- WhatsApp links open with useful prefilled messages.
- Gallery images/video load acceptably on mobile.
- Google Maps embed and contact details are correct.
