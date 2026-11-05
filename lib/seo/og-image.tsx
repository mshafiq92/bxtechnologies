import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { getSiteSettings } from "@/lib/content";

import { ogPalette as c } from "./og-palette";

/*
 * Social share cards (Open Graph / X), rendered at build time by the opengraph-image.tsx files.
 * Layout follows the site: ground background, signature rule, brand mark, eyebrow, page heading.
 * Font: the renderer's built-in sans (it cannot read our woff2 files).
 */

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

/** The brand mark as a data URL (read once per build). */
let markPromise: Promise<string> | undefined;
export function brandMarkDataUrl(): Promise<string> {
  markPromise ??= readFile(join(process.cwd(), "public/brand/bx-mark.png")).then(
    (buf) => `data:image/png;base64,${buf.toString("base64")}`,
  );
  return markPromise;
}
/** Intrinsic size of public/brand/bx-mark.png. */
export const MARK_RATIO = 560 / 462;

/** Smaller type for long headings so they fit in three lines. */
const titleSize = (title: string) => (title.length > 90 ? 52 : title.length > 60 ? 60 : 68);

export async function renderOgImage({ eyebrow, title }: { eyebrow: string; title: string }) {
  const site = getSiteSettings();
  const domain = site.email.split("@")[1];
  const mark = await brandMarkDataUrl();
  const markHeight = 64;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: c.bg,
        color: c.text,
      }}
    >
      <div
        style={{
          height: 10,
          width: "100%",
          background: `linear-gradient(90deg, ${c.brandCyan}, ${c.brandGreen})`,
        }}
      />
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px 80px 52px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse needs <img> */}
          <img src={mark} alt="" width={Math.round(markHeight * MARK_RATIO)} height={markHeight} />
          <div style={{ fontSize: 34, letterSpacing: "-0.01em" }}>Technologies</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 24,
              color: c.link,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
            }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              fontSize: titleSize(title),
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              maxWidth: 1000,
            }}
          >
            {title}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: `1px solid ${c.hairline}`,
            paddingTop: 24,
            fontSize: 24,
            color: c.textMuted,
          }}
        >
          <div>{domain}</div>
          <div>{site.locations}</div>
        </div>
      </div>
    </div>,
    ogSize,
  );
}
