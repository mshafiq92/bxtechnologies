import { cn } from "@/lib/cn";

/**
 * Hero grid backdrop (Services, Industries, Work, Insights heroes).
 * A 56px hairline grid masked toward the top right, sitting behind the content.
 * The parent must be `relative isolate` so the backdrop stays inside it.
 */
export function HeroGridBackdrop({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      data-hero-grid=""
      className={cn("pointer-events-none absolute inset-0 -z-10 bg-hero-grid", className)}
    />
  );
}
