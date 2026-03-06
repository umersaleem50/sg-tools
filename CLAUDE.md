# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Company**: Stridon Group DOO (stridon.rs) — a tool company with an online shop at prodavnicaalata.rs.

**This project**: SG Tools brand website (sgtools.rs) — a marketing and product showcase site built with Next.js 16 (App Router), TypeScript, and Tailwind CSS v4. Deployed on Vercel.

**Purpose**: Display SG Tools products (fetched server-side from the main platform's REST API) with buy links pointing to prodavnicaalata.rs. This site is display-only — no cart or checkout.

**Brand voice**: Friendly and approachable. Serbian copy uses informal "ti" form (not "Vi") — keep it casual and direct.

## Critical Rules

- **Serbian tone**: Always use informal "ti" form in Serbian copy — never formal "Vi". Keep it casual and friendly.
- **Dark mode only**: The site uses dark theme exclusively. Do not add light mode styles or toggles.
- **Product links**: Product pages link to prodavnicaalata.rs for purchasing. Products are display-only on this site.
- **Serbian URLs**: All routes use Serbian path names (e.g., `/o-nama`, `/kontakt`, `/proizvodi/kategorije`).

## Commands

All commands run from the `storefront/` directory:

```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Environment Variables

- Use `NEXT_PUBLIC_` prefix for client-accessible vars
- Use `.env.local` for local development secrets (gitignored)
- Key variables:
  - `API_URL` — Base URL for the products REST API (server-only)

## Architecture

### Directory Layout

The Next.js application lives entirely within `storefront/`. There is no monorepo tooling — just a single Next.js app.

- `app/` — Pages with Serbian directory names (`o-nama/`, `kontakt/`, `cesta-pitanja/`, `gde-kupiti/`, `proizvodi/`)
- `components/` — Page sections (hero, cta, features, etc.) and reusable components
- `components/ui/` — shadcn/ui primitives (button, input, accordion, sheet, etc.)
- `constants/` — Static data arrays (`content.ts`), navigation links (`links.ts`), contact cards (`index.ts`), fonts (`fonts.ts`)
- `lib/` — Utilities (`utils.ts` with `cn()` helper, `api.ts` for product fetching, `categories.ts`, `geo.ts`)
- `public/` — Static assets (logos, images)

### Route Structure

| Directory | URL |
|---|---|
| `app/page.tsx` | `/` |
| `app/o-nama/` | `/o-nama` |
| `app/kontakt/` | `/kontakt` |
| `app/cesta-pitanja/` | `/cesta-pitanja` |
| `app/gde-kupiti/` | `/gde-kupiti` |
| `app/proizvodi/kategorije/` | `/proizvodi/kategorije` |
| `app/proizvodi/kategorije/[slug]/` | `/proizvodi/kategorije/[slug]` |
| `app/proizvodi/[slug]/` | `/proizvodi/[slug]` |

### Key Patterns

**Server vs Client components**: Most section components (Hero, Footer, Features, Stats, etc.) are plain server components. Client components (`"use client"`) are used only where interactivity is needed: Navbar, MobileMenu, Container (Framer Motion animations), WhereToBuyContent, DealerList.

**Layout wrapper components**:

- `Wrapper` — Max-width container (`lg:max-w-7xl`) with responsive padding
- `Container` — Framer Motion animation wrapper with preset animations (`fadeUp`, `fadeDown`, `fadeLeft`, `fadeRight`, `scaleUp`) and configurable delay

**Serbian content**:

- All Serbian strings are hardcoded directly in components — no JSON message files or i18n framework
- Structured data arrays (features, categories, stats, FAQ items, about milestones/paragraphs) live in `constants/content.ts`
- Navigation labels are hardcoded in `constants/links.ts` (using `label` property, not lookup keys)

**Product data fetching**:

- Products are fetched server-side from the main platform's REST API (requires `BEARER_TOKEN`)
- Product data: name, description, price, image, category (basic catalog)
- All product fetching should happen in server components or server-side functions
- Each product page links to prodavnicaalata.rs for the actual purchase

**Navigation**:

- Use `Link` from `next/link` for internal links
- External links to prodavnicaalata.rs use standard `<a>` tags with `target="_blank"` and `rel="noopener noreferrer"`

**Styling**: Tailwind CSS v4 with OKLCH color tokens defined as CSS custom properties in `globals.css`. Component variants use class-variance-authority (CVA). Always use `cn()` from `lib/utils` for merging classes.

**UI components**: shadcn/ui with `new-york` style. Add new components via `npx shadcn@latest add <component>`. Config in `components.json`.

**Fonts**: Space Grotesk (headings) and Inter (body) loaded via `next/font/google`, exposed as CSS variables `--font-heading` and `--font-base`.

**Icons**: lucide-react — import individual icons as React components.

### Adding a New Page

1. Create `storefront/app/<serbian-page-name>/page.tsx`
2. Hardcode Serbian strings directly in the page/components
3. If the page has structured data arrays, add them to `constants/content.ts`
4. Add navigation link to `constants/links.ts` with Serbian href

## Domain Map

- `sgtools.rs` — This project (SG Tools brand site)
- `stridon.rs` — Parent company (Stridon Group DOO)
- `prodavnicaalata.rs` — Online shop (where users buy products)
