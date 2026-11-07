/*
 * schema.org structured data (JSON-LD) for search engines.
 * Built only from lib/content so it always matches what the page shows.
 * Validate changes with https://search.google.com/test/rich-results and https://validator.schema.org.
 */
import type { BreadcrumbItem } from "@/components/ui/breadcrumb";
import { getOffices, getSiteSettings, insightTopic } from "@/lib/content";
import type { Insight, Role, Service } from "@/lib/schemas/content";

import { absoluteUrl, SITE_NAME } from "./metadata";

type Thing = Record<string, unknown>;

const ORG_ID = () => absoluteUrl("/#organization");

/** Social profiles that point at a real profile (the design's bare facebook.com / x.com do not). */
function profileUrls(): string[] {
  return getSiteSettings()
    .social.map((s) => s.href)
    .filter((href) => new URL(href).pathname.replace(/\/$/, "") !== "");
}

function postalAddress(office: { city: string; countryCode: string }): Thing {
  return {
    "@type": "PostalAddress",
    addressLocality: office.city,
    addressCountry: office.countryCode,
  };
}

/** The company. Full entity on the home page; other entities refer to it by @id. */
export function organizationLd(): Thing {
  const site = getSiteSettings();
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID(),
    name: SITE_NAME,
    legalName: site.legalName,
    url: absoluteUrl("/"),
    logo: absoluteUrl("/brand/bx-favicon-512.png"),
    email: site.email,
    telephone: site.phone.href.replace(/^tel:/, ""),
    foundingDate: "2019-09-20",
    description: site.blurb,
    address: getOffices().map(postalAddress),
    sameAs: profileUrls(),
  };
}

/** Short reference used inside other entities (provider, publisher, hiringOrganization). */
function organizationRef(): Thing {
  return {
    "@type": "Organization",
    "@id": ORG_ID(),
    name: SITE_NAME,
    url: absoluteUrl("/"),
    logo: absoluteUrl("/brand/bx-favicon-512.png"),
  };
}

/** BreadcrumbList from the visible breadcrumb. The last item is the current page. */
export function breadcrumbLd(items: BreadcrumbItem[]): Thing {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      // Google allows the current (last) item without a URL.
      ...(item.href && i < items.length - 1 ? { item: absoluteUrl(item.href) } : {}),
    })),
  };
}

export function serviceLd(service: Service & { detail: NonNullable<Service["detail"]> }): Thing {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.detail.intro,
    url: absoluteUrl(`/services/${service.slug}`),
    serviceType: service.name,
    provider: organizationRef(),
    areaServed: ["Europe", "Asia"],
  };
}

export function articleLd(insight: Insight, author?: { name: string; role: string }): Thing {
  const url = absoluteUrl(`/insights/${insight.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: insight.title,
    description: insight.standfirst ?? insight.summary,
    datePublished: insight.date,
    dateModified: insight.date,
    articleSection: insightTopic(insight),
    mainEntityOfPage: url,
    url,
    image: absoluteUrl(`/insights/${insight.slug}/opengraph-image`),
    author: author
      ? { "@type": "Person", name: author.name, jobTitle: author.role }
      : organizationRef(),
    publisher: organizationRef(),
  };
}

const EMPLOYMENT_TYPES: Record<string, string> = {
  "full-time": "FULL_TIME",
  "part-time": "PART_TIME",
  contract: "CONTRACTOR",
  contractor: "CONTRACTOR",
  temporary: "TEMPORARY",
  internship: "INTERN",
};

const escapeHtml = (text: string) =>
  text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Inline **bold** to <strong>, everything else escaped. */
const html = (text: string) => escapeHtml(text).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");

const list = (title: string, items: string[]) =>
  items.length
    ? `<h3>${escapeHtml(title)}</h3><ul>${items.map((i) => `<li>${html(i)}</li>`).join("")}</ul>`
    : "";

/**
 * JobPosting for a role page. Google requires the full description as HTML, a posting date and a
 * location; roles without `datePosted` get no JobPosting (returns null).
 */
export function jobPostingLd(role: Role): Thing | null {
  if (!role.detail || !role.datePosted) return null;
  const d = role.detail;
  const office = getOffices().find((o) => o.city === role.location);
  const description = [
    `<p>${html(d.intro)}</p>`,
    ...d.work.map((p) => `<p>${html(p)}</p>`),
    list("What you will do", d.whatYouWillDo),
    list("What we are looking for", d.lookingFor),
    list("Nice to have", d.niceToHave),
    list("What we offer", d.offer),
  ].join("");

  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: role.title,
    description,
    datePosted: role.datePosted,
    employmentType: EMPLOYMENT_TYPES[role.employmentType.toLowerCase()] ?? "FULL_TIME",
    hiringOrganization: organizationRef(),
    jobLocation: {
      "@type": "Place",
      address: postalAddress(office ?? { city: role.location, countryCode: "PK" }),
    },
    directApply: true,
    url: absoluteUrl(`/careers/${role.slug}`),
    identifier: { "@type": "PropertyValue", name: SITE_NAME, value: role.slug },
  };
}
