import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/cn";

/**
 * bX mark + "Technologies" in Inter 500 18px (README: Assets).
 * The mark is a raster crop of the v1 logo until a vector arrives (OPEN-DECISIONS #8).
 */
export function Logo({
  tone = "light",
  priority = false,
  onClick,
  className,
}: {
  tone?: "light" | "deep";
  priority?: boolean;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <Link
      href="/"
      aria-label="bX Technologies home"
      onClick={onClick}
      className={cn(
        "flex flex-none items-center gap-2.5",
        tone === "light" ? "text-ink" : "text-on-deep",
        className,
      )}
    >
      <Image
        src="/brand/bx-mark.png"
        alt=""
        width={39}
        height={32}
        priority={priority}
        className="block"
        style={{ height: 32, width: "auto" }}
      />
      <span className="text-[18px] font-medium tracking-[-0.01em]">Technologies</span>
    </Link>
  );
}
