import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/lib/seo/metadata";
import { noIndex } from "@/lib/site";

/**
 * /robots.txt. Staging and previews (SITE_NOINDEX=true) block every crawler; production allows
 * everything except the review routes and the API, and points to the sitemap.
 */
export default function robots(): MetadataRoute.Robots {
  if (noIndex) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/dev/", "/api/"] },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
