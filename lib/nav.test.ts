import { describe, expect, it } from "vitest";

import { activeNavKey } from "./nav";

describe("activeNavKey", () => {
  it.each([
    ["/", null],
    ["/contact", null],
    ["/services", "services"],
    ["/services/agentic-ai", "services"],
    ["/work", "work"],
    ["/insights/some-article", "insights"],
    ["/about", "company"],
    ["/industries", "company"],
    ["/careers/apply", "company"],
    ["/services/", "services"],
    ["/servicesx", null],
  ])("%s → %s", (path, expected) => {
    expect(activeNavKey(path)).toBe(expected);
  });
});
