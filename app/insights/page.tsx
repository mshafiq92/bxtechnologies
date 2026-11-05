import type { Metadata } from "next";
import { Suspense } from "react";

import { ContactBand } from "@/components/layout/contact-band";
import {
  InsightsList,
  InsightsListFromUrl,
  type InsightListItem,
} from "@/components/sections/insights-list";
import { PageHero } from "@/components/sections/page-hero";
import { SubscribeForm } from "@/components/sections/subscribe-form";
import { ArrowRightIcon } from "@/components/ui/icons";
import { Section } from "@/components/ui/section";
import { SmartLink } from "@/components/ui/smart-link";
import { SectionHeader } from "@/components/ui/typography";
import {
  getFeaturedInsight,
  getInsightCategories,
  getInsights,
  getPage,
  insightTopic,
  insightsListSummaryLimit,
} from "@/lib/content";
import { formatDate, formatReadTime } from "@/lib/format";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Insights",
  description:
    "Notes from the work, not from the trend cycle. Written by the engineers on our projects about AI engineering, data and cloud, product and working with us.",
  path: "/insights",
});

export default function InsightsPage() {
  const page = getPage("insights");
  const featured = getFeaturedInsight();

  // "All writing" lists everything except the featured piece. In the design only the first
  // few rows carry a summary and read time; later ones are title-only.
  const items: InsightListItem[] = getInsights()
    .filter((i) => i.slug !== featured?.slug)
    .map((insight, index) => {
      const detailed = index < insightsListSummaryLimit;
      return {
        slug: insight.slug,
        category: insight.category,
        topic: insightTopic(insight),
        date: formatDate(insight.date),
        title: insight.title,
        summary: detailed ? insight.summary : undefined,
        readTime: detailed ? formatReadTime(insight.readMinutes) : undefined,
        href: insight.hasBody ? `/insights/${insight.slug}` : null,
      };
    });

  const listProps = { items, categories: getInsightCategories(), copy: page.all };

  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Insights" }]}
        eyebrow={page.hero.eyebrow}
        title={page.hero.title}
        intro={page.hero.intro}
        aside={<SubscribeForm copy={page.subscribe} />}
      />

      {/* Featured article ---------------------------------------------------------- */}
      {featured && (
        <Section id="featured" spacing="flush" aria-label={page.featured.label}>
          <SmartLink
            href={`/insights/${featured.slug}`}
            className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] gap-x-14 gap-y-6 rounded-xl border border-hairline bg-surface p-[clamp(24px,4vw,48px)] text-ink transition-colors hover:border-strong"
          >
            <span className="flex flex-col gap-4">
              <span className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                <span className="eyebrow text-link">
                  {page.featured.label} · {insightTopic(featured)}
                </span>
                <span className="text-small text-muted">
                  {formatDate(featured.date)} · {formatReadTime(featured.readMinutes)}
                </span>
              </span>
              <h2 className="text-h2">{featured.title}</h2>
            </span>
            <span className="flex flex-col gap-4">
              <span className="text-body-lg text-muted">{featured.summary}</span>
              <span className="inline-flex min-h-11 items-center gap-2 font-semibold text-link">
                {page.featured.cta} <ArrowRightIcon size={16} />
              </span>
            </span>
          </SmartLink>
        </Section>
      )}

      {/* All writing --------------------------------------------------------------- */}
      <Section
        id="all"
        spacing="flush"
        aria-labelledby="all-title"
        containerClassName="flex flex-col gap-8"
      >
        <SectionHeader
          eyebrow={page.all.eyebrow}
          title={<span id="all-title">{page.all.title}</span>}
          // Design note addressed to bX; replace once real drafts arrive.
          aside={page.all.note}
          asideSize="small"
        />
        {/* The URL topic is read in the browser; the static HTML shows every article. */}
        <Suspense fallback={<InsightsList {...listProps} />}>
          <InsightsListFromUrl {...listProps} />
        </Suspense>
      </Section>

      <ContactBand {...page.contactBand} />
    </>
  );
}
