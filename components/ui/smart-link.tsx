import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

export type SmartLinkProps = Omit<ComponentPropsWithoutRef<"a">, "href"> & { href: string };

/** True for mailto:, tel:, http(s):// and protocol-relative links. */
export function isExternalHref(href: string): boolean {
  return /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(href);
}

/**
 * Internal paths and in-page anchors use next/link (client navigation, prefetch).
 * mailto:, tel: and external URLs render a plain <a>; http(s) links open in a new tab.
 */
export function SmartLink({ href, children, ...props }: SmartLinkProps) {
  if (isExternalHref(href)) {
    const isWeb = /^(?:https?:)?\/\//i.test(href);
    return (
      <a
        href={href}
        {...(isWeb ? { target: "_blank", rel: "noreferrer noopener" } : {})}
        {...props}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  );
}
