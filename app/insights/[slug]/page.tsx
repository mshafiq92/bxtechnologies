import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ContactBand } from "@/components/layout/contact-band";
import { articleComponents } from "@/components/prose/article-components";
import { Avatar } from "@/components/ui/avatar";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ButtonLink } from "@/components/ui/button";
import { LinkedInIcon, MailIcon, XIcon } from "@/components/ui/icons";
import { Section } from "@/components/ui/section";
import { SmartLink } from "@/components/ui/smart-link";
import { TextLink } from "@/components/ui/text-link";
import { Eyebrow, Heading, SectionHeader } from "@/components/ui/typography";
import {
  getArticleRelatedService,
  getArticleToc,
  getAuthor,
  getInsight,
  getInsightBody,
  getKeepReading,
  getPage,
  getPublishedInsights,
  insightTopic,
} from "@/lib/content";
import { formatDate, formatReadTime } from "@/lib/format";
import { JsonLd } from "@/lib/seo/json-ld";
import { pageMetadata } from "@/lib/seo/metadata";
import { articleLd } from "@/lib/seo/structured-data";
import { siteUrl } from "@/lib/site";

type Params = { slug: string };

/** One page per article with a written body; everything else is a 404. */
export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return getPublishedInsights().map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const insight = getInsight(slug);
  if (!insight?.hasBody) return {};
  const author = getAuthor(insight.author);
  return pageMetadata({
    title: insight.title,
    description: insight.standfirst ?? insight.summary ?? insight.title,
    path: `/insights/${slug}`,
    article: {
      publishedTime: insight.date,
      authors: author ? [author.name] : undefined,
      section: insightTopic(insight),
    },
  });
}

const shareButton =
  "grid size-11 place-items-center rounded-md border border-strong text-ink transition-colors hover:border-link hover:text-link";

