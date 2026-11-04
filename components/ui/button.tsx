import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/cn";

import { ArrowRightIcon } from "./icons";
import { SmartLink } from "./smart-link";

/*
 * Buttons (DESIGN-TOKENS-V2: Components)
 * Primary: 48px, padding 0 22px, radius 8, cyan fill, navy 600 16px, never wraps. One per screen region.
 * Secondary: same box, 1px border-strong, transparent, ink. Hover fill surface.
 * Header size: 44px, padding 0 18px, 15px.
 */

const base =
  "inline-flex flex-none items-center justify-center gap-2 whitespace-nowrap rounded-md font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60";

const variants = {
  primary: "bg-brand-cyan text-on-brand hover:bg-brand-cyan-hover",
  secondary: "border border-strong text-ink hover:bg-surface",
} as const;

const sizes = {
  default: "h-12 px-[22px] text-body",
  header: "h-11 px-[18px] text-[15px] leading-[22px]",
  block: "h-12 w-full px-[22px] text-body",
} as const;

type StyleProps = {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  /** Trailing arrow, as on "See the work" and "All projects". */
  arrow?: boolean;
};

export function buttonClasses({
  variant = "primary",
  size = "default",
  className,
}: StyleProps & { className?: string }) {
  return cn(base, variants[variant], sizes[size], className);
}

function Content({ children, arrow }: { children: ReactNode; arrow?: boolean }) {
  return (
    <>
      {children}
      {arrow && <ArrowRightIcon size={16} />}
    </>
  );
}

type ButtonProps = StyleProps & ComponentPropsWithoutRef<"button">;

export function Button({
  variant,
  size,
  arrow,
  className,
  type = "button",
  children,
  ...props
}: ButtonProps) {
  return (
    <button type={type} className={buttonClasses({ variant, size, className })} {...props}>
      <Content arrow={arrow}>{children}</Content>
    </button>
  );
}

type ButtonLinkProps = StyleProps & Omit<ComponentPropsWithoutRef<"a">, "href"> & { href: string };

export function ButtonLink({
  variant,
  size,
  arrow,
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <SmartLink className={buttonClasses({ variant, size, className })} {...props}>
      <Content arrow={arrow}>{children}</Content>
    </SmartLink>
  );
}
