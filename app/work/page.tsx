import type { Metadata } from "next";

import { ContactBand } from "@/components/layout/contact-band";
import { HeroMetricsActions, PageHero } from "@/components/sections/page-hero";
import { ChipList } from "@/components/ui/chip";
import { JumpBar } from "@/components/ui/jump-bar";
import { Section } from "@/components/ui/section";
import { Eyebrow, Heading, SectionHeader } from "@/components/ui/typography";
import { getPage, getProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Projects we have delivered and still support, for clients in Europe and Asia. Client names are withheld under NDA; each project is described by sector, region, what we built and what it does now.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  const page = getPage("work");

  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Work" }]}
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

      <JumpBar links={page.jumpLinks} showLabel={false} />

      {/* All projects ------------------------------------------------------------ */}
      <Section
        id="projects"
        aria-labelledby="projects-title"
        containerClassName="flex flex-col gap-10"
      >
        <SectionHeader
          eyebrow={page.projects.eyebrow}
          title={<span id="projects-title">{page.projects.title}</span>}
          // Design note addressed to bX; replace once figures are signed off.
          aside={page.projects.note}
          asideSize="small"
        />
        <ul className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {getProjects().map((project) => (
            <li key={project.slug} className="flex">
              <article className="flex w-full flex-col gap-4 rounded-lg border border-hairline bg-surface p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <span className="font-mono text-[13px] leading-[18px] font-medium tracking-[0.12em] text-link uppercase">
                    {project.tag}
                  </span>
                  <span className="text-[13px] leading-5 text-muted">{project.sector}</span>
                </div>
                <Heading as="h3" size="h3">
                  {project.title}
                </Heading>
                <p className="text-body text-muted">{project.description}</p>
                <p className="mt-auto flex flex-wrap items-baseline gap-2.5 border-t border-hairline pt-4">
                  <span data-metric="" className="text-metric-inline text-ink">
                    {project.metric.value}
                  </span>
                  <span className="text-small text-muted">{project.metric.label}</span>
                </p>
                <ChipList items={project.stack} fill="ground" />
              </article>
            </li>
          ))}
        </ul>
      </Section>

      {/* After launch ------------------------------------------------------------ */}
      <Section
        id="support"
        tone="surface"
        aria-labelledby="support-title"
        className="border-b-0"
        containerClassName="flex flex-col gap-12"
      >
        <SectionHeader
          narrow
          eyebrow={page.support.eyebrow}
          title={<span id="support-title">{page.support.title}</span>}
          intro={page.support.intro}
        />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {page.support.items.map((item) => (
            <div key={item.number} className="flex flex-col gap-3 border-t border-ink pt-6">
              <Eyebrow as="span" className="normal-case">
                {item.number}
              </Eyebrow>
              <Heading as="h3" size="h4">
                {item.title}
              </Heading>
              <p className="text-body text-muted">{item.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <ContactBand {...page.contactBand} />
    </>
  );
}
