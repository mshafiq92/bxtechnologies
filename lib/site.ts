/** Site-wide settings read from the environment. Server-side only (reads non-public variables). */

type Env = Record<string, string | undefined>;

/**
 * Public URL of this deployment, for canonicals, the sitemap and share images.
 * NEXT_PUBLIC_SITE_URL wins; on Vercel it falls back to the deployment's own address
 * (staging's stable URL, or a preview's branch URL) so absolute links point at the right host.
 */
export function resolveSiteUrl(env: Env = process.env): string {
  if (env.NEXT_PUBLIC_SITE_URL) return env.NEXT_PUBLIC_SITE_URL;
  const host =
    env.VERCEL_ENV === "production"
      ? env.VERCEL_PROJECT_PRODUCTION_URL
      : (env.VERCEL_BRANCH_URL ?? env.VERCEL_URL);
  return host ? `https://${host}` : "http://localhost:3000";
}

/**
 * Keep search engines out. True on every non-production environment (previews, staging,
 * rehearsal). Every Vercel deployment is non-production by decision (production is the VPS), so
 * on Vercel it is on unless SITE_NOINDEX is explicitly "false".
 */
export function resolveNoIndex(env: Env = process.env): boolean {
  if (env.SITE_NOINDEX === "true") return true;
  return env.VERCEL === "1" && env.SITE_NOINDEX !== "false";
}

export const siteUrl = resolveSiteUrl();
export const noIndex = resolveNoIndex();

/** Internal review notes ("Needs your lawyer", "To be supplied") show in development and on noindex builds. */
export const showInternalNotes = process.env.NODE_ENV !== "production" || noIndex;

/** /dev/* review routes are available in development, or when explicitly enabled. */
export const devRoutesEnabled =
  process.env.NODE_ENV !== "production" || process.env.ENABLE_DEV_ROUTES === "true";
