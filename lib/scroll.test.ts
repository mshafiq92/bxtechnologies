import { describe, expect, it, vi } from "vitest";

import { scrollTopOnReloadScript } from "./scroll";

type Nav = { type: string } | undefined;

function run(nav: Nav, hash = "") {
  const history = { scrollRestoration: "auto" };
  const listeners: Record<string, () => void> = {};
  const win = {
    scrollTo: vi.fn(),
    addEventListener: (name: string, fn: () => void) => (listeners[name] = fn),
  };
  const performance = { getEntriesByType: () => (nav ? [nav] : []) };
  new Function("performance", "location", "history", "window", scrollTopOnReloadScript())(
    performance,
    { hash },
    history,
    win,
  );
  return { history, win, listeners };
}

describe("scroll to top on reload", () => {
  it("sends a reload to the top and turns browser restoration off for it", () => {
    const { history, win, listeners } = run({ type: "reload" });
    expect(history.scrollRestoration).toBe("manual");
    expect(win.scrollTo).toHaveBeenCalledWith(0, 0);
    expect(listeners.load).toBeTypeOf("function");
  });

  it("leaves normal visits and back/forward alone", () => {
    for (const type of ["navigate", "back_forward"]) {
      const { history, win } = run({ type });
      expect(history.scrollRestoration).toBe("auto");
      expect(win.scrollTo).not.toHaveBeenCalled();
    }
  });

  it("keeps a #section in the URL on reload", () => {
    const { win } = run({ type: "reload" }, "#mlops");
    expect(win.scrollTo).not.toHaveBeenCalled();
  });
});
