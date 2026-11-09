import { Avatar } from "@/components/ui/avatar";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button, ButtonLink } from "@/components/ui/button";
import { CardLink } from "@/components/ui/card";
import { ChipList, Tag } from "@/components/ui/chip";
import { DiagramCard, type HeroDiagram } from "@/components/ui/diagram-card";
import { Faq } from "@/components/ui/faq";
import { MetricInlineList, MetricLarge, MetricsStrip } from "@/components/ui/metric";
import { OpenColumn } from "@/components/ui/open-column";
import { Section } from "@/components/ui/section";
import { Badge, StatusDot } from "@/components/ui/status";
import { TextLink } from "@/components/ui/text-link";
import { Timeline } from "@/components/ui/timeline";
import { Eyebrow, SectionHeader } from "@/components/ui/typography";

/* Sample data copied from the design files, for review only. */

const homeDiagram: HeroDiagram = {
  caption: "How we build agents",
  entry: { t: "Channel", d: "web · WhatsApp · email" },
  core: { t: "Orchestrator", d: "planner · router" },
  support: [
    { t: "Retrieval", d: "vector + SQL" },
    { t: "Tools", d: "ERP · CRM" },
    { t: "Guardrails", d: "policy · PII" },
  ],
  outcomes: [{ t: "Eval & observability", d: "traces · regressions · cost" }],
  status: { t: "Deployed & monitored", d: "142 evals passing", detailTone: "status" },
};

const cloudDiagram: HeroDiagram = {
  caption: "One path to production",
  entry: { t: "Commit", d: "pull request · review" },
  core: { t: "Pipeline", d: "build · test · scan" },
  support: [
    { t: "Staging", d: "same IaC as prod" },
    { t: "Policy", d: "cost · security checks" },
  ],
  outcomes: [
    { t: "Production", d: "staged rollout" },
    { t: "Rollback", d: "one command" },
  ],
  status: { t: "Monitored after every deploy", d: "metrics · logs · alerts" },
};

const steps = [
  {
    num: "01",
    title: "Discovery",
    text: "Two weeks with your team to map the workflow, the data and the risks.",
    chips: ["Workshop", "Data audit"],
  },
  {
    num: "02",
    title: "Pilot",
    text: "A working slice in production, measured against an agreed baseline.",
    chips: ["Evals", "Baseline"],
  },
  {
    num: "03",
    title: "Scale",
    text: "Harden, monitor and hand over, with the same engineers on call.",
    chips: ["SLOs", "Runbooks"],
  },
];

const faqs = [
  {
    q: "Does our data go to a model provider?",
    a: "Only if you decide it should. We deploy against hosted APIs, models inside your own cloud tenancy, or open-weight models on infrastructure you control.",
  },
  {
    q: "How long does a pilot take?",
    a: "Usually six to ten weeks from kickoff to a measured result in production.",
  },
  {
    q: "Who owns the code?",
    a: "You do, from the first commit.",
  },
];

function Demo({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-4 border-t border-hairline pt-6">
      <h3 className="text-h4">{title}</h3>
      {children}
    </div>
  );
}

