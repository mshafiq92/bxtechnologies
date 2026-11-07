import { act, fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { getNavigation } from "@/lib/content";

import { Header } from "./header";

let mockPath = "/";
vi.mock("next/navigation", () => ({ usePathname: () => mockPath }));

// jsdom has no matchMedia; the header uses it while the mobile menu is open.
beforeEach(() => {
  mockPath = "/";
  window.matchMedia = vi.fn().mockReturnValue({
    matches: false,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }) as unknown as typeof window.matchMedia;
});

const renderHeader = () => render(<Header nav={getNavigation()} />);

const servicesLink = () =>
  screen
    .getAllByRole("link", { name: /^Services/ })
    .find((el) => el.hasAttribute("aria-expanded"))!;
const megaMenu = () => document.getElementById("bx-mega-menu")!;

describe("Header: mega menu", () => {
  it("is closed by default", () => {
    renderHeader();
    expect(servicesLink()).toHaveAttribute("aria-expanded", "false");
    expect(megaMenu()).not.toBeVisible();
  });

  it("opens on hover and on focus of Services", () => {
    renderHeader();
    fireEvent.mouseEnter(servicesLink());
    expect(servicesLink()).toHaveAttribute("aria-expanded", "true");
    expect(megaMenu()).toBeVisible();
    fireEvent.mouseLeave(screen.getByRole("banner"));
    expect(megaMenu()).not.toBeVisible();
    act(() => servicesLink().focus());
    expect(megaMenu()).toBeVisible();
  });

  it("lists the four service groups with their links", () => {
    renderHeader();
    fireEvent.mouseEnter(servicesLink());
    for (const group of [
      "AI & Autonomy",
      "Data & Cloud",
      "Product Engineering",
      "Teams & Advisory",
    ]) {
      expect(screen.getByText(group)).toBeInTheDocument();
    }
    expect(screen.getByRole("link", { name: "Cloud & DevOps" })).toHaveAttribute(
      "href",
      "/services/cloud-devops",
    );
  });

  it("closes on Escape and returns focus to Services", () => {
    renderHeader();
    act(() => servicesLink().focus());
    expect(megaMenu()).toBeVisible();
    fireEvent.keyDown(document, { key: "Escape" });
    expect(megaMenu()).not.toBeVisible();
    expect(servicesLink()).toHaveFocus();
  });

  it("closes when another nav item is hovered", () => {
    renderHeader();
    fireEvent.mouseEnter(servicesLink());
    const work = screen.getAllByRole("link", { name: "Work" })[0]!;
    fireEvent.mouseEnter(work);
    expect(megaMenu()).not.toBeVisible();
  });
});

const companyLink = () =>
  screen.getAllByRole("link", { name: /^Company/ }).find((el) => el.hasAttribute("aria-expanded"))!;
const companyMenu = () => document.getElementById("bx-company-menu")!;

describe("Header: Company menu", () => {
  it("is closed by default, and Company still links to About", () => {
    renderHeader();
    expect(companyLink()).toHaveAttribute("aria-expanded", "false");
    expect(companyLink()).toHaveAttribute("href", "/about");
    expect(companyMenu()).not.toBeVisible();
  });

  it("opens on hover and lists About us, Industries and Careers", () => {
    renderHeader();
    fireEvent.mouseEnter(companyLink());
    expect(companyMenu()).toBeVisible();
    const hrefs = Array.from(companyMenu().querySelectorAll("a")).map((a) =>
      a.getAttribute("href"),
    );
    expect(hrefs).toEqual(["/about", "/industries", "/careers"]);
  });

  it("only one dropdown is open at a time", () => {
    renderHeader();
    fireEvent.mouseEnter(servicesLink());
    fireEvent.mouseEnter(companyLink());
    expect(companyMenu()).toBeVisible();
    expect(megaMenu()).not.toBeVisible();
  });

  it("closes on Escape and returns focus to Company", () => {
    renderHeader();
    act(() => companyLink().focus());
    expect(companyMenu()).toBeVisible();
    fireEvent.keyDown(document, { key: "Escape" });
    expect(companyMenu()).not.toBeVisible();
    expect(companyLink()).toHaveFocus();
  });
});

describe("Header: active state", () => {
  it("marks the current section with aria-current", () => {
    mockPath = "/services/cloud-devops";
    renderHeader();
    expect(servicesLink()).toHaveAttribute("aria-current", "page");
  });

  it("maps company pages to Company", () => {
    mockPath = "/careers/apply";
    renderHeader();
    const company = screen.getAllByRole("link", { name: /^Company/ })[0]!;
    expect(company).toHaveAttribute("aria-current", "page");
  });
});

describe("Header: mobile menu", () => {
  it("toggles the panel, label and scroll lock", () => {
    renderHeader();
    const button = screen.getByRole("button", { name: "Menu" });
    const panel = document.getElementById("bx-mobile-nav")!;
    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(panel).not.toBeVisible();

    fireEvent.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");
    expect(button).toHaveTextContent("Close");
    expect(panel).toBeVisible();
    expect(document.documentElement.style.overflow).toBe("hidden");

    fireEvent.keyDown(document, { key: "Escape" });
    expect(panel).not.toBeVisible();
    expect(button).toHaveFocus();
    expect(document.documentElement.style.overflow).toBe("");
  });

  it("traps Tab focus inside the open menu", () => {
    renderHeader();
    const button = screen.getByRole("button", { name: "Menu" });
    fireEvent.click(button);
    const panelLinks = Array.from(
      document.getElementById("bx-mobile-nav")!.querySelectorAll<HTMLElement>("a[href]"),
    );
    const last = panelLinks[panelLinks.length - 1]!;

    act(() => last.focus());
    fireEvent.keyDown(last, { key: "Tab" });
    expect(button).toHaveFocus();

    fireEvent.keyDown(button, { key: "Tab", shiftKey: true });
    expect(last).toHaveFocus();
  });
});
