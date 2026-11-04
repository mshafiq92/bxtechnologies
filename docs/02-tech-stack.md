# 02 · Tech stack

Goal for this phase: a fast, accessible, SEO-strong **public company website** that matches the v2 designs,
built as a **single standard Next.js repository** (no monorepo), hosted on Vercel during development and
testing and on our **own server (VPS)** in production.

## Recommended stack

| Layer | Choice | Why |
|---|---|---|
| Repo shape | **One standard Next.js app** at the repo root | Simple to run, build and deploy anywhere; no workspace tooling |
| Package manager | **npm** (ships with Node, `package-lock.json` committed) | No extra install; supported everywhere (Vercel, DigitalOcean, Hostinger, any VPS) |
| Runtime | Node.js LTS (pinned in `.nvmrc` and `engines`) | Same version locally, in CI, on Vercel and on the VPS |
| Framework | **Next.js (latest stable, App Router)** + **React 19** | Static generation for every page, server components, built-in metadata/sitemap/OG, image and font optimisation, `output: "standalone"` for self-hosting |
| Language | **TypeScript** (strict) | Typed content models |
| Styling | **Tailwind CSS v4** with the design tokens as CSS variables (`@theme`) under `.theme-bx-light` | Maps 1:1 to `DESIGN-TOKENS-V2.md`; one token file is the only place hex values exist |
| Class utilities | `clsx` + `tailwind-merge` (+ `cva` for variants) | Clean component variants (Button, Section tone, Card) |
| Fonts | **Self-hosted** Inter + JetBrains Mono via `next/font/local` (files from Fontsource) | Spec requires self-hosting; no Google Fonts request (GDPR) |
| Icons | Hand-written inline SVG React components | Spec: no icon font; only ~10 icons needed |
| Interactivity | Small client components only (mega menu, mobile menu, FAQ, filters, marquee, forms). **No animation library** | Motion is CSS-only per spec |
| Content (now) | Typed TypeScript content files + **MDX** for articles and legal pages, validated with **Zod**, behind a `lib/content` module | Ships without a CMS; this module is the one place to switch to a CMS/database later |
| Forms | **React Hook Form + Zod**, submitted to Next.js **Server Actions** | Same schema validates client and server |
| Form email | **Resend** (or SMTP via Nodemailer, e.g. the existing mail host) to info@ / jobs@ | Provider-neutral wrapper, so either works on Vercel and on the VPS |
| CV uploads | **S3-compatible object storage** (DigitalOcean Spaces or Cloudflare R2) | Works from any host; no Vercel-only storage |
| Spam protection | **Cloudflare Turnstile** + honeypot + rate limit | Privacy-friendly, no cookie banner needed |
| SEO | Next Metadata API, `sitemap.ts`, `robots.ts`, JSON-LD (Organization, Service, Article, JobPosting, BreadcrumbList), dynamic OG images | Industry-standard technical SEO |
| Analytics | **Plausible** (EU, cookieless; cloud or self-hosted on the same VPS) | Host-independent; GDPR friendly |
| Linting | ESLint (flat config, `eslint-config-next`, `jsx-a11y`) + **Stylelint** rule banning raw colours outside the token file | Acceptance: "no hex outside the token file" |
| Formatting | Prettier + `prettier-plugin-tailwindcss` | Consistent class order |
| Unit/component tests | **Vitest** + Testing Library | Menu, FAQ, filters, forms, content guards |
| E2E / a11y / visual | **Playwright** + `@axe-core/playwright`; screenshots at **1440px and 390px** | Encodes the acceptance criteria |
| Performance | **Lighthouse CI** budgets (Perf ≥ 95, A11y 100, SEO 100, Best Practices 100) | Measurable quality bar |
| Git hooks | Husky + lint-staged + commitlint (Conventional Commits) | Clean history |
| CI | **GitHub Actions** | Lint, typecheck, test, build, Playwright, Lighthouse on every PR |
| Dev / test hosting | **Vercel** (preview per PR + staging from `dev`) | Fast feedback while building. **Not used for production** |
| Production hosting | **VPS, to be decided** (DigitalOcean Droplet, Hostinger VPS, or similar) running Docker + Node | See `04-deployment-plan.md` |
| DNS / CDN / WAF | **Cloudflare** in front of the domain | DNS, TLS, caching, Turnstile, protection, host-independent |
| Error monitoring | Sentry (free tier) | Works on any host |

### Portability rule

Because production is not Vercel, the app must **not depend on Vercel-only features**: no Vercel Blob,
Vercel KV, Vercel Analytics, Edge Config or edge-only middleware logic. Everything above runs identically
on Vercel and in a Docker container on a VPS. We test that by building the Docker image in CI.

## Repository layout

```
bxtechnologies/
├─ app/                     # routes (App Router)
├─ components/
│  ├─ ui/                   # primitives: Button, Chip, Section, DiagramCard, …
│  ├─ layout/               # Header, MegaMenu, MobileMenu, Footer, ContactBand
│  └─ sections/             # page sections (hero variants, timeline, FAQ, …)
├─ content/                 # typed content + MDX (until a CMS exists)
├─ lib/
│  ├─ content/              # the only module pages read content from
│  ├─ schemas/              # Zod schemas for content and forms
│  ├─ forms/                # server actions, mail, storage, spam checks
│  └─ seo/                  # metadata helpers, JSON-LD
├─ styles/                  # tokens.css (.theme-bx-light), globals.css
├─ public/                  # fonts, logo, client logos, icons
├─ tests/                   # Playwright e2e + visual
├─ docs/                    # these planning docs
├─ .claude/design-handoff/  # design source of truth (read only)
├─ .github/workflows/       # CI
├─ Dockerfile               # production image (standalone output)
└─ package.json
```

## Explicitly not using

- No monorepo, no Turborepo, no pnpm/yarn workspaces.
- No UI kit (MUI, Chakra, shadcn defaults); the design system is bespoke.
- No CSS-in-JS runtime, no Framer Motion, no icon font, no Google Fonts CDN, no stock imagery.
- Nothing from the prototype runtime (`support.js`, `<x-dc>`, inline styles).
- No Vercel-only services (see the portability rule).
