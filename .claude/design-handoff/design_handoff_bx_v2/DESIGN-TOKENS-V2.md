# bX Light — design tokens (site v2)

Source of truth: `bx-design-tokens.xlsx` and `bx-design-system.md`. Values marked **[added]** were
introduced during design where the spreadsheet had no token; approve or replace them before build.

Implement as CSS custom properties under a `.theme-bx-light` scope (or a Tailwind theme extension). The
console keeps the Industry theme from the v1 package; the two never mix.

## Colour

```css
/* Ground and surfaces */
--bg:              #F4F8FB;  /* page ground */
--surface:         #FFFFFF;  /* cards, alternating section bands, inputs, header */
--hairline:        #DCE6EF;  /* dividers, card borders, chip borders */
--border-strong:   #6B7F93;  /* input borders, outlined buttons */

/* Text */
--text:            #0A1F33;  /* headings, body, metric numbers */
--text-muted:      #4A5B6C;  /* secondary text, captions */
--link:            #006EA3;  /* links, eyebrows, small blue text */

/* Status (text) */
--success-text:    #1E7F34;  /* success messages, always with a word */
--warning-text:    #8A5A00;
--danger-text:     #B42318;  /* field errors, prefixed "Error:" */

/* Brand fills — never as text on light */
--brand-cyan:      #00AEEF;  /* primary button fill, signature rule, active nav underline, filter dot */
--brand-green:     #79BB42;  /* status dots, signature rule end */
--on-brand:        #0A1F33;  /* text on cyan or green — never white */

/* Navy bands (How we work, contact band, footer, diagram cards) */
--brand-deep:      #0A1F33;
--on-deep:         #F4F8FB;  /* headings on navy */
--on-deep-muted:   #A9B8C8;  /* body on navy */
--on-deep-accent:  #5BC8F5;  /* eyebrows, step numbers, links on navy */
--deep-hairline:   #1F3A55;  /* dividers and chip borders on navy */
--deep-panel:      #0F2A44;  /* filled boxes inside diagram cards */

--focus-ring:      #006EA3;  /* 2px outline, 2px offset; #5BC8F5 inside navy bands */

/* [added] */
--brand-cyan-hover: #33C1F3; /* primary button hover */
--selected-fill:    #E6F4FB; /* selected radio pill */
--deep-border:      #5B7690; /* outlined boxes inside navy diagram cards */
```

### Contrast pairs (all AA)

text on bg 15.65 · text-muted on surface 6.99 · link on bg 5.23 · success-text on bg 4.75 ·
danger-text on bg 6.16 · on-brand on cyan 6.61 · on-brand on green 7.16 · on-deep on navy 15.65 ·
on-deep-muted on navy 8.26 · on-deep-accent on navy 8.77.
**Fails, never use:** cyan `#00AEEF` as text on bg (2.37). White on cyan or green.

### Signature rule

`linear-gradient(90deg, #00AEEF, #79BB42)`, 3px high. Used on: the top edge of diagram cards, the top of
form cards, the top of the contact band. Never as a text fill, background wash or button.

## Typography

Fonts: **Inter** 400/500/600 for everything; **JetBrains Mono** 400/500 for labels, eyebrows, chips and
code. Self-host both.

| Role | Size / line-height | Weight | Letter-spacing | Notes |
|---|---|---|---|---|
| display (Home H1) | clamp(40px, 4.6vw, 64px) / 1.063 | 600 | -0.035em | |
| h1 (inner pages) | clamp(34px, 4vw, 48px) / 1.125 | 600 | -0.03em | |
| h2 | clamp(28px, 3vw, 36px) / 1.1667 | 600 | -0.025em | |
| h3 | 24px / 32px | 600 | -0.015em | |
| h4 | 20px / 28px | 600 | -0.01em | |
| body-lg | 18px / 28px | 400 | 0 | hero intros |
| body | 16px / 26px | 400 | 0 | |
| small | 14px / 22px | 400 | 0 | |
| label / eyebrow | 13px / 18px mono | 500 | 0.14em, uppercase | `--link` on light, `--on-deep-accent` on navy |
| chip | 13px / 18px mono | 400 | 0 | padding 3px 8px, radius 4, hairline border |
| metric (large) | 48px / 52px | 600 | -0.03em | `--text` |
| metric (inline) | 28px / 34px | 600 | -0.02em | `--text` |
| article prose | 18px / 30px | 400 | 0 | legal prose 17/28 |

`text-wrap: balance` on headings, `pretty` on paragraphs. Line length capped around 56–72ch.

## Spacing

Scale: 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 (`--space-1` … `--space-9`).

```css
--content:  1200px;                       /* content max width; header/footer 1248 incl. gutters */
--gutter:   clamp(16px, 4vw, 24px);
--section:  clamp(64px, 8vw, 96px);       /* section padding top/bottom */
```

Section head → content gap: 40–48px. Within a heading group: 16px. Card padding: 24px.

## Radius and elevation

`--radius-sm 4` inputs, chips · `--radius-md 8` buttons, diagram boxes · `--radius-lg 12` cards, form
cards, photo slots · `--radius-xl 16` featured panels · `--radius-pill 999` filter pills, badges.

`--shadow-card: 0 1px 2px rgba(10,31,51,.06), 0 8px 24px rgba(10,31,51,.06)` — mega menu only. Everything
else is separated by hairlines, not shadows.

## Components

| Component | Spec |
|---|---|
| Primary button | 48px high (44 in header), padding 0 22px, radius 8, `--brand-cyan` fill, `--on-brand` 600 16px, never wraps. Hover `--brand-cyan-hover`. **One per screen region.** |
| Secondary button | Same box, 1px `--border-strong`, transparent, `--text`. Hover fill `--surface`. |
| Text link CTA | `--link` 600, trailing `→`, min-height 44. |
| Open column (pillar) | No box. 1px `--text` top border, 24px padding-top, mono number, h3, body, optional hairline list. |
| Card | `--surface`, 1px `--hairline`, radius 12, padding 24. Hover border `--border-strong`. |
| Diagram card | `--brand-deep`, radius 12, 3px signature rule on top, padding 24, mono caption, boxes in `--deep-border` / `--deep-panel`, footer row with green status dot. |
| Input / select | 48px, padding 0 16, 1px `--border-strong`, radius 4, white. Label 14/22 500 above, 8px gap. |
| Radio pill | min 44px, padding 0 16, radius 8, 1px `--border-strong`; selected `--link` border + `--selected-fill`. |
| Status dot | 8px circle `--brand-green` beside text. Never alone. |
| Jump bar | White, hairline top/bottom, 52px, sticky at 73px, links 15px 500, hover `--bg` fill. |
| Hero grid backdrop | 56px grid of 1px `--hairline` lines, masked with `radial-gradient(ellipse 75% 100% at 100% 0%, #000 25%, transparent 72%)`, behind content (`z-index:-1` in an isolated section). |
