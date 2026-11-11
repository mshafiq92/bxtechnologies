import createMDX from "@next/mdx";
import type { NextConfig } from "next";

import { resolveNoIndex } from "./lib/site";

const nextConfig: NextConfig = {
  // Self-contained server build for Docker on the production VPS.
  output: "standalone",
  reactStrictMode: true,
  poweredByHeader: false,
  // MDX is only imported as content (articles, legal pages), never used as route files.
  pageExtensions: ["ts", "tsx"],
  experimental: {
    // Job applications carry a CV of up to 10 MB (plus the other fields).
    serverActions: { bodySizeLimit: "11mb" },
    // proxy.ts buffers request bodies up to this size; keep it at the server-action limit so
    // large CV uploads are not cut off.
    proxyClientMaxBodySize: "11mb",
  },
  // Single-service pages retired in favour of group pages (owner decision 2026-11-10).
  async redirects() {
    return [
      // Group pages renamed to industry-standard names (owner decision 2026-11-11).
      ...[
        ["agentic-ai", "ai-engineering"],
        ["ai-autonomy", "ai-engineering"],
        ["custom-software", "software-engineering"],
        ["product-quality", "software-engineering"],
        ["managed-it", "managed-it-services"],
        ["teams-advisory", "it-consulting"],
      ].map(([from, to]) => ({
        source: `/services/${from}`,
        destination: `/services/${to}`,
        permanent: true,
      })),
    ];
  },
  // Staging and previews: tell crawlers to stay out of every response, including images and files.
  async headers() {
    if (!resolveNoIndex()) return [];
    return [{ source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] }];
  },
};

// Article and legal prose in content/**/*.mdx (no remark/rehype plugins needed).
const withMDX = createMDX({});

export default withMDX(nextConfig);
