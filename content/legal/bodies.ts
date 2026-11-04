/* Legal page bodies, keyed by slug. Title block and table of contents: content/pages/legal.ts. */
import type { MDXContent } from "mdx/types";

import type { LegalSlug } from "@/content/pages/legal";

export const legalBodies: Record<LegalSlug, () => Promise<{ default: MDXContent }>> = {
  privacy: () => import("./privacy.mdx"),
  terms: () => import("./terms.mdx"),
  cookies: () => import("./cookies.mdx"),
};
