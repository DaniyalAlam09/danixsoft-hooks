import type { NextConfig } from "next";

// Static export, served by Cloudflare Workers static assets.
// The plain-Markdown hook pages (/use-debounce.md -> /md/use-debounce) used to be a
// rewrites() entry; exports don't run rewrites, so scripts/write-cf-routing.mjs
// writes them into out/_redirects as 200 rewrites after the build.
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
