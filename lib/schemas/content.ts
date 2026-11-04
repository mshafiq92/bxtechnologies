/*
 * Content schemas (task T20).
 *
 * Mirrors the public-site parts of DATA-MODEL.md so a CMS can take over later without the
 * pages changing. Collections (services, projects, sectors, insights, roles) and site
 * settings are validated with these schemas at build time by lib/content. Fields that exist
 * in the data model only for the admin console (status history, audit, versions) are omitted.
 *
 * Copy rules (BUSINESS-RULES-V2) are enforced separately by scripts/guardrails.mjs.
 */
import { z } from "zod";

/* Shared ------------------------------------------------------------------- */

/** Route path ("/services"), in-page anchor ("#faq") or external URL / mailto / tel. */
export const Href = z.string().min(1);

export const LinkSchema = z.object({ label: z.string().min(1), href: Href });

/** A labelled box: title + detail (diagram boxes, architecture boxes). */
export const BoxSchema = z.object({ t: z.string().min(1), d: z.string().min(1) });

/**
 * A metric. Numbers render navy. `placeholder: true` marks figures awaiting bX sign-off
 * (OPEN-DECISIONS #3); by decision they stay for now. `method` is private, never rendered.
 */
export const MetricSchema = z.object({
  value: z.string().min(1),
  label: z.string().min(1),
  sector: z.string().optional(),
  method: z.string().optional(),
  placeholder: z.boolean().default(false),
});

export const FaqSchema = z.object({ q: z.string().min(1), a: z.string().min(1) });

/** Numbered item: pillar columns, principles, steps. */
export const NumberedItemSchema = z.object({
  number: z.string().min(1),
  title: z.string().min(1),
  text: z.string().min(1),
  items: z.array(z.string()).optional(),
});

export const ContactBandSchema = z.object({
  eyebrow: z.string().min(1),
  title: z.string().min(1),
  text: z.string().min(1),
  cta: z.string().min(1),
  ctaHref: Href,
  secondary: z.string().optional(),
  secondaryHref: Href.optional(),
  /** Render a trailing arrow after the secondary link ("Read our insights →"). */
  secondaryArrow: z.boolean().default(false),
});

/** Service.heroDiagram (SCREENS-CONSOLE-V2). */
export const HeroDiagramSchema = z.object({
  caption: z.string().min(1),
  entry: BoxSchema,
  core: BoxSchema,
  support: z.array(BoxSchema),
  outcomes: z.array(BoxSchema),
  status: BoxSchema.extend({ detailTone: z.enum(["muted", "status"]).optional() }),
});

/* Services ----------------------------------------------------------------- */

export const CapabilityGroupKey = z.enum(["ai", "data", "product", "teams"]);

export const ServiceGroupSchema = z.object({
  key: CapabilityGroupKey,
  number: z.string(),
  name: z.string().min(1),
  /** Intro on the Services page group heading. */
  intro: z.string().min(1),
  /** Green status line on the Home services columns ("In production · ..."). */
  production: z.string().min(1),
});

export const ServiceDetailSchema = z.object({
  eyebrow: z.string().min(1),
  title: z.string().min(1),
  intro: z.string().min(1),
  metrics: z.array(MetricSchema).length(3),
  primaryCta: z.string().min(1),
  heroDiagram: HeroDiagramSchema,
  build: z.object({
    title: z.string().min(1),
    intro: z.string().min(1),
    patterns: z.array(NumberedItemSchema).min(1),
  }),
  architecture: z.object({
    title: z.string().min(1),
    intro: z.string().min(1),
    edge: z.array(BoxSchema),
    core: z.object({ label: z.string().min(1), text: z.string().min(1) }),
    layers: z.array(BoxSchema),
    observability: BoxSchema,
    note: z.string().min(1),
  }),
  engagement: z.object({
    eyebrow: z.string().min(1),
    /** Jump bar label for this section ("The pilot", "The engagement"). */
    jumpLabel: z.string().min(1),
    title: z.string().min(1),
    intro: z.string().min(1),
    cta: z.string().min(1),
    steps: z.array(z.object({ label: z.string(), title: z.string(), text: z.string() })),
  }),
  proof: z.object({
    title: z.string().min(1),
    note: z.string().min(1),
    metrics: z.array(MetricSchema),
  }),
  fit: z.object({
    title: z.string().min(1),
    intro: z.string().min(1),
    items: z.array(z.object({ sector: z.string(), title: z.string(), text: z.string() })),
  }),
  faq: z.object({ title: z.string().min(1), intro: z.string().min(1), items: z.array(FaqSchema) }),
  related: z.object({
    title: z.string().min(1),
    items: z.array(z.object({ title: z.string(), text: z.string(), href: Href })).length(3),
  }),
  contactBand: ContactBandSchema,
});

export const ServiceSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  number: z.string(),
  group: CapabilityGroupKey,
  name: z.string().min(1),
  /** Shorter label used in the mega menu where the design shortens it. */
  navLabel: z.string().min(1),
  /** One line under the name on Home. */
  summary: z.string().min(1),
  /** Subtitle on the Services page row. */
  subtitle: z.string().min(1),
  description: z.string().min(1),
  stack: z.array(z.string()).min(1),
  /** Detail page content; null until written (OPEN-DECISIONS #4). */
  detail: ServiceDetailSchema.nullable(),
});

export const EngagementModelSchema = z.object({
  title: z.string().min(1),
  tag: z.string().min(1),
  text: z.string().min(1),
});

