import { ImageResponse } from "next/og";

import { brandMarkDataUrl, MARK_RATIO } from "@/lib/seo/og-image";

/*
 * Favicons from the brand mark, centred on a transparent square: 32px for browser tabs and 192px
 * for Android / high-density screens. Replace with an SVG mark when one exists (docs/01 G3).
 */

const SIZES = [32, 192] as const;

export function generateImageMetadata() {
  return SIZES.map((px) => ({
    id: String(px),
    size: { width: px, height: px },
    contentType: "image/png",
  }));
}

export default async function Icon({ id }: { id: Promise<string> | string }) {
  const px = Number(await id);
  const mark = await brandMarkDataUrl();
  const width = px;
  const height = Math.round(px / MARK_RATIO);
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse needs <img> */}
      <img src={mark} alt="" width={width} height={height} />
    </div>,
    { width: px, height: px },
  );
}
