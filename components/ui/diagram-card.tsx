import { cn } from "@/lib/cn";

import { ArrowDownIcon, ArrowRightIcon } from "./icons";
import { SignatureRule } from "./signature-rule";
import { StatusDot } from "./status";

/*
 * Diagram card: navy, radius 12, signature rule on top, padding 24, mono caption,
 * boxes in deep-border / deep-panel, footer row with a green status dot.
 *
 * The data shape follows Service.heroDiagram (SCREENS-CONSOLE-V2):
 *   { caption, entry:{t,d}, core:{t,d}, support:[{t,d}...], outcomes:[{t,d}...], status:{t,d} }
 *
 * layout "stack" (Service Detail): entry, down arrow, core, down arrow, filled support grid,
 *   outcome grid (the last outcome is dashed).
 * layout "flow" (Home): entry and core side by side, filled support grid, dashed outcome rows.
 */

export type DiagramBox = { t: string; d: string };

export type HeroDiagram = {
  caption: string;
  entry: DiagramBox;
  core: DiagramBox;
  support: DiagramBox[];
  outcomes: DiagramBox[];
  status: DiagramBox & {
    /** Colour of the status detail text: muted (default) or green (e.g. "142 evals passing"). */
    detailTone?: "muted" | "status";
  };
};

const boxBase = "flex rounded-md border";
/* Box titles keep the browser's tight line height, as in the design. */
const title = "font-semibold leading-[1.2]";
/** Detail text: 12/18 in the Home flow layout, 13px in the Service Detail stack layout. */
const details = {
  flow: "font-mono text-[12px] leading-[18px] text-on-deep-muted",
  stack: "font-mono text-[13px] leading-5 text-on-deep-muted",
  stackRow: "font-mono text-[13px] leading-[22px] text-on-deep-muted",
} as const;

function Box({
  box,
  variant,
  row = false,
  size = "flow",
  className,
}: {
  box: DiagramBox;
  variant: "outline" | "core" | "panel" | "dashed" | "plain";
  /** Title and detail on one line, spread apart. */
  row?: boolean;
  size?: "flow" | "stack";
  className?: string;
}) {
  const detail = size === "flow" ? details.flow : row ? details.stackRow : details.stack;
  return (
    <div
      className={cn(
        boxBase,
        row
          ? "flex-wrap items-baseline justify-between gap-x-4 gap-y-1"
          : size === "stack"
            ? "flex-col gap-0.5"
            : "flex-col gap-1",
        variant === "outline" && "border-deep-border",
        variant === "core" && "border-brand-cyan",
        variant === "panel" && "border-deep-hairline bg-deep-panel",
        variant === "plain" && "border-deep-hairline",
        variant === "dashed" && "border-dashed border-deep-border",
        className,
      )}
    >
      <span className={cn(title, variant === "dashed" && row && "text-on-deep-accent")}>
        {box.t}
      </span>
      <span className={detail}>{box.d}</span>
    </div>
  );
}

function Arrow({ direction }: { direction: "right" | "down" }) {
  const Icon = direction === "right" ? ArrowRightIcon : ArrowDownIcon;
  return (
    <span aria-hidden="true" className="flex-none self-center text-on-deep-accent">
      <Icon size={14} />
    </span>
  );
}

function gridCols(n: number) {
  return n >= 3 ? "grid-cols-3" : n === 2 ? "grid-cols-2" : "grid-cols-1";
}

export function DiagramCard({
  diagram,
  layout = "stack",
  className,
}: {
  diagram: HeroDiagram;
  layout?: "stack" | "flow";
  className?: string;
}) {
  const { caption, entry, core, support, outcomes, status } = diagram;
  const flow = layout === "flow";

  return (
    <figure
      data-tone="deep"
      className={cn("m-0 overflow-hidden rounded-lg bg-deep text-on-deep", className)}
    >
      <SignatureRule />
      <div className={cn("flex flex-col p-6", flow ? "gap-4" : "gap-3")}>
        <figcaption className={cn("eyebrow text-on-deep-accent", !flow && "mb-1")}>
          {caption}
        </figcaption>

        {flow ? (
          <div className="flex items-stretch gap-2">
            <Box box={entry} variant="outline" className="flex-1 px-4 py-3.5 text-[15px]" />
            <Arrow direction="right" />
            <Box box={core} variant="core" className="flex-1 px-4 py-3.5 text-[15px]" />
          </div>
        ) : (
          <>
            <Box box={entry} variant="outline" row size="stack" className="px-4 py-3 text-[15px]" />
            <Arrow direction="down" />
            <Box box={core} variant="core" row size="stack" className="px-4 py-3 text-[15px]" />
            <Arrow direction="down" />
          </>
        )}

        {support.length > 0 && (
          <div className={cn("grid gap-2", gridCols(support.length))}>
            {support.map((b) => (
              <Box
                key={b.t}
                box={b}
                variant="panel"
                size={flow ? "flow" : "stack"}
                className={cn("text-small", flow ? "px-3.5 py-3" : "px-3.5 py-2.5")}
              />
            ))}
          </div>
        )}

        {outcomes.length > 0 &&
          (flow ? (
            outcomes.map((b) => (
              <Box key={b.t} box={b} variant="dashed" row className="px-3.5 py-3 text-small" />
            ))
          ) : (
            <div className={cn("grid gap-2", gridCols(outcomes.length))}>
              {outcomes.map((b, i) => (
                <Box
                  key={b.t}
                  box={b}
                  variant={i === outcomes.length - 1 && outcomes.length > 1 ? "dashed" : "plain"}
                  size="stack"
                  className="px-3.5 py-2.5 text-small"
                />
              ))}
            </div>
          ))}

        <div
          className={cn(
            "flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-deep-hairline",
            flow ? "pt-4" : "mt-1 pt-3.5",
          )}
        >
          <StatusDot className="text-small text-on-deep">{status.t}</StatusDot>
          <span
            className={cn(
              flow
                ? "font-mono text-[12px] leading-[18px]"
                : "font-mono text-[13px] leading-[18px]",
              status.detailTone === "status" ? "text-brand-green" : "text-on-deep-muted",
            )}
          >
            {status.d}
          </span>
        </div>
      </div>
    </figure>
  );
}
