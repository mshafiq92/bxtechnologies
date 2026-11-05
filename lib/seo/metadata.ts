import type { Metadata } from "next";

import { siteUrl } from "@/lib/site";

export const SITE_NAME = "bX Technologies";
export const TITLE_SUFFIX = ` | ${SITE_NAME}`;

/** Absolute URL on this site (NEXT_PUBLIC_SITE_URL + path). */
export const absoluteUrl = (path: string) => new URL(path, siteUrl).toString();

type PageSeo = {
  /** Page title without the site suffix ("About"). */
  title: string;
  description: string;
  /** Path from the site root ("/about"); becomes the canonical and og:url. */
  path: string;
  /** Use the title as-is instead of adding " | bX Technologies" (the home page). */
  absoluteTitle?: boolean;
  /** Articles get og:type "article" with their dates and authors. */
  article?: { publishedTime: string; authors?: string[]; section?: string };
};

/**
 * Metadata for one route: title, description, canonical, Open Graph and Twitter card.
 *
 * Next replaces (does not merge) a parent's `openGraph` / `twitter` objects, so every page builds
 * the full set here. Images come from the nearest `opengraph-image.tsx` file, which Next adds on
 * top of this config.
 */
export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle,
  article,
}: PageSeo): Metadata {
  const fullTitle = absoluteTitle ? title : `${title}${TITLE_SUFFIX}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      siteName: SITE_NAME,
      locale: "en_GB",
      url: path,
      title: fullTitle,
      description,
      ...(article
        ? {
            type: "article",
            publishedTime: article.publishedTime,
            authors: article.authors,
            section: article.section,
          }
        : { type: "website" }),
    },
    twitter: { card: "summary_large_image", title: fullTitle, description },
  };
}
