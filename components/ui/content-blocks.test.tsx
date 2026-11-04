import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { initialsOf } from "./avatar";
import { DiagramCard } from "./diagram-card";
import { Faq } from "./faq";
import { JumpBar } from "./jump-bar";
import { MetricInlineList } from "./metric";
import { isExternalHref, SmartLink } from "./smart-link";
import { StatusDot } from "./status";

const faqs = [
  { q: "First question?", a: "First answer." },
  { q: "Second question?", a: "Second answer." },
  { q: "Third question?", a: "Third answer." },
];

describe("Faq", () => {
  it("opens the first item by default", () => {
    render(<Faq items={faqs} />);
    expect(screen.getByRole("button", { name: /First question/ })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
    expect(screen.getByText("First answer.")).toBeVisible();
    expect(screen.getByText("Second answer.")).not.toBeVisible();
  });

  it("keeps only one item open at a time", () => {
    render(<Faq items={faqs} />);
    fireEvent.click(screen.getByRole("button", { name: /Second question/ }));
    expect(screen.getByRole("button", { name: /First question/ })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
    expect(screen.getByRole("button", { name: /Second question/ })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
    expect(screen.getByText("Second answer.")).toBeVisible();
    expect(screen.getByText("First answer.")).not.toBeVisible();
  });

  it("closes the open item when clicked again", () => {
    render(<Faq items={faqs} />);
    const first = screen.getByRole("button", { name: /First question/ });
    fireEvent.click(first);
    expect(first).toHaveAttribute("aria-expanded", "false");
  });

  it("links each button to its answer panel", () => {
    render(<Faq items={faqs} />);
    const button = screen.getByRole("button", { name: /First question/ });
    const panel = document.getElementById(button.getAttribute("aria-controls")!);
    expect(panel).toHaveTextContent("First answer.");
    expect(panel).toHaveAttribute("aria-labelledby", button.id);
  });
});

describe("JumpBar", () => {
  it("renders anchor links and marks the page as having a jump bar", () => {
    render(
      <JumpBar
        links={[
          { href: "#ai", label: "AI & Autonomy" },
          { href: "#data", label: "Data & Cloud" },
        ]}
      />,
    );
    const nav = screen.getByRole("navigation", { name: "Jump to" });
    expect(nav).toHaveAttribute("data-jump-bar");
    expect(screen.getByRole("link", { name: "Data & Cloud" })).toHaveAttribute("href", "#data");
  });
});

describe("Metrics", () => {
  it("renders values navy, never green", () => {
    render(<MetricInlineList items={[{ value: "68%", label: "faster claims triage" }]} />);
    const value = screen.getByText("68%");
    expect(value.className).toContain("text-ink");
    expect(value.className).not.toMatch(/status|green|success/);
  });
});

describe("StatusDot", () => {
  it("always renders words beside the dot", () => {
    render(<StatusDot>Deployed & monitored</StatusDot>);
    expect(screen.getByText("Deployed & monitored")).toBeInTheDocument();
  });
});

describe("DiagramCard", () => {
  it("renders caption, boxes and status from the heroDiagram shape", () => {
    render(
      <DiagramCard
        diagram={{
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
        }}
      />,
    );
    expect(screen.getByRole("figure")).toContainElement(
      screen.getByText("One path to production", { selector: "figcaption" }),
    );
    for (const t of ["Commit", "Pipeline", "Staging", "Policy", "Production", "Rollback"]) {
      expect(screen.getByText(t)).toBeInTheDocument();
    }
    expect(screen.getByText("Monitored after every deploy")).toBeInTheDocument();
  });
});

describe("helpers", () => {
  it("builds initials for avatars", () => {
    expect(initialsOf("Muhammad Shafiq")).toBe("MS");
    expect(initialsOf("[Name]")).toBe("N");
    expect(initialsOf("Ana Maria Weber")).toBe("AW");
  });

  it("detects external links", () => {
    expect(isExternalHref("mailto:info@bxtechnologies.net")).toBe(true);
    expect(isExternalHref("https://linkedin.com")).toBe(true);
    expect(isExternalHref("/services")).toBe(false);
    expect(isExternalHref("#faq")).toBe(false);
  });

  it("opens web links in a new tab but not mailto links", () => {
    render(
      <>
        <SmartLink href="https://linkedin.com/company/bx-technologies">LinkedIn</SmartLink>
        <SmartLink href="mailto:info@bxtechnologies.net">Email</SmartLink>
      </>,
    );
    expect(screen.getByRole("link", { name: "LinkedIn" })).toHaveAttribute("target", "_blank");
    expect(screen.getByRole("link", { name: "Email" })).not.toHaveAttribute("target");
  });
});
