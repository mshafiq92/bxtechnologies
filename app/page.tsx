import type { Metadata } from "next";
import type { ReactNode } from "react";

import { EngagementModels } from "@/components/sections/engagement-models";
import { HeroSlider } from "@/components/sections/hero-slider";
import { HomeContactForm } from "@/components/sections/home-contact-form";
import { InsightRows } from "@/components/sections/insight-rows";
import { LogoMarquee } from "@/components/sections/logo-marquee";
import { ButtonLink } from "@/components/ui/button";
import { CardLink } from "@/components/ui/card";
import { ChipList, Tag } from "@/components/ui/chip";
import { DiagramCard } from "@/components/ui/diagram-card";
import { MetricsStrip } from "@/components/ui/metric";
import { Section } from "@/components/ui/section";
import { SmartLink } from "@/components/ui/smart-link";
import { StackCard } from "@/components/ui/stack-card";
import { TextLink } from "@/components/ui/text-link";
import { Timeline } from "@/components/ui/timeline";
import { Eyebrow, Heading, SectionHeader } from "@/components/ui/typography";
import {
  getClientLogos,
  getEngagementModels,
  getHomeProjects,
  getInsights,
  getPage,
  getSectors,
  getServiceGroups,
  getServices,
  insightTopic,
} from "@/lib/content";
import { formatReadTime } from "@/lib/format";
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

type HeroCopy = {
  eyebrow: string;
  intro: string;
  tags: string[];
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
};

/** One banner of the Home hero slider: copy and buttons, with a panel beside them. */
function HeroSlide({ copy, title, panel }: { copy: HeroCopy; title: ReactNode; panel: ReactNode }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-start gap-12">
      <div className="flex flex-col gap-6">
        <Eyebrow>{copy.eyebrow}</Eyebrow>
        {title}
        <p className="max-w-[56ch] text-body-lg text-muted">{copy.intro}</p>
        <ul className="flex flex-wrap gap-2" aria-label="Focus areas">
          {copy.tags.map((tag) => (
            <li key={tag}>
              <Tag>{tag}</Tag>
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-3 pt-2">
          <ButtonLink href={copy.primaryCta.href}>{copy.primaryCta.label}</ButtonLink>
          <ButtonLink href={copy.secondaryCta.href} variant="secondary" arrow>
            {copy.secondaryCta.label}
          </ButtonLink>
        </div>
      </div>
      {panel}
    </div>
  );
}

export default function HomePage() {
  const page = getPage("home");
  const engagement = getEngagementModels("home");
  const productGroup = getServiceGroups().find((group) => group.key === "product");

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
        <HeroSlider
          label={page.hero.slider.label}
          pauseLabel={page.hero.slider.pause}
          playLabel={page.hero.slider.play}
          slides={[
            {
              label: page.hero.slider.firstSlide,
              content: (
                <HeroSlide
                  copy={page.hero}
                  // The main heading of the page; the other slide uses a secondary one.
                  title={
                    <Heading id="home-title" size="display" className="max-w-[16ch]">
                      {page.hero.title}
                    </Heading>
                  }
                  panel={<DiagramCard diagram={page.hero.diagram} layout="flow" />}
                />
              ),
            },
            {
              label: page.hero.allServices.label,
              content: (
                <HeroSlide
                  copy={page.hero.allServices}
                  title={
                    <Heading as="h2" size="display" className="max-w-[16ch]">
                      {page.hero.allServices.title}
                    </Heading>
                  }
                  panel={
                    <StackCard
                      caption={page.hero.allServices.caption}
                      layers={getServiceGroups().flatMap((group) => {
                        const tags = page.hero.allServices.layers[group.key];
                        return tags
                          ? [{ title: group.name, tags, href: `/services#${group.key}` }]
                          : [];
                      })}
                      side={
                        productGroup && {
                          title: productGroup.name,
                          items: page.hero.allServices.side,
                          href: `/services#${productGroup.key}`,
                        }
                      }
                    />
                  }
                />
              ),
            },
          ]}
        />
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
        <div className="grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-2 2xl:grid-cols-3">
          {getServiceGroups().map((group) => (
            <article key={group.key} className="flex flex-col gap-4 border-t border-ink pt-6">
              <Eyebrow as="span" className="normal-case">
                {group.number}
              </Eyebrow>
              <Heading as="h3" size="h3">
                {group.name}
              </Heading>
              <p className="text-body text-muted">{group.intro}</p>
              <ul>
                {getServices(group.key).map((service) => (
                  <li
                    key={service.slug}
                    className="border-t border-hairline py-3 text-body leading-6 font-semibold text-ink"
                  >
                    {service.name}
                  </li>
                ))}
              </ul>
              {/* Pinned to the bottom so the links align across a row. */}
              <TextLink href={`/services#${group.key}`} className="mt-auto self-start">
                <span>
                  Explore <span className="sr-only">{group.name}</span>
                </span>
              </TextLink>
            </article>
          ))}
        </div>
        <div className="flex justify-end">
          <ButtonLink
            href={page.services.allLink.href}
            variant="secondary"
            arrow
            className="w-full md:w-auto"
          >
            {page.services.allLink.label}
          </ButtonLink>
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
                  <span className="text-[13px] leading-5 text-muted">{project.sector}</span>
                </span>
                <span className="text-h3 font-semibold text-ink">{project.title}</span>
                <span className="text-body text-muted">{project.result}</span>
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
        <MetricsStrip label={page.delivered.label} items={page.delivered.metrics} />
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
            <ButtonLink href={page.industries.allLink.href} variant="secondary" arrow>
              {page.industries.allLink.label}
            </ButtonLink>
          }
        />
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {getSectors()
            .flatMap((sector) => {
              const text = page.industries.tileLines[sector.slug];
              return text ? [{ title: sector.name, text }] : [];
            })
            .map((tile) => (
              <li key={tile.title} className="flex">
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
            <ButtonLink
              href={page.insights.allLink.href}
              variant="secondary"
              arrow
              className="hover:bg-ground"
            >
              {page.insights.allLink.label}
            </ButtonLink>
          }
        />
        {/* The latest articles; written ones link to themselves, the rest to the Insights page. */}
        <InsightRows
          rows={getInsights()
            .slice(0, 3)
            .map((insight) => ({
              topic: insightTopic(insight),
              title: insight.title,
              // The featured article has a long summary; its shorter standfirst keeps the rows even.
              text: insight.standfirst ?? insight.summary,
              meta: formatReadTime(insight.readMinutes),
              href: insight.hasBody ? `/insights/${insight.slug}` : page.insights.allLink.href,
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
          </div>
          <HomeContactForm copy={page.contact.form} />
        </div>
      </Section>
    </>
  );
}
