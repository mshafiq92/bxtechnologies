import type { ComponentPropsWithoutRef, ElementType } from "react";

import { cn } from "@/lib/cn";

const widths = {
  /** 1200px content column (default) */
  content: "max-w-content",
  /** 720px reading column (article and legal prose) */
  reading: "max-w-reading",
} as const;

type ContainerProps<T extends ElementType> = {
  as?: T;
  width?: keyof typeof widths;
  /** Add the side gutter. Off by default because <Section> already pads its sides. */
  gutter?: boolean;
} & Omit<ComponentPropsWithoutRef<T>, "as">;

/** Centred content column. Inside a <Section> it needs no gutter; on its own, pass `gutter`. */
export function Container<T extends ElementType = "div">({
  as,
  width = "content",
  gutter = false,
  className,
  ...props
}: ContainerProps<T>) {
  const Component: ElementType = as ?? "div";
  return (
    <Component
      className={cn("mx-auto w-full", widths[width], gutter && "px-(--gutter)", className)}
      {...props}
    />
  );
}
