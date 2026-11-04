/** Site-wide settings read from the environment. */

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

/** True on every non-production environment (Vercel previews, staging, rehearsal). */
export const noIndex = process.env.SITE_NOINDEX === "true";

/** /dev/* review routes are available in development, or when explicitly enabled. */
export const devRoutesEnabled =
  process.env.NODE_ENV !== "production" || process.env.ENABLE_DEV_ROUTES === "true";
