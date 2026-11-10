/*
 * Main navigation, mega menu and footer columns.
 * Copy and structure from BxHeader.dc.html and BxFooter.dc.html.
 * Service links point to a Service Detail page where one exists; the rest go to their group
 * on /services until their pages are written (see serviceHref in lib/content).
 */

export type NavKey = "services" | "work" | "insights" | "company";

export type NavLink = { label: string; href: string };

export type MegaGroup = { title: string; links: NavLink[] };

export const mainNav: { key: Exclude<NavKey, "services">; label: string; href: string }[] = [
  { key: "work", label: "Work", href: "/work" },
  { key: "insights", label: "Insights", href: "/insights" },
  { key: "company", label: "Company", href: "/about" },
];

export const headerCta: NavLink = { label: "Start a project", href: "/contact" };

/**
 * Company dropdown (owner decision 2026-11-07; not in the design handoff). "Company" itself still
 * links to /about. Add Team or Partners here when those pages exist.
 */
export const companyMenu: NavLink[] = [
  { label: "About us", href: "/about" },
  { label: "Industries", href: "/industries" },
  { label: "Careers", href: "/careers" },
];

/**
 * Mega menu extras. The service groups and their links are built from content/services.ts
 * by lib/content (getNavigation), so the menu always matches the services list.
 */
export const megaMenuExtras: { footerLinks: NavLink[] } = {
  footerLinks: [
    { label: "Industries", href: "/industries" },
    { label: "Engagement models", href: "/#engagement" },
  ],
};

export const footerColumns: { title: string; links: NavLink[] }[] = [
  {
    title: "Services",
    links: [
      { label: "AI & Autonomy", href: "/services#ai" },
      { label: "Data & Analytics", href: "/services#data" },
      { label: "Cloud & DevOps", href: "/services/cloud-devops" },
      { label: "Managed IT", href: "/services#managed" },
      { label: "Product & Quality", href: "/services#product" },
      { label: "Teams & Advisory", href: "/services#teams" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Work", href: "/work" },
      { label: "Insights", href: "/insights" },
      { label: "Careers", href: "/careers" },
    ],
  },
];

export const legalLinks: NavLink[] = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms & conditions", href: "/terms" },
  { label: "Cookies policy", href: "/cookies" },
  { label: "Imprint", href: "/imprint" },
];
