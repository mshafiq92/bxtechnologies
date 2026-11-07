import type { Metadata } from "next";

import { ContactBand } from "@/components/layout/contact-band";
import { LogoMarquee } from "@/components/sections/logo-marquee";
import { NumberedGrid } from "@/components/sections/numbered-grid";
import { PhotoHero } from "@/components/sections/photo-hero";
import { Avatar } from "@/components/ui/avatar";
import { ChipList } from "@/components/ui/chip";
import { DiagramCard } from "@/components/ui/diagram-card";
import { JumpBar } from "@/components/ui/jump-bar";
import { Section } from "@/components/ui/section";
import { TextLink } from "@/components/ui/text-link";
import { Eyebrow, Heading, SectionHeader } from "@/components/ui/typography";
import { getClientLogos, getOffices, getPage } from "@/lib/content";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "BX Technologies builds custom software, cloud platforms and AI for startups, growing businesses and enterprises. 50+ clients and 80+ projects delivered since 2019. Engineers first: the people who scope your work write it.",
  path: "/about",
});

export default function AboutPage() {
  const page = getPage("about");
  const offices = getOffices();
  const logos = getClientLogos();
  // People stay hidden until real names arrive; their jump link comes back with them.
  const hasPeople = page.people.members.length > 0;
  const jumpLinks = hasPeople
    ? [
        ...page.jumpLinks.slice(0, 3),
        { href: "#people", label: "People" },
        ...page.jumpLinks.slice(3),
      ]
    : page.jumpLinks;

  return (
    <>
      <PhotoHero
        breadcrumb={[{ label: "Home", href: "/" }, { label: "About" }]}
        eyebrow={page.hero.eyebrow}
        title={page.hero.title}
        intro={page.hero.intro}
        metrics={page.hero.metrics}
        primary={page.hero.primaryCta}
        secondary={page.hero.secondaryCta}
        photo={page.hero.photo}
        visual={<DiagramCard diagram={page.hero.glance} layout="flow" />}
        backdrop
        titleWidth="max-w-[20ch]"
      />

      <JumpBar links={jumpLinks} showLabel={false} />

      {/* Why us ------------------------------------------------------------------ */}
      <Section id="why" aria-labelledby="why-title" containerClassName="flex flex-col gap-12">
        <SectionHeader
          narrow
          eyebrow={page.why.eyebrow}
          title={<span id="why-title">{page.why.title}</span>}
          intro={page.why.intro}
        />
        <NumberedGrid items={page.why.items} cols={3} titleSize="h3" />
      </Section>

      {/* Mission and vision (from the old site), with the careers invitation ------- */}
      <Section
        id="mission"
        tone="surface"
        aria-labelledby="mission-title"
        containerClassName="flex flex-col gap-12"
      >
        <SectionHeader
          narrow
          eyebrow={page.mission.eyebrow}
          title={<span id="mission-title">{page.mission.title}</span>}
        />
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 lg:grid-cols-3">
          {page.mission.items.map((item) => (
            <article key={item.title} className="flex flex-col gap-4 border-t border-ink pt-6">
              <Heading as="h3" size="h3">
                {item.title}
              </Heading>
              <p className="text-body-lg text-muted">{item.text}</p>
              {item.link && (
                <TextLink href={item.link.href} className="mt-auto self-start">
                  {item.link.label}
                </TextLink>
              )}
            </article>
          ))}
        </div>
      </Section>

      {/* How we work (navy) ------------------------------------------------------- */}
      <Section
        id="principles"
        tone="deep"
        aria-labelledby="principles-title"
        containerClassName="flex flex-col gap-10"
      >
        <SectionHeader
          narrow
          tone="deep"
          eyebrow={page.principles.eyebrow}
          title={<span id="principles-title">{page.principles.title}</span>}
        />
        <ol className="border-b border-deep-hairline">
          {page.principles.items.map((item) => (
            <li
              key={item.number}
              className="grid grid-cols-[48px_minmax(0,1fr)] gap-x-6 gap-y-2 border-t border-deep-hairline py-7 nav:grid-cols-[48px_minmax(0,0.9fr)_minmax(0,1.4fr)]"
            >
              <span className="eyebrow leading-7 text-on-deep-accent normal-case">
                {item.number}
              </span>
              <Heading as="h3" size="h4" className="text-on-deep">
                {item.title}
              </Heading>
              <p className="col-start-2 text-body text-on-deep-muted nav:col-start-auto">
                {item.text}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Clients (same strip as Home; hidden when no logo is cleared) ---------------- */}
      {logos.length > 0 && (
        <Section id="clients" spacing="strip" aria-label={page.clients.label}>
          <LogoMarquee label={page.clients.label} logos={logos} />
        </Section>
      )}

      {/* People (hidden until real names arrive) ------------------------------------ */}
      {hasPeople && (
        <Section
          id="people"
          aria-labelledby="people-title"
          containerClassName="flex flex-col gap-10"
        >
          <SectionHeader
            eyebrow={page.people.eyebrow}
            title={<span id="people-title">{page.people.title}</span>}
            aside={page.people.intro || undefined}
            asideSize="small"
          />
          <ul className="flex flex-wrap gap-4">
            {page.people.members.map((person) => (
              <li
                key={person.role}
                className="flex flex-[1_1_200px] flex-col gap-4 rounded-lg border border-hairline bg-surface p-6"
              >
                <Avatar name={person.name} initials={person.initials} size={56} />
                <div className="flex flex-col gap-1">
                  <span className="text-[18px] leading-[26px] font-semibold">{person.name}</span>
                  <span className="font-mono text-[13px] leading-[18px] font-medium tracking-[0.1em] text-link uppercase">
                    {person.role}
                  </span>
                </div>
                <p className="text-small text-muted">{person.text}</p>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* Story --------------------------------------------------------------------- */}
      <Section
        id="story"
        tone="surface"
        aria-labelledby="story-title"
        containerClassName="flex flex-col gap-12"
      >
        <SectionHeader
          narrow
          eyebrow={page.story.eyebrow}
          title={<span id="story-title">{page.story.title}</span>}
          intro={page.story.intro}
        />
        <ol className="grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
          {page.story.entries.map((entry) => (
            <li key={entry.year} className="flex flex-col gap-3 border-t border-ink pt-6">
              <span className="text-metric-inline text-link">{entry.year}</span>
              <Heading as="h3" size="h4">
                {entry.title}
              </Heading>
              <p className="text-body text-muted">{entry.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Offices ------------------------------------------------------------------- */}
      <Section
        id="offices"
        aria-labelledby="offices-title"
        containerClassName="flex flex-col gap-10"
      >
        <div className="flex flex-col gap-4">
          <Eyebrow>{page.offices.eyebrow}</Eyebrow>
          <Heading id="offices-title" as="h2" size="h2">
            {page.offices.title}
          </Heading>
        </div>
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3">
          {offices.map((office) => (
            <div key={office.city} className="flex flex-col gap-3 border-t border-ink pt-6">
              <Eyebrow as="span">{office.kind}</Eyebrow>
              <Heading as="h3" size="h3">
                {office.city}, {office.country}
              </Heading>
              <p className="text-body text-muted">{office.body}</p>
              <ChipList items={office.chips} />
            </div>
          ))}
          <div className="flex flex-col gap-3 border-t border-ink pt-6">
            <Eyebrow as="span">{page.offices.registrations.kind}</Eyebrow>
            <Heading as="h3" size="h3">
              {page.offices.registrations.title}
            </Heading>
            <p className="text-body text-muted">{page.offices.registrations.text}</p>
            <TextLink href={page.offices.registrations.link.href} className="self-start">
              {page.offices.registrations.link.label}
            </TextLink>
          </div>
        </div>
      </Section>

      <ContactBand {...page.contactBand} />
    </>
  );
}