export const StackGroupSchema = z.object({ title: z.string(), items: z.array(z.string()).min(1) });

/* Projects and sectors ----------------------------------------------------- */

export const ProjectSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  /** Capability tag ("Agentic AI", "Web & mobile"). */
  tag: z.string().min(1),
  /** "Sector · Region · NDA": client names are never shown (BUSINESS-RULES-V2 §2). */
  sector: z.string().regex(/·\s*NDA$/, "Project sector line must end with · NDA"),
  title: z.string().min(1),
  description: z.string().min(1),
  metric: MetricSchema,
  stack: z.array(z.string()).min(1).max(4),
  stillSupported: z.boolean().default(true),
  /** Shown in Home "Selected work", with its own sentence. */
  home: z.object({ sector: z.string(), text: z.string() }).optional(),
});

export const SectorSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  name: z.string().min(1),
  region: z.string().min(1),
  body: z.string().min(1),
  chips: z.array(z.string()),
  metric: MetricSchema,
});

/* Insights ------------------------------------------------------------------ */

export const InsightCategorySchema = z.object({
  slug: z.string(),
  name: z.string().min(1),
});

export const AuthorSchema = z.object({
  slug: z.string(),
  name: z.string().min(1),
  role: z.string().min(1),
});

export const InsightSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(1),
  /** Short title used in the breadcrumb. */
  shortTitle: z.string().optional(),
  category: z.string().min(1),
  /** Topic label shown on the featured panel and article ("Agentic AI"); defaults to the category name. */
  topicLabel: z.string().optional(),
  date: z.iso.date(),
  readMinutes: z.number().int().positive().optional(),
  summary: z.string().optional(),
  standfirst: z.string().optional(),
  author: z.string().optional(),
  featured: z.boolean().default(false),
  /** Has a written body in content/insights/<slug>.mdx. */
  hasBody: z.boolean().default(false),
  relatedService: z.string().optional(),
  keepReading: z.array(z.string()).optional(),
});

/* Careers -------------------------------------------------------------------- */

export const RoleDetailSchema = z.object({
  intro: z.string().min(1),
  /** Chips in the role page title block (fuller than the listing chips). */
  chips: z.array(z.string()).min(1),
  /** Inline facts under the title ("Islamabad office · hybrid after probation"). */
  facts: z.array(z.object({ value: z.string(), label: z.string() })),
  work: z.array(z.string()).min(1),
  whatYouWillDo: z.array(z.string()),
  lookingFor: z.array(z.string()),
  niceToHave: z.array(z.string()),
  offer: z.array(z.string()),
  hiringSteps: z.array(NumberedItemSchema),
  glance: z.array(z.object({ label: z.string(), value: z.string() })),
  firstWork: z.object({ title: z.string(), text: z.string(), link: LinkSchema }),
  contactBand: ContactBandSchema,
});

export const RoleSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(1),
  team: z.string().min(1),
  location: z.string().default("Islamabad"),
  employmentType: z.string().default("Full-time"),
  experience: z.string().optional(),
  reportsTo: z.string().optional(),
  summary: z.string().min(1),
  chips: z.array(z.string()),
  /** Role page content; null means the listing links straight to the application form. */
  detail: RoleDetailSchema.nullable(),
});

/* Site settings ------------------------------------------------------------- */

export const OfficeSchema = z.object({
  kind: z.string(),
  city: z.string(),
  country: z.string(),
  body: z.string(),
  /** Shorter description used on the Contact page. */
  contactBody: z.string().optional(),
  chips: z.array(z.string()),
});

export const ClientLogoSchema = z.object({
  name: z.string().min(1),
  /** Full-colour logo (hover state). */
  src: z.string().startsWith("/"),
  /** Prepared greyscale version (resting state). */
  monoSrc: z.string().startsWith("/"),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  /** Written permission on file (BUSINESS-RULES-V2 §2). Only cleared logos render. */
  cleared: z.boolean(),
});

/* Inferred types ------------------------------------------------------------ */

export type Metric = z.infer<typeof MetricSchema>;
export type ContactBandContent = z.input<typeof ContactBandSchema>;
export type HeroDiagram = z.infer<typeof HeroDiagramSchema>;
export type ServiceGroup = z.infer<typeof ServiceGroupSchema>;
export type Service = z.infer<typeof ServiceSchema>;
export type ServiceDetail = z.infer<typeof ServiceDetailSchema>;
export type EngagementModel = z.infer<typeof EngagementModelSchema>;
export type StackGroup = z.infer<typeof StackGroupSchema>;
export type Project = z.infer<typeof ProjectSchema>;
export type Sector = z.infer<typeof SectorSchema>;
export type InsightCategory = z.infer<typeof InsightCategorySchema>;
export type Author = z.infer<typeof AuthorSchema>;
export type Insight = z.infer<typeof InsightSchema>;
export type Role = z.infer<typeof RoleSchema>;
export type RoleDetail = z.infer<typeof RoleDetailSchema>;
export type Office = z.infer<typeof OfficeSchema>;
export type ClientLogo = z.infer<typeof ClientLogoSchema>;

/* Input types for authoring content files (defaults optional) */
export type ServiceInput = z.input<typeof ServiceSchema>;
export type ProjectInput = z.input<typeof ProjectSchema>;
export type SectorInput = z.input<typeof SectorSchema>;
export type InsightInput = z.input<typeof InsightSchema>;
export type RoleInput = z.input<typeof RoleSchema>;
export type MetricInput = z.input<typeof MetricSchema>;
