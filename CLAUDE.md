# BX Technologies website (v2)

Public company website for BX Technologies Pvt Ltd, rebuilt from the v2 "bX Light" design.
Current live site: https://bxtechnologies.net/ (used only for redirects and SEO carry-over).

## Hard rules

- **Never run `git commit`, `git push`, or anything that writes git history or remotes** (amend, merge,
  rebase, tag, reset, stash). The owner does all commits and pushes. Read-only git is fine. When work is
  done, list the changed files and suggest a commit message.
- **Keep the stack simple.** Don't add a dependency or service without asking. Decided: Resend for email.
  File storage is not decided; don't add one.
- **No monorepo.** One standard Next.js app at the repo root, npm only (no pnpm/yarn/bun).
- **Portable.** Vercel is for testing only and deploys from `main` only (never `dev`, see `vercel.json`); production is Docker on a VPS. No Vercel-only features
  (Blob, KV, Edge Config, Vercel Analytics). Staging protection is our own `proxy.ts` basic auth, and
  noindex is automatic on Vercel (`lib/site.ts`). Setup steps: docs/04 §4a.

## Sources of truth

- Design handoff: `.claude/design-handoff/design_handoff_bx_v2/` (read only)
  - `DESIGN-TOKENS-V2.md` values · `BUSINESS-RULES-V2.md` behaviour · `SCREENS-SITE-V2.md` page structure
  - `designs/*.dc.html` layout and **verbatim copy** (prototypes: never port `support.js`, `<x-dc>` or inline styles)
- The v1 dark "Nocturne" design is dropped. Ignore every reference to `design_handoff_bx_platform/`.
- Brand: `docs/brand/` (final logo package and `BX-Logo-Guide.pdf`, not published). Only the files the site
  uses live in `public/brand/` and `app/` (icons).

## Owner decisions that override the design handoff (2026-11-06)

Keep these even where the handoff or the `.dc.html` designs say otherwise; don't "fix" them back.

- **Name**: always "BX Technologies" (the designs write "bX"). Legal name "BX Technologies Pvt Ltd" in the
  footer copyright line, Imprint and legal pages. Design file names (`bX v2 - ….dc.html`) stay as they are.
- **Logo**: one layout site-wide, the horizontal compact logo (C1, outlined SVG). Header: white-text version
  on navy, 60px tall (44px under 900px). Footer: same, 48px (40px under 640px). Share cards use the compact PNG.
  Stacked, print and no-bars versions are not used on the site. No text next to the logo.
- **Header**: navy (`bg-deep`, `data-tone="deep"`), white links, cyan CTA unchanged; mega menu, Company menu and mobile
  panel are navy too, styled like the footer (owner decision 2026-11-09). Height 84px from 900px, 72px below. Jump bar top, anchor offsets and
  sticky side columns derive from `--header-height` in `styles/tokens.css`; change the height only there.
  Phone browser bar colour (`themeColor`) matches the navy.
- Plans: `docs/01` analysis · `02` stack · `03` implementation · `04` deployment · `05` ordered tasks (T00 to T52)

## Build rules

- **Tokens only**: no raw colour values outside `styles/tokens.css` (`.theme-bx-light`).
- **Content is data**: pages read content only through `lib/content`. Copy comes from the designs verbatim.
- **Static by default**; client components only for real interaction (menus, FAQ, filters, marquee, forms).
- **Motion**: CSS only, 150ms colour/background/border fades, no transforms, `prefers-reduced-motion` honoured.
- **Accessibility**: semantic HTML, keyboard support, targets ≥44px, visible focus, axe clean.
- **Copy rules**: no em/en dashes, never print a count ("All services"), no client names (`Sector · NDA`, no region and no figures on projects, owner decision 2026-11-10),
  errors start with `Error:`, green only as a status dot beside words, metric numbers navy.
- **Decisions**: metrics stay placeholders (`placeholder: true`); current client logos show (`cleared: true`).
- **Forms** post to server actions in `lib/forms/actions.ts` (Resend email, CV as attachment, Turnstile + honeypot +
  rate limit). Without keys, development logs emails instead of sending; production fails loudly. See `.env.example`.
- **Adding an article**: write `content/insights/<slug>.mdx`, set `hasBody: true` in `content/insights.ts`,
  register it in `content/insights/bodies.ts`, and add its "On this page" entries in `content/pages/insights.ts`.
  Tests fail if any of these disagree. Its share card, sitemap entry and Article JSON-LD come automatically.
- **Opening a role**: roles in `content/roles.ts` are drafts until `published: true` (none is published today, so
  Careers shows "No open positions right now"). Publishing one brings back the list, its page (if it has `detail`),
  the sitemap entry, JobPosting data and the apply-form option. Set `datePosted` to the day it goes live.
- **Cookies and analytics**: the only cookie is `bx_consent` (the banner's choice). Plausible loads only after
  Accept. Adding any cookie, tracker or third-party script needs a consent category, a `CONSENT_VERSION` bump
  in `lib/consent.ts`, and matching updates to the Cookies and Privacy pages.
- **Legal pages**: Privacy, Terms, Cookies and Imprint are MDX in `content/legal/`; Imprint company details are
  `imprint` in `content/site.ts` (`null` = to be supplied, hidden on the live site).
- **SEO**: page metadata goes through `pageMetadata()` in `lib/seo/metadata.ts`; a new page also needs its own
  `opengraph-image.tsx` (copy a sibling). Structured data is built from content in `lib/seo/structured-data.ts`.
- Done = matches the design at 1440px and 390px; lint, typecheck, tests and build pass.

## Repo layout (target, set up in T01)

```text
app/            routes (App Router) · fonts/ self-hosted woff2 · dev/ review routes (not published)
components/     ui/ primitives · layout/ header, footer, contact band · sections/ page sections
content/        typed content (TS) + MDX for articles and legal pages
lib/            content/ (only content entry point) · schemas/ (Zod) · forms/ · seo/
styles/         tokens.css, globals.css
public/         brand/ logos the site uses (masters in docs/brand) · clients/ client logos
scripts/        guardrails.mjs (token, colour-role and copy checks)
tests/          Playwright e2e + visual
docs/           planning docs · brand/ final logo package and guide
```

## Commands

```bash
npm run dev         # local dev server, http://localhost:3000
npm run build       # production build
npm run lint        # ESLint + Stylelint
npm run typecheck   # tsc --noEmit
npm run test        # Vitest
npm run guard       # guard rails (raw colours, green on links/metrics, dashes, counts, blocked names)
npm run check       # everything CI runs except build
npm run test:e2e    # Playwright desktop 1440 + mobile 390: smoke, axe, interactions, forms (builds first, port 3100)
npm run test:visual # full-page screenshots vs tests/e2e/__screenshots__/win32 (refresh with -- --update-snapshots=all, then check by eye)
npm run lighthouse  # Lighthouse CI budgets against the current build (port 3200; build without SITE_NOINDEX)
```

## Workflow

- Branches: `feature/<task-id>-<name>` off `dev` → PR into `dev` → milestone PR `dev` → `main`.
  The owner creates branches, commits and opens PRs.
- Work one task from `docs/05-prompts-and-tasks.md` at a time, in order.
- Environment: Windows (PowerShell / Git Bash). Line endings are LF (`.gitattributes`).
- Versions: Next 16, React 19, TypeScript 6.0, ESLint 9 (Next's plugins don't support 10 yet), Tailwind 4, Vitest 5.
- Commits follow Conventional Commits, e.g. `feat(T11): add buttons`. There are no git hooks (Husky,
  lint-staged and commitlint were removed on 2026-11-06); never add them back.
