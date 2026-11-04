import createMDX from "@next/mdx";
import type { NextConfig } from "next";

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
  },
};

// Article and legal prose in content/**/*.mdx (no remark/rehype plugins needed).
const withMDX = createMDX({});

export default withMDX(nextConfig);
