import { ImageResponse } from "next/og";

import { brandMarkDataUrl, MARK_RATIO } from "@/lib/seo/og-image";
import { ogPalette } from "@/lib/seo/og-palette";

/* iOS home-screen icon: the brand mark on white with padding (iOS fills transparency black). */

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  const mark = await brandMarkDataUrl();
  const width = 136;
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: ogPalette.surface,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse needs <img> */}
      <img src={mark} alt="" width={width} height={Math.round(width / MARK_RATIO)} />
    </div>,
    size,
  );
}
