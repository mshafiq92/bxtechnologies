import type { Metadata } from "next";

import { ContactBand } from "@/components/layout/contact-band";
import { NumberedGrid } from "@/components/sections/numbered-grid";
import { HeroMetricsActions, PageHero } from "@/components/sections/page-hero";
import { ChipList } from "@/components/ui/chip";
import { JumpBar } from "@/components/ui/jump-bar";
import { Section } from "@/components/ui/section";
import { TextLink } from "@/components/ui/text-link";
import { Eyebrow, Heading, SectionHeader } from "@/components/ui/typography";
import { getPage, getSectors } from "@/lib/content";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Industries",
  description:
    "Sectors where we have delivered: insurance, automotive, utilities, fintech, retail and logistics, education, construction and facilities. For startups, growing businesses and enterprise teams.",
  path: "/industries",
});

export default function IndustriesPage() {
  const page = getPage("industries");
  const [firstIntro, secondIntro] = page.hero.intro;

  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Industries" }]}
        eyebrow={page.hero.eyebrow}
        title={page.hero.title}
        intro={firstIntro ?? ""}
        aside={
          <div className="flex flex-col gap-6 border-t border-hairline pt-6">
            {secondIntro && <p className="text-body text-muted">{secondIntro}</p>}
            <HeroMetricsActions primary={page.hero.primaryCta} secondary={page.hero.secondaryCta} />
          </div>
        }
      />

      <JumpBar links={page.jumpLinks} showLabel={false} />

      {/* Who we work with --------------------------------------------------------- */}
      <Section
        id="clients"
        aria-labelledby="clients-title"
        containerClassName="flex flex-col gap-12"
      >
        <SectionHeader
          narrow
          eyebrow={page.clients.eyebrow}
          title={<span id="clients-title">{page.clients.title}</span>}
          intro={page.clients.intro}
        />
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3">
          {page.clients.items.map((client) => (
            <article key={client.kicker} className="flex flex-col gap-3 border-t border-ink pt-6">
              <Eyebrow as="span">{client.kicker}</Eyebrow>
              <Heading as="h3" size="h3">
                {client.title}
              </Heading>
              <p className="text-body text-muted">{client.text}</p>
              <ul className="mt-2">
                {client.items.map((item) => (
                  <li key={item} className="border-t border-hairline py-2.5 text-[15px] leading-6">
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>

      {/* Sectors ------------------------------------------------------------------- */}
      <Section
        id="sectors"
        tone="surface"
        aria-labelledby="sectors-title"
        containerClassName="flex flex-col gap-8"
      >
        <SectionHeader
          eyebrow={page.sectors.eyebrow}
          title={<span id="sectors-title">{page.sectors.title}</span>}
          // Design note addressed to bX; replace once figures are signed off.
          aside={page.sectors.note}
          asideSize="small"
        />
        <div className="border-b border-hairline">
          {getSectors().map((sector) => (
            <article
              key={sector.slug}
              className="grid grid-cols-1 items-start gap-x-10 gap-y-4 border-t border-hairline py-8 lg:grid-cols-[220px_minmax(0,1fr)_200px]"
            >
              <div className="flex flex-col gap-2">
                <Heading as="h3" size="h3">
                  {sector.name}
                </Heading>
                <span className="font-mono text-[13px] leading-[18px] font-medium tracking-[0.12em] text-muted uppercase">
                  {sector.region}
                </span>
              </div>
              <div className="flex flex-col gap-3.5">
                <p className="max-w-[64ch] text-body text-muted">{sector.body}</p>
                <ChipList items={sector.chips} fill="ground" />
              </div>
              <div className="flex flex-col gap-1">
                <span
                  data-metric=""
                  className="text-[36px] leading-[42px] font-semibold tracking-[-0.025em] text-ink"
                >
                  {sector.metric.value}
                </span>
                <span className="text-small text-muted">{sector.metric.label}</span>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* Constraints (navy) ---------------------------------------------------------- */}
      <Section
        id="constraints"
        tone="deep"
        aria-labelledby="constraints-title"
        containerClassName="flex flex-col gap-12"
      >
        <SectionHeader
          narrow
          tone="deep"
          eyebrow={page.constraints.eyebrow}
          title={<span id="constraints-title">{page.constraints.title}</span>}
          intro={page.constraints.intro}
        />
        <NumberedGrid items={page.constraints.items} tone="deep" />
      </Section>

      {/* Other sectors --------------------------------------------------------------- */}
      <Section id="other" aria-labelledby="other-title">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,400px),1fr))] items-start gap-x-14 gap-y-10">
          <div className="flex flex-col gap-4">
            <Eyebrow>{page.other.eyebrow}</Eyebrow>
            <Heading id="other-title" as="h2" size="h2">
              {page.other.title}
            </Heading>
            <p className="text-body text-muted">{page.other.intro}</p>
            <TextLink href={page.other.cta.href} className="self-start">
              {page.other.cta.label}
            </TextLink>
          </div>
          <ul className="flex flex-wrap content-start gap-2">
            {page.other.sectors.map((name) => (
              <li
                key={name}
                className="inline-flex min-h-10 items-center rounded-pill border border-hairline bg-surface px-4 text-[15px] font-medium whitespace-nowrap"
              >
                {name}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <ContactBand {...page.contactBand} />
    </>
  );
}
