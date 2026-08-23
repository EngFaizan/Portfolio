# Faizan Yousaf — Portfolio

A single-page portfolio for **Faizan Yousaf**, Software Engineer (MERN), built with Next.js 16 and the App Router.

The site is built around one idea: the avatar's room doesn't end at the edge of the hero image. The two practical lights from it — a warm lamp and the cold glow of the monitors — sit fixed behind every section below the fold, so scrolling never leaves the room. Those two lights, `--ember` and `--monitor`, are the only accent colours in the whole design.

---

## Tech stack

| | |
|---|---|
| Framework | [Next.js](https://nextjs.org) 16.3.2 (App Router, Turbopack) |
| UI | React 19.1 |
| Animation | [GSAP](https://gsap.com) 3.13 — entrance timelines and scroll reveals |
| 3D | [Three.js](https://threejs.org) 0.180 — the hero's bokeh particle layer |
| Styling | CSS Modules + custom properties. No CSS framework. |
| Language | JavaScript (no TypeScript) |
| Fonts | Instrument Serif (display) + Inter (body), via `next/font/google` |

---

## Getting started

Requires **Node.js 20.9 or later**.

```bash
npm install
npm run dev
```

Then open <http://localhost:3000>.

| Script | Does |
|---|---|
| `npm run dev` | Start the dev server with hot reload |
| `npm run build` | Production build |
| `npm start` | Serve the production build (run `build` first) |

---

## Project structure

```
app/
  layout.js          Fonts, metadata, Open Graph / Twitter cards
  page.js            Assembles the page; holds the fixed room-light layer
  page.module.css

components/
  Hero/              Hero composition — avatar plate, parallax, scrim, grain
  CinematicLayer/    Three.js bokeh particles (client-only, lazy)
  Sections/          About, Skills, Experience, Projects, Education, Contact
  ui/                Nav, Section, GlassButton, ScrollIndicator

lib/
  content.js         Every word on the site (see below)
  animations.js      GSAP timelines, easings, scroll helpers
  useReducedMotion.js

public/
  avatar.jpg
  Faizan-Yousaf-Software-Engineer.pdf

styles/
  globals.css        Design tokens, reset, base type
```

`@/*` is aliased to the project root (see `jsconfig.json`), so imports read as `@/lib/content`.

---

## Editing content

**`lib/content.js` is the single source of truth for every word on the site.** No copy is hard-coded in components. To update the site, edit that file — nothing else.

It exports:

| Export | Drives |
|---|---|
| `profile` | Name, role, tagline, location, summary |
| `about` | The About paragraphs |
| `skills` | Grouped skill lists |
| `experience` | Roles, employers, dates, bullets |
| `projects` | Project cards — description, bullets, tech, links |
| `education`, `certifications` | The Education section |
| `contact` | Email, phone, LinkedIn, GitHub |
| `sections` | Section ids and labels — drives the nav rail |
| `resumeFile` | Path to the résumé PDF in `public/` |

Employers, dates, metrics, and project names are transcribed from the résumé PDF in `public/`. Lines that were *synthesised* from résumé bullets rather than copied verbatim are marked `// TODO: confirm` — these are the only sentences on the site not taken directly from that document, and they're worth reviewing before publishing.

Adding a section means adding an entry to `sections` and a component under `components/Sections/`; the nav rail and its scroll-spy pick it up automatically.

---

## Design system

Tokens live at the top of `styles/globals.css`:

- **Colour** — `--ink`, `--surface`, `--ember` (lamp), `--monitor` (screens), `--bone`, `--muted`
- **Type** — a fluid scale, `--step--1` through `--step-7` plus `--step-display`, each a `clamp()` interpolating between a 320px and 1440px viewport. No media queries needed for type.
- **Spacing** — `--space-2xs` … `--space-2xl`, plus `--space-section`
- **Glass** — `--glass-fill`, `--glass-border`, `--hairline`

Breakpoints, largest first: `1279px` (tablet — the hero plate shifts right), `1024px` (the nav rail appears above this), `900px` (Projects rows collapse to one column), `860px` (Education grid does the same), `767px` (mobile), `480px` (the Experience timeline tightens its indent). There's also a `max-height: 560px` landscape query that drops the hero's scroll cue rather than crowd it.

---

## Accessibility and motion

- A skip link precedes the nav.
- `useReducedMotion()` gates every animation. Under `prefers-reduced-motion: reduce`, the GSAP entrance timeline and scroll reveals resolve to their final state, the Three.js layer never mounts, and ambient loops stop. **The composition still holds** — nothing depends on motion to be legible.
- The nav rail uses `IntersectionObserver` for scroll-spy rather than a scroll listener, so there's no per-frame layout reads.
- Hero parallax writes transforms through refs inside a `requestAnimationFrame` loop that parks itself when movement becomes imperceptible — pointer movement never triggers a React re-render.
- Below 768px the wordmark retreats while scrolling down and returns on the way back up, so it never prints over section headings.

---

## Gotchas

**Don't hand-write `-webkit-backdrop-filter`.** Next 16 processes CSS with Lightning CSS, which adds vendor prefixes itself. If a rule declares *both* `backdrop-filter` and `-webkit-backdrop-filter`, Lightning emits **only** the prefixed form — which current Chrome does not support — and the blur silently does nothing. Declare the standard property alone and Lightning emits both correctly.

---

## Deployment

The canonical URL is set as `SITE_URL` in `app/layout.js`; it feeds `metadataBase` and the Open Graph / Twitter tags. Update it if you deploy somewhere other than the configured address.

The site is fully static — `next build` prerenders it, so any static host works.

---

## Licence

No licence file is included, so default copyright applies — all rights reserved. The written content, résumé, and likeness are Faizan Yousaf's. Add a `LICENSE` file if you want to grant reuse of the code.
