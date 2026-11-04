# Screens — admin console

15 screens. Files in `designs/console/`, captures in `screenshots/console/`.

The console is a CMS first and an operations tool second. Phase 1 is everything under Content; phase 2 is
Enquiries and Applications; phase 3 is the undesigned Proposals / Projects / People & allocation entries.

---

## Shared shell

See `DESIGN-TOKENS.md` §2 for the exact shell CSS. In short: 230px sidebar (sticky, full height, its own
scroll) + main column; a sticky top bar carrying the `☰` collapse toggle, the screen title, a one-line
status summary, and the screen's actions right-aligned.

**Every list screen follows the same shape** — KPI tiles (optional) · filter row (segmented status control +
two or three selects + search) · a table or row list · a right-hand detail or editor panel. Fifteen screens
stay learnable because they repeat this.

**Sidebar collapse must persist per user** (`User.sidebarCollapsed`). The prototype uses a CSS checkbox.

**Status dots** are a 7px circle plus a label: accent = new/draft-changes, accent-600 = in progress,
accent-800 = further along, accent-2-800 = done/published, `--color-neutral-700` = inactive/closed.

---

## 1. Dashboard — `Dashboard.dc.html`

Five KPI tiles (new enquiries, qualified, proposals out, **median first reply** against the one-working-day
promise, bench capacity) · twelve-week enquiry bar chart · source and client-type breakdowns · recent
enquiries table · projects in flight · "Needs your attention" checklist · a small website-content summary
(published, drafts awaiting review, open roles, applications this month).

**Build this last in every phase.** Until real data flows it is decoration. The bars are plain divs with
percentage heights — no charting library needed at this size.

## 2. Enquiries — `Enquiries.dc.html`

Filter row · table (received, contact + sector/region, need, type tag, budget, owner, status) · right panel
for the selected enquiry: name, status tag, age, the **verbatim message in a quote block**, routing facts,
three actions (reply and book a call / assign / close), an activity timeline, and an internal-note field.

Routing is rules-based from `SiteSettings.enquiryRouting` — the prototype shows "Assigned to Directors by
routing rule — budget above €75k". Record every routing decision as an `ActivityEvent`.

`firstRepliedAt` must be set when the first reply is sent, because it drives the dashboard KPI.

## 3. Applications — `Applications.dc.html`

Same shape, stages instead of statuses (New · Screening · Engineer call · Technical session · Offer ·
Hired · Rejected). Ageing is prominent: the public promise is an answer within a week, so applications
older than five days need visible escalation.

Detail panel: candidate facts, CV link, their two written answers, stage actions, notes, activity.

## 4. Pages — `Pages.dc.html`

Three tables. **Main pages** (name + path, section count, last edited, by, status, Edit/View).
**Collections** (services, projects, insights, roles, sectors — template, entry count, draft count, Manage).
**Global & legal** (Navigation, Footer, and the three legal pages).

Four KPI tiles including "Missing SEO description", which should be a real query, not a decoration.

Legal and system pages are `isSystem` — editable, not deletable.

## 5. Page editor — `Page-Editor.dc.html`

**The most expensive screen in the package.** Three columns: section list · section form · page meta.

- **Section list** — drag to reorder, per-section visibility, type label under each name, and
  header/footer shown as **Locked** with a pointer to Navigation & footer. "Add section" at the foot.
- **Section form** — the fields of the selected section type. The Hero example shows: eyebrow, layout
  select, heading (with a character guide), intro textarea, backdrop image with alt text and a media-library
  picker, a repeating **Statistics** group (value, label, **colour role** — Blue neutral fact / Green
  measured outcome), and a repeating **Buttons** group (label, link target). Each repeating item has a drag
  handle and a Remove link.
- **Right rail** — page status, path, template, published date, nav placement; SEO title/description with a
  live character count and a social image slot; version history with "All versions".

**Phase 1 scope:** the section list (reorder, show/hide) and the per-section forms. **Phase 1.5:** the live
preview pane and a generic drag-and-drop canvas. Do not let the full ambition of this screen delay launch.

Top bar: Desktop/Mobile preview toggle, Preview, Save draft, Publish.

## 6. Navigation & footer — `Navigation-and-Footer.dc.html`

Tabs: Header · Footer · Legal bar · Mobile menu.

- **Header** — a live dark preview of the real nav bar, then reorderable rows (label, target select,
  link/dropdown select, remove), with indented sub-items. Then the header button (label, target, style —
  and a note that green is unavailable for buttons) and the three logo slots (white knockout header, full
  colour footer, favicon).
