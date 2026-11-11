import type { Metadata } from "next";

import { ContactBand } from "@/components/layout/contact-band";
import { PageHero } from "@/components/sections/page-hero";
import { ChipList } from "@/components/ui/chip";
import { Section } from "@/components/ui/section";
import { Eyebrow, Heading, SectionHeader } from "@/components/ui/typography";
import { getPage, getProjects } from "@/lib/content";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Work",
  description:
    "AI, software, data and cloud systems we designed, built and still support. Client names stay under NDA; each project is shown by its sector and what it does today.",
  path: "/work",
});

export default function WorkPage() {
  const page = getPage("work");
  const projects = getProjects();

  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Work" }]}
        eyebrow={page.hero.eyebrow}
        title={page.hero.title}
        intro={page.hero.intro}
        titleWidth="max-w-[32ch]"
      />

      {/* All projects ------------------------------------------------------------ */}
      <Section
        id="projects"
        aria-labelledby="projects-title"
        // Less space under the hero than between ordinary sections.
        className="pt-[clamp(40px,5vw,56px)]"
        containerClassName="flex flex-col gap-10"
      >
        <SectionHeader
          eyebrow={page.projects.eyebrow}
          title={<span id="projects-title">{page.projects.title}</span>}
        />
        <ul className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {projects.map((project) => (
            <li key={project.slug} className="flex">
              <article className="flex w-full flex-col gap-4 rounded-lg border border-hairline bg-surface p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <span className="font-mono text-[13px] leading-[18px] font-medium tracking-[0.12em] text-link uppercase">
                    {project.tag}
                  </span>
                  <span className="text-[13px] leading-5 text-muted">{project.sector}</span>
                </div>
                <Heading as="h3" size="h4">
                  {project.title}
                </Heading>
                <p className="text-body text-muted">{project.description}</p>
                <p className="mt-auto border-t border-hairline pt-4 text-body text-muted">
                  {project.result}
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
