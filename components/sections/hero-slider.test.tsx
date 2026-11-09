import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { HeroSlider } from "./hero-slider";

function setReducedMotion(matches: boolean) {
  window.matchMedia = vi.fn().mockReturnValue({
    matches,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }) as unknown as typeof window.matchMedia;
}

const renderSlider = () =>
  render(
    <HeroSlider
      label="Highlights"
      pauseLabel="Pause"
      playLabel="Play"
      slides={[
        { label: "First", content: <p>One</p> },
        { label: "Second", content: <p>Two</p> },
      ]}
    />,
  );

const activeSlide = () =>
  document
    .querySelector('[aria-roledescription="slide"]:not([aria-hidden])')
    ?.getAttribute("aria-label");
const advance = () => act(() => vi.advanceTimersByTime(10000));

beforeEach(() => {
  vi.useFakeTimers();
  setReducedMotion(false);
});
afterEach(() => vi.useRealTimers());

describe("HeroSlider", () => {
  it("starts on the first slide and advances on the timer, wrapping around", () => {
    renderSlider();
    expect(activeSlide()).toBe("First");
    advance();
    expect(activeSlide()).toBe("Second");
    advance();
    expect(activeSlide()).toBe("First");
  });

  it("offers only the keyboard Pause button, hidden until focused", () => {
    renderSlider();
    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(1);
    expect(buttons[0]?.className).toContain("sr-only");
  });

  it("pauses and plays with that button", () => {
    renderSlider();
    fireEvent.click(screen.getByRole("button", { name: "Pause" }));
    advance();
    expect(activeSlide()).toBe("First");
    fireEvent.click(screen.getByRole("button", { name: "Play" }));
    advance();
    expect(activeSlide()).toBe("Second");
  });

  it("holds while the pointer is inside", () => {
    const { container } = renderSlider();
    const root = container.firstElementChild!;
    fireEvent.mouseEnter(root);
    advance();
    expect(activeSlide()).toBe("First");
    fireEvent.mouseLeave(root);
    advance();
    expect(activeSlide()).toBe("Second");
  });

  it("holds while focus is inside", () => {
    renderSlider();
    const button = screen.getByRole("button");
    act(() => button.focus());
    advance();
    expect(activeSlide()).toBe("First");
    act(() => button.blur());
    advance();
    expect(activeSlide()).toBe("Second");
  });

  it("holds after a tap until a touch outside", () => {
    const { container } = renderSlider();
    const root = container.firstElementChild!;
    fireEvent.pointerDown(root, { pointerType: "touch" });
    fireEvent.click(root);
    advance();
    expect(activeSlide()).toBe("First");
    fireEvent.pointerDown(document.body, { pointerType: "touch" });
    advance();
    expect(activeSlide()).toBe("Second");
  });

  it("has no timer and no pause button under reduced motion", () => {
    setReducedMotion(true);
    renderSlider();
    advance();
    expect(activeSlide()).toBe("First");
    expect(screen.queryByRole("button")).toBeNull();
  });
});
