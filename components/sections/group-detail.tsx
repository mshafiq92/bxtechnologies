import { ContactBand } from "@/components/layout/contact-band";
import { ArchitectureDiagram } from "@/components/sections/architecture-diagram";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChipList } from "@/components/ui/chip";
import { DiagramCard } from "@/components/ui/diagram-card";
import { Faq } from "@/components/ui/faq";
import { HeroGridBackdrop } from "@/components/ui/hero-grid-backdrop";
import { JumpBar } from "@/components/ui/jump-bar";
import { Section } from "@/components/ui/section";
import { Eyebrow, Heading, SectionHeader } from "@/components/ui/typography";
import { getProjects, getServiceGroup, getServices, type GroupPage } from "@/lib/content";
import { JsonLd } from "@/lib/seo/json-ld";
import { groupLd } from "@/lib/seo/structured-data";

/**
 * Service group page (/services/<slug>): hero, then one block per service in the group (the
 * drill-down, each with its own anchor so menu links land on it), architecture, engagement,
 * where it fits, related projects, questions and the contact band.
 */
export function GroupDetail({ page }: { page: GroupPage }) {
  const group = getServiceGroup(page.group);
  const services = getServices(page.group);
  const projects = getProjects().filter((p) => page.projects?.slugs.includes(p.slug));
  const name = group?.name ?? page.eyebrow;

  const jumpLinks = [
    { href: "#deliver", label: page.deliver.title },
    ...(page.architecture ? [{ href: "#architecture", label: "Architecture" }] : []),
    { href: "#delivery", label: page.engagement.jumpLabel },
    { href: "#fit", label: "Where it fits" },
    ...(projects.length > 0 ? [{ href: "#projects", label: "Projects" }] : []),
    { href: "#faq", label: "Questions" },
  ];

  return (
    <>
      <JsonLd data={groupLd(page, name)} />

      {/* 1. Hero ---------------------------------------------------------------- */}
      <Section
        id="top"
        spacing="hero"
        aria-labelledby="page-title"
        className="relative isolate overflow-hidden"
        containerClassName="flex flex-col gap-8"
      >
        <HeroGridBackdrop />
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: name },
          ]}
        />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,440px),1fr))] items-center gap-12">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-6">
              <Eyebrow>{page.eyebrow}</Eyebrow>
              <Heading id="page-title" as="h1" size="h1">
                {page.title}
              </Heading>
              <p className="max-w-[62ch] text-body-lg text-muted">{page.intro}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="#contact">{page.primaryCta}</ButtonLink>
              <ButtonLink href="#deliver" variant="secondary" arrow>
                {page.deliver.title}
              </ButtonLink>
            </div>
          </div>
          <DiagramCard diagram={page.heroDiagram} layout="stack" />
        </div>
      </Section>

      <JumpBar links={jumpLinks} />

      {/* 2. What we deliver: one block per service --------------------------------- */}
      <Section
        id="deliver"
        aria-labelledby="deliver-title"
        containerClassName="flex flex-col gap-10"
      >
        <SectionHeader
          narrow
          eyebrow={name}
          title={<span id="deliver-title">{page.deliver.title}</span>}
          intro={page.deliver.intro}
        />
        <div className="border-b border-hairline">
          {services.map((service) => (
            <article
              key={service.slug}
              id={service.slug}
              aria-labelledby={`${service.slug}-title`}
              className="grid grid-cols-1 gap-x-12 gap-y-5 border-t border-hairline py-9 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"
            >
              <div className="flex flex-col gap-3">
                <Heading id={`${service.slug}-title`} as="h3" size="h3">
                  {service.name}
                </Heading>
                <p className="text-body text-muted">{service.subtitle}</p>
              </div>
              <div className="flex flex-col gap-5">
                <p className="text-body text-muted">{service.description}</p>
                {service.includes && service.includes.length > 0 && (
                  <div className="flex flex-col gap-3">
                    <span className="text-small font-semibold text-ink">What&apos;s included</span>
                    <ul className="grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2">
                      {service.includes.map((item) => (
                        <li key={item} className="flex items-baseline gap-3 text-[15px] leading-6">
                          <span
                            aria-hidden="true"
                            className="size-1.5 flex-none translate-y-[-2px] rounded-full bg-brand-cyan"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <ChipList items={service.stack} fill="ground" />
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* 3. Architecture ----------------------------------------------------------- */}
      {page.architecture && (
        <Section
          id="architecture"
          tone="surface"
          aria-labelledby="architecture-title"
          containerClassName="flex flex-col gap-12"
        >
          <SectionHeader
            narrow
            eyebrow="Architecture"
            title={<span id="architecture-title">{page.architecture.title}</span>}
            intro={page.architecture.intro}
          />
          <ArchitectureDiagram architecture={page.architecture} />
          <p className="max-w-[72ch] text-body text-muted">{page.architecture.note}</p>
        </Section>
      )}

      {/* 4. Engagement (navy) ------------------------------------------------------- */}
      <Section
        id="delivery"
        tone="deep"
        aria-labelledby="delivery-title"
        containerClassName="flex flex-col gap-12"
      >
        <div className="flex max-w-[680px] flex-col gap-4">
          <Eyebrow>{page.engagement.eyebrow}</Eyebrow>
          <Heading id="delivery-title" as="h2" size="h2" className="text-on-deep">
            {page.engagement.title}
          </Heading>
          <p className="text-body text-on-deep-muted">{page.engagement.intro}</p>
        </div>
        <ol className="grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-2 2xl:grid-cols-4">
          {page.engagement.steps.map((step) => (
            <li key={step.label} className="flex flex-col gap-3 border-t border-deep-hairline pt-6">
              <span className="eyebrow text-on-deep-accent normal-case">{step.label}</span>
              <Heading as="h3" size="h4" className="text-on-deep">
                {step.title}
              </Heading>
              <p className="text-[15px] leading-6 text-on-deep-muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* 5. Where it fits ----------------------------------------------------------- */}
      <Section id="fit" aria-labelledby="fit-title" containerClassName="flex flex-col gap-10">
        <SectionHeader
          narrow
          eyebrow="Where it fits"
          title={<span id="fit-title">{page.fit.title}</span>}
          intro={page.fit.intro}
        />
        <ul className="grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-2 xl:grid-cols-3">
          {page.fit.items.map((item) => (
            <li key={item.title} className="flex">
              <Card gap="sm" className="w-full">
                <Eyebrow as="span">{item.sector}</Eyebrow>
                <Heading as="h3" size="h4">
                  {item.title}
                </Heading>
                <p className="text-[15px] leading-6 text-muted">{item.text}</p>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      {/* 6. Related projects -------------------------------------------------------- */}
      {page.projects && projects.length > 0 && (
        <Section
          id="projects"
          tone="surface"
          aria-labelledby="projects-title"
          containerClassName="flex flex-col gap-10"
        >
          <SectionHeader
            eyebrow="Projects"
            title={<span id="projects-title">{page.projects.title}</span>}
            action={
              <ButtonLink href="/work" variant="secondary" arrow className="hover:bg-ground">
                All projects
              </ButtonLink>
            }
          />
          <ul className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {projects.map((project) => (
              <li key={project.slug} className="flex">
                <article className="flex w-full flex-col gap-4 rounded-lg border border-hairline bg-ground p-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <span className="font-mono text-[13px] leading-[18px] font-medium tracking-[0.12em] text-link uppercase">
                      {project.tag}
                    </span>
                    <span className="text-[13px] leading-5 text-muted">{project.sector}</span>
                  </div>
                  <Heading as="h3" size="h4">
                    {project.title}
                  </Heading>
                  <p className="text-body text-muted">{project.result}</p>
                  <ChipList items={project.stack} className="mt-auto" />
                </article>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* 7. Questions --------------------------------------------------------------- */}
      <Section id="faq" aria-labelledby="faq-title">
        <div className="flex flex-wrap items-start gap-x-12 gap-y-8">
          <div className="flex flex-[1_1_280px] flex-col gap-4">
            <Eyebrow>Questions</Eyebrow>
            <Heading id="faq-title" as="h2" size="h2">
              {page.faq.title}
            </Heading>
            <p className="text-body text-muted">{page.faq.intro}</p>
          </div>
          <Faq items={page.faq.items} className="flex-[2_1_520px]" />
        </div>
      </Section>

      <ContactBand {...page.contactBand} />
    </>
  );
}
