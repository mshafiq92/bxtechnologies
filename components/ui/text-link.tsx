import { cn } from "@/lib/cn";

import { ArrowRightIcon } from "./icons";
import { SmartLink, type SmartLinkProps } from "./smart-link";

/**
 * Text link CTA: link colour, weight 600, trailing arrow, min-height 44.
 * On navy (`tone="deep"`) it uses the navy accent and fades to on-deep on hover.
 */
export function TextLink({
  tone = "light",
  arrow = true,
  className,
  children,
  ...props
}: SmartLinkProps & { tone?: "light" | "deep"; arrow?: boolean }) {
  return (
    <SmartLink
      className={cn(
        "inline-flex min-h-11 items-center gap-2 font-semibold transition-colors",
        tone === "light" ? "text-link hover:text-ink" : "text-on-deep-accent hover:text-on-deep",
        className,
      )}
      {...props}
    >
      {children}
      {arrow && <ArrowRightIcon size={16} />}
    </SmartLink>
  );
}
