import type { Metadata } from "next";

import { ContactBand } from "@/components/layout/contact-band";
import { legalComponents } from "@/components/prose/legal-components";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Section } from "@/components/ui/section";
import { SmartLink } from "@/components/ui/smart-link";
import { Eyebrow, Heading } from "@/components/ui/typography";
import { getLegalBody, getLegalPage, getSiteSettings, type LegalSlug } from "@/lib/content";
import { formatDate } from "@/lib/format";
import { pageMetadata } from "@/lib/seo/metadata";

export function legalMetadata(slug: LegalSlug): Metadata {
  const page = getLegalPage(slug);
  return pageMetadata({ title: page.title, description: page.intro, path: `/${slug}` });
}

const tocLink =
  "flex min-h-10 items-center text-[15px] leading-[22px] text-ink transition-colors hover:text-link";

/**
 * Privacy, Terms and Cookies share one layout: title block with the last-updated row, then a
 * white band with a sticky "On this page" nav beside the legal prose, then a legal contact band.
 */
export async function LegalPage({ slug }: { slug: LegalSlug }) {
  const page = getLegalPage(slug);
  const site = getSiteSettings();
  const { default: Body } = await getLegalBody(slug)();

  return (
    <>
      <Section
        id="top"
        spacing="title"
        aria-labelledby="page-title"
        containerClassName="flex flex-col gap-7"
      >
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: page.title }]} />
        <div className="flex max-w-[760px] flex-col gap-5">
          <Eyebrow>{page.eyebrow}</Eyebrow>
          <Heading id="page-title" as="h1" size="h1">
            {page.title}
          </Heading>
          <p className="text-body-lg text-muted">{page.intro}</p>
        </div>
        <dl className="flex flex-wrap gap-x-10 gap-y-3 border-t border-hairline pt-5 text-small">
          <div className="flex gap-2">
            <dt className="text-muted">{page.labels.lastUpdated}</dt>
            <dd className="font-medium">
              <time dateTime={page.lastUpdated}>{formatDate(page.lastUpdated)}</time>
            </dd>
          </div>
          <div className="flex gap-2">
            <dt className="text-muted">{page.labels.appliesTo}</dt>
            <dd className="font-medium">{page.appliesTo}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="text-muted">{page.labels.questions}</dt>
            <dd className="font-medium">
              <SmartLink
                href={`mailto:${site.email}`}
                className="text-link transition-colors hover:text-ink"
              >
                {site.email}
              </SmartLink>
            </dd>
          </div>
        </dl>
      </Section>

      <Section
        id="policy"
        tone="surface"
        className="border-b-0 pt-[clamp(48px,6vw,72px)] pb-(--section)"
        spacing="none"
      >
        <div className="grid grid-cols-1 gap-12 xl:grid-cols-[240px_minmax(0,760px)] xl:justify-between">
          <aside>
            <nav
              aria-label={page.onThisPage}
              className="flex flex-col border-t border-ink pt-4 xl:sticky xl:top-(--sticky-aside-top)"
            >
              <Eyebrow as="span" tone="muted" className="mb-2" aria-hidden="true">
                {page.onThisPage}
              </Eyebrow>
              {page.toc.map((item) => (
                <a key={item.id} href={`#${item.id}`} className={tocLink}>
                  {item.label}
                </a>
              ))}
              {page.related.map((link) => (
                <SmartLink key={link.href} href={link.href} className={tocLink}>
                  {link.label}
                </SmartLink>
              ))}
            </nav>
          </aside>
          <article className="flex flex-col gap-[18px] text-legal">
            <Body components={legalComponents} />
          </article>
        </div>
      </Section>

      <ContactBand {...page.contactBand} />
    </>
  );
}
