# Site screens — v2

Every page: `BxHeader` (sticky) → page sections → `BxContactBand` (most pages) → `BxFooter`.
Section backgrounds alternate between `--bg` and `--surface` (white with hairline top/bottom), with navy
bands where noted. Copy is final and lives in the design files; this document lists structure.

Route suggestions in brackets.

---

## Home `bX v2 - Home.dc.html` [/]

1. **Hero** — two columns (stack under ~900px). Left: eyebrow "AI-first engineering partner", display H1,
   body-lg intro, three mono tags, primary "Book a technical call" + secondary "See the work →", three inline
   metrics (68% · 3.2× · 9 hrs). Right: navy diagram card "How we build agents" (Channel → Orchestrator →
   Retrieval / Tools / Guardrails → Eval & observability → "Deployed & monitored · 142 evals passing").
   Bottom rule: "Delivering from Islamabad…" left, "SECP registered · PSEB member · partner Vis Group,
   Germany" right.
2. **Clients & partners** — white strip, mono label, scrolling logo marquee (see README interactions).
3. **Services** — four open columns (1 / 2 / 4 columns), each: number, group title, three linked services
   with one-line descriptions, green-dot "In production · sectors" footer. "All services →".
4. **Selected work** — white band, three cards: tag, sector line, 48px metric, sentence, stack chips.
5. **Delivered** — inline proof strip, four metrics (94% · 8/10 · 81% · 4). Tweak flag `proofBand`.
6. **How we work** — navy band. Vertical timeline: 1px line at 27px, 40px numbered circles (`#5BC8F5`
   border), each row: title · description · chips (three columns ≥900px, stacked below).
7. **Engagement models** — two columns: heading block left, four-item list right with pill tags.
8. **Industries** — five tiles that wrap and stretch (flex 1 1 200px). "All industries →".
9. **Insights** — white band, three list rows: topic · title + summary · read time.
10. **Contact** — two columns: copy and email left, white form card (signature rule) right: name, work
    email, message, three radio pills, success state, primary submit.

No BxContactBand on Home (it has its own contact section).

## Services `bX v2 - Services.dc.html` [/services]

Hero with grid backdrop (breadcrumb, eyebrow, H1, intro · metrics + two buttons). Jump bar (AI & Autonomy,
Data & Cloud, Product Engineering, Teams & Advisory, Stack, Engagement). Four group sections (`#ai`,
`#data`, `#product`, `#teams`), each a numbered heading and three service rows (number · title + subtitle
· description + chips · arrow; 4 columns ≥900px). Stack: four open columns of mono lists, with grounding
note. Engagement models (as Home). Contact band.

Rows link to a Service Detail page where one exists (Agentic AI, Cloud & DevOps, Custom software), else
to the contact section.

## Service Detail — three pages [/services/[slug]]

`bX v2 - Service Detail.dc.html` (Agentic AI & agents) · `… - Cloud DevOps.dc.html` ·
`… - Custom Software.dc.html`. **One template, content from the CMS.** Sections:

1. Hero — two columns: breadcrumb, eyebrow ("Group · Service NN"), H1, intro, three metrics, two
   buttons · navy diagram card specific to the service.
2. Jump bar.
3. What we build — four open columns with hairline lists.
4. Architecture — white band; three edge boxes → cyan-bordered core box → four filled boxes → dashed
   observability box; note paragraph.
5. Engagement / pilot — navy band, four timed steps.
6. In production — three 48px metrics with sector lines, placeholder note.
7. Where it fits — six white cards with sector eyebrow.
8. Questions — accordion of six.
9. Related — three open columns linking to other services.
10. Contact band (service-specific copy).

## Work `bX v2 - Projects.dc.html` [/work]

Hero with grid backdrop + metrics. Jump bar. Nine project cards (3 columns): tag, sector line, title,
description, metric + label, stack chips. "After launch" white band: three open columns. Contact band.

## Insights `bX v2 - Insights.dc.html` [/insights]

Hero with grid backdrop; right column is the email subscribe form with success state. Featured article
panel (radius 16). "All writing": filter pills (Everything + four topics), list rows (topic + date · title
+ optional summary · read time), empty state. Contact band.

## Article `bX v2 - Article.dc.html` [/insights/[slug]]

Title block (topic, date, read time, H1, standfirst, author with initials avatar). Two columns ≥1040px:
prose (720px max; H2/H3, lists, pull quote between rules, white note box) · sticky aside (on-this-page
links, share icons). Related-service panel. "Keep reading" three columns. Contact band.

## About `bX v2 - About.dc.html` [/about]

Hero two columns: text + metrics + buttons · framed photo slot (4:3). Jump bar. Why us (three open
columns). How we work — navy band, five principle rows. People — five cards with initials avatars and
`[Name]` placeholders. Story — four year columns. Offices — three open columns. Contact band.

## Industries `bX v2 - Industries.dc.html` [/industries]

Hero with grid backdrop. Jump bar. Who we work with — three open columns with lists. Sectors — white band,
seven rows (name + region · description + chips · 36px metric). Constraints — navy band, four columns.
Other sectors — copy + pill cloud. Contact band.

## Careers `bX v2 - Careers.dc.html` [/careers]

Hero two columns: text + metrics + buttons · framed photo slot. Jump bar. Open roles — rows (title +
summary · chips · location · arrow), speculative-CV note. What it is like — white band, four columns.
Hiring process — four steps. Contact band as the apply prompt (`#apply`).

## Role Detail `bX v2 - Role Detail.dc.html` [/careers/[slug]]

Title block with chips, location/type, two buttons. White band, two columns ≥1040px: prose (work, what you
will do, looking for, nice to have, offer, hiring steps) · sticky "Role at a glance" card. Also hiring list.
Contact band.

## Apply `bX v2 - Apply.dc.html` [/careers/apply]

Title block. Two columns ≥1040px: form card with four numbered fieldsets (role + start; about you +
experience pills; CV upload drop zone; two long answers, source, consent checkbox), success state, submit
· aside (what happens next, accommodations, your data). No contact band.

## Contact `bX v2 - Contact.dc.html` [/contact]

Title block. Two columns ≥1040px: form card (name, company, work email with validation, phone, need
pills ×5, company size, budget, message, success state, submit, NDA note) · aside (direct contacts,
two offices). Navy "What happens next" band, four steps. No contact band.

## Privacy · Terms · Cookies [/privacy · /terms · /cookies]

`bX v2 - Privacy/Terms/Cookies.dc.html`. Title block with last-updated row. White band, two columns
≥1040px: sticky on-this-page nav · legal prose (dl, tables, note boxes). Contact band with legal copy.
Legal text is carried over from v1 unchanged.

## Foundations sheet

`bX DS - Foundations.dc.html` — colours, contrast pairs, type scale, spacing, radius, shadow, buttons,
badges, eyebrow, signature rule, pillar, diagram card, form fields. Reference only, not a route.
