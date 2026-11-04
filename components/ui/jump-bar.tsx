import { cn } from "@/lib/cn";

export type JumpLink = { href: string; label: string };

/**
 * Jump bar: sticky directly under the header (top 73px), white with hairlines, 52px,
 * horizontally scrollable with a hidden scrollbar. Built from the page's section anchors
 * (it is derived, never stored). Its presence switches anchor offsets to 126px
 * (see `data-jump-bar` in styles/globals.css).
 */
export function JumpBar({
  links,
  label = "Jump to",
  showLabel = true,
  className,
}: {
  links: JumpLink[];
  label?: string;
  /** The visible "Jump to" label appears on Services and Service Detail only. */
  showLabel?: boolean;
  className?: string;
}) {
  return (
    <nav
      aria-label={label}
      data-jump-bar=""
      className={cn(
        "sticky top-(--jump-bar-top) z-20 border-y border-hairline bg-surface px-(--gutter)",
        className,
      )}
    >
      <div className="mx-auto flex min-h-(--jump-bar-height) max-w-content [scrollbar-width:none] items-center gap-x-2 gap-y-1 overflow-x-auto overflow-y-hidden [&::-webkit-scrollbar]:hidden">
        {showLabel && (
          <span
            aria-hidden="true"
            className="mr-2 flex-none font-mono text-[12px] leading-[18px] font-medium tracking-[0.14em] text-muted uppercase"
          >
            {label}
          </span>
        )}
        <ul className="flex flex-none items-center gap-x-2">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="inline-flex min-h-11 flex-none items-center rounded-md px-3 text-[15px] font-medium whitespace-nowrap text-ink transition-colors hover:bg-ground hover:text-link"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
