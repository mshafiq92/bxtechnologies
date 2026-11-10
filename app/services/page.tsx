import type { Metadata } from "next";

import { ContactBand } from "@/components/layout/contact-band";
import { EngagementModels } from "@/components/sections/engagement-models";
import { HeroMetricsActions, PageHero } from "@/components/sections/page-hero";
import { ServiceRow } from "@/components/sections/service-row";
import { JumpBar } from "@/components/ui/jump-bar";
import { Section } from "@/components/ui/section";
import { Eyebrow, Heading, SectionHeader } from "@/components/ui/typography";
import {
  getEngagementModels,
  getPage,
  getServiceGroups,
  getServices,
  getStackGroups,
} from "@/lib/content";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Services",
  description:
    "One delivery team across AI and autonomy, data and analytics, cloud and DevOps, managed IT, product and quality, and teams and advisory. Built by the engineers who maintain the systems they plug into.",
  path: "/services",
});

export default function ServicesPage() {
  const page = getPage("services");
  const engagement = getEngagementModels("full");

  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Services" }]}
        eyebrow={page.hero.eyebrow}
        title={page.hero.title}
        intro={page.hero.intro}
        aside={
          <HeroMetricsActions
            metrics={page.hero.metrics}
            primary={page.hero.primaryCta}
            secondary={page.hero.secondaryCta}
          />
        }
      />

      <JumpBar links={page.jumpLinks} />

      {/* Capability groups ------------------------------------------------------ */}
      {getServiceGroups().map((group) => (
        <Section
          key={group.key}
          id={group.key}
          spacing="top"
          aria-labelledby={`${group.key}-title`}
          containerClassName="flex flex-col gap-8"
        >
          <div className="flex max-w-[720px] flex-col gap-3">
            <Eyebrow as="span" className="normal-case">
              {group.number}
            </Eyebrow>
            <Heading id={`${group.key}-title`} as="h2" size="h2">
              {group.name}
            </Heading>
            <p className="text-body-lg text-muted">{group.intro}</p>
          </div>
          <div className="border-b border-hairline">
            {getServices(group.key).map((service) => (
              <ServiceRow
                key={service.slug}
                service={service}
                // Design: services without a detail page link to the contact band.
                href={service.detail ? `/services/${service.slug}` : "#contact"}
              />
            ))}
          </div>
        </Section>
      ))}

      {/* Stack ------------------------------------------------------------------ */}
      <Section id="stack" aria-labelledby="stack-title" containerClassName="flex flex-col gap-10">
        <SectionHeader
          eyebrow={page.stack.eyebrow}
          title={<span id="stack-title">{page.stack.title}</span>}
          aside={page.stack.note}
        />
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-2 2xl:grid-cols-4">
          {getStackGroups().map((group) => (
            <div key={group.title} className="flex flex-col gap-4 border-t border-ink pt-5">
              <Heading as="h3" size="h4">
                {group.title}
              </Heading>
              <ul>
                {group.items.map((item) => (
                  <li key={item} className="border-t border-hairline py-2 font-mono text-small">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* Engagement models ------------------------------------------------------ */}
      <Section
        id="engagement"
        tone="surface"
        aria-label={engagement.intro.eyebrow}
        className="border-b-0"
      >
        <EngagementModels intro={engagement.intro} models={engagement.models} tone="surface" />
      </Section>

      <ContactBand {...page.contactBand} />
    </>
  );
}
