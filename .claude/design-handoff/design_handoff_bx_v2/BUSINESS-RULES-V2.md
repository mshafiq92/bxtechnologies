# Business rules — v2

The v1 rules in `design_handoff_bx_platform/BUSINESS-RULES.md` all still apply. This file restates
them briefly and **marks the v2 amendments**. Where the two differ, this file wins for the public site.

## 1. Colour carries meaning — AMENDED

- **Blue means interaction.** On light: `#006EA3` for links and small text, `#00AEEF` as the primary
  button fill. On navy: `#5BC8F5`. Focus rings, hover states, active nav underline.
- **Metric numbers are navy `#0A1F33`.** (v1: green.) Green on the light ground failed visually and was
  replaced at the client's request.
- **Green now means status, not numbers.** `#79BB42` as an 8px dot beside a word ("Deployed & monitored",
  "Evaluated on every change", "In production · …"), and `#1E7F34` for success messages. Always paired
  with words; never alone.
- **Green never appears on a link, a button, or anything clickable.** Unchanged.
- **No check-mark glyphs.** Unchanged.
- **Console impact:** the Page editor's "Colour role" select on statistics (Interaction / Proof) should
  remain in the schema, but on the v2 site both roles render navy. Keep the field so a future theme can
  restore a proof colour without a migration.

## 2. No client names — UNCHANGED, with one open item

Projects and sectors are described as `Sector · Region · NDA`. Blocked-names list and publish gate as v1.

**Open:** the Home "Clients & partners" logo strip shows client logos. It is kept in the design by
decision, pending permission from each client. It must not go live with any logo that is not cleared in
writing. Build it as a CMS-managed list with a per-logo `cleared` flag; the strip renders only cleared
logos and hides itself when none are.

## 3. No case studies — UNCHANGED

No case-study pages, cards or links. Proof lives in metrics and insights.

## 4. Never print a count — UNCHANGED

No "twelve services", "All 12", "9 articles". Say "All services", "All insights", "Four groups of services".

## 5. Metrics need a method — UNCHANGED

Every metric on the site is currently a placeholder. Each needs a value, a label, a sector line and a
method statement in the console before publish.

## 6. Stack lists are grounded — UNCHANGED

Technology names shown on the site must come from the team skills data (`bx-frontend/src/data/teamData.js`).
The Services "What we build with" block carries an on-page note saying so.

## 7. Photography — NEW

- No stock photography anywhere.
- Hero imagery is either a diagram (Home, Service Detail), a CSS grid backdrop (Services, Industries,
  Work, Insights) or a **real** photo of bX people or offices (About, Careers only).
- Team portraits on About fall back to initials in a navy circle until real portraits exist.

## 8. Copy rules — NEW

- No em or en dashes in site copy. Ranges read "€25k to €75k", "WK 1 to 2".
- Errors are prefixed `Error:`. Success messages state what happens next.

## 9. Real contacts — UNCHANGED

info@bxtechnologies.net · +49 203 34689340 · Islamabad · Duisburg · linkedin.com/company/bx-technologies ·
jobs@bxtechnologies.net (careers).
