import { getLegalPage } from "@/lib/content";
import { ogContentType, ogSize, renderOgImage } from "@/lib/seo/og-image";

/* Share card for this page: its eyebrow and heading (see lib/seo/og-image.tsx). */
const { eyebrow, title } = getLegalPage("terms");

export const alt = `bX Technologies. ${title}`;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({ eyebrow, title });
}
