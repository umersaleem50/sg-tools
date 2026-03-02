# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Company**: Stridon Group DOO (stridon.rs) — a tool company with an online shop at prodavnicaalata.rs.

**This project**: SG Tools brand website (sg-tools.rs) — a marketing and product showcase site built with Next.js 16 (App Router), TypeScript, and Tailwind CSS v4. Supports English and Serbian via next-intl. Deployed on Vercel.

**Purpose**: Display SG Tools products (fetched server-side from the main platform's REST API) with buy links pointing to prodavnicaalata.rs. This site is display-only — no cart or checkout.

**Brand voice**: Friendly and approachable. Serbian copy uses informal "ti" form (not "Vi") — keep it casual and direct.

## Critical Rules

- **i18n is mandatory**: Whenever any content is added or changed, ALWAYS update BOTH `messages/en.json` AND `messages/sr.json`. Never leave one language behind.
- **Serbian tone**: Always use informal "ti" form in Serbian copy — never formal "Vi". Keep it casual and friendly.
- **Dark mode only**: The site uses dark theme exclusively. Do not add light mode styles or toggles.
- **Product links**: Product pages link to prodavnicaalata.rs for purchasing. Products are display-only on this site.

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
  - `NEXT_PUBLIC_API_URL` — Base URL for the products REST API

## Architecture

### Directory Layout

The Next.js application lives entirely within `storefront/`. There is no monorepo tooling — just a single Next.js app.

- `app/[locale]/` — Pages use a dynamic `[locale]` segment for i18n routing (en, sr)
- `components/` — Page sections (hero, cta, features, etc.) and reusable components
- `components/ui/` — shadcn/ui primitives (button, input, accordion, sheet, etc.)
- `constants/` — Static data arrays and navigation links (`index.ts`, `links.ts`, `fonts.ts`)
- `i18n/` — next-intl config: `routing.ts` (locales), `request.ts` (message loading), `navigation.ts` (locale-aware Link/router)
- `messages/` — Translation JSON files (`en.json`, `sr.json`)
- `lib/` — Utilities (`utils.ts` with `cn()` helper). Will also contain API fetch helpers for products.
- `public/` — Static assets (logos, images)
- `proxy.ts` — Next.js middleware for locale routing

### Key Patterns

**Server vs Client components**: Most section components (Hero, Footer, Features, Stats, etc.) are async server components. Client components (`"use client"`) are used only where interactivity is needed: Navbar (scroll detection), LanguageSwitcher, MobileMenu, Container (Framer Motion animations).

**Layout wrapper components**:
- `Wrapper` — Max-width container (`lg:max-w-7xl`) with responsive padding
- `Container` — Framer Motion animation wrapper with preset animations (`fadeUp`, `fadeDown`, `fadeLeft`, `fadeRight`, `scaleUp`) and configurable delay

**i18n usage**:
- Server components: `getTranslations()` from `next-intl/server`
- Client components: `useTranslations()` from `next-intl`
- Navigation: Use `Link`, `useRouter`, `usePathname` from `@/i18n/navigation` (not from `next/link` directly) to preserve locale
- Type safety: `global.d.ts` extends next-intl with message types from `en.json`

**Product data fetching**:
- Products are fetched server-side from the main platform's public REST API (no auth required)
- Product data: name, description, price, image, category (basic catalog)
- All product fetching should happen in server components or server-side functions
- Each product page links to prodavnicaalata.rs for the actual purchase

**Navigation**:
- Use `Link` from `@/i18n/navigation` — never `next/link` directly
- External links to prodavnicaalata.rs use standard `<a>` tags with `target="_blank"` and `rel="noopener noreferrer"`

**Styling**: Tailwind CSS v4 with OKLCH color tokens defined as CSS custom properties in `globals.css`. Component variants use class-variance-authority (CVA). Always use `cn()` from `lib/utils` for merging classes.

**UI components**: shadcn/ui with `new-york` style. Add new components via `npx shadcn@latest add <component>`. Config in `components.json`.

**Fonts**: Space Grotesk (headings) and Inter (body) loaded via `next/font/google`, exposed as CSS variables `--font-heading` and `--font-base`.

**Icons**: lucide-react — import individual icons as React components.

### Adding a New Page

1. Create `storefront/app/[locale]/<page-name>/page.tsx`
2. Accept `params: Promise<{ locale: string }>` and call `setRequestLocale(locale)`
3. Add translation keys to BOTH `messages/en.json` and `messages/sr.json`
4. Add navigation link to `constants/links.ts` with a `labelKey` for i18n

## Domain Map

- `sg-tools.rs` — This project (SG Tools brand site)
- `stridon.rs` — Parent company (Stridon Group DOO)
- `prodavnicaalata.rs` — Online shop (where users buy products)
