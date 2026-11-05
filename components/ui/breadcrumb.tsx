import { Fragment } from "react";

import { cn } from "@/lib/cn";
import { JsonLd } from "@/lib/seo/json-ld";
import { breadcrumbLd } from "@/lib/seo/structured-data";

import { SmartLink } from "./smart-link";

export type BreadcrumbItem = { label: string; href?: string };

/**
 * Breadcrumb: small muted trail with "/" separators; the last item is the current page.
 * Also emits the matching BreadcrumbList JSON-LD, so search results show the same trail.
 */
export function Breadcrumb({ items, className }: { items: BreadcrumbItem[]; className?: string }) {
  return (
    <>
      <JsonLd data={breadcrumbLd(items)} />
      <nav aria-label="Breadcrumb" className={cn("text-small text-muted", className)}>
        <ol className="flex flex-wrap gap-2">
          {items.map((item, i) => {
            const last = i === items.length - 1;
            return (
              <Fragment key={`${item.label}-${i}`}>
                <li>
                  {item.href && !last ? (
                    <SmartLink
                      href={item.href}
                      className="text-link transition-colors hover:text-ink"
                    >
                      {item.label}
                    </SmartLink>
                  ) : (
                    <span aria-current={last ? "page" : undefined}>{item.label}</span>
                  )}
                </li>
                {!last && (
                  <li aria-hidden="true" role="presentation">
                    /
                  </li>
                )}
              </Fragment>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
