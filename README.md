# Premium Dental Clinic Website

A publishable V1 website for a Muzaffarnagar, Uttar Pradesh dental clinic. The project is built to feel premium, calm, trustworthy, and easy to use, with a strong focus on converting visitors into appointment requests without adding login or payment friction.

## Current V1 Features

- Responsive Next.js website for desktop, tablet, Android, and iOS
- Hindi/English language toggle for the main customer-facing UI
- No-login appointment request flow with service, date/time, name, phone, and message fields
- WhatsApp click-to-chat flows for booking, questions, service concerns, and pain/emergency intent
- Contact information placeholders, Google Maps embed, clinic hours, FAQ, gallery, services, and about pages
- Immersive React Three Fiber / Three.js dental hero scene with interactive anatomy highlights
- Warm clinical visual system using deep teal, ivory, soft neutrals, and professional readable typography
- Placeholder clinic, doctor, service, review, gallery, and address content ready to replace with real details

## 3D Assets

The active hero uses optimized local GLB assets with custom Three.js materials for a polished dental-clinic presentation. Asset notes and attribution are maintained in [`public/models/README.md`](public/models/README.md).

## Local Development

```bash
npm install
npm run dev -- -p 3001
```

Open `http://localhost:3001`.

If the local dev server behaves strangely after repeated restarts, stop any old Node/Next process using the port and remove the local `.next` cache. The production build is the source of truth for deploy health.

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
