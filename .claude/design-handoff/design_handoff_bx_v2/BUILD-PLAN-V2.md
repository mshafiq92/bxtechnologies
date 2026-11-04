# Build plan — v2 changes

Follow `design_handoff_bx_platform/BUILD-PLAN.md` top to bottom. The tasks below **replace or amend**
the numbered v1 tasks; anything not listed stands as written.

## Phase 0 — Foundations

**0.2 Token layer — REPLACED.** Two theme scopes in `packages/ui`: `.theme-bx-light` (site, from
`DESIGN-TOKENS-V2.md`) and `.theme-industry` (console, unchanged). Drop Nocturne. Self-host Inter
(400/500/600) and JetBrains Mono (400/500).

**0.3 Semantic colour roles — AMENDED.** Expose `--interaction` (blue) and `--status` (green) aliases.
The lint/test now fails if `--status` is used on an element with a click handler or `href`, **or** on a
metric number. Metric numbers use `--text`.

**0.5 Primitives — AMENDED.** Add to the v1 list: `DiagramCard`, `SignatureRule`, `JumpBar`,
`HeroGridBackdrop`, `OpenColumn`, `RadioPill` (v2 styling), `LogoMarquee`, `MegaMenu`. Replace `Wrap` with
the 1200px content container and v2 gutter. `Section` uses `--section`.

## Phase 1 — Site

**1.x Shared chrome — AMENDED.** Header with Services mega menu (desktop) and Menu panel (<900px);
contact band; five-column footer. Built once, used by every page.

**1.x Section types — ADDED.** The page model is ordered typed sections (v1 decision). v2 needs these
section types beyond v1's: `heroDiagram`, `heroGrid`, `heroPhoto`, `logoMarquee`, `timeline`,
`architecture`, `faq`, `jumpBar` (derived from section anchors, not stored).

**1.x Service Detail — AMENDED.** One template, driven by a `Service` record. Three are designed; the
remaining services render the same template from CMS content. Each service needs its own hero diagram
content (a small structured JSON: caption, two top boxes, two middle, two bottom, footer pair).

**1.x Clients strip — ADDED.** CMS list of logos with `cleared` boolean. Strip renders only cleared
logos; hides when none. Ships with zero cleared logos unless permissions arrive.

**1.x Image slots — ADDED.** About and Careers hero photos are media fields. Until a photo is set the
hero renders without the image column (text full width), not an empty frame.

## Phase 1 — Console

**1.11 Media library — AMENDED.** Add `source` (real photo / diagram / stock) and folders Hero photos and Client logos. Stock media cannot be placed on site pages.

**1.12 Page editor — AMENDED.** v2 section types and the Hero photo group with the real-photo confirmation, which gates publish.

**1.14 Services editor — AMENDED.** Hero diagram fields (`Service.heroDiagram` JSON) and the v2 detail-section toggles.

**1.17 Site settings — AMENDED.** v2 brand swatches; Clients & partners strip list with per-logo `cleared` flag and the marquee motion toggle.

## Phase 2 and 3

Unchanged.

## Acceptance

- Every page matches its `designs/` file at 1440px and 390px.
- No hex values outside the token file.
- Axe: no contrast failures; every interactive element ≥44px; focus visible everywhere.
- `prefers-reduced-motion`: no transitions, marquee static.
