# Handoff: bX Technologies website — v2 (light theme)

## Overview

This package is the **v2 design of the public bX Technologies marketing site**: the same pages, copy,
information architecture and business rules as the approved v1, rebuilt on a new **light** design system
("bX Light", from `bx-design-system.md` and `bx-design-tokens.xlsx`). **v2 is the chosen direction for
build.** The v1 package (`design_handoff_bx_platform/`, dark "Nocturne") remains the reference for the
admin console, the data model and anything this package does not override.

What changed from v1:

- **Visual layer only.** Light ground `#F4F8FB`, navy text `#0A1F33`, logo cyan and green as fills,
  Inter + JetBrains Mono, 1200px content width.
- **Photography removed from heroes.** Pages use diagrams (Home, Service Detail), a faint CSS grid
  backdrop (Services, Industries, Work, Insights) or a framed real-photo slot (About, Careers).
- **Metric numbers are navy**, not green (green on the light ground read poorly). Green survives only as
  status dots and success states. See `BUSINESS-RULES-V2.md`.
- **Two more Service Detail pages** (Cloud & DevOps, Custom software) prove the template for non-AI services.

What did not change: the page list, every section and its copy, the NDA rule, the no-case-studies rule,
the "never print a service/article count" rule, the data model, the phase plan. The console keeps its
Industry look; four of its screens gain v2 fields (see `SCREENS-CONSOLE-V2.md`).

## About the design files

**The files in `designs/` are design references created in HTML.** They are prototypes showing intended
look, copy and behaviour, not production code. Each is a self-contained page using a small client-side
runtime (`designs/support.js`) that exists only so the prototypes render in a browser.

Recreate them in the real application (Next.js 15 App Router, TypeScript, Tailwind, as recommended in the
v1 README) using that stack's own components. Take from the prototypes: layout, spacing, colour,
typography, copy, interaction intent. Take nothing structural: no `support.js`, no `<x-dc>`, no
inline-style-everything approach.

Open any file in `designs/` in a browser to see it live. All pages are responsive; resize to check.

## Fidelity

**High fidelity.** Colours, type, spacing and copy are final. All values are in `DESIGN-TOKENS-V2.md`; do
not sample them from rendered pages. `designs/bX DS - Foundations.dc.html` is the visual reference sheet
for tokens and components.

## Read these in order

| File | What it is |
|---|---|
| `README.md` | This file. |
| `DESIGN-TOKENS-V2.md` | Every colour, type, spacing, radius, shadow and component value for the site. |
| `BUSINESS-RULES-V2.md` | v1 rules, with the v2 amendments marked. Read before writing code. |
| `SCREENS-SITE-V2.md` | Per-page section list and component notes for all 17 site pages. |
| `BUILD-PLAN-V2.md` | Changes to the v1 build plan. Everything not listed there stands. |
| `OPEN-DECISIONS.md` | What is still pending from the business before launch. |
| `screenshots/` | Top-of-page capture of every page (01 to 18) for quick reference. The HTML is the authority: pages are responsive and a screenshot is one fixed-width slice. |
| `DATA-MODEL.md` | Unchanged from v1. Prisma schema. |
| `SCREENS-CONSOLE.md` | v1 console spec. Read with `SCREENS-CONSOLE-V2.md`, which overrides four screens. |
| `SCREENS-CONSOLE-V2.md` | The four console screens updated for v2: Page editor, Services, Media library, Site settings. |

## Shared components

Three parts repeat on every page and exist as separate files in `designs/`. Build them once.

| File | Component | Props |
|---|---|---|
| `BxHeader.dc.html` | Sticky white header, 72px, logo + nav + primary CTA. Services opens a mega menu (4 groups × 3 links, footer row). Under 900px collapses to a Menu button and full-width panel. | `active`: `home` \| `services` \| `work` \| `insights` \| `company` \| `contact` |
| `BxContactBand.dc.html` | Navy band with 3px signature rule, eyebrow, H2, paragraph, primary CTA, secondary link. | `eyebrow`, `title`, `text`, `cta`, `ctaHref`, `secondary`, `secondaryHref` |
| `BxFooter.dc.html` | Navy footer, five columns (brand, Services, Company, Contact, Follow us) and legal bar. | none |

## Interactions and behaviour

- **Motion**: all hover and focus changes are 150ms fades on colour, background or border. No transforms,
  no scroll-triggered animation. `prefers-reduced-motion` disables all transitions.
- **Exception, kept by decision**: the Home "Clients & partners" logo strip scrolls continuously (40s
  linear loop, list duplicated, pauses on hover, stops under reduced motion). Logos render as greyscale
  (`filter: brightness(0)`, opacity .55) and cross-fade to full colour on hover.
- **Mega menu**: opens on hover or focus of "Services"; closes on mouse-leave of the header, on hovering
  another nav item, or on Escape. Desktop only (≥900px).
- **Jump bars** (Services, Service Detail ×3, Work, About, Industries, Careers): sticky directly under the
  header (`top: 73px`), white with hairline borders, horizontally scrollable with hidden scrollbar.
  Section anchors use `scroll-margin-top: 126px`; pages without a jump bar use 72px.
- **Forms** (Home contact, Contact, Apply, Insights subscribe): radio pills are buttons with
  `role="radio"`; selected state is border `#006EA3` + fill `#E6F4FB`. Contact validates the work email on
  submit and shows `Error: enter a work email address so we can reply.` in `#B42318` with the input border
  turning red. Success is a green dot + `#1E7F34` text, always with words.
- **FAQ accordion** (Service Detail pages): first item open by default, one open at a time, `+` / `−`
  indicator, `aria-expanded` on the button.
- **Insights filter**: pill tabs filter the list client-side; selected pill has a 8px cyan dot.
- **Image slots** (About, Careers heroes): placeholders for real office/team photos, 4:3, radius 12,
  hairline border. In production these are CMS media fields.

## Assets

| Path | Use |
|---|---|
| `designs/assets/bx-mark.png` | bX mark cropped from the v1 logo. Paired with "Technologies" in Inter 500 18px. Replace with a vector mark when available. |
| `designs/assets/clients/*.png` | Client and partner logos, full colour (hover state). **Not cleared for use**, see `OPEN-DECISIONS.md`. |
| `designs/assets/clients/mono/*.png` | Same logos prepared for the greyscale resting state. |

Icons are inline SVG (LinkedIn, Facebook, X, mail, chevron). No icon font.

## Files

`designs/` contains every v2 page (`bX v2 - *.dc.html`), the three shared components, the foundations
sheet, assets and the prototype runtime. Page-by-page detail is in `SCREENS-SITE-V2.md`.
