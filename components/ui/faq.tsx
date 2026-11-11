"use client";

import { useId, useState, type ReactNode } from "react";

import { cn } from "@/lib/cn";

import { MinusIcon, PlusIcon } from "./icons";

export type FaqItem = { q: string; a: ReactNode };

/**
 * FAQ accordion (Service Detail pages): first item open by default, one open at a time,
 * plus / minus indicator, `aria-expanded` on the button.
 */
export function Faq({
  items,
  defaultOpen = 0,
  className,
}: {
  items: FaqItem[];
  /** Index open on first render; null for all closed. */
  defaultOpen?: number | null;
  className?: string;
}) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const baseId = useId();

  return (
    <ul className={cn("min-w-0 border-b border-hairline", className)}>
      {items.map((item, i) => {
        const isOpen = open === i;
        const buttonId = `${baseId}-q${i}`;
        const panelId = `${baseId}-a${i}`;
        return (
          <li key={item.q} className="border-t border-hairline">
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex min-h-16 w-full items-center justify-between gap-6 py-4 text-left text-body-lg font-medium text-ink transition-colors hover:text-link"
              >
                {item.q}
                <span
                  aria-hidden="true"
                  className="grid w-6 flex-none place-items-center text-link"
                >
                  {isOpen ? <MinusIcon size={18} /> : <PlusIcon size={18} />}
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="max-w-[680px] pr-12 pb-6 text-body text-muted"
            >
              {item.a}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
