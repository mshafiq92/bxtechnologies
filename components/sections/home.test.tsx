import { fireEvent, render, screen, within } from "@testing-library/react";
import { useState } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import HomePage from "@/app/page";
import { RadioPills } from "@/components/forms/radio-pills";
import { getClientLogos, getServiceGroups } from "@/lib/content";

import { LogoMarquee } from "./logo-marquee";

// Forms post to server actions; stub them so UI tests don't need a request context.
vi.mock("@/lib/forms/actions", () => ({
  submitEnquiry: vi.fn(async () => ({ status: "success" })),
  subscribe: vi.fn(async () => ({ status: "success" })),
  submitApplication: vi.fn(async () => ({ status: "success" })),
}));

// jsdom has no matchMedia; the hero slider reads the reduced motion setting.
beforeEach(() => {
  window.matchMedia = vi.fn().mockReturnValue({
    matches: false,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }) as unknown as typeof window.matchMedia;
});

function Pills() {
  const [value, setValue] = useState("An idea");
  return (
    <RadioPills
      legend="Where are you starting from?"
      options={["An idea", "Existing system", "Team gap"]}
      value={value}
      onChange={setValue}
      name="stage"
    />
  );
}

describe("RadioPills", () => {
  it("is a labelled radiogroup with one checked option and one tab stop", () => {
    render(<Pills />);
    const group = screen.getByRole("radiogroup", { name: "Where are you starting from?" });
    const radios = within(group).getAllByRole("radio");
    expect(radios.map((r) => r.getAttribute("aria-checked"))).toEqual(["true", "false", "false"]);
    expect(radios.map((r) => r.tabIndex)).toEqual([0, -1, -1]);
  });

  it("selects on click and with arrow keys, wrapping around", () => {
    const { container } = render(<Pills />);
    const radios = screen.getAllByRole("radio");
    fireEvent.click(radios[2]!);
    expect(radios[2]).toHaveAttribute("aria-checked", "true");
    fireEvent.keyDown(radios[2]!, { key: "ArrowRight" });
    expect(radios[0]).toHaveAttribute("aria-checked", "true");
    expect(radios[0]).toHaveFocus();
    fireEvent.keyDown(radios[0]!, { key: "ArrowLeft" });
    expect(radios[2]).toHaveAttribute("aria-checked", "true");
    expect(container.querySelector<HTMLInputElement>('input[name="stage"]')?.value).toBe(
      "Team gap",
    );
  });
});

describe("LogoMarquee", () => {
  it("renders nothing when no logo is cleared", () => {
    const { container } = render(<LogoMarquee label="Clients & partners" logos={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("names each logo once and hides the duplicated loop from assistive tech", () => {
    const logos = getClientLogos();
    render(<LogoMarquee label="Clients & partners" logos={logos} />);
    for (const logo of logos) {
      expect(screen.getAllByRole("img", { name: logo.name })).toHaveLength(1);
    }
    const items = screen.getAllByRole("listitem", { hidden: true });
    expect(items).toHaveLength(logos.length * 2);
    expect(items.filter((li) => li.getAttribute("aria-hidden") === "true")).toHaveLength(
      logos.length,
    );
  });
});

describe("Home page", () => {
  it("renders every designed section in order", () => {
    const { container } = render(<HomePage />);
    const ids = Array.from(container.querySelectorAll("section[id]")).map((s) => s.id);
    expect(ids).toEqual([
      "top",
      "capabilities",
      "work",
      "process",
      "engagement",
      "industries",
      "insights",
      "contact",
    ]);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "We put AI agents into production software that already works.",
    );
  });

  it("rotates whole banners, with a diagram of the service groups except Teams", () => {
    const { container } = render(<HomePage />);
    const hero = within(container.querySelector<HTMLElement>("#top")!);
    expect(hero.getByRole("heading", { level: 2, hidden: true })).toHaveTextContent(
      "Engineering for AI that runs in production.",
    );
    // The second slide is hidden from assistive tech until it shows, so query the DOM directly.
    expect(
      container.querySelector('[aria-roledescription="slide"][aria-label="All services"]'),
    ).not.toBeNull();
    expect(hero.queryByRole("tab")).toBeNull();
    expect(container.querySelector('#top a[href="/services#teams"]')).toBeNull();
    for (const group of getServiceGroups().filter((g) => g.key !== "teams")) {
      expect(container.querySelector(`#top a[href="/services#${group.key}"]`)).toHaveTextContent(
        group.name,
      );
    }
  });

  it("has one h1 and no links to design files", () => {
    const { container } = render(<HomePage />);
    expect(container.querySelectorAll("h1")).toHaveLength(1);
    for (const a of Array.from(container.querySelectorAll("a[href]"))) {
      expect(a.getAttribute("href")).not.toMatch(/\.dc\.html/);
    }
  });

  it("shows each service group as a card with an Explore link and service names", () => {
    const { container } = render(<HomePage />);
    const services = within(container.querySelector<HTMLElement>("#capabilities")!);
    expect(services.getAllByRole("article")).toHaveLength(6);
    for (const [name, key] of [
      ["AI & Autonomy", "ai"],
      ["Data & Analytics", "data"],
      ["Cloud & DevOps", "cloud"],
      ["Managed IT", "managed"],
      ["Product & Quality", "product"],
      ["Teams & Advisory", "teams"],
    ]) {
      expect(services.getByRole("link", { name: `Explore ${name}` })).toHaveAttribute(
        "href",
        `/services#${key}`,
      );
    }
    expect(services.getByText("Technical support (L1-L3)")).toBeInTheDocument();
  });

  it("shows the success state when the enquiry action succeeds", async () => {
    render(<HomePage />);
    const form = screen.getByRole("form", { name: "Request a technical call" });
    fireEvent.submit(form);
    expect(await within(form).findByRole("status")).toHaveTextContent(
      "Received. An engineer will reply within one working day.",
    );
  });
});
