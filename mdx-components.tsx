import type { MDXComponents } from "mdx/types";

/*
 * Required by @next/mdx in the App Router. Global defaults only: each renderer passes its own
 * component set (components/prose/article-components.tsx for articles; legal pages in T39).
 */
const components: MDXComponents = {};

export function useMDXComponents(): MDXComponents {
  return components;
}
