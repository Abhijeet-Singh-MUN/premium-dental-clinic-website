# Architecture Notes

## Purpose

Global Smile & Care Dental Clinic is a conversion-focused public website for a Muzaffarnagar dental clinic. V1 prioritizes trust, clarity, fast contact, WhatsApp, and no-login booking over heavier portal or payment features.

## Application Shape

- Framework: Next.js App Router.
- Styling: global CSS in `app/globals.css` with responsive section-specific rules.
- Public routes: Home, Services, About, Gallery, FAQ, Contact, Book Appointment.
- Shared data/content: clinic details, service options, translations, and booking helpers live in `lib`.
- 3D hero: React Three Fiber / Drei components in `components/HeroVisual.jsx`, using local GLB assets from `public/models`.
- Images: real clinic/gallery images live under `public/images`.

## Key UX Decisions

- Hindi is the default language for local patient comfort, with an English toggle.
- Booking remains no-login and no-payment to reduce traffic friction.
- WhatsApp is treated as a primary conversion route for questions, pain concerns, and appointment requests.
- Mobile pages use compact layouts and horizontal swipe rows where vertical stacking becomes too long.
- Swipe rows show a right-side hint by default; the left-side fade/arrow appears only after the user moves right.

## Deployment

- GitHub repository: `Abhijeet-Singh-MUN/premium-dental-clinic-website`.
- Vercel production project: `globalsmilemzn`.
- Production URL: `https://globalsmilemzn.vercel.app/`.
- Vercel auto-deploys after pushes to the connected production branch.

If Vercel is still connected to a previous GitHub repository, reconnect the Vercel project to this repository in the Vercel dashboard before expecting automatic redeploys from this repo.

## Local Development

Recommended command:

```bash
npm run dev -- -p 3001
```

In VS Code, background mode has been confirmed to work better than it did in the standalone Codex app. The server can stay alive on `http://localhost:3001/` without blocking the chat when launched as a background process from the VS Code-integrated session.

Verification commands:

```bash
npm run lint
npm run build
```

Known local caveat on the current Windows/Codex environment:

- The shell environment currently exposes both `PATH` and `Path`, which breaks some PowerShell process-launching commands with a duplicate-key error.
- Repeated forced restarts can corrupt `.next/cache/webpack`, producing temporary `ENOENT` or `EPERM` cache errors.
- If that happens, stop old dev server processes, clear only `.next`, then restart the dev server.

These are local tooling issues. The app currently passes lint and production build.

## Main Modules

- `components/MainSite.jsx` composes the homepage sections.
- `components/sections/ServicesSection.jsx` renders the shared service grid used on Home and Services.
- `components/sections/BookingSection.jsx` handles the no-login appointment request flow.
- `components/sections/ContactSection.jsx` renders contact cards and Google Maps.
- `components/sections/GallerySection.jsx` renders real clinic visuals and the walkthrough video.
- `components/sections/TestimonialsSection.jsx` renders real review cards.
- `components/HeroVisual.jsx` handles the Three.js/R3F dental model presentation.

## Design Constraints

- Keep conversion paths visible: Call, WhatsApp, Book.
- Keep mobile pages compact; avoid long serial stacks where cards can become grids or swipe rows.
- Do not add login, payments, admin, analytics, or databases until traffic and appointment conversion basics are strong.
- Use real clinic visuals where possible. Avoid fake reviews or unverifiable claims.
