# 05 · Task order and prompts

Run these **in order**, one per session or PR. Each prompt is ready to paste into Claude Code. Every
prompt assumes the standing context below, so you don't need to repeat it.

## Standing context (applies to every prompt)

> Project: bX Technologies public website v2. Design source of truth:
> `.claude/design-handoff/design_handoff_bx_v2/` (README, DESIGN-TOKENS-V2, BUSINESS-RULES-V2,
> SCREENS-SITE-V2, designs/*.dc.html). Plans: `docs/01` to `docs/04`. Rules: tokens only (no raw colours
> outside `styles/tokens.css`), content comes from `lib/content`, static by default, accessible by construction,
> CSS-only 150ms motion with reduced-motion support, no copy-rule violations (no em/en dashes, no printed
> counts, no client names). Work on a `feature/<id>-<name>` branch off `dev`. Finish with lint, typecheck,
> tests and build passing, and screenshots at 1440px and 390px for any UI.

Tip: save this block as `CLAUDE.md` at the repo root (task T00) so it loads automatically.

---

## Step 0 · Before code (decisions and inputs)

| # | Task | Owner | Status |
|---|---|---|---|
| D1 | Existing website URL: https://bxtechnologies.net/ | bX | Done |
| D2 | v1 dark design dropped; v2 docs are the only reference | bX | Done |
| D3 | Metrics stay placeholders; current client logos shown on the strip | bX | Done |
| D4 | Single repo with npm, no monorepo; Vercel for dev/testing only | bX | Done |
| D5 | Production host: DigitalOcean / Hostinger VPS / other (needed before T51) | bX | Pending |
| D6 | Approve the three added tokens (`#33C1F3`, `#E6F4FB`, `#5B7690`) | Design owner | Pending |
| D7 | Email: Resend (done). File storage for CVs: decide later; CV goes as an email attachment until then | bX | Partly done |
| D8 | Share `teamData.js`, or approve the design's stack lists as they are | bX | Pending |
| D9 | Domain + DNS access; GitHub branch protection on `main` and `dev` | bX | Pending |

---

## Phase 0 · Foundations

**T00 · Project memory**
> Create a root `CLAUDE.md` containing the standing context from `docs/05-prompts-and-tasks.md`, the
> repo layout from `docs/02-tech-stack.md`, the commands (`npm run dev/build/lint/test`), and the branch
> workflow. Keep it under 80 lines. Update `readme.md` with a short project intro and links to `docs/`.

**T01 · Project scaffold**
> Scaffold a **single standard Next.js app at the repo root** (no monorepo) as described in
> `docs/02-tech-stack.md`: npm, latest stable Next.js App Router, React 19, TypeScript strict, Tailwind
> v4, no `src/` folder, the folder layout from `docs/02`. Set `output: "standalone"` and add a multi-stage
> `Dockerfile` + `.dockerignore`. Add `.nvmrc` (Node LTS), `engines` in `package.json`, `.editorconfig`,
> `.env.example` with the variables from `docs/04` §4. A blank home page must render with `npm run dev`
> and in Docker. Don't build any design yet.

**T02 · Tooling and hooks**
> Add ESLint flat config (next, jsx-a11y, import order), Stylelint, Prettier with the Tailwind plugin,
> Husky + lint-staged + commitlint (Conventional Commits). Add `lint`, `typecheck`, `test`, `format`
> npm scripts.

**T03 · CI pipeline**
> Add `.github/workflows/ci.yml`: `npm ci` with cache, lint, typecheck, Vitest, build and a Docker image
> build, on PRs to `dev` and `main`. Leave placeholders for Playwright and Lighthouse jobs (added in T41).

**T04 · Design tokens**
> Implement every value in `DESIGN-TOKENS-V2.md` as CSS variables under `.theme-bx-light` in
> `styles/tokens.css`, expose them through Tailwind v4 `@theme` (colours, spacing 1 to 9, radii, shadow,
> content width, gutter, section). Add semantic aliases `--interaction` and `--status`. Mark the three
> "[added]" tokens with a comment. This file is the only place hex values may appear.

**T05 · Fonts and base typography**
> Self-host Inter (400/500/600) and JetBrains Mono (400/500) with `next/font/local`. Build the type
> scale from the tokens doc as utilities/components (display, h1 to h4, body-lg, body, small, eyebrow,
> chip, metric large/inline, article prose, legal prose), `text-wrap: balance/pretty`, global focus ring,
> `prefers-reduced-motion` reset, and `scroll-margin-top` rules.

**T06 · Guard rails**
> Add automated checks that fail CI: Stylelint ban on raw colour values outside the token file; a test
> that `--status`/green is never applied to links, buttons or metric numbers; a content lint that flags
> em/en dashes, printed counts ("12 services", "All 9") and names from a blocked-names list.

## Phase 1 · Primitives and chrome

**T10 · Layout primitives**
> Build `Container`, `Section` (tones bg/surface/navy, alternating hairlines), `HeroGridBackdrop`,
> `SignatureRule` in `components/ui`. Create a dev-only `/_dev/foundations` route that mirrors
> `bX DS - Foundations.dc.html` and grows with each primitive.

**T11 · Atoms and buttons**
> Build `Heading`, `Eyebrow`, `Chip`, `Tag`, `StatusDot` (never renders without text), `Metric`,
> `TextLink` (trailing arrow, min-height 44), `Breadcrumb`, `Avatar` (initials fallback), `Button`
> (primary/secondary, header size) and the inline SVG icon set. Match the Foundations sheet exactly.

**T12 · Content blocks**
> Build `OpenColumn`, `Card`, `DiagramCard` (driven by the `heroDiagram` JSON shape from
> `SCREENS-CONSOLE-V2.md`), `Timeline` (navy numbered), `MetricsStrip`, `FAQ` (first open, one at a time,
> `aria-expanded`), and `JumpBar` (sticky at 73px, horizontal scroll, built from a list of section
> anchors). Add Vitest tests for FAQ and JumpBar.

**T13 · Header, mega menu, mobile menu**
> Recreate `BxHeader.dc.html`: sticky 72px header, logo, nav with active underline, CTA. Services mega
> menu (≥900px): 4 groups × 3 links + footer row, opens on hover/focus, closes on header mouse-leave,
> other-item hover and Escape, shadow-card. Under 900px: Menu button + full-width panel with focus trap
> and scroll lock. Nav data comes from `lib/content`. Test keyboard behaviour.

**T14 · Footer, contact band, root layout**
> Recreate `BxFooter.dc.html` and `BxContactBand.dc.html` (props as in the README). Build the root
> layout with skip link, header, footer, default metadata, and styled 404 and error pages.

## Phase 2 · Content layer

**T20 · Content schemas**
> In `lib/schemas`, write Zod schemas mirroring `DATA-MODEL.md` for the public site:
> ServiceGroup, Service (with `heroDiagram`, section toggles, detail data), Project, Metric (with method
> and placeholder flag), Sector, Insight, InsightCategory, Author, Role, Office, ClientLogo (`cleared`),
> SiteSettings, Navigation, Footer. Export inferred TS types.

**T21 · Extract content**
> Extract all copy from the design files into typed content under `content/` (TS for structured
> data, MDX for articles and legal pages). Copy must be verbatim. Mark every metric `placeholder: true`.
> The current client logos are included with `cleared: true` (by decision).

**T22 · Content repository**
> Build `lib/content` with typed getters (`getServices`, `getService(slug)`, `getProjects`,
> `getInsights`, `getInsight(slug)`, `getRoles`, `getRole(slug)`, `getSectors`, `getSiteSettings`,
> `getNavigation`, `getClientLogos` which returns only cleared ones). Validate with the schemas at build
> time. Pages may import content only from here.

## Phase 3 · Pages (one PR each)

Template prompt, swap the bracketed parts:

> Build the **[PAGE]** page at **[ROUTE]** from `designs/[FILE].dc.html` and its section list in
> `SCREENS-SITE-V2.md`. Reuse existing primitives; add new ones to `components/ui` only if reused. Content
> from `lib/content`. Add metadata, a Playwright visual test at 1440 and 390, and an axe check.
> [EXTRA NOTES]

| # | Page | Route | Design file | Extra notes |
|---|---|---|---|---|
| T30 | Home | `/` | `bX v2 - Home` | LogoMarquee (current logos, respects `cleared`, hides when none, 40s loop, pause on hover, static under reduced motion); contact form UI only (wired in T40); no ContactBand |
| T31 | Services | `/services` | `bX v2 - Services` | Rows link to detail pages that exist, else `/contact`; stack grounding note |
| T32 | Service Detail | `/services/[slug]` | `Service Detail` + `Cloud DevOps` + `Custom Software` | One template; sections toggled by data; `generateStaticParams` for services with content; compare all three designs |
| T33 | Work | `/work` | `bX v2 - Projects` | NDA sector line format; no client names |
| T34 | Insights | `/insights` | `bX v2 - Insights` | Topic filter synced to `?topic=`; empty state; subscribe UI |
| T35 | Article | `/insights/[slug]` | `bX v2 - Article` | MDX components for prose, pull quote, note box; sticky aside; share links |
| T36 | About | `/about` | `bX v2 - About` | Photo hero falls back to text-only; initials avatars |
| T37 | Industries | `/industries` | `bX v2 - Industries` | Sector rows with 36px metric; pill cloud |
| T38 | Careers + Role Detail | `/careers`, `/careers/[slug]` | `Careers`, `Role Detail` | Contact band anchored `#apply`; sticky "Role at a glance" |
| T39 | Apply · Contact · Legal | `/careers/apply`, `/contact`, `/privacy`, `/terms`, `/cookies` | `Apply`, `Contact`, legal files | Forms UI only; shared legal template with sticky nav |

## Phase 4 · Forms

**T40 · Forms end to end**
> Build the shared form kit (RHF + Zod, `RadioPillGroup` with `role="radio"` and arrow keys,
> `FileDropZone`, `FieldError` with `Error:` prefix, `SuccessMessage` with dot and words). Wire Home
> contact, Contact, Apply and Subscribe to Server Actions. Deliver via Resend to the addresses in
> `.env`, send the CV as an attachment (size and type limited; no file storage yet), add Turnstile, honeypot and rate limiting. Payloads must match
> the `Enquiry`, `Application` and `Subscriber` models in `DATA-MODEL.md`.

## Phase 5 · Hardening

**T41 · Test and quality gates**
> Add Playwright E2E for navigation, mega menu, mobile menu, FAQ, filters and forms; axe on every route;
> visual snapshots at 1440/390; Lighthouse CI with budgets (Perf ≥95, A11y/SEO/BP 100). Enable these
> jobs in CI.

**T42 · SEO**
> Per-route metadata and canonicals, `sitemap.ts`, `robots.ts` (noindex on staging), JSON-LD
> (Organization, BreadcrumbList, Service, Article, JobPosting), dynamic OG images, favicon set.

**T43 · Redirects from the old site**
> Crawl https://bxtechnologies.net/ (and its sitemap), list every indexed URL, and build a 301 map in `next.config` to the new routes.
> Add a script that verifies every redirect resolves to a 200.

**T44 · Analytics, monitoring, legal sync**
> Add cookieless analytics and Sentry. Update the Privacy and Cookies content to list the actual
> processors. Add an uptime check endpoint.

## Phase 6 · Deploy

**T50 · Vercel for development and testing**
> Connect the repo to Vercel for **previews per PR and staging from `dev` only** (no production on
> Vercel): basic auth and `SITE_NOINDEX=true` on every Vercel environment, `fra1` region, environment
> variables documented. Confirm nothing in the app uses Vercel-only services.

**T51 · Production server (VPS)**
> For the chosen host ([DigitalOcean / Hostinger VPS]), write the production setup from `docs/04` §2:
> `docker-compose.yml` with Caddy and the app, server hardening steps, and a GitHub Actions workflow that
> builds the image to `ghcr.io` on `main` and deploys over SSH with a manual approval and smoke test.
> Do a production rehearsal on a `noindex` subdomain. Write `docs/runbook.md` (deploy, rollback, DNS).

**T52 · Launch**
> Walk the launch checklist in `docs/04` §7, report every unchecked item, then run the cut-over steps
> with me.

---

## Progress tracker

| ID | Task | Branch | PR | Status |
|---|---|---|---|---|
| T00 | Project memory | | | ☑ Done, awaiting commit |
| T01 | Project scaffold | | | ☑ Done, awaiting commit |
| T02 | Tooling and hooks | | | ☑ Done, awaiting commit |
| T03 | CI pipeline | | | ☑ Done, awaiting commit |
| T04 | Design tokens | | | ☑ Done, awaiting commit |
| T05 | Fonts and typography | | | ☑ Done, awaiting commit |
| T06 | Guard rails | | | ☑ Done, awaiting commit |
| T10 | Layout primitives | | | ☑ Done, awaiting commit |
| T11 | Atoms and buttons | | | ☑ Done, awaiting commit |
| T12 | Content blocks | | | ☑ Done, awaiting commit |
| T13 | Header and menus | | | ☑ Done, awaiting commit |
| T14 | Footer, band, layout | | | ☑ Done, awaiting commit |
| T20 | Content schemas | | | ☑ Done, awaiting commit |
| T21 | Extract content | | | ☑ Done, awaiting commit |
| T22 | Content repository | | | ☑ Done, awaiting commit |
| T30 | Home | | | ☑ Done, awaiting commit |
| T31 | Services | | | ☑ Done, awaiting commit |
| T32 | Service Detail | | | ☑ Done, awaiting commit |
| T33 | Work | | | ☑ Done, awaiting commit |
| T34 | Insights | | | ☑ Done, awaiting commit |
| T35 | Article | | | ☑ Done, awaiting commit |
| T36 | About | | | ☑ Done, awaiting commit |
| T37 | Industries | | | ☑ Done, awaiting commit |
| T38 | Careers + Role | | | ☑ Done, awaiting commit |
| T39 | Apply, Contact, Legal | | | ☑ Done, awaiting commit |
| T40 | Forms | | | ☑ Done, awaiting commit |
| T41 | Quality gates | | | ☐ |
| T42 | SEO | | | ☐ |
| T43 | Redirects | | | ☐ |
| T44 | Analytics and monitoring | | | ☐ |
| T50 | Vercel (dev/testing) | | | ☐ |
| T51 | Production VPS | | | ☐ |
| T52 | Launch | | | ☐ |
