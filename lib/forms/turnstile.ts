/*
 * Cloudflare Turnstile verification (decided 2026-11-04).
 * Without TURNSTILE_SECRET_KEY the check is skipped in development and fails in production.
 * For local testing Cloudflare provides always-pass keys (see .env.example).
 */

const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export async function verifyTurnstile(token: string | null, ip?: string): Promise<boolean> {
  // End-to-end test server only (see formsDryRun in ./mail); never set on a real deployment.
  if (process.env.FORMS_DRY_RUN === "true") return true;
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return process.env.NODE_ENV !== "production";
  if (!token) return false;

  const body = new URLSearchParams({ secret, response: token });
  if (ip) body.set("remoteip", ip);
  try {
    const res = await fetch(VERIFY_URL, { method: "POST", body });
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch (error) {
    console.error("[turnstile] verification failed", error);
    return false;
  }
}
