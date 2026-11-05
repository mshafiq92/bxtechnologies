import type { MDXComponents } from "mdx/types";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { SmartLink } from "@/components/ui/smart-link";
import { cn } from "@/lib/cn";
import { getImprint, getSiteSettings } from "@/lib/content";
import { showInternalNotes } from "@/lib/site";

/*
 * Components available inside legal MDX (content/legal/*.mdx), styled to the legal page
 * design: prose 17/28, H2 28/36, definition lists as two-column rows, data tables with a
 * mono header, and light-blue note boxes. Headings carry the ids used by "On this page".
 */

const proseLink =
  "text-link underline decoration-hairline underline-offset-[3px] transition-colors hover:decoration-current";

function H2({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <h2
      id={id}
      className="mt-7 scroll-mt-24 text-[28px] leading-9 font-semibold tracking-[-0.02em]"
    >
      {children}
    </h2>
  );
}

function H3({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <h3 id={id} className="mt-2 scroll-mt-24 text-h4">
      {children}
    </h3>
  );
}

/**
 * Note box ("Short version", "Needs your lawyer"). `internal` notes are messages to bX and are
 * hidden on the live site (shown in development and on noindex previews).
 */
function Note({
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
        "flex flex-col gap-2 rounded-lg border bg-ground p-6 [&_p]:text-body [&_p]:text-muted",
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

/** Two-column definition rows (Controller, Data enquiries...). */
function Facts({ children }: { children: ReactNode }) {
  return (
    <dl className="m-0 grid grid-cols-[minmax(120px,180px)_minmax(0,1fr)] border-t border-hairline">
      {children}
    </dl>
  );
}

function Fact({ term, children }: { term: string; children: ReactNode }) {
  const cell = "m-0 border-b border-hairline py-3 text-[15px] leading-6";
  return (
    <>
      <dt className={cn(cell, "font-medium text-muted")}>{term}</dt>
      <dd className={cn(cell, "[&_p]:m-0")}>{children}</dd>
    </>
  );
}

/** Show "to be supplied" placeholders for missing imprint details (never on the live site). */
const showPending = () => showInternalNotes;

/**
 * Imprint provider details from content/site.ts. Missing (`null`) values render as a warning on
 * dev and noindex previews and are left out on the live site.
 */
function ImprintDetails() {
  const site = getSiteSettings();
  const i = getImprint();
  const rows: [string, ReactNode | null][] = [
    ["Company", site.legalName],
    ["Legal form", i.legalForm],
    ["Registered office", i.registeredOffice],
    ["Office in Germany", i.germanOffice],
    ["Represented by", i.representedBy],
    ["Register", i.register],
    ["Registration number", i.registrationNumber],
    ["VAT ID", i.vatId],
    [
      "Contact",
      <>
        <SmartLink href={`mailto:${site.email}`} className={proseLink}>
          {site.email}
        </SmartLink>
        {" · "}
        <SmartLink href={site.phone.href} className={proseLink}>
          {site.phone.display}
        </SmartLink>
      </>,
    ],
  ];
  return (
    <Facts>
      {rows.map(([term, value]) =>
        value ? (
          <Fact key={term} term={term}>
            {value}
          </Fact>
        ) : showPending() ? (
          <Fact key={term} term={term}>
            <span className="font-medium text-warning">To be supplied</span>
          </Fact>
        ) : null,
      )}
    </Facts>
  );
}

/** Person responsible for content (§ 18 (2) MStV), or a placeholder on previews. */
function ContentResponsible() {
  const value = getImprint().contentResponsible;
  if (value) return <p>{value}</p>;
  return showPending() ? <p className="font-medium text-warning">To be supplied</p> : null;
}

/** Data table (cookie lists). `codeColumn` renders that column in mono. */
function DataTable({
  label,
  columns,
  rows,
  codeColumn,
}: {
  /** Names the scroll region; must be unique on the page (axe: landmark-unique). */
  label: string;
  columns: string[];
  rows: string[][];
  codeColumn?: number;
}) {
  return (
    // A horizontally scrollable region must be focusable so keyboard users can scroll it
    // (axe: scrollable-region-focusable); it is labelled as a region for that reason.
    // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
    <div className="overflow-x-auto" role="region" aria-label={label} tabIndex={0}>
      <table className="w-full border-collapse text-[15px] leading-6">
        <thead>
          <tr>
            {columns.map((c) => (
              <th
                key={c}
                scope="col"
                className="border-b border-ink py-2.5 pr-4 text-left font-mono text-[13px] font-medium tracking-[0.1em] whitespace-nowrap text-muted uppercase"
              >
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.join("|")}>
              {row.map((cell, i) => (
                <td key={i} className="border-b border-hairline py-3 pr-4 align-top">
                  {i === codeColumn ? <code className="font-mono text-[14px]">{cell}</code> : cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export const legalComponents: MDXComponents = {
  H2,
  H3,
  Note,
  Facts,
  Fact,
  DataTable,
  ImprintDetails,
  ContentResponsible,
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
    <SmartLink href={href} className={proseLink} {...props} />
  ),
  code: (props: ComponentPropsWithoutRef<"code">) => (
    <code className="font-mono text-[14px]" {...props} />
  ),
};
