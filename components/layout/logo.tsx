import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/cn";

/*
 * Brand logo: the horizontal compact logo (C1) everywhere on the site, in colour on light
 * backgrounds and with white text on navy (docs/brand/BX-Logo-Guide.pdf). The name is part of the
 * artwork, so no text sits beside it. The SVGs have their text outlined, so they render the same
 * on every device. Minimum 40px tall; the header bar (84px desktop, 72px phones) leaves 12-14px clear space.
 */
const SOURCES = {
  light: "/brand/bx-logo-horizontal-compact.svg",
  deep: "/brand/bx-logo-horizontal-compact-white.svg",
} as const;

/** Both files share one viewBox (1316 x 470), so a height fixes the width. */
const SIZES = {
  // 44px tall on phones, 60px from the desktop navigation breakpoint.
  header: { width: 168, height: 60, className: "h-11 nav:h-15" },
  // Deliberately smaller than the header: 40px on phones, 48px from 640px.
  footer: { width: 134, height: 48, className: "h-10 sm:h-12" },
} as const;

export function Logo({
  tone = "light",
  placement = "header",
  priority = false,
  onClick,
  className,
}: {
  /** light: colour logo for white backgrounds. deep: white text for navy. */
  tone?: "light" | "deep";
  placement?: "header" | "footer";
  priority?: boolean;
  onClick?: () => void;
  className?: string;
}) {
  const size = SIZES[placement];
  return (
    <Link href="/" onClick={onClick} className={cn("flex flex-none items-center", className)}>
      <Image
        src={SOURCES[tone]}
        alt="BX Technologies home"
        width={size.width}
        height={size.height}
        priority={priority}
        unoptimized
        className={cn("block w-auto", size.className)}
      />
    </Link>
  );
}
