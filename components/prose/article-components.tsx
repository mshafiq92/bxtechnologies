import type { MDXComponents } from "mdx/types";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { SmartLink } from "@/components/ui/smart-link";
import { cn } from "@/lib/cn";
import { showInternalNotes } from "@/lib/site";

/*
 * Components available inside article MDX (content/insights/*.mdx), styled to the Article
 * design: prose 18/30, H2 28/36 with 28px extra space above, lists 22px indent, pull quote
 * between rules, white note box. Section headings carry explicit ids for "On this page".
 */

export function H2({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <h2
      id={id}
      className="mt-7 scroll-mt-24 text-[28px] leading-9 font-semibold tracking-[-0.02em]"
    >
      {children}
    </h2>
  );
}

export function H3({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <h3 id={id} className="mt-2 scroll-mt-24 text-h4">
      {children}
    </h3>
  );
}

/** Pull quote: ink rule above, hairline below, 24/34 semibold. */
export function PullQuote({ children }: { children: ReactNode }) {
  return (
    <blockquote className="my-3 border-t border-b border-t-ink border-b-hairline py-6 text-[24px] leading-[34px] font-semibold tracking-[-0.015em]">
      {children}
    </blockquote>
  );
}

/**
 * Note box: white card with a mono label. `internal` notes are messages to bX (for example
 * "Needs your lawyer") and are hidden from the public site.
 */
export function Note({
  title,
  tone = "default",
  internal = false,
  children,
}: {
  title: string;
  tone?: "default" | "warning";
  internal?: boolean;
  children: ReactNode;
}) {
  if (internal && !showInternalNotes) {
    return null;
  }
  return (
    <aside
      className={cn(
        "my-2 flex flex-col gap-2.5 rounded-lg border bg-surface p-6 [&_p]:text-body [&_p]:text-muted",
        tone === "warning" ? "border-warning" : "border-hairline",
      )}
    >
      <span className={cn("eyebrow", tone === "warning" ? "text-warning" : "text-link")}>
        {title}
      </span>
      {children}
    </aside>
  );
}

/** Markdown element styles inside article prose. */
export const articleComponents: MDXComponents = {
  H2,
  H3,
  PullQuote,
  Note,
  p: (props: ComponentPropsWithoutRef<"p">) => <p {...props} />,
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul className="m-0 flex list-disc flex-col gap-2.5 pl-[22px]" {...props} />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol className="m-0 flex list-decimal flex-col gap-2.5 pl-[22px]" {...props} />
  ),
  strong: (props: ComponentPropsWithoutRef<"strong">) => (
    <strong className="font-semibold" {...props} />
  ),
  a: ({ href = "", ...props }: ComponentPropsWithoutRef<"a">) => (
    <SmartLink
      href={href}
      className="text-link underline decoration-1 underline-offset-2 transition-colors hover:text-ink"
      {...props}
    />
  ),
  code: (props: ComponentPropsWithoutRef<"code">) => (
    <code className="rounded-sm bg-surface px-1 font-mono text-[0.9em]" {...props} />
  ),
};
