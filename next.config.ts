import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root so Next doesn't pick up a stray lockfile in a
  // parent directory (e.g. the home folder) when inferring the root.
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
