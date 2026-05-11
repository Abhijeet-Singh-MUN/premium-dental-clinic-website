# Session Handoff

## Stable Project Links

- Local folder: `D:\2026 freelance\dental-clinic-website`
- GitHub remote: `https://github.com/Abhijeet-Singh-MUN/premium-dental-clinic-website.git`
- Current branch: `main`
- Last known website checkpoint before repository switch: `6aa8536 Polish mobile UX and gallery trust assets`
- Vercel local link: project name `globalsmilemzn`
- Vercel production URL: `https://globalsmilemzn.vercel.app/`

The local repo is being moved to Abhijeet's GitHub repository. The local `.vercel/project.json` is linked to `globalsmilemzn`.

## Current Uncommitted Work

These files currently have local changes after the last pushed commit:

- `README.md`
- `PLAN.md`
- `ARCHITECTURE.md`
- `SESSION_HANDOFF.md`
- `app/gallery/page.jsx`
- `app/globals.css`
- `components/sections/JourneySection.jsx`
- `components/sections/TestimonialsSection.jsx`
- `components/sections/TrustSection.jsx`
- `components/sections/GallerySection.jsx`
- `lib/i18n.js`

The intent of these changes:

- Remove the extra gallery intro copy.
- Continue mobile optimization.
- Convert Journey and Reviews into compact horizontal mobile swipe rows.
- Add right-side swipe affordance by default.
- Show left-side affordance only after the user scrolls/taps right.
- Document architecture, local development, and known tooling caveats.
- Add real clinic gallery assets and real review snippets.
- Keep V1 focused on traffic and appointment conversion.

## Verified Health

The application code is healthy as of this handoff:

```bash
npm run lint
npm run build
```

Both commands passed locally.

Latest confirmation:

- `npm run build` passed.
- Foreground `npm run dev -- -p 3001` successfully served the website at `http://localhost:3001/`.
- The user confirmed the site was visible when the dev server ran in the foreground.
- After moving the chat into VS Code, background mode worked: `http://localhost:3001/services` returned `200 OK` while the chat remained usable.

## Local Dev Server Issue

The current Windows/Codex shell has an environment problem: both `PATH` and `Path` exist at the same time. This breaks some PowerShell process launching commands with a duplicate-key error.

This is not a GitHub, Vercel, or website-code problem.

Symptoms seen:

- Codex-launched hidden dev servers briefly start and then stop.
- Repeated forced restarts can corrupt `.next/cache/webpack`.
- `npm run lint` and `npm run build` still pass.
- Removing the duplicate `Path` only inside the launch process fixed `Start-Process` temporarily, but detached Codex-launched dev servers still exited after a short time.
- Running the dev server in the foreground from Codex worked, which confirms the website code is not the cause.
- The detached-server issue appears specific to the earlier standalone Codex app environment. VS Code background mode is currently preferred.

Recommended safe local run:

```bash
cd /d "D:\2026 freelance\dental-clinic-website"
npm run dev -- -p 3001
```

Preferred during VS Code sessions: use background mode if available, then verify with:

```bash
netstat -ano | Select-String ':3001'
```

and open `http://localhost:3001/`.

Run that from a normal Windows terminal, Windows Terminal, PowerShell, Command Prompt, VS Code terminal, or Cursor terminal. Keep that terminal open while previewing the site.

Recommended non-sandbox workflow:

1. Open a normal terminal.
2. Run:

```bash
cd /d "D:\2026 freelance\dental-clinic-website"
npm run dev -- -p 3001
```

3. Open `http://localhost:3001/`.
4. Leave the terminal open. Press `Ctrl+C` in that terminal when done.

If switching projects often, open each project in a separate terminal tab and use a different port, for example:

```bash
npm run dev -- -p 3002
```

If `.next` cache errors appear after many restarts, stop the dev server and delete only `.next`, then run the dev command again.

## Safe Restart Strategy

If the next session feels unstable, do not touch system environment variables first.

Use this safe workflow:

1. Confirm state:

```bash
git status -sb
git remote -v
git log --oneline -5
```

2. If you want to return to the last pushed version, first save current local changes as a patch:

```bash
git diff > local-mobile-docs-work.patch
```

3. Only reset after explicit approval:

```bash
git reset --hard origin/main
```

4. Reapply desired changes carefully, one section at a time:

- Gallery intro cleanup.
- Mobile nav overflow check.
- Specialist section compact mobile layout.
- Journey horizontal swipe row.
- Reviews horizontal swipe row.
- Documentation updates.

5. Verify after each meaningful step:

```bash
npm run lint
npm run build
```

## Next Product Work

Priority order:

1. Finish mobile optimization without breaking desktop layout.
2. Keep Journey and Reviews swipe affordances simple and understandable.
3. Improve full-site background so it is softer than plain white.
4. Polish scroll transitions and section reveals.
5. Replace placeholders with real Google reviews, more clinic photos, and refined Hindi copy.

## Commit Rule

Do not commit or push unless explicitly requested.
