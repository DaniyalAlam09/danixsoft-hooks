import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // Plain-Markdown hook pages for AI agents: /use-debounce.md
      { source: "/:slug(use-[a-z-]+).md", destination: "/md/:slug" },
    ];
  },
};

export default nextConfig;
