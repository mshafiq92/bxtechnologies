import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

import { Eyebrow, Heading } from "./typography";

/**
 * Open column (pillar): no box. 1px ink top border, 24px padding-top, mono number, h3,
 * body, optional hairline list and a footer (link or status line).
 */
export function OpenColumn({
  number,
  title,
  titleAs = "h3",
  children,
  items,
  footer,
  tone = "light",
  className,
}: {
  number?: string;
  title: ReactNode;
  titleAs?: "h2" | "h3" | "h4";
  children?: ReactNode;
  /** Hairline-separated list under the body. */
  items?: ReactNode[];
  footer?: ReactNode;
  tone?: "light" | "deep";
  className?: string;
}) {
  const deep = tone === "deep";
  return (
    <article
      className={cn(
        "flex flex-col gap-3 border-t pt-6",
        deep ? "border-on-deep" : "border-ink",
        className,
      )}
    >
      {number && (
        <Eyebrow as="span" tone={deep ? "deep" : "default"} className="tracking-[0.14em]">
          {number}
        </Eyebrow>
      )}
      <Heading as={titleAs} size="h3">
        {title}
      </Heading>
      {children && (
        <div className={cn("text-body", deep ? "text-on-deep-muted" : "text-muted")}>
          {children}
        </div>
      )}
      {items && items.length > 0 && (
        <ul className="mt-2">
          {items.map((item, i) => (
            <li
              key={i}
              className={cn(
                "border-t py-2.5 text-small last:border-b",
                deep ? "border-deep-hairline" : "border-hairline",
              )}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
      {footer && <div className="mt-auto">{footer}</div>}
    </article>
  );
}