export function ComponentsShowcase() {
  return (
    <>
      <Section tone="ground" id="components" aria-labelledby="components-heading">
        <SectionHeader
          eyebrow="Components"
          title={<span id="components-heading">The parts every page is built from.</span>}
          aside="Atoms, buttons and content blocks (T11, T12). Sample copy is taken from the design files."
        />
        <div className="mt-12 grid gap-12">
          <Demo title="Buttons and links">
            <div className="flex flex-wrap items-center gap-4">
              <ButtonLink href="#components">Book a technical call</ButtonLink>
              <ButtonLink href="#components" variant="secondary" arrow>
                See the work
              </ButtonLink>
              <Button size="header">Start a project</Button>
              <TextLink href="#components">Explore</TextLink>
            </div>
            <p className="text-small text-muted">
              One cyan primary per screen region. 48px high, radius 8, navy label.
            </p>
          </Demo>

          <div className="grid gap-12 lg:grid-cols-2">
            <Demo title="Badges and status">
              <div className="flex flex-wrap gap-3">
                <Badge tone="delivered">Delivered</Badge>
                <Badge tone="progress">In build</Badge>
                <Badge tone="pending">Pending figures</Badge>
              </div>
              <StatusDot className="text-small text-muted">
                In production · Logistics, Retail
              </StatusDot>
            </Demo>
            <Demo title="Eyebrow, tags and chips">
              <Eyebrow>AI · MLOps · DevOps · Managed IT</Eyebrow>
              <div className="flex flex-wrap gap-2">
                <Tag>Agentic AI</Tag>
                <Tag>Cloud</Tag>
                <Tag>Custom software</Tag>
              </div>
              <ChipList items={["Python", "LangGraph", "PostgreSQL", "Kubernetes"]} />
            </Demo>
          </div>

          <div className="grid gap-12 lg:grid-cols-2">
            <Demo title="Breadcrumb and avatar">
              <Breadcrumb
                items={[
                  { label: "Home", href: "/" },
                  { label: "Services", href: "/services" },
                  { label: "Cloud & DevOps" },
                ]}
              />
              <div className="flex items-center gap-3">
                <Avatar name="[Name]" />
                <Avatar name="Muhammad Shafiq" />
                <Avatar name="Ana Weber" size={40} />
              </div>
            </Demo>
            <Demo title="Inline metrics (navy, never green)">
              <MetricInlineList
                className="border-t border-hairline pt-6"
                items={[
                  { value: "68%", label: "faster claims triage" },
                  { value: "3.2×", label: "more online bookings" },
                  { value: "9 hrs", label: "saved weekly on tenders" },
                ]}
              />
            </Demo>
          </div>

          <Demo title="Proof strip">
            <MetricsStrip
              label="Delivered"
              sublabel="measured, not claimed"
              items={[
                { value: "94%", label: "on-time delivery" },
                { value: "8/10", label: "clients retained past first project" },
                { value: "81%", label: "automated test coverage" },
                { value: "4", label: "countries served" },
              ]}
            />
          </Demo>

          <Demo title="Open columns and large metrics">
            <div className="grid gap-x-6 gap-y-12 md:grid-cols-2 2xl:grid-cols-4">
              <OpenColumn
                number="01"
                title="ML and MLOps"
                items={["Training pipelines", "Model registry", "Drift monitoring"]}
                footer={<TextLink href="#components">Explore</TextLink>}
              >
                Models trained, versioned and monitored on pipelines your team can own.
              </OpenColumn>
              <OpenColumn
                number="02"
                title="Data & Analytics"
                footer={
                  <StatusDot className="border-t border-hairline pt-3.5 text-small text-muted">
                    In production · Retail, Energy
                  </StatusDot>
                }
              >
                Pipelines, warehouses and platforms that keep running after handover.
              </OpenColumn>
              <MetricLarge
                value="68%"
                description="Faster claims triage"
                sector="Insurance · DACH · NDA"
              />
              <MetricLarge
                value="3.2×"
                description="More online bookings"
                sector="Healthcare · UK · NDA"
              />
            </div>
          </Demo>

          <Demo title="Card">
            <div className="grid gap-6 lg:grid-cols-3">
              <CardLink href="#components">
                <span className="font-mono text-[12px] leading-[18px] tracking-[0.12em] text-link uppercase">
                  Agentic AI
                </span>
                <span className="text-metric text-ink" data-metric="">
                  68%
                </span>
                <p>Claims triage agent for a regional insurer. Sector · Region · NDA.</p>
                <ChipList
                  items={["Python", "LangGraph", "Azure"]}
                  className="mt-auto border-t border-hairline pt-4"
                />
              </CardLink>
            </div>
          </Demo>

          <Demo title="Diagram cards (flow: Home · stack: Service Detail)">
            <div className="grid items-start gap-8 lg:grid-cols-2">
              <DiagramCard diagram={homeDiagram} layout="flow" />
              <DiagramCard diagram={cloudDiagram} layout="stack" />
            </div>
          </Demo>

          <Demo title="FAQ accordion">
            <div className="flex flex-wrap items-start gap-x-12 gap-y-8">
              <div className="flex flex-[1_1_280px] flex-col gap-4">
                <Eyebrow>Questions</Eyebrow>
                <p className="text-body text-muted">First item open, one open at a time.</p>
              </div>
              <Faq items={faqs} className="flex-[2_1_520px]" />
            </div>
          </Demo>
        </div>
      </Section>

      <Section tone="deep" id="timeline" aria-labelledby="timeline-heading">
        <SectionHeader
          eyebrow="How we work"
          title={
            <span id="timeline-heading" className="text-on-deep">
              Timeline on a navy band
            </span>
          }
        />
        <Timeline steps={steps} className="mt-12" />
      </Section>
    </>
  );
}
