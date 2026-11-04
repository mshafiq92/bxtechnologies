import { cn } from "@/lib/cn";

/** Up to two initials from a name; "[Name]" placeholders give "N". */
export function initialsOf(name: string): string {
  const words = name.replace(/[[\]]/g, "").trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return "?";
  const first = words[0]?.[0] ?? "";
  const last = words.length > 1 ? (words[words.length - 1]?.[0] ?? "") : "";
  return (first + last).toUpperCase();
}

/**
 * Initials in a navy circle. Team portraits and article authors fall back to this until
 * real photos exist (BUSINESS-RULES-V2 §7).
 */
export function Avatar({
  name,
  initials,
  size = 48,
  className,
}: {
  name: string;
  /** Explicit initials (e.g. "LD"); derived from `name` when omitted. */
  initials?: string;
  size?: number;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-grid flex-none place-items-center rounded-pill bg-deep font-semibold text-on-deep",
        className,
      )}
      style={{ width: size, height: size, fontSize: Math.round(size * 0.32) }}
    >
      {initials ?? initialsOf(name)}
    </span>
  );
}
