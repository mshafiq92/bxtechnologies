import { getService, getServicesWithDetail } from "@/lib/content";
import { ogContentType, ogSize, renderOgImage } from "@/lib/seo/og-image";

/* Share card per page, prerendered for every published slug (see lib/seo/og-image.tsx). */

export const alt = "A BX Technologies service";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return getServicesWithDetail().map((s) => ({ slug: s.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  return renderOgImage({ eyebrow: "Services", title: service?.name ?? "Services" });
}
