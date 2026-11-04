import Image from "next/image";

import { HeroMetricsActions } from "@/components/sections/page-hero";
import { Breadcrumb, type BreadcrumbItem } from "@/components/ui/breadcrumb";
import type { MetricItem } from "@/components/ui/metric";
import { Section } from "@/components/ui/section";
import { Eyebrow, Heading } from "@/components/ui/typography";

type Cta = { label: string; href: string; arrow?: boolean };

/**
 * Hero with a framed photo (About, Careers). The photo must be a real photo of bX people or
 * offices (BUSINESS-RULES-V2 §7). Until one is supplied the hero renders text-only, at full
 * width, rather than an empty frame (BUILD-PLAN-V2: Image slots).
 */
export function PhotoHero({
  breadcrumb,
  eyebrow,
  title,
  intro,
  metrics,
  primary,
  secondary,
  photo,
  titleWidth = "max-w-[18ch]",
}: {
  breadcrumb: BreadcrumbItem[];
  eyebrow: string;
  title: string;
  intro: string;
  metrics?: MetricItem[];
  primary: Cta;
  secondary?: Cta;
  photo: { src: string; alt: string } | null;
  titleWidth?: string;
}) {
  return (
    <Section
      id="top"
      spacing="hero"
      aria-labelledby="page-title"
      containerClassName="flex flex-col gap-8"
    >
      <Breadcrumb items={breadcrumb} />
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,440px),1fr))] items-center gap-12">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-6">
            <Eyebrow>{eyebrow}</Eyebrow>
            <Heading id="page-title" as="h1" size="h1" className={titleWidth}>
              {title}
            </Heading>
            <p className="max-w-[58ch] text-body-lg text-muted">{intro}</p>
          </div>
          <div className="flex flex-col gap-6">
            <HeroMetricsActions metrics={metrics} primary={primary} secondary={secondary} />
          </div>
        </div>
        {photo && (
          <figure className="relative m-0 aspect-[4/3] overflow-hidden rounded-lg border border-hairline">
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              priority
              sizes="(min-width: 1000px) 576px, 100vw"
              className="object-cover"
            />
          </figure>
        )}
      </div>
    </Section>
  );
}
