/*
 * Content repository (task T22): the ONLY module pages and components read content from.
 *
 * Today it serves the typed files in /content, validated against lib/schemas/content.ts when
 * this module loads (so a broken content file fails `next build`). Later a CMS or database can
 * replace the implementation behind these functions without touching the pages.
 *
 * MDX bodies (articles, legal pages) are imported by their page renderers (tasks T35, T39);
 * this module tells them whether a body exists.
 */
import { z } from "zod";

import { clientLogos as rawClientLogos } from "@/content/client-logos";
import { consentCopy } from "@/content/consent";
import { groupPages as rawGroupPages } from "@/content/group-pages";
import {
  authors as rawAuthors,
  insightCategories as rawCategories,
  insights as rawInsights,
  insightsListSummaryLimit,
} from "@/content/insights";
import { insightBodies } from "@/content/insights/bodies";
import { legalBodies } from "@/content/legal/bodies";
import {
  companyMenu,
  footerColumns,
  headerCta,
  legalLinks,
  mainNav,
  megaMenuExtras,
  type MegaGroup,
} from "@/content/navigation";
import { aboutPage } from "@/content/pages/about";
import { applyPage, careersPage, roleDetailPage } from "@/content/pages/careers";
import { contactPage } from "@/content/pages/contact";
import { homePage } from "@/content/pages/home";
import { industriesPage } from "@/content/pages/industries";
import {
  articlePage,
  articleRelatedService,
  articleToc,
  insightsPage,
} from "@/content/pages/insights";
import { legalPages, legalShared, type LegalSlug } from "@/content/pages/legal";
import { servicesPage } from "@/content/pages/services";
import { workPage } from "@/content/pages/work";
import { projects as rawProjects } from "@/content/projects";
import { roles as rawRoles } from "@/content/roles";
import { sectors as rawSectors } from "@/content/sectors";
import {
  engagementIntro,
  engagementModels as rawEngagementModels,
  engagementModelsHome as rawEngagementModelsHome,
  serviceGroups as rawServiceGroups,
  services as rawServices,
  stackGroups as rawStackGroups,
} from "@/content/services";
import {
  contactBandDefaults as rawContactBandDefaults,
  imprint,
  offices as rawOffices,
  site,
} from "@/content/site";
import {
  AuthorSchema,
  ClientLogoSchema,
  ContactBandSchema,
  EngagementModelSchema,
  GroupPageSchema,
  InsightCategorySchema,
  InsightSchema,
  OfficeSchema,
  ProjectSchema,
  RoleSchema,
  SectorSchema,
  ServiceGroupSchema,
  ServiceSchema,
  StackGroupSchema,
  type ContactBandContent,
  type Insight,
  type Role,
  type Service,
  type ServiceGroup,
} from "@/lib/schemas/content";

export type { MegaGroup, NavKey, NavLink } from "@/content/navigation";
export type { SocialIcon } from "@/content/site";
export type { LegalSlug } from "@/content/pages/legal";
export type * from "@/lib/schemas/content";

/* Validation ---------------------------------------------------------------- */

/** Parse a content collection, naming the collection in the error so a build failure is clear. */
function parseCollection<T extends z.ZodType>(name: string, schema: T, data: unknown): z.infer<T> {
  const result = schema.safeParse(data);
  if (!result.success) {
    throw new Error(`Invalid content in "${name}":\n${z.prettifyError(result.error)}`);
  }
  return result.data;
}

function assertUnique(name: string, values: string[]) {
  const seen = new Set<string>();
  for (const v of values) {
    if (seen.has(v)) throw new Error(`Duplicate ${name}: "${v}"`);
    seen.add(v);
  }
}

const serviceGroups = parseCollection(
  "serviceGroups",
  z.array(ServiceGroupSchema),
  rawServiceGroups,
);
const services = parseCollection("services", z.array(ServiceSchema), rawServices);
const groupPages = parseCollection("groupPages", z.array(GroupPageSchema), rawGroupPages);
const stackGroups = parseCollection("stackGroups", z.array(StackGroupSchema), rawStackGroups);
const engagementModels = parseCollection(
  "engagementModels",
  z.array(EngagementModelSchema),
  rawEngagementModels,
);
const engagementModelsHome = parseCollection(
  "engagementModelsHome",
  z.array(EngagementModelSchema),
  rawEngagementModelsHome,
);
const projects = parseCollection("projects", z.array(ProjectSchema), rawProjects);
const sectors = parseCollection("sectors", z.array(SectorSchema), rawSectors);
const insightCategories = parseCollection(
  "insightCategories",
  z.array(InsightCategorySchema),
  rawCategories,
);
const authors = parseCollection("authors", z.array(AuthorSchema), rawAuthors);
const insights = parseCollection("insights", z.array(InsightSchema), rawInsights).toSorted((a, b) =>
  b.date.localeCompare(a.date),
);
const roles = parseCollection("roles", z.array(RoleSchema), rawRoles);
const offices = parseCollection("offices", z.array(OfficeSchema), rawOffices);
const clientLogos = parseCollection("clientLogos", z.array(ClientLogoSchema), rawClientLogos);
const contactBandDefaults = parseCollection(
  "contactBandDefaults",
  ContactBandSchema,
  rawContactBandDefaults,
);

