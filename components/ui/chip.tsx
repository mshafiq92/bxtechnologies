import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

/**
 * Chip: mono 13/18, padding 3px 8px, radius 4, hairline border (stack lists, project cards).
 * On navy it takes the deep hairline and muted text. `fill="ground"` is for chips that sit on a
 * white card (Work project cards).
 */
export function Chip({
  tone = "light",
  fill = "surface",
  className,
  children,
}: {
  tone?: "light" | "deep";
  fill?: "surface" | "ground";
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm border font-mono text-chip whitespace-nowrap",
        tone === "light"
          ? cn(
              "border-hairline px-2 py-[3px] text-muted",
              fill === "ground" ? "bg-ground" : "bg-surface",
            )
          : "border-deep-hairline px-2.5 py-1 text-on-deep-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}

/** A wrapping row of chips. */
export function ChipList({
  items,
  tone,
  fill,
  className,
}: {
  items: string[];
  tone?: "light" | "deep";
  fill?: "surface" | "ground";
  className?: string;
}) {
  return (
    <ul className={cn("flex flex-wrap gap-1.5", className)}>
      {items.map((item) => (
        <li key={item} className="flex">
          <Chip tone={tone} fill={fill}>
            {item}
          </Chip>
        </li>
      ))}
    </ul>
  );
}

/**
 * Tag: uppercase mono 12/18, 0.1em, white fill. `box` (hero topic tags, padding 5px 10px,
 * radius 4) or `pill` (engagement models, padding 3px 10px, fully rounded).
 */
export function Tag({
  shape = "box",
  className,
  children,
}: {
  shape?: "box" | "pill";
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center border border-hairline bg-surface px-2.5 font-mono text-[12px] leading-[18px] tracking-[0.1em] whitespace-nowrap text-muted uppercase",
        shape === "box" ? "rounded-sm py-[5px]" : "rounded-pill py-[3px]",
        className,
      )}
    >
      {children}
    </span>
  );
}
