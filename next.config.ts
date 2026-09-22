import type { NextConfig } from "next";

// Static export for GitHub Pages. Served from the account root
// (skypixeldigitals-max.github.io), so no basePath is needed and the
// absolute /brand and /frames asset paths resolve as-is.
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
