import { ChipList } from "@/components/ui/chip";
import { ArrowRightIcon } from "@/components/ui/icons";
import { SmartLink } from "@/components/ui/smart-link";
import type { Service } from "@/lib/content";

/**
 * Services page row: title and subtitle · description and chips · arrow (no service number,
 * owner decision 2026-11-10). Three columns from 900px; below that the description drops under the title.
 * The whole row is one link (to the detail page, or the contact section).
 */
export function ServiceRow({ service, href }: { service: Service; href: string }) {
  return (
    <SmartLink
      href={href}
      className="grid grid-cols-[minmax(0,1fr)_24px] items-start gap-x-6 gap-y-2 border-t border-hairline py-6 text-ink transition-colors hover:bg-surface nav:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)_24px]"
    >
      <span className="flex flex-col gap-1">
        <span className="text-h4">{service.name}</span>
        <span className="text-body leading-6 text-muted">{service.subtitle}</span>
      </span>
      <span className="col-start-1 col-end-2 flex flex-col gap-3 nav:col-auto">
        <span className="text-[15px] leading-6 text-muted">{service.description}</span>
        <ChipList items={service.stack} />
      </span>
      <span
        aria-hidden="true"
        className="col-start-2 row-start-1 flex h-7 items-center justify-end text-link nav:col-start-3"
      >
        <ArrowRightIcon size={18} />
      </span>
    </SmartLink>
  );
}
