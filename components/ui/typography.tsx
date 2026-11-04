import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

import { cn } from "@/lib/cn";

/* Heading ----------------------------------------------------------------- */

const headingSizes = {
  display: "text-display",
  h1: "text-h1",
  h2: "text-h2",
  h3: "text-h3",
  h4: "text-h4",
} as const;

type HeadingProps = {
  /** Semantic level. Defaults to the visual size when that is h1 to h4, else h1. */
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  /** Visual size from the type scale. */
  size: keyof typeof headingSizes;
} & ComponentPropsWithoutRef<"h2">;

/** Heading with the type scale applied. Semantic level and visual size are independent. */
export function Heading({ as, size, className, ...props }: HeadingProps) {
  const Tag = as ?? (size === "display" ? "h1" : size);
  return <Tag className={cn(headingSizes[size], className)} {...props} />;
}

/* Eyebrow ----------------------------------------------------------------- */

const eyebrowTones = {
  /** Blue on light, navy accent inside a navy band */
  default: "text-link in-data-[tone=deep]:text-on-deep-accent",
  /** Grey label (mega menu groups, jump bar) */
  muted: "text-muted",
  /** "Delivered" label on the proof strip */
  success: "text-success",
  /** Accent on navy, when not inside a data-tone="deep" band */
  deep: "text-on-deep-accent",
} as const;

type EyebrowProps<T extends ElementType> = {
  as?: T;
  tone?: keyof typeof eyebrowTones;
} & Omit<ComponentPropsWithoutRef<T>, "as">;

/** Eyebrow / label: mono 13/18, 500, 0.14em, uppercase. */
export function Eyebrow<T extends ElementType = "p">({
  as,
  tone = "default",
  className,
  ...props
}: EyebrowProps<T>) {
  const Component: ElementType = as ?? "p";
  return <Component className={cn("eyebrow", eyebrowTones[tone], className)} {...props} />;
}

/* Section header ----------------------------------------------------------- */

type SectionHeaderProps = {
  eyebrow?: ReactNode;
  title: ReactNode;
  /** Heading level for the title (default h2). */
  as?: "h1" | "h2" | "h3";
  /** Text beside the heading block (wide) or below it (narrow). */
  aside?: ReactNode;
  /** Text under the heading, inside the heading block. */
  intro?: ReactNode;
  /** Action on the right, e.g. an "All projects" button. */
  action?: ReactNode;
  /** `deep` for use inside a navy band. */
  tone?: "light" | "deep";
  /** Cap the heading block at 720px (Services groups, Service Detail "Where it fits"). */
  narrow?: boolean;
  /** `small` for short notes beside the heading (14/22, 46ch), e.g. placeholder-figure notes. */
  asideSize?: "body" | "small";
  className?: string;
};

/**
 * The repeated section opening: eyebrow + H2 on the left, a short paragraph or action on the
 * right, bottom-aligned and wrapping on narrow screens.
 */
export function SectionHeader({
  eyebrow,
  title,
  as = "h2",
  aside,
  intro,
  action,
  tone = "light",
  narrow = false,
  asideSize = "body",
  className,
}: SectionHeaderProps) {
  const muted = tone === "deep" ? "text-on-deep-muted" : "text-muted";
  return (
    <div className={cn("flex flex-wrap items-end justify-between gap-x-12 gap-y-4", className)}>
      <div className={cn("flex flex-col gap-4", narrow && "max-w-[720px]")}>
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <Heading as={as} size="h2" className={tone === "deep" ? "text-on-deep" : undefined}>
          {title}
        </Heading>
        {intro && <p className={cn("text-body", muted)}>{intro}</p>}
      </div>
      {aside && (
        <p
          className={cn(
            asideSize === "small" ? "max-w-[46ch] text-small" : "max-w-[48ch] text-body",
            muted,
          )}
        >
          {aside}
        </p>
      )}
      {action}
    </div>
  );
}
