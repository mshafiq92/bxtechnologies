import type { MetadataRoute } from "next";

import {
  getLegalPage,
  getPublishedInsights,
  getRolesWithDetail,
  getServicesWithDetail,
} from "@/lib/content";
import { absoluteUrl } from "@/lib/seo/metadata";

/** Fixed pages, in navigation order. Detail pages are added from content below. */
const STATIC_PATHS = [
  "/",
  "/services",
  "/work",
  "/insights",
  "/about",
  "/industries",
  "/careers",
  "/careers/apply",
  "/contact",
] as const;

const LEGAL = ["privacy", "terms", "cookies", "imprint"] as const;

/**
 * /sitemap.xml. Only pages that exist: services, articles and roles without a page are left out.
 * `lastModified` is set only where the content has a real date (articles, legal pages).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...STATIC_PATHS.map((path) => ({ url: absoluteUrl(path) })),
    ...getServicesWithDetail().map((s) => ({ url: absoluteUrl(`/services/${s.slug}`) })),
    ...getPublishedInsights().map((i) => ({
      url: absoluteUrl(`/insights/${i.slug}`),
      lastModified: i.date,
    })),
    ...getRolesWithDetail().map((r) => ({ url: absoluteUrl(`/careers/${r.slug}`) })),
    ...LEGAL.map((slug) => ({
      url: absoluteUrl(`/${slug}`),
      lastModified: getLegalPage(slug).lastUpdated,
    })),
  ];
}
