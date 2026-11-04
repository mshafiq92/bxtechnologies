/*
 * Simple in-memory sliding-window rate limit per IP and form.
 * Enough for one production container on the VPS; on Vercel previews each instance has its own
 * memory, which is acceptable for testing. Turnstile is the main spam defence.
 */

const hits = new Map<string, number[]>();

export function rateLimit(
  key: string,
  { limit = 5, windowMs = 10 * 60 * 1000 }: { limit?: number; windowMs?: number } = {},
  now = Date.now(),
): boolean {
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= limit) {
    hits.set(key, recent);
    return false;
  }
  recent.push(now);
  hits.set(key, recent);
  // Keep the map from growing without bound.
  if (hits.size > 5000) {
    for (const [k, times] of hits) {
      if (times.every((t) => now - t >= windowMs)) hits.delete(k);
    }
  }
  return true;
}

/** Test helper. */
export function resetRateLimit() {
  hits.clear();
}