export default async function ArticlePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const insight = getInsight(slug);
  const loadBody = getInsightBody(slug);
  if (!insight?.hasBody || !loadBody) notFound();

  const { default: Body } = await loadBody();
  const page = getPage("article");
  const author = getAuthor(insight.author);
  const toc = getArticleToc(slug);
  const related = getArticleRelatedService(slug);
  const keepReading = getKeepReading(slug);
  const meta = [formatDate(insight.date), formatReadTime(insight.readMinutes)]
    .filter(Boolean)
    .join(" · ");

  const url = `${siteUrl}/insights/${slug}`;
  const share = [
    {
      label: "Share on LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      Icon: LinkedInIcon,
    },
    {
      label: "Share on X",
      href: `https://x.com/intent/post?url=${encodeURIComponent(url)}&text=${encodeURIComponent(insight.title)}`,
      Icon: XIcon,
    },
    {
      label: "Share by email",
      href: `mailto:?subject=${encodeURIComponent(insight.title)}&body=${encodeURIComponent(url)}`,
      Icon: MailIcon,
    },
  ];

  return (
    <>
      <JsonLd data={articleLd(insight, author)} />
      {/* Title block ------------------------------------------------------------- */}
      <Section
        id="top"
        spacing="title"
        aria-labelledby="page-title"
        containerClassName="flex flex-col gap-7"
      >
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Insights", href: "/insights" },
            { label: insight.shortTitle ?? insight.title },
          ]}
        />
        <div className="flex max-w-[820px] flex-col gap-6">
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
            <Eyebrow as="span">{insightTopic(insight)}</Eyebrow>
            <span className="text-small text-muted">{meta}</span>
          </div>
          <Heading id="page-title" as="h1" size="h1">
            {insight.title}
          </Heading>
          {insight.standfirst && (
            <p className="max-w-[62ch] text-body-lg text-muted">{insight.standfirst}</p>
          )}
          {author && (
            <div className="flex items-center gap-3 border-t border-hairline pt-5">
              <Avatar name={author.name} size={44} />
              <span className="flex flex-col">
                <span className="text-body leading-6 font-semibold">{author.name}</span>
                <span className="text-small text-muted">{author.role}</span>
              </span>
            </div>
          )}
        </div>
      </Section>

      {/* Article and aside ------------------------------------------------------- */}
      <Section id="article" spacing="flush" aria-label="Article">
        <div className="grid grid-cols-1 gap-12 xl:grid-cols-[minmax(0,720px)_240px] xl:justify-between">
          <article className="flex flex-col gap-5 text-prose">
            <Body components={articleComponents} />
          </article>
          <aside className="flex flex-col gap-8">
            <div className="flex flex-col gap-8 xl:sticky xl:top-(--sticky-aside-top)">
              {toc.length > 0 && (
                <nav
                  aria-label={page.onThisPage}
                  className="flex flex-col gap-1 border-t border-ink pt-4"
                >
                  <Eyebrow as="span" tone="muted" className="mb-2" aria-hidden="true">
                    {page.onThisPage}
                  </Eyebrow>
                  {toc.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className="flex min-h-11 items-center text-[15px] leading-[22px] text-ink transition-colors hover:text-link"
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
              )}
              <div className="flex flex-col gap-3 border-t border-hairline pt-4">
                <Eyebrow as="span" tone="muted">
                  {page.share}
                </Eyebrow>
                <ul className="flex gap-2">
                  {share.map(({ label, href, Icon }) => (
                    <li key={label}>
                      <SmartLink href={href} aria-label={label} className={shareButton}>
                        <Icon size={16} />
                      </SmartLink>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </Section>

      {/* Related service ---------------------------------------------------------- */}
      {related && (
        <Section id="cta" spacing="flush" aria-labelledby="cta-title">
          <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-6 rounded-xl border border-hairline bg-surface p-[clamp(24px,4vw,40px)]">
            <div className="flex max-w-[640px] flex-col gap-3">
              <Eyebrow>{page.relatedService.eyebrow}</Eyebrow>
              <h2
                id="cta-title"
                className="text-[clamp(24px,2.6vw,30px)] leading-[1.2] font-semibold tracking-[-0.02em]"
              >
                {related.title}
              </h2>
              <p className="text-body text-muted">{related.text}</p>
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <ButtonLink
                href={related.cta.href}
                variant="secondary"
                arrow
                className="hover:bg-ground"
              >
                {related.cta.label}
              </ButtonLink>
              <SmartLink
                href={page.relatedService.moreLink.href}
                className="inline-flex min-h-11 items-center font-semibold text-link transition-colors hover:text-ink"
              >
                {page.relatedService.moreLink.label}
              </SmartLink>
            </div>
          </div>
        </Section>
      )}

      {/* Keep reading ------------------------------------------------------------- */}
      {keepReading.length > 0 && (
        <Section
          id="more"
          tone="surface"
          aria-labelledby="more-title"
          className="border-b-0"
          containerClassName="flex flex-col gap-10"
        >
          <SectionHeader
            eyebrow={page.keepReading.eyebrow}
            title={<span id="more-title">{page.keepReading.title}</span>}
            action={
              <TextLink href={page.keepReading.allLink.href}>
                {page.keepReading.allLink.label}
              </TextLink>
            }
          />
          <ul className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {keepReading.map((item) => {
              const content = (
                <>
                  <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="eyebrow text-link">{insightTopic(item)}</span>
                    <span className="text-small text-muted">{formatDate(item.date)}</span>
                  </span>
                  <span className="text-h4">{item.title}</span>
                  {item.summary && <span className="text-body text-muted">{item.summary}</span>}
                </>
              );
              const box = "flex w-full flex-col gap-2.5 border-t border-ink pt-6 text-ink";
              return (
                <li key={item.slug} className="flex">
                  {/* Only articles with a written body link anywhere (no broken links). */}
                  {item.hasBody ? (
                    <SmartLink
                      href={`/insights/${item.slug}`}
                      className={`${box} transition-colors hover:text-link`}
                    >
                      {content}
                    </SmartLink>
                  ) : (
                    <div className={box}>{content}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </Section>
      )}

      <ContactBand {...page.contactBand} />
    </>
  );
}
