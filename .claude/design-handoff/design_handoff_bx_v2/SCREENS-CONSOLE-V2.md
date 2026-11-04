# Console screens — v2 changes

The console keeps the **Industry** design system and every screen in the v1 `SCREENS-CONSOLE.md`. Four
screens change so the console can drive the v2 site. Design files: `designs/bX Admin v2 - *.dc.html`.
Links from these files to the eleven unchanged screens are disabled; see the v1 package for those.

## Page editor `bX Admin v2 - Page Editor.dc.html`

- **Hero layout** select: Hero with photo (About, Careers) · Hero with grid backdrop · Hero with diagram
  card · Hero, text only.
- **Hero photo** group replaces v1's Backdrop image: media picker, alt text, upload/remove, guidance
  "4:3, at least 1600px wide. Framed beside the text". A **"This is a real photo of bX people or offices"**
  checkbox is required before publish. Empty photo = text-only hero (no empty frame on the site).
- **Section types** panel under the section list: Hero · diagram, Hero · grid backdrop, Hero · photo, Logo
  strip, Open columns, Card grid, Timeline, Architecture, FAQ, Metrics strip, Contact band. Jump bar is
  derived from section anchors, not stored.
- **Statistics**: "Colour role" stays (Interaction / Proof) but is labelled "no effect on v2"; numbers
  render navy.
- Section list labels use v2 names (Contact band, Principles list · navy band).

## Services `bX Admin v2 - Services.dc.html`

- **Hero diagram** panel: caption, then six boxes each with Title and Detail (mono): Entry, Core (cyan
  border), Support 1, Support 2, Outcome 1, Outcome 2 (dashed), plus status line and status detail.
  Store as `Service.heroDiagram` JSON:
  `{ caption, entry:{t,d}, core:{t,d}, support:[{t,d},{t,d}], outcomes:[{t,d},{t,d}], status:{t,d} }`.
- **Detail page sections** toggles updated: What we build · Architecture diagram · Engagement timeline ·
  Proof metrics · Example workflows · FAQs · Related services · Stack list.
- Preview links to the v2 Service Detail page.

## Media library `bX Admin v2 - Media Library.dc.html`

- Folders: Hero photos · Client logos · Insights · People · Brand (v1 "Hero backdrops" removed).
- **Photo source** field per file: Real photo of bX people or offices · Diagram or screenshot · Stock.
  Stock files may be stored but **cannot be placed on site pages** (enforce server-side).
- Grid badges: "Real photo" (accent tag) and "Not cleared" (neutral tag) on client logos.

## Site settings `bX Admin v2 - Site Settings.dc.html`

- **Brand** swatches show the bX Light tokens; the warning reads "Green is for status dots and success
  messages, always beside words."
- **Clients & partners strip** panel: one row per logo with a "Not cleared" tag and a **Permission on
  file** checkbox; summary warning "0 cleared. The strip is hidden on the live site"; **Scroll
  continuously** toggle (always stops under reduced motion). Logos are uploaded via the media library
  (Client logos folder).
