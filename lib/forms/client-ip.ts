/**
 * The visitor's IP for rate limiting and Turnstile. Only trust headers the platform sets:
 * on Vercel, x-real-ip / x-forwarded-for are written by Vercel and a client-sent
 * cf-connecting-ip would be spoofable, so it is ignored there. Elsewhere (the VPS behind
 * Cloudflare and Caddy) cf-connecting-ip comes first. T51: confirm the proxy overwrites, not appends.
 */
export function clientIpFrom(h: Pick<Headers, "get">, onVercel: boolean): string {
  const forwarded = h.get("x-forwarded-for")?.split(",")[0]?.trim() || null;
  const ip = onVercel
    ? (h.get("x-real-ip") ?? forwarded)
    : (h.get("cf-connecting-ip") ?? forwarded ?? h.get("x-real-ip"));
  return ip || "unknown";
}
