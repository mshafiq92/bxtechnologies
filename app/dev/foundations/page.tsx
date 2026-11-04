import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ContactBand } from "@/components/layout/contact-band";
import { HeroGridBackdrop } from "@/components/ui/hero-grid-backdrop";
import { JumpBar } from "@/components/ui/jump-bar";
import { Section } from "@/components/ui/section";
import { SignatureRule } from "@/components/ui/signature-rule";
import { cn } from "@/lib/cn";
import { devRoutesEnabled } from "@/lib/site";

import { ComponentsShowcase } from "./components-showcase";

/*
 * Dev-only review page mirroring "bX DS - Foundations.dc.html".
 * Available in development, or in a build with ENABLE_DEV_ROUTES=true. Never indexed.
 * It grows with each primitive (T10 onwards).
 */

export const metadata: Metadata = {
  title: "Foundations (dev)",
  robots: { index: false, follow: false },
};

const colourGroups: { title: string; tone?: "deep"; swatches: [string, string, string][] }[] = [
  {
    title: "Ground and surfaces",
    swatches: [
      ["bg-ground", "--bg", "Page ground"],
      ["bg-surface", "--surface", "Cards, bands, inputs, header"],
      ["bg-hairline", "--hairline", "Dividers, card and chip borders"],
      ["bg-strong", "--border-strong", "Input borders, outlined buttons"],
    ],
  },
  {
    title: "Text",
    swatches: [
      ["bg-ink", "--text", "Headings, body, metric numbers"],
      ["bg-muted", "--text-muted", "Secondary text, captions"],
      ["bg-link", "--link", "Links, eyebrows (interaction)"],
    ],
  },
  {
    title: "Status text",
    swatches: [
      ["bg-success", "--success-text", "Success, always with a word"],
      ["bg-warning", "--warning-text", "Warning"],
      ["bg-danger", "--danger-text", "Errors, prefixed Error:"],
    ],
  },
  {
    title: "Brand fills (never text on light)",
    swatches: [
      ["bg-brand-cyan", "--brand-cyan", "Primary button, signature rule"],
      ["bg-brand-cyan-hover", "--brand-cyan-hover", "Primary hover [added]"],
      ["bg-brand-green", "--brand-green", "Status dots only"],
      ["bg-selected", "--selected-fill", "Selected radio pill [added]"],
    ],
  },
  {
    title: "Navy bands",
    tone: "deep",
    swatches: [
      ["bg-deep", "--brand-deep", "Band ground"],
      ["bg-on-deep", "--on-deep", "Headings on navy"],
      ["bg-on-deep-muted", "--on-deep-muted", "Body on navy"],
      ["bg-on-deep-accent", "--on-deep-accent", "Eyebrows, links on navy"],
      ["bg-deep-hairline", "--deep-hairline", "Dividers on navy"],
      ["bg-deep-panel", "--deep-panel", "Filled diagram boxes"],
      ["bg-deep-border", "--deep-border", "Outlined diagram boxes [added]"],
    ],
  },
];

const typeScale: { cls: string; label: string; sample: string; mono?: boolean }[] = [
  {
    cls: "text-display",
    label: "display · clamp(40, 4.6vw, 64) / 1.063 · 600",
    sample: "We put AI agents into production",
  },
  {
    cls: "text-h1",
    label: "h1 · clamp(34, 4vw, 48) / 1.125 · 600",
    sample: "Engineering that ships",
  },
  { cls: "text-h2", label: "h2 · clamp(28, 3vw, 36) / 1.1667 · 600", sample: "How we work" },
  { cls: "text-h3", label: "h3 · 24 / 32 · 600", sample: "Agentic AI and agents" },
  { cls: "text-h4", label: "h4 · 20 / 28 · 600", sample: "Retrieval and tools" },
  {
    cls: "text-body-lg",
    label: "body-lg · 18 / 28",
    sample: "Seven years building custom software, web and mobile systems.",
  },
  {
    cls: "text-body",
    label: "body · 16 / 26",
    sample: "We design, build and operate the agentic and generative layers.",
  },
  {
    cls: "text-small",
    label: "small · 14 / 22",
    sample: "Delivering from Islamabad and Duisburg.",
  },
  { cls: "text-metric", label: "metric · 48 / 52 · 600 · navy", sample: "68%" },
  { cls: "text-metric-inline", label: "metric inline · 28 / 34 · 600 · navy", sample: "3.2×" },
  { cls: "text-chip font-mono", label: "chip · mono 13 / 18", sample: "Kubernetes", mono: true },
];

const spaceScale = [4, 8, 12, 16, 24, 32, 48, 64, 96];

const radii: [string, string][] = [
  ["rounded-sm", "sm · 4 · inputs, chips"],
  ["rounded-md", "md · 8 · buttons, diagram boxes"],
  ["rounded-lg", "lg · 12 · cards, form cards"],
  ["rounded-xl", "xl · 16 · featured panels"],
  ["rounded-pill", "pill · filter pills, badges"],
];

function Heading({ children }: { children: React.ReactNode }) {
  return <h2 className="mb-6 text-h3">{children}</h2>;
}

