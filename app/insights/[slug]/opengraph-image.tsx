import { getInsight, getPublishedInsights, insightTopic } from "@/lib/content";
import { ogContentType, ogSize, renderOgImage } from "@/lib/seo/og-image";

/* Share card per page, prerendered for every published slug (see lib/seo/og-image.tsx). */

export const alt = "An article from BX Technologies insights";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return getPublishedInsights().map((i) => ({ slug: i.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const insight = getInsight(slug);
  return renderOgImage({
    eyebrow: insight ? `Insights · ${insightTopic(insight)}` : "Insights",
    title: insight?.title ?? "Insights",
  });
}
