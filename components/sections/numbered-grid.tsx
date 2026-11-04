import { Heading } from "@/components/ui/typography";
import { cn } from "@/lib/cn";

export type NumberedGridItem = { number?: string; title: string; text: string };

const columns = {
  /** 1 column, 3 from 960px */
  3: "grid-cols-1 lg:grid-cols-3",
  /** 1 column, 2 from 660px, 4 from 1140px */
  4: "grid-cols-1 md:grid-cols-2 2xl:grid-cols-4",
} as const;

/**
 * Columns of open items under a rule: optional mono number, a heading and a paragraph.
 * Used by About (why us), Industries (constraints), Careers (life, hiring process) and
 * Contact (what happens next). `tone="deep"` for navy bands.
 */
export function NumberedGrid({
  items,
  cols = 4,
  titleSize = "h4",
  tone = "light",
  ordered = false,
  className,
}: {
  items: NumberedGridItem[];
  cols?: keyof typeof columns;
  titleSize?: "h3" | "h4";
  tone?: "light" | "deep";
  /** Render as an ordered list (steps). */
  ordered?: boolean;
  className?: string;
}) {
  const deep = tone === "deep";
  const List = ordered ? "ol" : "ul";
  return (
    <List className={cn("grid gap-x-6 gap-y-8", columns[cols], className)}>
      {items.map((item) => (
        <li
          key={item.title}
          className={cn(
            "flex flex-col gap-3 border-t pt-6",
            deep ? "border-deep-hairline" : "border-ink",
          )}
        >
          {item.number && (
            <span className={cn("eyebrow normal-case", deep ? "text-on-deep-accent" : "text-link")}>
              {item.number}
            </span>
          )}
          <Heading as="h3" size={titleSize} className={deep ? "text-on-deep" : undefined}>
            {item.title}
          </Heading>
          <p className={cn("text-body", deep ? "text-on-deep-muted" : "text-muted")}>{item.text}</p>
        </li>
      ))}
    </List>
  );
}