- **Footer** — five column cards. Column 1 is the fixed brand column (disabled name field + blurb). Columns
  2–5 have an editable heading and reorderable links. **The Contact column is marked as pulled from Site
  settings** — editing either updates both.
- **Legal bar** — copyright line (year auto), registrations line, three reorderable legal links.
- **Mobile menu** — source (same as header / custom), whether the button appears in the drawer, whether
  phone and email show.

One action: **"Publish to all pages"**, with a line in the UI saying that is what it does.

## 7. Media library — `Media-Library.dc.html`

Drop zone · filters (type segmented, folder, sort including "Unused first") · a card grid where each tile
shows dimensions, size, and a **flag when alt text is missing or the file is unused** · right panel with
preview, alt text (stated as required before publishing), caption, folder, and actions
(Save / Replace file / Download).

Then **File details** and **Used on** panels. Replacing a file updates every usage; **deletion is blocked
while the file is in use** — that is `MediaUsage` doing its job, not a confirmation dialog.

Header shows total files, storage used, and the count missing alt text.

## 8. Services — `Services.dc.html`

Left: all services grouped by capability group, drag-ordered within each group, each row showing name, path,
one-line summary and status. Right: the editor for the selected service — name, slug, group, one-line
summary, page intro, primary sector; **which detail-page sections are enabled** (checkbox list matching the
service-detail template); linked projects and insights; publishing panel with nav and footer visibility.

## 9. Industries — `Industries.dc.html`

Sector list with drag order, and an editor for the selected sector: name, regions, body copy, chips, and its
metrics (value, label, method) — the same metric rules as projects.

## 10. Work / projects — `Work-Projects.dc.html`

KPI tiles (live, drafts, **missing a metric**, **missing an image**, still supported) · the NDA banner ·
filters · project rows with a thumbnail, capability tag, sector·region, stack, metric and status.

Editor panel: name, two-sentence description (with that limit stated), capability tag, sector, region, stack;
**headline metric** with value, label, the private measurement method, and the "client has agreed this figure
can be quoted" checkbox; image with alt text; publishing toggles for the Home band, the Industries page and
"still supported by us".

## 11. Insights — `Insights.dc.html`

KPI tiles including subscribers · filters · article table (title + path + Featured flag, category, author,
date, reads, status) · side panels for categories, authors and subscribers (with export and send-digest
actions).

## 12. Article editor — `Article-Editor.dc.html`

Title, standfirst, slug, category, author. Then the **block-based body**: a formatting toolbar (B / I / U ·
H2 / H3 / Link · List / Numbered / Quote · Image / Callout / Code · Undo / Redo) over a list of blocks, each
with a drag handle, a type label and its content, and an "add block" bar beneath. Then related service,
related case/project, and "keep reading" mode (automatic by category, or manual).

Right rail: publishing (status, first published, reads, publish date, feature toggle, digest toggle,
hide-from-search) · cover image with alt text · SEO · and a **review checklist** — no client names,
figures agreed or marked illustrative, read by a second engineer. The first two gate publishing.

Implement the body with TipTap and custom nodes. This is the one editor that is genuinely block-based from
day one.

## 13. Careers — `Careers.dc.html`

Role list with order and status, and an editor for the selected role: title, team, location, type,
experience, reports-to, summary, chips, and the body sections. Applications per role are visible from here
and link through to the Applications screen.

## 14. Site settings — `Site-Settings.dc.html`

Company identity · real contact details · offices (repeating: city, country, kind, body, chips) ·
registrations · social channels · SEO defaults (title template, description, OG image) · analytics toggle ·
**the blocked-names list** used by the publish gate · enquiry routing rules.

Director-only. Changes here are audited.

## 15. Users & permissions — `Users.dc.html`

User table (name, email, role, two-factor state, last seen, status) and the **permission matrix** — four
roles × nine capability rows, exactly as in `BUSINESS-RULES.md` §8.

Rules to enforce: Engineers can edit but not publish; Directors must have TOTP; nobody edits their own role;
the last Director cannot be demoted or removed. Invites are emailed with a single-use link.

---

## What is deliberately not designed

**Proposals · Projects (delivery) · People & allocation.** The sidebar links to them because that is the
shape of the eventual ops tool, but no screens exist. Wire them to a stub. Designing and building them is
phase 3 and needs its own conversation with the client — they are a second product, not the tail of this one.
