import type { Metadata } from "next";

import { EngagementModels } from "@/components/sections/engagement-models";
import { HomeContactForm } from "@/components/sections/home-contact-form";
import { InsightRows } from "@/components/sections/insight-rows";
import { LogoMarquee } from "@/components/sections/logo-marquee";
import { ButtonLink } from "@/components/ui/button";
import { CardLink } from "@/components/ui/card";
import { ChipList, Tag } from "@/components/ui/chip";
import { DiagramCard } from "@/components/ui/diagram-card";
import { MetricInlineList, MetricsStrip } from "@/components/ui/metric";
import { Section } from "@/components/ui/section";
import { SmartLink } from "@/components/ui/smart-link";
import { StatusDot } from "@/components/ui/status";
import { TextLink } from "@/components/ui/text-link";
import { Timeline } from "@/components/ui/timeline";
import { Eyebrow, Heading, SectionHeader } from "@/components/ui/typography";
import {
  getClientLogos,
  getEngagementModels,
  getHomeProjects,
  getPage,
  getServiceGroups,
  getServices,
  getSiteSettings,
  serviceHref,
} from "@/lib/content";
import { JsonLd } from "@/lib/seo/json-ld";
import { pageMetadata } from "@/lib/seo/metadata";
import { organizationLd } from "@/lib/seo/structured-data";

export const metadata: Metadata = pageMetadata({
  title: "BX Technologies | AI-first engineering partner",
  description:
    "We put AI agents into production software that already works. Custom software, web, mobile, cloud and agentic AI, designed, built and operated by one engineering team.",
  path: "/",
  absoluteTitle: true,
});

