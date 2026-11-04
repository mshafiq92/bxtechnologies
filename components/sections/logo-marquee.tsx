import Image from "next/image";

import { Eyebrow } from "@/components/ui/typography";
import type { ClientLogo } from "@/lib/content";

const LOGO_HEIGHT = 28;

/**
 * Clients & partners strip (README: Interactions, the one motion exception).
 * Scrolls continuously (40s linear loop over a duplicated list), pauses on hover, and stops
 * under reduced motion (global rule in styles/globals.css). Logos rest in greyscale at 55%
 * and cross-fade to full colour on hover. Renders nothing when no logo is cleared.
 */
export function LogoMarquee({ label, logos }: { label: string; logos: ClientLogo[] }) {
  if (logos.length === 0) return null;
  const track = [...logos, ...logos];

  return (
    <div className="flex flex-wrap items-center gap-x-12 gap-y-5">
      <Eyebrow as="h2" tone="muted" className="flex-none">
        {label}
      </Eyebrow>
      <div className="group/marquee min-w-0 flex-[1_1_420px] overflow-hidden mask-(--marquee-mask)">
        <ul className="flex w-max animate-marquee items-center gap-16 group-hover/marquee:[animation-play-state:paused]">
          {track.map((logo, i) => {
            const duplicate = i >= logos.length;
            const width = Math.round((logo.width / logo.height) * LOGO_HEIGHT);
            return (
              <li
                key={`${logo.name}-${i}`}
                aria-hidden={duplicate || undefined}
                className="group/logo relative h-7 flex-none"
              >
                <Image
                  src={logo.monoSrc}
                  alt={duplicate ? "" : logo.name}
                  width={width}
                  height={LOGO_HEIGHT}
                  unoptimized
                  className="block h-7 w-auto opacity-(--logo-rest-opacity) brightness-0 transition-opacity group-hover/logo:opacity-0"
                />
                <Image
                  src={logo.src}
                  alt=""
                  aria-hidden="true"
                  width={width}
                  height={LOGO_HEIGHT}
                  unoptimized
                  className="absolute inset-0 block h-7 w-auto opacity-0 transition-opacity group-hover/logo:opacity-100"
                />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
