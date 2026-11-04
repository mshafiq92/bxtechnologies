"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

import { SmartLink } from "@/components/ui/smart-link";
import { cn } from "@/lib/cn";

export type InsightListItem = {
  slug: string;
  category: string;
  topic: string;
  date: string;
  title: string;
  summary?: string;
  readTime?: string;
  /** Null when the article has no written body yet: the row is shown without a link. */
  href: string | null;
};

type Copy = { allFilter: string; empty: string };

type Props = {
  items: InsightListItem[];
  categories: { slug: string; name: string }[];
  copy: Copy;
};

/** Reads the starting topic from ?topic= (needs a Suspense boundary on a static page). */
export function InsightsListFromUrl(props: Props) {
  const fromUrl = useSearchParams().get("topic");
  const initialTopic = props.categories.some((c) => c.slug === fromUrl) ? fromUrl : null;
  return <InsightsList {...props} initialTopic={initialTopic} />;
}

/**
 * "All writing": topic filter pills over the article list, filtered on the client.
 * The selected topic is kept in the URL (?topic=slug) so a filtered view can be shared.
 * Pills are toggle buttons (aria-pressed): they filter one list rather than switch panels.
 */
export function InsightsList({
  items,
  categories,
  copy,
  initialTopic = null,
}: Props & { initialTopic?: string | null }) {
  const [topic, setTopic] = useState<string | null>(initialTopic);

  const select = (slug: string | null) => {
    setTopic(slug);
    const url = new URL(window.location.href);
    if (slug) url.searchParams.set("topic", slug);
    else url.searchParams.delete("topic");
    window.history.replaceState(null, "", url);
  };

  const visible = topic ? items.filter((i) => i.category === topic) : items;
  const filters = [{ slug: null, name: copy.allFilter }, ...categories];

  return (
    <>
      <div role="group" aria-label="Filter by topic" className="flex flex-wrap gap-2">
        {filters.map((f) => {
          const on = f.slug === topic;
          return (
            <button
              key={f.name}
              type="button"
              aria-pressed={on}
              onClick={() => select(f.slug)}
              className={cn(
                "inline-flex min-h-11 items-center gap-2 rounded-pill border bg-surface px-4 text-small font-medium whitespace-nowrap transition-colors hover:border-strong hover:text-ink",
                on ? "border-link text-ink" : "border-hairline text-muted",
              )}
            >
              {on && <span aria-hidden="true" className="size-2 rounded-pill bg-brand-cyan" />}
              {f.name}
            </button>
          );
        })}
      </div>

      {visible.length > 0 ? (
        <ul className="border-b border-hairline" aria-live="polite">
          {visible.map((item) => {
            const content = (
              <>
                <span className="flex flex-col gap-0.5">
                  <span className="eyebrow text-link">{item.topic}</span>
                  <span className="text-small text-muted">{item.date}</span>
                </span>
                <span className="flex min-w-0 flex-col gap-1.5">
                  <span className="text-h4">{item.title}</span>
                  {item.summary && (
                    <span className="max-w-[68ch] text-body text-muted">{item.summary}</span>
                  )}
                </span>
                <span className="text-small text-muted">{item.readTime}</span>
              </>
            );
            const row =
              "grid grid-cols-1 gap-x-8 gap-y-1.5 py-6 text-ink min-[860px]:grid-cols-[200px_minmax(0,1fr)_120px] min-[860px]:items-baseline";
            return (
              <li key={item.slug} className="border-t border-hairline">
                {item.href ? (
                  <SmartLink
                    href={item.href}
                    className={cn(row, "transition-colors hover:text-link")}
                  >
                    {content}
                  </SmartLink>
                ) : (
                  <div className={row}>{content}</div>
                )}
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-body text-muted" role="status">
          {copy.empty}
        </p>
      )}
    </>
  );
}