export default function HomePage() {
  const page = getPage("home");
  const site = getSiteSettings();
  const engagement = getEngagementModels("home");

  return (
    <>
      <JsonLd data={organizationLd()} />
      {/* 1. Hero ---------------------------------------------------------------- */}
      <Section
        id="top"
        spacing="hero"
        aria-labelledby="home-title"
        containerClassName="flex flex-col gap-12"
      >
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-start gap-12">
          <div className="flex flex-col gap-6">
            <Eyebrow>{page.hero.eyebrow}</Eyebrow>
            <Heading id="home-title" size="display" className="max-w-[16ch]">
              {page.hero.title}
            </Heading>
            <p className="max-w-[56ch] text-body-lg text-muted">{page.hero.intro}</p>
            <ul className="flex flex-wrap gap-2" aria-label="Focus areas">
              {page.hero.tags.map((tag) => (
                <li key={tag}>
                  <Tag>{tag}</Tag>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3 pt-2">
              <ButtonLink href={page.hero.primaryCta.href}>{page.hero.primaryCta.label}</ButtonLink>
              <ButtonLink href={page.hero.secondaryCta.href} variant="secondary" arrow>
                {page.hero.secondaryCta.label}
              </ButtonLink>
            </div>
            <MetricInlineList
              items={page.hero.metrics}
              className="mt-2 border-t border-hairline pt-6"
            />
          </div>
          <DiagramCard diagram={page.hero.diagram} layout="flow" />
        </div>
        <div className="flex flex-wrap justify-between gap-x-8 gap-y-2 border-t border-hairline pt-6 text-small text-muted">
          <span>{page.hero.footnote}</span>
          <span>{site.registrationsShort}</span>
        </div>
      </Section>

      {/* 2. Clients & partners (hidden when no logo is cleared) ------------------- */}
      {getClientLogos().length > 0 && (
        <Section tone="surface" spacing="strip" aria-label={page.clients.label}>
          <LogoMarquee label={page.clients.label} logos={getClientLogos()} />
        </Section>
      )}

      {/* 3. Services ------------------------------------------------------------ */}
      <Section
        id="capabilities"
        aria-labelledby="capabilities-title"
        containerClassName="flex flex-col gap-12"
      >
        <SectionHeader
          eyebrow={page.services.eyebrow}
          title={<span id="capabilities-title">{page.services.title}</span>}
          aside={page.services.aside}
        />
        <div className="grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-2 2xl:grid-cols-4">
          {getServiceGroups().map((group) => (
            <article key={group.key} className="flex flex-col gap-4 border-t border-ink pt-6">
              <Eyebrow as="span" className="normal-case">
                {group.number}
              </Eyebrow>
              <Heading as="h3" size="h3">
                {group.name}
              </Heading>
              <ul>
                {getServices(group.key).map((service) => (
                  <li key={service.slug} className="border-t border-hairline">
                    <SmartLink
                      href={serviceHref(service)}
                      className="flex flex-col gap-1 py-3.5 text-ink transition-colors hover:text-link"
                    >
                      <span className="text-body leading-6 font-semibold">{service.name}</span>
                      <span className="text-small text-muted">{service.summary}</span>
                    </SmartLink>
                  </li>
                ))}
              </ul>
              <StatusDot className="mt-auto border-t border-hairline pt-3.5 text-small text-muted">
                {group.production}
              </StatusDot>
            </article>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <TextLink href={page.services.allLink.href}>{page.services.allLink.label}</TextLink>
          <span className="text-small text-muted">{page.services.footnote}</span>
        </div>
      </Section>

      {/* 4. Selected work --------------------------------------------------------- */}
      <Section
        id="work"
        tone="surface"
        aria-labelledby="work-title"
        containerClassName="flex flex-col gap-12"
      >
        <SectionHeader
          eyebrow={page.work.eyebrow}
          title={<span id="work-title">{page.work.title}</span>}
          action={
            <ButtonLink
              href={page.work.allLink.href}
              variant="secondary"
              arrow
              className="hover:bg-ground"
            >
              {page.work.allLink.label}
            </ButtonLink>
          }
        />
        <ul className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {getHomeProjects().map((project) => (
            <li key={project.slug} className="flex">
              <CardLink href="/work" fill="ground" className="w-full">
                <span className="flex flex-wrap items-baseline justify-between gap-2">
                  <span className="font-mono text-[12px] leading-[18px] font-medium tracking-[0.12em] text-link uppercase">
                    {project.tag}
                  </span>
                  <span className="text-[13px] leading-5 text-muted">{project.home.sector}</span>
                </span>
                <span data-metric="" className="text-metric text-ink">
                  {project.metric.value}
                </span>
                <span className="text-body">{project.home.text}</span>
                <ChipList items={project.stack} className="mt-auto border-t border-hairline pt-4" />
              </CardLink>
            </li>
          ))}
        </ul>
      </Section>

      {/* 5. Delivered (proof strip) -------------------------------------------- */}
      <Section
        spacing="band"
        aria-label={page.delivered.label}
        className="border-b border-hairline"
      >
        <MetricsStrip
          label={page.delivered.label}
          sublabel={page.delivered.sublabel}
          items={page.delivered.metrics}
        />
      </Section>

      {/* 6. How we work ---------------------------------------------------------- */}
      <Section
        id="process"
        tone="deep"
        aria-labelledby="process-title"
        containerClassName="flex flex-col gap-12"
      >
        <SectionHeader
          tone="deep"
          eyebrow={page.process.eyebrow}
          title={<span id="process-title">{page.process.title}</span>}
          aside={page.process.aside}
        />
        <Timeline steps={page.process.steps} />
      </Section>

      {/* 7. Engagement models ---------------------------------------------------- */}
      <Section id="engagement" aria-label={engagement.intro.eyebrow}>
        <EngagementModels intro={engagement.intro} models={engagement.models} />
      </Section>

      {/* 8. Industries ------------------------------------------------------------ */}
      <Section
        id="industries"
        spacing="flush"
        aria-labelledby="industries-title"
        containerClassName="flex flex-col gap-8"
      >
        <SectionHeader
          eyebrow={page.industries.eyebrow}
          title={<span id="industries-title">{page.industries.title}</span>}
          action={
            <TextLink href={page.industries.allLink.href}>{page.industries.allLink.label}</TextLink>
          }
        />
        <ul className="flex flex-wrap gap-4">
          {page.industries.tiles.map((tile) => (
            <li key={tile.title} className="flex flex-[1_1_200px]">
              <SmartLink
                href="/industries#sectors"
                className="flex w-full flex-col gap-1.5 rounded-lg border border-hairline bg-surface p-5 text-ink transition-colors hover:border-strong"
              >
                <span className="text-[18px] leading-[26px] font-semibold tracking-[-0.01em]">
                  {tile.title}
                </span>
                <span className="text-small text-muted">{tile.text}</span>
              </SmartLink>
            </li>
          ))}
        </ul>
      </Section>

      {/* 9. Insights -------------------------------------------------------------- */}
      <Section
        id="insights"
        tone="surface"
        aria-labelledby="insights-title"
        containerClassName="flex flex-col gap-8"
      >
        <SectionHeader
          eyebrow={page.insights.eyebrow}
          title={<span id="insights-title">{page.insights.title}</span>}
          action={
            <TextLink href={page.insights.allLink.href}>{page.insights.allLink.label}</TextLink>
          }
        />
        {/* These three titles are not on the Insights page yet (docs/01 G9), so they link there. */}
        <InsightRows
          rows={page.insights.rows.map((row) => ({
            topic: row.topic,
            title: row.title,
            text: row.text,
            meta: `${row.readMinutes} min read`,
            href: page.insights.allLink.href,
          }))}
        />
      </Section>

      {/* 10. Contact -------------------------------------------------------------- */}
      <Section id="contact" aria-labelledby="contact-title">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,400px),1fr))] items-start gap-12">
          <div className="flex flex-col gap-4">
            <Eyebrow>{page.contact.eyebrow}</Eyebrow>
            <h2
              id="contact-title"
              className="max-w-[20ch] text-[clamp(28px,3.4vw,40px)] leading-[1.15] font-semibold tracking-[-0.025em]"
            >
              {page.contact.title}
            </h2>
            <p className="max-w-[48ch] text-body-lg text-muted">{page.contact.text}</p>
            <div className="flex flex-col gap-1.5 pt-2 text-body">
              <SmartLink
                href={`mailto:${site.email}`}
                className="self-start font-medium text-link transition-colors hover:text-ink"
              >
                {site.email}
              </SmartLink>
              <span className="text-muted">{page.contact.location}</span>
            </div>
          </div>
          <HomeContactForm copy={page.contact.form} />
        </div>
      </Section>
    </>
  );
}
