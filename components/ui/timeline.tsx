import { cn } from "@/lib/cn";

import { ChipList } from "./chip";

export type TimelineStep = { num: string; title: string; text: string; chips?: string[] };

/**
 * Navy numbered timeline (Home "How we work"). Place inside a <Section tone="deep">.
 * 1px vertical line at 27px, 40px numbered circles with accent border; each row is
 * title, description and chips in three columns from 900px, stacked below.
 */
export function Timeline({ steps, className }: { steps: TimelineStep[]; className?: string }) {
  return (
    <ol className={cn("relative border-y border-deep-hairline", className)}>
      <span
        aria-hidden="true"
        className="absolute top-0 bottom-0 left-[27px] w-px bg-deep-hairline"
      />
      {steps.map((step) => (
        <li
          key={step.num}
          className="relative grid grid-cols-[56px_minmax(0,1fr)] items-start gap-x-6 gap-y-4 py-6 [&+&]:border-t [&+&]:border-deep-hairline"
        >
          <span className="relative grid size-10 place-items-center justify-self-center rounded-pill border border-on-deep-accent bg-deep font-mono text-[13px] font-medium text-on-deep-accent">
            {step.num}
          </span>
          <div className="grid grid-cols-1 items-baseline gap-x-8 gap-y-2.5 pt-1.5 nav:grid-cols-[minmax(0,0.8fr)_minmax(0,1.3fr)_minmax(0,0.8fr)]">
            <h3 className="text-h4 text-on-deep">{step.title}</h3>
            <p className="max-w-[52ch] text-body text-on-deep-muted">{step.text}</p>
            {step.chips && step.chips.length > 0 && (
              <ChipList items={step.chips} tone="deep" className="nav:justify-end" />
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
