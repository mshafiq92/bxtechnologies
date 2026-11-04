import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/cn";

import { Container } from "./container";

/**
 * Section tones (SCREENS-SITE-V2): sections alternate between the page ground and
 * white surface bands with hairlines top and bottom; navy bands where the design says so.
 */
const tones = {
  ground: "bg-ground text-ink",
  surface: "bg-surface text-ink border-y border-hairline",
  deep: "bg-deep text-on-deep",
} as const;

/** Vertical padding. `section` is the fluid 64 to 96px from the tokens. */
const spacing = {
  section: "py-(--section)",
  /** Hero: full section padding on top, 48 to 64px below */
  hero: "pt-(--section) pb-[clamp(48px,6vw,64px)]",
  /** Continues the previous band on the same ground: no top padding */
  flush: "pt-0 pb-(--section)",
  /** Top padding only: the next section continues the same ground */
  top: "pt-(--section) pb-0",
  /** Title block (Article, Role, Contact, legal): 40 to 56px below */
  title: "pt-(--section) pb-[clamp(40px,5vw,56px)]",
  /** Thin strip (clients, proof band) */

  strip: "py-7",
  band: "py-8",
  /** No vertical padding (callers set their own) */
  none: "",
} as const;

export type SectionTone = keyof typeof tones;

type SectionProps = {
  tone?: SectionTone;
  spacing?: keyof typeof spacing;
  /** Wrap children in the 1200px <Container>. Turn off for full-bleed layouts. */
  contained?: boolean;
  /** Extra classes for the inner container. */
  containerClassName?: string;
  children?: ReactNode;
} & ComponentPropsWithoutRef<"section">;

/** Page section with side gutters, tone and vertical rhythm. */
export function Section({
  tone = "ground",
  spacing: space = "section",
  contained = true,
  containerClassName,
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      data-tone={tone}
      className={cn("px-(--gutter)", tones[tone], spacing[space], className)}
      {...props}
    >
      {contained ? <Container className={containerClassName}>{children}</Container> : children}
    </section>
  );
}
