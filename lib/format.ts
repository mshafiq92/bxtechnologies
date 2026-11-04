/** "2026-09-12" → "12 September 2026" (site copy format, timezone-safe). */
export function formatDate(isoDate: string): string {
  const [y, m, d] = isoDate.split("-").map(Number);
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(y ?? 1970, (m ?? 1) - 1, d ?? 1)));
}

/** 9 → "9 min read" */
export function formatReadTime(minutes: number | undefined): string | undefined {
  return minutes ? `${minutes} min read` : undefined;
}
