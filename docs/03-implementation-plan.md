# 03 · Implementation plan (frontend)

Scope: the public site, all 17 routes, at production quality. The console, database and auth come later.
Every phase ends with a working, deployable preview. Exact prompts for each task are in
[05-prompts-and-tasks.md](05-prompts-and-tasks.md).

## Guiding rules

1. **Design files are the authority** for layout and copy; `DESIGN-TOKENS-V2.md` for values; `BUSINESS-RULES-V2.md` for behaviour.
2. **Tokens only.** No hex/px colour values outside `styles/tokens.css`. Enforced by lint.
3. **Content is data.** Pages read from `lib/content` (typed files + MDX now, CMS later). No copy hard-coded inside components except UI labels.
4. **Static by default.** Every page is statically generated; client components only where interaction needs them.
5. **Accessible by construction.** Semantic HTML, keyboard support, ≥44px targets, visible focus, reduced motion.
6. **Small PRs** from `feature/*` → `dev`; `dev` → `main` only at a milestone.

## Phase 0 · Foundations (≈ 3 to 4 days)

| ID | Task | Output | Done when |
|---|---|---|---|
| 0.1 | Repo scaffold | Single standard Next.js app at the repo root (npm, TS strict, App Router), folder layout from `docs/02`, `output: "standalone"`, `Dockerfile` | `npm run dev` serves a blank page; `npm run build` and `docker build` pass |
| 0.2 | Tooling | ESLint, Stylelint, Prettier, Husky, lint-staged, commitlint, `.editorconfig`, `.nvmrc`, `.env.example` | Hooks block a bad commit |
| 0.3 | CI | GitHub Actions: install, lint, typecheck, unit test, build | Green check on a PR |
| 0.4 | Design tokens | `.theme-bx-light` CSS variables + Tailwind v4 `@theme` mapping; semantic aliases `--interaction`, `--status` | Foundations test page renders every token |
| 0.5 | Fonts | Self-hosted Inter (400/500/600) + JetBrains Mono (400/500) via `next/font/local` | No external font requests |
| 0.6 | Base styles | Reset, type scale (display/h1–h4/body/small/eyebrow/chip/metric/prose), `text-wrap`, focus ring, reduced-motion, scroll-margin | Matches Foundations sheet |
| 0.7 | Guard rails | Stylelint ban on raw colours; test that `--status` is never on links/buttons/metrics; copy check for em/en dashes and printed counts | CI fails on a violation |

## Phase 1 · Primitives and chrome (≈ 5 to 6 days)

| ID | Task | Output |
|---|---|---|
| 1.1 | Layout primitives | `Container`, `Section` (tones: bg / surface / navy), `Stack`, `Grid`, `HeroGridBackdrop`, `SignatureRule` |
| 1.2 | Typography & atoms | `Heading`, `Eyebrow`, `Chip`, `Tag`, `StatusDot`, `Metric` (large/inline), `TextLink` (→), `Breadcrumb`, `Avatar` (initials) |
| 1.3 | Buttons | `Button` primary / secondary (48px, 44px header variant), link-as-button |
| 1.4 | Icons | Inline SVG set: LinkedIn, Facebook, X, mail, phone, chevron, arrow, plus, minus, upload |
| 1.5 | Content blocks | `OpenColumn`, `Card`, `DiagramCard` (data-driven boxes), `Timeline`, `MetricsStrip`, `FAQ` (accordion), `JumpBar` (derived from section anchors) |
| 1.6 | Header | Logo, nav, active state, CTA, **MegaMenu** (≥900px, hover/focus/Escape), **mobile Menu panel** (<900px, focus trap, body scroll lock) |
| 1.7 | Footer + ContactBand | Five-column navy footer with legal bar; ContactBand with props |
| 1.8 | Root layout | Skip link, header/footer, metadata defaults, `lang="en"`, 404 and error pages in the v2 style |
| 1.9 | Primitive tests | Vitest for menu, FAQ, JumpBar; a `/_dev/foundations` route (excluded from prod) to review primitives |

## Phase 2 · Content layer (≈ 2 to 3 days, can overlap Phase 1)

| ID | Task | Output |
|---|---|---|
| 2.1 | Schemas | Zod schemas in `lib/schemas` mirroring `DATA-MODEL.md`: ServiceGroup, Service (+ `heroDiagram` JSON), Project, Metric (value, label, sector, method, placeholder flag), Sector, Insight, InsightCategory, Author, Role, Office, ClientLogo (`cleared`), SiteSettings, Navigation, Footer |
| 2.2 | Content files | Extract **all copy** from the 19 design files into typed content (`content/`). Articles and legal pages as MDX |
| 2.3 | Repository layer | `lib/content/*`: `getServices()`, `getService(slug)`, `getProjects()`, `getInsights({topic})`, `getRoles()`, `getSiteSettings()`, … The only module pages may import content from |
| 2.4 | Content guards | Build-time checks: no blocked client names, no printed counts, metrics flagged `placeholder` are allowed (by decision) but listed in a build report, only `cleared` logos exported (current logos ship cleared) |

