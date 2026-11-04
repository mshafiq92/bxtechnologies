/*
 * Article bodies, keyed by insight slug. Add a line here when an article's MDX is written
 * (and set `hasBody: true` in content/insights.ts). A content test checks the two agree.
 */
import type { MDXContent } from "mdx/types";

export const insightBodies: Record<string, () => Promise<{ default: MDXContent }>> = {
  "agent-projects-fail-at-the-evaluation-harness": () =>
    import("./agent-projects-fail-at-the-evaluation-harness.mdx"),
};
