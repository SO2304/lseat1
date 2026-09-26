# LSEAT Aerospace - B2B Platform

Aerospace-grade B2B website for LSEAT Aerospace (lseat.eu): a certified 3-seat ergonomic
conversion kit for economy cabins, sold to airlines, MROs, OEMs and certification authorities.

## Tech stack

- **Astro 4** - static-first framework, zero client framework runtime
- **Tailwind CSS 3.4** - design tokens (deep-navy, aero-blue, electric-cyan, titanium-gray) and
  component classes (`.glassmorphism`, `.btn-primary`, `.input-field`, `.toast`, ...)
- **TypeScript 5.3** - strict typing, validated with `astro check`
- **Web3Forms** - serverless B2B contact pipeline (honeypot + optional reCAPTCHA v3)
- **No React, no CDN** - everything ships in the Astro bundle

## Engineering values

These figures are the commercial and technical contract of the kit. They are displayed verbatim
across the site.

| Parameter | Value |
| --- | --- |
| Mass | **< 1 650 g** for 3 seats (< 550 g per seat) |
| Electrical draw | **0 W** - fully mechanical |
| Retrofit time | **< 15 min** per seat, MRO line |
| AOG impact | **0 h** - no aircraft on ground |
| Certification | **16 g** dynamic, CS-25.562 / FAR-25.562 |
| Production basis | **EASA Part 21J** design organisation |

## Project structure

```
lseat-aerospace-platform/
|-- public/                     # static assets (favicon, robots, downloadable PDFs)
|-- src/
|   |-- components/             # Astro UI sections (Hero, SpecsTable, ContactForm, ...)
|   |-- content/                # long-form copy and data collections
|   |-- layouts/                # page shells (BaseLayout, Section wrappers)
|   |-- pages/                  # routes (index.astro, ...)
|   |-- styles/global.css       # Tailwind layers: base / components / utilities
|   `-- env.d.ts                # Astro ambient types
|-- astro.config.mjs            # Astro + Tailwind integration, site = https://lseat.eu
|-- tailwind.config.mjs         # design tokens and component classes
|-- postcss.config.js
|-- tsconfig.json
|-- .env.example                # documented environment variables
`-- package.json
```

## Setup

```bash
npm install        # install dependencies
npm run dev        # local dev server at http://localhost:4321
npm run build      # static build to ./dist
npm run preview    # preview the production build
npm run check      # astro check (TypeScript + Astro diagnostics)
```

Node.js 18.17+ or 20+ is required (Astro 4 baseline).

## Environment variables

Copy the template and add the Web3Forms access key:

```bash
cp .env.example .env
```

```ini
PUBLIC_WEB3FORMS_KEY=your_web3forms_access_key_here
```

- `PUBLIC_WEB3FORMS_KEY` is a **public client-side key** obtained from
  <https://web3forms.com>. The `PUBLIC_` prefix is what makes Astro expose it to the browser;
  the contact form posts directly to `https://api.web3forms.com/submit`.
- All submissions are routed to **contact@lseat.eu**.
- Anti-spam: the form includes a hidden `botcheck` honeypot. Google reCAPTCHA v3 can be enabled
  from the Web3Forms dashboard using the same access key.
- If the key is missing, the form degrades gracefully and directs the visitor to contact@lseat.eu.

Never add secrets to a `PUBLIC_*` variable.

## Deployment

The site builds to a fully static bundle in `dist/`. `npm run build` is the only required command.

**Cloudflare Pages**

- Build command: `npm run build`
- Output directory: `dist`
- Node version: 18 or 20 (set in the Pages project settings)
- Environment variables: add `PUBLIC_WEB3FORMS_KEY` under *Settings > Environment variables*
- Optional: redirect `lseat.eu` and `www.lseat.eu` to HTTPS, enable Always Use HTTPS and
  Auto Minify. No server-side adapter is required.

**Vercel**

- Framework preset: Astro (detected automatically)
- Build command: `npm run build`, output directory: `dist`
- Environment variables: add `PUBLIC_WEB3FORMS_KEY` for Production, Preview and Development
- Deploy previews are fully functional; the contact form posts to the same Web3Forms endpoint.

If the form is ever proxied through a serverless function instead, move the submission off the
client and keep the access key server-side. The current architecture is deliberately static.

## Compliance note

The engineering values published on this site (< 1 650 g / 3 seats, 0 W, < 15 min retrofit,
0 AOG, 16 g CS-25.562 / FAR-25.562) are drawn from the **LSEAT 2025 engineering package** and the
associated **EASA Part 21J** production organisation approval. The **EASA Form 1** certificate of
conformity is **released on request** to qualified operators, MROs and certification authorities;
it is not published as a static file on this website.

Nothing on this site constitutes an airworthiness approval, a maintenance release or a certified
modification instruction. Approved data is always issued through the applicable Airworthiness
Directive / certification process for the target aircraft type.