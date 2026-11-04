import { cn } from "@/lib/cn";

import { Eyebrow } from "./typography";

/*
 * Metrics. Numbers are always navy (`text-ink` / `text-on-deep`), never green (BUSINESS-RULES-V2 §1).
 * All figures are placeholders for now (by decision); content marks them `placeholder: true`.
 */

export type MetricItem = { value: string; label: string };

/** Inline metrics row (hero): 28px value above a 14px label, in a description list. */
export function MetricInlineList({
  items,
  className,
}: {
  items: MetricItem[];
  className?: string;
}) {
  return (
    <dl className={cn("flex flex-wrap gap-x-10 gap-y-4", className)}>
      {items.map((m) => (
        <div key={m.label} className="flex flex-col gap-1">
          <dt className="order-2 text-small text-muted">{m.label}</dt>
          <dd data-metric="" className="text-metric-inline text-ink">
            {m.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** Proof strip ("Delivered"): inline value with a short label beside it. */
export function MetricsStrip({
  label,
  sublabel,
  items,
  className,
}: {
  label: string;
  sublabel?: string;
  items: MetricItem[];
  className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap items-center gap-x-14 gap-y-6", className)}>
      <div className="flex flex-col gap-1">
        <Eyebrow as="span" tone="success">
          {label}
        </Eyebrow>
        {sublabel && <span className="text-small text-muted">{sublabel}</span>}
      </div>
      <dl className="flex flex-1 flex-wrap gap-x-12 gap-y-4">
        {items.map((m) => (
          <div key={m.label} className="flex items-baseline gap-2.5">
            <dt className="order-2 max-w-[16ch] text-small leading-5 text-muted">{m.label}</dt>
            <dd data-metric="" className="text-metric-inline text-ink">
              {m.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/** Large metric (In production, project cards): 48px value, sentence, sector line. */
export function MetricLarge({
  value,
  description,
  sector,
  tone = "light",
  className,
}: {
  value: string;
  description?: string;
  sector?: string;
  tone?: "light" | "deep";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 border-t pt-6",
        tone === "light" ? "border-ink" : "border-on-deep",
        className,
      )}
    >
      <span
        data-metric=""
        className={cn("text-metric", tone === "light" ? "text-ink" : "text-on-deep")}
      >
        {value}
      </span>
      {description && <p className="text-body">{description}</p>}
      {sector && (
        <span
          className={cn(
            "text-[13px] leading-5",
            tone === "light" ? "text-muted" : "text-on-deep-muted",
          )}
        >
          {sector}
        </span>
      )}
    </div>
  );
}
