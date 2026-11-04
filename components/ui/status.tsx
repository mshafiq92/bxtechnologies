import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

/*
 * Green means status (BUSINESS-RULES-V2 §1): an 8px dot beside a word, never alone,
 * never on anything clickable. `children` is required so a dot can't render without words.
 */

/** 8px status dot followed by its label. */
export function StatusDot({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span aria-hidden="true" className="size-2 flex-none rounded-pill bg-status" />
      <span>{children}</span>
    </span>
  );
}

const badgeTones = {
  delivered: { dot: "bg-status", text: "text-success" },
  progress: { dot: "bg-brand-cyan", text: "text-link" },
  pending: { dot: "bg-warning", text: "text-warning" },
} as const;

/** Pill badge with a dot (Foundations: Delivered · In build · Pending figures). */
export function Badge({
  tone = "delivered",
  children,
  className,
}: {
  tone?: keyof typeof badgeTones;
  children: ReactNode;
  className?: string;
}) {
  const t = badgeTones[tone];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-pill border border-hairline bg-surface px-3 py-1 text-small font-medium whitespace-nowrap",
        t.text,
        className,
      )}
    >
      <span aria-hidden="true" className={cn("size-2 flex-none rounded-pill", t.dot)} />
      {children}
    </span>
  );
}
