import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/cn";

import { SmartLink } from "./smart-link";

/*
 * Card: surface fill, 1px hairline, radius 12, padding 24. Hover border border-strong.
 * `fill="ground"` gives the light-blue card used inside white bands (Selected work).
 */

const fills = {
  surface: "bg-surface",
  ground: "bg-ground",
} as const;

const gaps = { sm: "gap-2", md: "gap-4" } as const;

type CardStyle = { fill?: keyof typeof fills; gap?: keyof typeof gaps; className?: string };

function cardClasses({ fill = "surface", gap = "md", className }: CardStyle, interactive: boolean) {
  return cn(
    "flex flex-col rounded-lg border border-hairline p-6 text-ink",
    gaps[gap],
    fills[fill],
    interactive && "transition-colors hover:border-strong",
    className,
  );
}

export function Card({
  fill,
  gap,
  className,
  ...props
}: CardStyle & ComponentPropsWithoutRef<"div">) {
  return <div className={cardClasses({ fill, gap, className }, false)} {...props} />;
}

/** Whole-card link. Keep the content short; the accessible name is all of its text. */
export function CardLink({
  fill,
  gap,
  className,
  ...props
}: CardStyle & Omit<ComponentPropsWithoutRef<"a">, "href"> & { href: string }) {
  return <SmartLink className={cardClasses({ fill, gap, className }, true)} {...props} />;
}
