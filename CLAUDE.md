# bX Technologies website (v2)

Public company website for bX Technologies Pvt Ltd, rebuilt from the v2 "bX Light" design.
Current live site: https://bxtechnologies.net/ (used only for redirects and SEO carry-over).

## Hard rules

- **Never run `git commit`, `git push`, or anything that writes git history or remotes** (amend, merge,
  rebase, tag, reset, stash). The owner does all commits and pushes. Read-only git is fine. When work is
  done, list the changed files and suggest a commit message.
- **Keep the stack simple.** Don't add a dependency or service without asking. Decided: Resend for email.
  File storage is not decided; don't add one.
- **No monorepo.** One standard Next.js app at the repo root, npm only (no pnpm/yarn/bun).
- **Portable.** Vercel is for dev/testing only; production is Docker on a VPS. No Vercel-only features
  (Blob, KV, Edge Config, Vercel Analytics).

## Sources of truth

- Design handoff: `.claude/design-handoff/design_handoff_bx_v2/` (read only)
  - `DESIGN-TOKENS-V2.md` values · `BUSINESS-RULES-V2.md` behaviour · `SCREENS-SITE-V2.md` page structure
  - `designs/*.dc.html` layout and **verbatim copy** (prototypes: never port `support.js`, `<x-dc>` or inline styles)
- The v1 dark "Nocturne" design is dropped. Ignore every reference to `design_handoff_bx_platform/`.
- Plans: `docs/01` analysis · `02` stack · `03` implementation · `04` deployment · `05` ordered tasks (T00 to T52)

## Build rules

- **Tokens only**: no raw colour values outside `styles/tokens.css` (`.theme-bx-light`).
- **Content is data**: pages read content only through `lib/content`. Copy comes from the designs verbatim.
- **Static by default**; client components only for real interaction (menus, FAQ, filters, marquee, forms).
- **Motion**: CSS only, 150ms colour/background/border fades, no transforms, `prefers-reduced-motion` honoured.
- **Accessibility**: semantic HTML, keyboard support, targets ≥44px, visible focus, axe clean.
- **Copy rules**: no em/en dashes, never print a count ("All services"), no client names (`Sector · Region · NDA`),
  errors start with `Error:`, green only as a status dot beside words, metric numbers navy.
- **Decisions**: metrics stay placeholders (`placeholder: true`); current client logos show (`cleared: true`).
- **Forms** post to server actions in `lib/forms/actions.ts` (Resend email, CV as attachment, Turnstile + honeypot +
  rate limit). Without keys, development logs emails instead of sending; production fails loudly. See `.env.example`.
- **Adding an article**: write `content/insights/<slug>.mdx`, set `hasBody: true` in `content/insights.ts`,
  register it in `content/insights/bodies.ts`, and add its "On this page" entries in `content/pages/insights.ts`.
  Tests fail if any of these disagree.
- Done = matches the design at 1440px and 390px; lint, typecheck, tests and build pass.

## Repo layout (target, set up in T01)

```text
app/            routes (App Router) · fonts/ self-hosted woff2 · dev/ review routes (not published)
components/     ui/ primitives · layout/ header, footer, contact band · sections/ page sections
content/        typed content (TS) + MDX for articles and legal pages
lib/            content/ (only content entry point) · schemas/ (Zod) · forms/ · seo/
styles/         tokens.css, globals.css
public/         brand mark, client logos
scripts/        guardrails.mjs (token, colour-role and copy checks)
tests/          Playwright e2e + visual
docs/           planning docs
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
```

## Workflow

- Branches: `feature/<task-id>-<name>` off `dev` → PR into `dev` → milestone PR `dev` → `main`.
  The owner creates branches, commits and opens PRs.
- Work one task from `docs/05-prompts-and-tasks.md` at a time, in order.
- Environment: Windows (PowerShell / Git Bash). Line endings are LF (`.gitattributes`).
- Versions: Next 16, React 19, TypeScript 6.0, ESLint 9 (Next's plugins don't support 10 yet), Tailwind 4, Vitest 5.
- Commits follow Conventional Commits (commitlint hook), e.g. `feat(T11): add buttons`.