/* Cross-references: slugs unique, every reference points at something that exists. */
assertUnique(
  "service slug",
  services.map((s) => s.slug),
);
assertUnique(
  "project slug",
  projects.map((p) => p.slug),
);
assertUnique(
  "sector slug",
  sectors.map((s) => s.slug),
);
assertUnique(
  "insight slug",
  insights.map((i) => i.slug),
);
assertUnique(
  "role slug",
  roles.map((r) => r.slug),
);
assertUnique(
  "service group",
  serviceGroups.map((g) => g.key),
);
for (const group of serviceGroups) {
  if (!services.some((s) => s.group === group.key)) {
    throw new Error(`Service group "${group.key}" has no services`);
  }
}
const categorySlugs = new Set(insightCategories.map((c) => c.slug));
const authorSlugs = new Set(authors.map((a) => a.slug));
const insightSlugs = new Set(insights.map((i) => i.slug));
const serviceSlugs = new Set(services.map((s) => s.slug));
for (const insight of insights) {
  if (!categorySlugs.has(insight.category)) {
    throw new Error(`Insight "${insight.slug}" has unknown category "${insight.category}"`);
  }
  if (insight.author && !authorSlugs.has(insight.author)) {
    throw new Error(`Insight "${insight.slug}" has unknown author "${insight.author}"`);
  }
  if (insight.relatedService && !serviceSlugs.has(insight.relatedService)) {
    throw new Error(`Insight "${insight.slug}" links unknown service "${insight.relatedService}"`);
  }
  for (const slug of insight.keepReading ?? []) {
    if (!insightSlugs.has(slug)) {
      throw new Error(`Insight "${insight.slug}" keeps reading unknown insight "${slug}"`);
    }
  }
}
if (insights.filter((i) => i.featured).length > 1) {
  throw new Error("Only one insight can be featured");
}

/* Services ------------------------------------------------------------------ */

export function getServiceGroups(): ServiceGroup[] {
  return serviceGroups;
}

export function getServiceGroup(key: ServiceGroup["key"]): ServiceGroup | undefined {
  return serviceGroups.find((g) => g.key === key);
}

/** All services in catalogue order, or one group's. */
export function getServices(group?: ServiceGroup["key"]): Service[] {
  return group ? services.filter((s) => s.group === group) : services;
}

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

/** Services that have a detail page (for generateStaticParams). */
export function getServicesWithDetail(): (Service & { detail: NonNullable<Service["detail"]> })[] {
  return services.filter((s): s is Service & { detail: NonNullable<Service["detail"]> } =>
    Boolean(s.detail),
  );
}

/**
 * Where a service links to: its detail page when one exists, otherwise its group on /services
 * (the Services page itself uses `#contact` for those, per the design).
 */
/** Service group pages (/services/<slug>). */
export function getGroupPages() {
  return groupPages;
}

export function getGroupPage(slug: string) {
  return groupPages.find((p) => p.slug === slug);
}

/** A group's own page when it has one, otherwise its section on /services. */
export function groupHref(key: ServiceGroup["key"]): string {
  const page = groupPages.find((p) => p.group === key);
  return page ? `/services/${page.slug}` : `/services#${key}`;
}

/**
 * Where a service link goes: its block on the group page when the group has one, else its own
 * detail page, else its group on /services.
 */
export function serviceHref(service: Service): string {
  const page = groupPages.find((p) => p.group === service.group);
  if (page) return `/services/${page.slug}#${service.slug}`;
  return service.detail ? `/services/${service.slug}` : `/services#${service.group}`;
}

export function getStackGroups() {
  return stackGroups;
}

export function getEngagementModels(variant: "full" | "home" = "full") {
  return {
    intro: engagementIntro,
    models: variant === "home" ? engagementModelsHome : engagementModels,
  };
}

/* Projects, sectors, logos -------------------------------------------------- */

export function getProjects() {
  return projects;
}

/** Projects featured in Home "Selected work", with their Home wording. */
export function getHomeProjects() {
  return projects.filter((p) => p.home);
}

export function getSectors() {
  return sectors;
}

/** Only logos with written permission (BUSINESS-RULES-V2 §2). Empty array hides the strip. */
export function getClientLogos() {
  return clientLogos.filter((logo) => logo.cleared);
}

