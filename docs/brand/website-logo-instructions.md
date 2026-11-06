# Task: Update the BX Technologies logo on the website

Use the files in this folder. All SVGs have text converted to outlines (no fonts needed), tight viewBoxes starting at 0 0, and unique gradient IDs per file. Do not edit, recolour, crop or stretch them.

Copy them to `public/brand/` (keep the subfolders).

## Which file goes where

| Place | File | Height desktop | Height mobile |
|---|---|---|---|
| Header, white background | `horizontal/bx-logo-horizontal-compact.svg` (C1) | 60px | 44px |
| Footer, navy #0B1F33 | `horizontal/bx-logo-horizontal-compact-white.svg` (C1) | 48px | 40px |
| Anywhere below 40px tall (e.g. compact mobile header, email signature) | `horizontal/bx-logo-horizontal-compact-nobars.svg` / `-nobars-white.svg` (C2) | – | 32–40px |
| Browser tab | `icon/bx-favicon.svg`, `icon/bx-favicon-32.png` | 32px | 32px |
| Apple touch icon | `icon/bx-favicon-180.png` | 180px | 180px |
| Open Graph / social fallback | `icon/bx-favicon-512.png` | – | – |

Set height only, width auto. Use `<img>` (or Next.js `<Image>`) with `alt="BX Technologies"`. Wrap the header logo in a link to `/`.

## Rules

- Use ONE layout on the whole site: the horizontal compact logo. Header in colour, footer in white.
- Do NOT use `stacked/` or `print/` files on the website.
- Remove any separate "Technologies" text next to the logo; the name is part of the logo file.
- Footer copyright line as text: `© {year} BX Technologies Pvt Ltd`.
- Clear space around the logo: at least the height of the dot above the X (about 10% of logo height).

## Favicon tags

```html
<link rel="icon" href="/brand/icon/bx-favicon.svg" type="image/svg+xml">
<link rel="icon" href="/brand/icon/bx-favicon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="/brand/icon/bx-favicon-180.png">
```

## Check before finishing

- Header and footer logos have the same layout; only the text colour differs.
- "Technologies" reads clearly at 44px (mobile header) and 40px (mobile footer).
- Delete old logo files from the project once nothing references them.
