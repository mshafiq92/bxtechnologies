import Link from "next/link";

import { cn } from "@/lib/cn";

import { SignatureRule } from "./signature-rule";

export type StackLayer = { title: string; tags: string[]; href: string };
export type StackSide = { title: string; items: string[]; href: string };

/* A delay per layer, so the highlight travels down the stack (animation length / layers). */
const signalDelay = ["", "[animation-delay:2s]", "[animation-delay:4s]", "[animation-delay:6s]"];

/**
 * Navy diagram of layers that sit on each other, joined by a line, with a band beside them that
 * touches every layer (below them on narrow screens). A cyan border travels down the layers; this
 * looping colour change is an owner-approved motion exception, like the logo strip. It stops under
 * reduced motion and with the hero slider's Pause button.
 */
export function StackCard({
  caption,
  layers,
  side,
  className,
}: {
  caption: string;
  layers: StackLayer[];
  side?: StackSide;
  className?: string;
}) {
  return (
    <figure
      data-tone="deep"
      className={cn("m-0 overflow-hidden rounded-lg bg-deep text-on-deep", className)}
    >
      <SignatureRule />
      <div className="flex flex-col gap-4 p-6">
        <figcaption className="eyebrow text-on-deep-accent">{caption}</figcaption>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-[minmax(0,1fr)_128px]">
          <ol className="flex flex-col">
            {layers.map((layer, i) => (
              <li key={layer.title} className="flex flex-col items-center">
                {i > 0 && <span aria-hidden="true" className="h-3 w-px bg-deep-border" />}
                <Link
                  href={layer.href}
                  className={cn(
                    "flex w-full animate-stack-signal flex-col gap-2 rounded-md border border-deep-border bg-deep-panel px-3.5 py-3 transition-colors group-data-[paused=true]/slider:[animation-play-state:paused] hover:border-brand-cyan",
                    signalDelay[i],
                  )}
                >
                  <span className="font-ui text-small font-medium">{layer.title}</span>
                  <span className="flex flex-wrap gap-1.5">
                    {layer.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-sm border border-deep-hairline px-1.5 font-mono text-[12px] leading-[18px] text-on-deep-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </span>
                </Link>
              </li>
            ))}
          </ol>
          {side && (
            <Link
              href={side.href}
              className="flex flex-col gap-3 rounded-md border border-dashed border-deep-border px-3 py-3 transition-colors hover:border-brand-cyan"
            >
              <span className="font-ui text-small font-medium text-on-deep-accent">
                {side.title}
              </span>
              <span className="flex flex-wrap gap-x-3 gap-y-2 md:flex-col">
                {side.items.map((item) => (
                  <span
                    key={item}
                    className="font-mono text-[12px] leading-[18px] text-on-deep-muted"
                  >
                    {item}
                  </span>
                ))}
              </span>
            </Link>
          )}
        </div>
      </div>
    </figure>
  );
}
