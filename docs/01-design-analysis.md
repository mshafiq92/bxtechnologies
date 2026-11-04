# 01 · Design handoff analysis

Source: `.claude/design-handoff/design_handoff_bx_v2/` (v2, "bX Light" theme). Analysed 2026-11-04.

## 1. What the package contains

| Item | Count / notes |
|---|---|
| Public site page designs (`bX v2 - *.dc.html`) | 19 files → **17 routes** (3 Service Detail files share one template) |
| Shared chrome (`BxHeader`, `BxContactBand`, `BxFooter`) | 3 components, built once |
| Foundations sheet (`bX DS - Foundations.dc.html`) | Visual token + component reference, not a route |
| Admin console v2 screens | 4 (Page editor, Services, Media library, Site settings). Out of scope for now |
| Spec docs | README, DESIGN-TOKENS-V2, BUSINESS-RULES-V2, SCREENS-SITE-V2, BUILD-PLAN-V2, OPEN-DECISIONS, DATA-MODEL, SCREENS-CONSOLE(-V2). References to the v1 package are ignored (v1 dropped) |
| Assets | `bx-mark.png` (raster crop), 8 client logos (colour + mono) |
| Screenshots | 18 top-of-page captures (01 to 18) |
| `support.js`, `image-slot.js`, `_ds/` | Prototype runtime and console "Industry" design system. **Not production code; do not port** |

The `.dc.html` files are high-fidelity prototypes rendered by a small React-based runtime (`<x-dc>`,
`<sc-if>`, `<sc-for>`, `{{ }}` bindings, inline styles everywhere). We take **layout, spacing, colour,
typography, copy and interaction intent** from them, and **nothing structural**.

## 2. Route map (public site)

| # | Page | Design file | Route | Template type |
|---|---|---|---|---|
| 1 | Home | `Home` | `/` | Static page (sections) |
| 2 | Services | `Services` | `/services` | Static page |
| 3 | Service Detail | `Service Detail` (+ Cloud DevOps, Custom Software) | `/services/[slug]` | Collection template |
| 4 | Work | `Projects` | `/work` | Static page + project collection |
| 5 | Insights | `Insights` | `/insights` | Listing + client-side filter |
| 6 | Article | `Article` | `/insights/[slug]` | Collection template (MDX) |
| 7 | About | `About` | `/about` | Static page |
| 8 | Industries | `Industries` | `/industries` | Static page + sector collection |
| 9 | Careers | `Careers` | `/careers` | Listing |
| 10 | Role Detail | `Role Detail` | `/careers/[slug]` | Collection template |
| 11 | Apply | `Apply` | `/careers/apply` | Form (file upload) |
| 12 | Contact | `Contact` | `/contact` | Form |
| 13–15 | Privacy · Terms · Cookies | `Privacy` / `Terms` / `Cookies` | `/privacy` `/terms` `/cookies` | Legal template (MDX) |

Main nav: **Services** (mega menu) · Work · Insights · Company (About / Industries / Careers) · CTA "Start a project" → `/contact`.

### Service catalogue (4 groups × 3, from the mega menu)

| AI & Autonomy (`#ai`) | Data & Cloud (`#data`) | Product Engineering (`#product`) | Teams & Advisory (`#teams`) |
|---|---|---|---|
| Agentic AI & agents ✱ | Data engineering & analytics | Custom software ✱ | Dedicated teams |
| Generative AI integration | Cloud & DevOps ✱ | Web & mobile apps | Digital transformation |
| AI/ML engineering | IoT & embedded | QA & test automation | Blockchain & distributed systems |

✱ = Service Detail page designed. The other 9 render the same template once content exists; until then,
Services rows link to the contact section (per spec).

## 3. Design system ("bX Light")

- **Ground** `#F4F8FB`, **surface** white, **text** navy `#0A1F33`, **link** `#006EA3`.
- **Brand fills only**: cyan `#00AEEF` (primary button, signature rule, nav underline), green `#79BB42` (status dots only). Text on cyan/green is always navy, never white. Cyan is never text on light (fails contrast at 2.37).
- **Navy bands** (How we work, contact band, footer, diagram cards) with their own on-deep palette.
- **Type**: Inter 400/500/600 + JetBrains Mono 400/500, self-hosted. Fluid `clamp()` sizes for display/h1/h2.
- **Spacing** scale 4→96, content width 1200px, fluid gutter and section padding.
- **Radius** 4/8/12/16/pill. **Shadow** only on the mega menu; everything else uses hairlines.
- **Signature rule**: 3px cyan→green gradient on diagram cards, form cards and the contact band.
- **Three tokens are "[added]"** and awaiting approval (`#33C1F3`, `#E6F4FB`, `#5B7690`).

All values live in `DESIGN-TOKENS-V2.md`; the acceptance criteria forbid hex values outside the token file.

## 4. Reusable components identified

