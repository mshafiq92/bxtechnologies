import { cn } from "@/lib/cn";

import { Eyebrow } from "./typography";

/*
 * Metrics. Numbers are always navy (`text-ink` / `text-on-deep`), never green (BUSINESS-RULES-V2 §1).
 * Figures that are not yet real are marked `placeholder: true` in content.
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

/** Proof strip ("Track record"): equal columns with dividers, value above its label. */
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
    <div className={cn("flex flex-col gap-6 md:flex-row md:items-center md:gap-14", className)}>
      <div className="flex flex-col gap-1">
        <Eyebrow as="span">{label}</Eyebrow>
        {sublabel && <span className="text-small text-muted">{sublabel}</span>}
      </div>
      <dl className="grid flex-1 grid-cols-3 gap-4 md:gap-0 md:divide-x md:divide-hairline">
        {items.map((m) => (
          <div key={m.label} className="flex flex-col gap-1 md:px-8">
            <dt className="order-2 text-small leading-5 text-muted">{m.label}</dt>
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
