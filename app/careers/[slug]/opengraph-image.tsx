import { getRole, getRolesWithDetail } from "@/lib/content";
import { ogContentType, ogSize, renderOgImage } from "@/lib/seo/og-image";

/* Share card per page, prerendered for every published slug (see lib/seo/og-image.tsx). */

export const alt = "An open role at bX Technologies";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return getRolesWithDetail().map((r) => ({ slug: r.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const role = getRole(slug);
  return renderOgImage({
    eyebrow: role ? `Careers · ${role.location}` : "Careers",
    title: role?.title ?? "Careers",
  });
}