## Phase 3 · Pages (≈ 10 to 12 days)

Build in this order (each reuses what the previous ones created):

| ID | Page | Route | Notable work |
|---|---|---|---|
| 3.1 | Home | `/` | Diagram hero, **LogoMarquee** (current logos, `cleared` flag respected, reduced-motion), services columns, selected work, proof strip, navy timeline, engagement models, industries tiles, insights rows, contact section + form (UI only) |
| 3.2 | Services | `/services` | Grid hero, JumpBar, four groups of service rows, stack lists with grounding note, engagement models |
| 3.3 | Service Detail | `/services/[slug]` | One template, sections toggled by data; architecture diagram; FAQ; related; `generateStaticParams` for published services only. Verify against all three designs |
| 3.4 | Work | `/work` | Project cards (NDA format), "After launch" band |
| 3.5 | Insights | `/insights` | Featured panel, client-side topic filter (URL `?topic=` synced), empty state, subscribe form (UI) |
| 3.6 | Article | `/insights/[slug]` | MDX prose styles, pull quote, note box, sticky on-this-page aside, share links, related service, keep reading |
| 3.7 | About | `/about` | Photo hero (text-only fallback), principles navy band, people with initials, story, offices |
| 3.8 | Industries | `/industries` | Sector rows with metrics, constraints band, pill cloud |
| 3.9 | Careers | `/careers` | Roles list, process steps, contact band as `#apply` |
| 3.10 | Role Detail | `/careers/[slug]` | Prose + sticky "Role at a glance" |
| 3.11 | Apply | `/careers/apply` | Four fieldsets, experience pills, CV drop zone, consent (UI only) |
| 3.12 | Contact | `/contact` | Full form with work-email validation, pills, selects, NDA note; "What happens next" band |
| 3.13 | Legal | `/privacy` `/terms` `/cookies` | Shared legal template, sticky nav, tables, note boxes |

Each page PR includes: Playwright screenshot at 1440 and 390, axe scan, and metadata.

## Phase 4 · Forms and integrations (≈ 3 to 4 days)

| ID | Task |
|---|---|
| 4.1 | Shared form kit: RHF + Zod, `RadioPillGroup` (`role="radio"`, arrow-key nav), `FileDropZone`, `FieldError` (`Error:` prefix), `SuccessMessage` (dot + words) |
| 4.2 | Server Actions: `submitEnquiry` (Home + Contact), `submitApplication` (Apply, CV as an email attachment for now), `subscribe` (Insights) |
| 4.3 | Delivery via Resend to info@ / jobs@, auto-reply to sender; Turnstile + honeypot + rate limit |
| 4.4 | Payload shape matches future `Enquiry` / `Application` / `Subscriber` models so the console can take over without changing the UI |

## Phase 5 · SEO, performance, accessibility hardening (≈ 3 days)

| ID | Task |
|---|---|
| 5.1 | Per-route metadata, canonical URLs, `sitemap.ts`, `robots.ts`, JSON-LD (Organization, BreadcrumbList, Service, Article, JobPosting) |
| 5.2 | Dynamic OG images per page type; favicon / app icons (needs vector mark) |
| 5.3 | **301 redirect map** from the existing site's URLs to the new routes (needs the current site URL) |
| 5.4 | Lighthouse CI budgets; image optimisation; bundle analysis; zero layout shift on fonts |
| 5.5 | Full axe + manual keyboard and screen-reader pass (NVDA on Windows, VoiceOver on iOS) |
| 5.6 | Cross-browser: Chrome, Edge, Firefox, Safari (macOS + iOS), Android Chrome |
| 5.7 | Analytics (cookieless) and Sentry; update Cookies/Privacy wording to match the real processors |

## Phase 6 · Content completion and launch readiness

Driven by `OPEN-DECISIONS.md`: real metrics when available (placeholders accepted for now), real photos, team names, article
author, remaining 9 service detail contents, vector mark, real social URLs, legal review. See the launch
checklist in [04-deployment-plan.md](04-deployment-plan.md).

## Timeline (one developer with AI assistance)

| Week | Focus |
|---|---|
| 1 | Phase 0 + start Phase 1 |
| 2 | Phase 1 + Phase 2 |
| 3 | Pages 3.1 to 3.5 |
| 4 | Pages 3.6 to 3.13 |
| 5 | Phase 4 + Phase 5 |
| 6 | Content completion, UAT, launch |

## Definition of done (every PR)

- Matches the design file at 1440px and 390px (screenshot attached to the PR).
- `lint`, `typecheck`, `test`, `build` pass; no new axe violations.
- No raw colour values; no copy-rule violations; no console errors.
- Keyboard-only walkthrough works; reduced motion respected.