**Chrome**: Header (+ MegaMenu desktop ≥900px, Menu panel <900px), ContactBand, Footer.
**Layout**: Container (1200px), Section (alternating bg/surface/navy), JumpBar (sticky at 73px), HeroGridBackdrop.
**Hero variants**: `heroDiagram` (Home, Service Detail), `heroGrid` (Services, Industries, Work, Insights), `heroPhoto` (About, Careers; collapses to text-only when no photo), plain title block (Article, Role, Apply, Contact, legal).
**Content**: OpenColumn (pillar), Card, ProjectCard, ServiceRow, MetricInline / MetricLarge, StatusDot, Chip/Tag, Eyebrow, SignatureRule, DiagramCard, ArchitectureDiagram, Timeline (navy, numbered), EngagementModels, IndustryTiles, InsightRow, FeaturedArticle, FAQ accordion, LogoMarquee, Breadcrumb, OnThisPage (sticky aside), ShareLinks, Avatar (initials fallback), PhotoSlot.
**Forms**: Input, Select, Textarea, RadioPill group (`role="radio"`), Checkbox, FileDropZone, FormCard, FieldError, SuccessMessage.
**Icons**: inline SVG only (LinkedIn, Facebook, X, mail, chevron, arrow). No icon font.

## 5. Business rules that shape the frontend

1. **Colour = meaning.** Blue = interaction; green = status (dot beside words, never alone, never clickable); metric numbers are navy. Enforce with lint/tests.
2. **No client names.** Projects read `Sector · Region · NDA`.
3. **Clients & partners strip** renders only logos with `cleared: true`; hides when none. *Decision: the current logos ship marked cleared (see §7).*
4. **No case studies.** No case-study pages, cards or links.
5. **Never print a count** ("All services", not "All 12").
6. **Every metric is a placeholder.** *Decision: placeholders stay for now (see §7).*
7. **Stack lists are grounded** in team skills data (`teamData.js`, not in this repo).
8. **No stock photography.** Real photos only on About/Careers; avatars fall back to initials.
9. **Copy**: no em/en dashes; errors start with `Error:`; success messages say what happens next.
10. **Real contacts**: info@bxtechnologies.net · +49 203 34689340 · Islamabad · Duisburg · jobs@bxtechnologies.net.

## 6. Interaction and accessibility requirements

- Hover/focus: 150ms colour/background/border fades only. No transforms, no scroll animations.
- `prefers-reduced-motion` disables all transitions and freezes the marquee.
- Logo marquee: 40s linear loop, duplicated list, pauses on hover, greyscale → colour on hover.
- Mega menu: opens on hover/focus, closes on header mouse-leave, other nav hover, or Escape.
- FAQ: first open, one at a time, `aria-expanded`.
- Forms: radio pills as `role="radio"`, work-email validation on Contact, inline `Error:` text in `#B42318`.
- Anchors: `scroll-margin-top` 126px (with jump bar) / 72px (without).
- Acceptance: match designs at **1440px and 390px**, axe clean, all targets ≥44px, visible focus everywhere.

## 7. Decisions taken (2026-11-04)

| Topic | Decision |
|---|---|
| v1 "Nocturne" dark navy design | **Dropped.** The v2 package is the only design reference; where v2 docs say "see v1", the v2 docs are treated as complete |
| Metrics | **Keep the placeholder figures** for now; the metric model keeps `placeholder` and `method` fields so real numbers can be swapped in later |
| Clients & partners strip | **Show the current logos.** The `cleared` flag stays in the content model (set `true` for the current logos) so any logo can be hidden without a code change |
| Existing site | https://bxtechnologies.net/ (used for the redirect map and SEO carry-over at launch) |
| Repo | Single standard Next.js repo, npm, **no monorepo** |
| Hosting | Vercel for development and testing only; production on a VPS (DigitalOcean / Hostinger / similar, to be decided) |

## 8. Gaps and risks found

| # | Gap | Impact | Action |
|---|---|---|---|
| G1 | **`teamData.js`** (stack grounding source) is not in the repo | Low: "What we build with" lists can't be cross-checked | Treat the design's stack lists as approved unless the file is shared |
| G2 | 9 of 12 Service Detail pages have **no content** | Template only; those rows link to contact until written | Content task (OPEN-DECISIONS #4) |
| G3 | Raster logo mark only | Blurry on high-DPI; no favicon set | Supply SVG mark (OPEN-DECISIONS #8) |
| G4 | Form back end needed without a CMS | Contact / Apply / Subscribe need to send somewhere | Resend email; CV as attachment until file storage is decided |
| G5 | Footer social links point to generic `facebook.com` / `x.com` | Wrong links at launch | Supply real profile URLs |
| G6 | Legal text carried over from the old site | Must match the new hosting, analytics and form processors (GDPR) | Legal review before launch |
| G7 | **Design notes written as page copy** (About people and story intros, Work, Industries and Insights placeholder notes, Services stack note, Careers roles note) | Sentences addressed to bX ("Send us the real names...") would show to visitors | Kept verbatim and marked in content files; replace before launch |
| G8 | **Cookies policy describes a consent banner and four cookies** the planned build does not set (cookieless analytics) | Legal text would be inaccurate | Rewrite in T44 with legal review; "Needs your lawyer" notes are marked `internal` |
| G9 | **Home lists three insight titles that are not on the Insights page** | Home and Insights would disagree | Kept verbatim; decide in T30 whether Home shows the latest real articles |
