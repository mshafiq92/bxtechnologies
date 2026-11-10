/** Every public route of the site (role pages appear only while a role is published). */
export const routes = [
  "/",
  "/services",
  "/services/ai-autonomy",
  "/services/data-analytics",
  "/services/cloud-devops",
  "/services/managed-it",
  "/services/product-quality",
  "/services/teams-advisory",
  "/work",
  "/insights",
  "/insights/agent-projects-fail-at-the-evaluation-harness",
  "/about",
  "/industries",
  "/careers",
  "/careers/apply",
  "/contact",
  "/privacy",
  "/terms",
  "/cookies",
  "/imprint",
] as const;

/** Stable file-name for a route ("/" -> "home", "/services/agentic-ai" -> "services-agentic-ai"). */
export const routeName = (route: string) =>
  route === "/" ? "home" : route.slice(1).replace(/\//g, "-");
