import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Container } from "./container";
import { HeroGridBackdrop } from "./hero-grid-backdrop";
import { Section } from "./section";
import { SignatureRule } from "./signature-rule";

describe("Section", () => {
  it("renders a section with tone, gutter and section padding", () => {
    render(<Section aria-label="Intro">Hello</Section>);
    const section = screen.getByRole("region", { name: "Intro" });
    expect(section).toHaveAttribute("data-tone", "ground");
    expect(section.className).toContain("px-(--gutter)");
    expect(section.className).toContain("py-(--section)");
  });

  it("gives surface bands hairlines and navy bands the deep tone", () => {
    const { rerender } = render(<Section tone="surface" aria-label="S" />);
    expect(screen.getByRole("region", { name: "S" }).className).toContain("border-y");
    rerender(<Section tone="deep" aria-label="S" />);
    expect(screen.getByRole("region", { name: "S" })).toHaveAttribute("data-tone", "deep");
  });

  it("wraps children in the 1200px container unless contained is false", () => {
    const { rerender } = render(
      <Section aria-label="S">
        <p>child</p>
      </Section>,
    );
    expect(screen.getByText("child").parentElement?.className).toContain("max-w-content");
    rerender(
      <Section aria-label="S" contained={false}>
        <p>child</p>
      </Section>,
    );
    expect(screen.getByText("child").parentElement?.tagName).toBe("SECTION");
  });
});

describe("Container", () => {
  it("supports the reading width and an optional gutter", () => {
    render(
      <Container width="reading" gutter>
        text
      </Container>,
    );
    const el = screen.getByText("text");
    expect(el.className).toContain("max-w-reading");
    expect(el.className).toContain("px-(--gutter)");
  });
});

describe("decorative primitives", () => {
  it("hides the signature rule and grid backdrop from assistive tech", () => {
    const { container } = render(
      <>
        <SignatureRule />
        <HeroGridBackdrop />
      </>,
    );
    expect(container.querySelector("[data-signature-rule]")).toHaveAttribute("aria-hidden", "true");
    expect(container.querySelector("[data-hero-grid]")).toHaveAttribute("aria-hidden", "true");
  });
});