export default function FoundationsPage() {
  if (!devRoutesEnabled) notFound();

  return (
    <>
      <Section tone="ground" className="relative isolate overflow-hidden">
        <HeroGridBackdrop />
        <p className="eyebrow text-link">bX Light · Design system</p>
        <h1 className="mt-4 text-h1">Foundations</h1>
        <p className="mt-4 measure text-body-lg text-muted">
          Tokens and primitives as implemented. Compare against bX DS - Foundations.dc.html in the
          design handoff. This page is for review only and is never published.
        </p>
      </Section>

      <JumpBar
        links={[
          { href: "#colour", label: "Colour" },
          { href: "#type", label: "Typography" },
          { href: "#spacing", label: "Spacing" },
          { href: "#layout", label: "Layout" },
          { href: "#components", label: "Components" },
          { href: "#timeline", label: "Timeline" },
          { href: "#contact", label: "Contact band" },
        ]}
      />

      <Section tone="surface" aria-labelledby="colour">
        <h2 id="colour" className="sr-only">
          Colour
        </h2>
        <div className="grid gap-12">
          {colourGroups.map((group) => (
            <div key={group.title}>
              <Heading>{group.title}</Heading>
              <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {group.swatches.map(([cls, token, use]) => (
                  <li key={token} className="overflow-hidden rounded-lg border border-hairline">
                    <div className={cn("h-20 border-b border-hairline", cls)} />
                    <div className="bg-surface p-4">
                      <p className="font-mono text-chip">{token}</p>
                      <p className="mt-1 text-small text-muted">{use}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="ground" aria-labelledby="type">
        <Heading>
          <span id="type">Typography</span>
        </Heading>
        <p className="mb-8 text-small text-muted">
          Inter 400/500/600 · JetBrains Mono 400/500 · self-hosted
        </p>
        <p className="mb-8 eyebrow">Eyebrow · mono 13 / 18 · 500 · 0.14em · uppercase</p>
        <ul className="grid divide-y divide-hairline">
          {typeScale.map((t) => (
            <li key={t.cls} className="grid gap-2 py-5 xl:grid-cols-[280px_1fr] xl:items-baseline">
              <span className="font-mono text-chip text-muted">{t.label}</span>
              <span className={t.cls}>{t.sample}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="surface" aria-labelledby="spacing">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <Heading>
              <span id="spacing">Spacing</span>
            </Heading>
            <ul className="grid gap-3">
              {spaceScale.map((px, i) => (
                <li key={px} className="flex items-center gap-4">
                  <span className="w-36 font-mono text-chip text-muted">
                    --space-{i + 1} · {px}
                  </span>
                  <span className="h-3 rounded-sm bg-brand-cyan" style={{ width: px }} />
                </li>
              ))}
            </ul>
            <p className="mt-6 text-small text-muted">
              Content 1200px · gutter clamp(16, 4vw, 24) · section clamp(64, 8vw, 96)
            </p>
          </div>
          <div>
            <Heading>Radius and elevation</Heading>
            <ul className="grid grid-cols-2 gap-4">
              {radii.map(([cls, label]) => (
                <li key={cls} className="grid gap-2">
                  <div className={cn("h-16 border border-strong bg-ground", cls)} />
                  <span className="font-mono text-chip text-muted">{label}</span>
                </li>
              ))}
              <li className="grid gap-2">
                <div className="h-16 rounded-lg bg-surface shadow-card" />
                <span className="font-mono text-chip text-muted">shadow-card · mega menu only</span>
              </li>
            </ul>
          </div>
        </div>
      </Section>

      <Section tone="ground" aria-labelledby="layout">
        <Heading>
          <span id="layout">Layout primitives</span>
        </Heading>
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <p className="mb-3 eyebrow">Signature rule</p>
            <div className="overflow-hidden rounded-lg border border-hairline bg-surface">
              <SignatureRule />
              <p className="p-6 text-small text-muted">
                3px, top of diagram cards, form cards and the contact band only.
              </p>
            </div>
          </div>
          <div>
            <p className="mb-3 eyebrow">Hero grid backdrop</p>
            <div className="relative isolate h-48 overflow-hidden rounded-lg border border-hairline bg-ground">
              <HeroGridBackdrop />
            </div>
          </div>
        </div>
      </Section>

      <ComponentsShowcase />

      <Section tone="surface">
        <p className="eyebrow text-link">Section · surface</p>
        <p className="mt-2 text-body text-muted">White band with hairlines top and bottom.</p>
      </Section>

      <Section tone="deep">
        <p className="eyebrow text-on-deep-accent">Section · deep</p>
        <h2 className="mt-4 text-h2">Navy band</h2>
        <p className="mt-4 measure text-body text-on-deep-muted">
          Body text on navy uses on-deep-muted. Focus rings switch to the navy accent here.
        </p>
        <p className="mt-6">
          <a href="#layout" className="font-semibold text-on-deep-accent">
            Focusable link on navy →
          </a>
        </p>
      </Section>
      <ContactBand />
    </>
  );
}
