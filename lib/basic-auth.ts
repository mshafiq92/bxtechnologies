/*
 * HTTP basic auth for staging and previews (proxy.ts). Off unless both BASIC_AUTH_USER and
 * BASIC_AUTH_PASSWORD are set, so the production VPS never asks for a password.
 * Plain code rather than Vercel's paid password protection, so it works on any host.
 */

export type BasicAuthCredentials = { user: string; password: string };

/** Credentials from the environment, or null when protection is off. */
export function basicAuthFromEnv(
  env: Record<string, string | undefined> = process.env,
): BasicAuthCredentials | null {
  const user = env.BASIC_AUTH_USER;
  const password = env.BASIC_AUTH_PASSWORD;
  return user && password ? { user, password } : null;
}

/** Compares in time that depends only on the expected length, not on where they differ. */
function safeEqual(actual: string, expected: string): boolean {
  let diff = actual.length ^ expected.length;
  for (let i = 0; i < expected.length; i++) {
    // Past the end of `actual`, charCodeAt is NaN and `| 0` makes it 0 (the length check fails anyway).
    diff |= (actual.charCodeAt(i) | 0) ^ expected.charCodeAt(i);
  }
  return diff === 0;
}

/** True when an `Authorization: Basic ...` header carries the expected user and password. */
export function isAuthorized(header: string | null, expected: BasicAuthCredentials): boolean {
  if (!header?.startsWith("Basic ")) return false;
  let decoded: string;
  try {
    decoded = atob(header.slice(6).trim());
  } catch {
    return false;
  }
  const sep = decoded.indexOf(":");
  if (sep < 0) return false;
  const userOk = safeEqual(decoded.slice(0, sep), expected.user);
  const passwordOk = safeEqual(decoded.slice(sep + 1), expected.password);
  return userOk && passwordOk;
}
