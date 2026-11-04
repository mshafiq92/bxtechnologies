import { SmartLink } from "@/components/ui/smart-link";

export type InsightRow = {
  topic: string;
  title: string;
  text?: string;
  meta?: string;
  href: string;
};

/**
 * Insight list rows (Home, Insights): topic · title and summary · read time, one hairline
 * row each. Wraps to a single column on narrow screens.
 */
export function InsightRows({ rows }: { rows: InsightRow[] }) {
  return (
    <ul className="border-b border-hairline">
      {rows.map((row) => (
        <li key={row.title} className="border-t border-hairline">
          <SmartLink
            href={row.href}
            className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] items-baseline gap-x-8 gap-y-2 py-6 text-ink transition-colors hover:text-link"
          >
            <span className="eyebrow text-link">{row.topic}</span>
            <span className="col-span-2 flex min-w-0 flex-col gap-1.5 max-[519px]:col-span-1">
              <span className="text-h4">{row.title}</span>
              {row.text && <span className="text-body text-muted">{row.text}</span>}
            </span>
            {row.meta && <span className="justify-self-end text-small text-muted">{row.meta}</span>}
          </SmartLink>
        </li>
      ))}
    </ul>
  );
}
