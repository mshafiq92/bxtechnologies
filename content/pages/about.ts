/*
 * About page copy (bX v2 - About.dc.html). Offices live in content/site.ts.
 * Revised 2026-11-07 with the owner: facts and figures from the old site (bxtechnologies.net
 * about-us), mission and vision, a "BX at a glance" card in the hero, the client strip, and no
 * German contracting entity. The people section is hidden until real names arrive.
 */
import type { HeroDiagram } from "@/components/ui/diagram-card";
import type { ContactBandContent } from "@/lib/schemas/content";

type Person = { name: string; initials: string; role: string; text: string };

export const aboutPage = {
  hero: {
    eyebrow: "About BX",
    title: "An engineering company that stayed an engineering company.",
    intro:
      "BX Technologies is a software engineering company building custom software, cloud platforms and AI for startups, growing businesses and enterprises. Since 2019 we have taken work from first design to production: web and mobile products, cloud infrastructure and DevOps pipelines, and AI agents that run inside the systems you already have. We are engineers first: the people who scope your work are the people who write it.",
    /** Figures from the owner (old site, 2026-11-07). */
    metrics: [
      { value: "2019", label: "founded" },
      { value: "50+", label: "clients" },
      { value: "80+", label: "projects delivered" },
      { value: "20+", label: "team members" },
    ],
    primaryCta: { label: "Talk to an engineer", href: "#contact" },
    secondaryCta: { label: "How we work", href: "#principles" },
    /** OPEN-DECISIONS #2: real photo of BX people or offices. Until then the glance card shows. */
    photo: null as { src: string; alt: string } | null,
    /** Hero card while there is no photo (same card style as the Home hero). */
    glance: {
      caption: "BX at a glance",
      entry: { t: "Islamabad, Pakistan", d: "delivery · engineering · QA" },
      core: { t: "Duisburg, Germany", d: "EU client contact · on-site visits" },
      support: [
        { t: "SECP", d: "CUIN 0139549" },
        { t: "PSEB", d: "member" },
        { t: "Since", d: "2019" },
      ],
      outcomes: [
        { t: "Sectors", d: "fintech · healthcare · eCommerce · telecom" },
        { t: "Engagements", d: "fixed price · dedicated team · AI pilot" },
      ],
      status: { t: "From first design to production", d: "on time, every time" },
    } satisfies HeroDiagram,
  },
  jumpLinks: [
    { href: "#why", label: "Why us" },
    { href: "#mission", label: "Mission" },
    { href: "#principles", label: "How we work" },
    { href: "#clients", label: "Clients" },
    { href: "#story", label: "Story" },
    { href: "#offices", label: "Offices" },
  ],
  why: {
    eyebrow: "Why us",
    title: "Three reasons clients stay with us",
    intro:
      "We do not compete on price. Clients stay because they work directly with senior engineers, in hours that overlap their own, and because everything we build is theirs to keep.",
    items: [
      {
        number: "01",
        title: "Senior engineers throughout",
        text: "The engineers who scope your project are the engineers who build, test and support it. Nothing is passed to a junior team once the contract is signed.",
      },
      {
        number: "02",
        title: "One team, AI to production",
        text: "AI, software, cloud and DevOps engineers work as one team, so the model, the application and its infrastructure are built, secured and supported together.",
      },
      {
        number: "03",
        title: "Full ownership at handover",
        text: "Source code, documentation, repository access and a technical walkthrough are part of the price. Everything we build is yours, with nothing to lock you in.",
      },
    ],
  },
  mission: {
    eyebrow: "Mission and vision",
    title: "What we are building towards",
    items: [
      {
        title: "Our mission",
        text: "To help businesses put AI to work on the systems they already run. We build AI agents, machine learning and custom software, and run them on secure cloud platforms that stay reliable in production.",
      },
      {
        title: "Our vision",
        text: "To be the engineering partner companies trust to take AI from idea to production: one team where AI, software, cloud, security and operations work together, judged by systems that keep running.",
      },
      {
        title: "Careers",
        text: "Join AI, software and cloud engineers who build systems that run in production. If you want to learn from senior engineers, take ownership of real client work and grow into a lead role, talk to us.",
        link: { label: "Careers at BX", href: "/careers" },
      },
    ] as { title: string; text: string; link?: { label: string; href: string } }[],
  },
  principles: {
    eyebrow: "How we work",
    title: "Five things we hold to, including when it costs us",
    items: [
      {
        number: "01",
        title: "We scope before we quote",
        text: "A fixed price given before anyone has read the existing system is a guess someone will pay for later. We run a short paid discovery on anything substantial, and you own the output whether or not you continue with us.",
      },
      {
        number: "02",
        title: "Small teams, direct contact",
        text: "Four to six people on an engagement, talking to your team without an account manager relaying messages. Escalation goes to a director, not a ticket queue.",
      },
      {
        number: "03",
        title: "Production from week one",
        text: "Pipelines, environments and monitoring go in before features do. It slows the first demo and saves the last month.",
      },
      {
        number: "04",
        title: "We say when something is a bad idea",
        text: "Several of our engagements started by talking a client out of the thing they asked for. We have also turned down work we were not the right team for.",
      },
      {
        number: "05",
        title: "Measured, not claimed",
        text: "When we report a result, we state the baseline and how it was measured, as agreed with the client in advance. Where we could not measure something, we say so.",
      },
    ],
  },
  clients: {
    label: "Clients we have delivered for",
  },
  people: {
    eyebrow: "People",
    title: "Who you will actually be working with",
    intro: "",
    /**
     * Hidden while empty (owner, 2026-11-07): add real names, roles and portraits here and the
     * section and its jump link come back without any design work.
     */
    members: [] as Person[],
  },
  story: {
    eyebrow: "Story",
    title: "How our practice grew, one capability at a time",
    intro:
      "We started with custom software and added each capability when our clients needed it in production: web and mobile, cloud and DevOps, data and machine learning, and AI.",
    /** Years proposed 2026-11-07; the owner may adjust them. */
    entries: [
      {
        year: "2019",
        title: "Custom software",
        text: "Founded in March and incorporated in September, building bespoke business software for our first clients and the systems they rely on every day.",
      },
      {
        year: "2020",
        title: "Web and mobile apps",
        text: "Web platforms and cross-platform mobile apps, designed, built and maintained by the same team, from the first release to long-term support.",
      },
      {
        year: "2021",
        title: "Cloud and DevOps",
        text: "Client systems moved to the cloud, with CI/CD pipelines, infrastructure as code and monitoring as standard on every engagement we run.",
      },
      {
        year: "2022",
        title: "Data and machine learning",
        text: "Data pipelines, analytics and the first machine learning models running inside client products, with the data work that keeps them accurate.",
      },
      {
        year: "2023",
        title: "Cybersecurity and managed IT",
        text: "Security reviews and hardening, plus hardware, on-site and L1 to L3 support, so the systems we build stay secure and keep running long after they launch.",
      },
      {
        year: "2024",
        title: "AI-first engineering",
        text: "AI agents, retrieval and evaluation became a standing practice, built on the software, cloud and data foundations that sit underneath them.",
      },
    ],
  },
  offices: {
    eyebrow: "Offices",
    title: "Two locations, one team",
    registrations: {
      kind: "Registrations",
      title: "Where we are registered",
      text: "Registered with the SECP (CUIN 0139549) and a member of the Pakistan Software Export Board. Our partner in Germany, Vis Group, supports on-site work.",
      link: { label: "Request our company documents", href: "#contact" },
    },
  },
  contactBand: {
    eyebrow: "Start a project",
    title: "Want to know whether we are the right team?",
    text: "Thirty minutes with the engineers who would do the work. You leave with an approach and a rough shape of effort, whether or not you hire us.",
    cta: "Book a technical call",
    ctaHref: "/contact",
    secondary: "Read our insights",
    secondaryHref: "/insights",
    secondaryArrow: true,
  } satisfies ContactBandContent,
};
