import { getPage } from "@/lib/content";
import { ogContentType, ogSize, renderOgImage } from "@/lib/seo/og-image";

/* Share card for this page: its eyebrow and heading (see lib/seo/og-image.tsx). */
const page = getPage("about");
const { eyebrow, title } = page.hero;

export const alt = `BX Technologies. ${title}`;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({ eyebrow, title });
}
