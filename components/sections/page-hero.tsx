import type { ReactNode } from "react";

import { Breadcrumb, type BreadcrumbItem } from "@/components/ui/breadcrumb";
import { ButtonLink } from "@/components/ui/button";
import { HeroGridBackdrop } from "@/components/ui/hero-grid-backdrop";
import { MetricInlineList, type MetricItem } from "@/components/ui/metric";
import { Section } from "@/components/ui/section";
import { Eyebrow, Heading } from "@/components/ui/typography";
import { cn } from "@/lib/cn";

/** `arrow: false` drops the trailing arrow (Careers "Send a speculative CV"). */
type Cta = { label: string; href: string; arrow?: boolean };

/**
 * Inner-page hero with the grid backdrop (Services, Industries, Work, Insights):
 * breadcrumb, then two columns (stacking under ~950px) aligned to the bottom:
 * eyebrow, H1 and intro on the left; metrics and buttons (or a form) on the right.
 */
export function PageHero({
  breadcrumb,
  eyebrow,
  title,
  intro,
  aside,
  backdrop = true,
  titleWidth = "max-w-[18ch]",
  titleId = "page-title",
  className,
}: {
  breadcrumb: BreadcrumbItem[];
  eyebrow: string;
  title: string;
  /** One paragraph, or several. */
  intro: string | string[];
  aside?: ReactNode;
  backdrop?: boolean;
  /** Heading width limit; Work widens it so its heading fits on one line. */
  titleWidth?: string;
  titleId?: string;
  className?: string;
}) {
  const paragraphs = Array.isArray(intro) ? intro : [intro];
  return (
    <Section
      id="top"
      spacing="hero"
      aria-labelledby={titleId}
      className={cn("relative isolate overflow-hidden", className)}
      containerClassName="flex flex-col gap-8"
    >
      {backdrop && <HeroGridBackdrop />}
      <Breadcrumb items={breadcrumb} />
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,440px),1fr))] items-end gap-12">
        <div className="flex flex-col gap-6">
          <Eyebrow>{eyebrow}</Eyebrow>
          <Heading id={titleId} as="h1" size="h1" className={titleWidth}>
            {title}
          </Heading>
          {paragraphs.map((p) => (
            <p key={p} className="max-w-[58ch] text-body-lg text-muted">
              {p}
            </p>
          ))}
        </div>
        {aside && <div className="flex flex-col gap-6">{aside}</div>}
      </div>
    </Section>
  );
}

/** The usual hero aside: inline metrics above a hairline, then a primary and secondary button. */
export function HeroMetricsActions({
  metrics,
  primary,
  secondary,
}: {
  metrics?: MetricItem[];
  primary: Cta;
  secondary?: Cta;
}) {
  return (
    <>
      {metrics && metrics.length > 0 && (
        <MetricInlineList items={metrics} className="border-t border-hairline pt-6" />
      )}
      <div className="flex flex-wrap gap-3">
        <ButtonLink href={primary.href}>{primary.label}</ButtonLink>
        {secondary && (
          <ButtonLink
            href={secondary.href}
            variant="secondary"
            arrow={secondary.arrow ?? true}
            className="hover:bg-surface"
          >
            {secondary.label}
          </ButtonLink>
        )}
      </div>
    </>
  );
}
