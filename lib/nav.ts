import type { NavKey } from "@/lib/content";

/** Which main-nav item is active for a path (BxHeader `active` prop). Contact has none. */
export function activeNavKey(pathname: string | null): NavKey | null {
  if (!pathname) return null;
  const p = pathname.replace(/\/+$/, "") || "/";
  const under = (base: string) => p === base || p.startsWith(`${base}/`);
  if (under("/services")) return "services";
  if (under("/work")) return "work";
  if (under("/insights")) return "insights";
  if (under("/about") || under("/industries") || under("/careers")) return "company";
  return null;
}