/* Insights ------------------------------------------------------------------ */

export function getInsightCategories() {
  return insightCategories;
}

export function getInsightCategory(slug: string) {
  return insightCategories.find((c) => c.slug === slug);
}

/** Newest first. Optionally one category. */
export function getInsights(category?: string): Insight[] {
  return category ? insights.filter((i) => i.category === category) : insights;
}

export function getInsight(slug: string): Insight | undefined {
  return insights.find((i) => i.slug === slug);
}

export function getFeaturedInsight(): Insight | undefined {
  return insights.find((i) => i.featured);
}

/** Insights with a written body (for generateStaticParams of /insights/[slug]). */
export function getPublishedInsights(): Insight[] {
  return insights.filter((i) => i.hasBody);
}

export function getAuthor(slug: string | undefined) {
  return slug ? authors.find((a) => a.slug === slug) : undefined;
}

/** "Keep reading" list for an article: manual list first, then latest in the same category. */
export function getKeepReading(slug: string, limit = 3): Insight[] {
  const insight = getInsight(slug);
  if (!insight) return [];
  const manual = (insight.keepReading ?? [])
    .map((s) => getInsight(s))
    .filter((i): i is Insight => Boolean(i));
  const auto = insights.filter(
    (i) => i.slug !== slug && i.category === insight.category && !manual.includes(i),
  );
  return [...manual, ...auto].slice(0, limit);
}

/** Display label for an insight's topic ("Agentic AI" or its category name). */
export function insightTopic(insight: Insight): string {
  return insight.topicLabel ?? getInsightCategory(insight.category)?.name ?? insight.category;
}

export { insightsListSummaryLimit };

/* Careers -------------------------------------------------------------------- */

/** Every role, including unpublished drafts (content checks and tests only). */
export function getAllRoles(): Role[] {
  return roles;
}

/** Open roles: only these appear on the site. Empty means "no open positions". */
export function getRoles(): Role[] {
  return roles.filter((r) => r.published);
}

export function getRole(slug: string): Role | undefined {
  return getRoles().find((r) => r.slug === slug);
}

/** Open roles with a role page (for generateStaticParams of /careers/[slug]). */
export function getRolesWithDetail() {
  return getRoles().filter((r) => r.detail);
}

/** A role links to its page when it has one, otherwise to the application form for it. */
export function roleHref(role: Role): string {
  return role.detail ? `/careers/${role.slug}` : `/careers/apply?role=${role.slug}`;
}

/* Site, navigation, contact band -------------------------------------------- */

export function getSiteSettings() {
  return site;
}

/** Imprint (Impressum) details; `null` fields are still to be supplied. */
export function getImprint() {
  return imprint;
}

/** Cookie banner and settings copy. */
export function getConsentCopy() {
  return consentCopy;
}

export function getOffices() {
  return offices;
}

export function getContactBandDefaults(): ContactBandContent {
  return contactBandDefaults;
}

/** Validate a page's contact band copy (pages pass their own wording). */
export function contactBand(content: ContactBandContent): ContactBandContent {
  return parseCollection("contactBand", ContactBandSchema, content);
}

export function getNavigation() {
  const groups: MegaGroup[] = serviceGroups.map((group) => ({
    title: group.name,
    links: getServices(group.key).map((s) => ({ label: s.navLabel, href: serviceHref(s) })),
  }));
  return {
    mainNav,
    headerCta,
    megaMenu: { groups, ...megaMenuExtras },
    companyMenu,
    footerColumns,
    legalLinks,
  };
}

/* Page copy ----------------------------------------------------------------- */

const pages = {
  home: homePage,
  services: servicesPage,
  work: workPage,
  insights: insightsPage,
  article: articlePage,
  about: aboutPage,
  industries: industriesPage,
  careers: careersPage,
  roleDetail: roleDetailPage,
  apply: applyPage,
  contact: contactPage,
};

export type PageKey = keyof typeof pages;

/** Copy for a page's own sections (heroes, headings, page-specific lists). */
export function getPage<K extends PageKey>(key: K): (typeof pages)[K] {
  return pages[key];
}

export function getArticleRelatedService(slug: string) {
  return articleRelatedService[slug];
}

/** "On this page" links for an article. */
export function getArticleToc(slug: string) {
  return articleToc[slug] ?? [];
}

/** Loader for an article's MDX body, or undefined when it has none. */
export function getInsightBody(slug: string) {
  return insightBodies[slug];
}

export function getLegalPage(slug: LegalSlug) {
  return { ...legalShared, ...legalPages[slug] };
}

export const legalSlugs = Object.keys(legalPages) as LegalSlug[];

/** Loader for a legal page's MDX body. */
export function getLegalBody(slug: LegalSlug) {
  return legalBodies[slug];
}
