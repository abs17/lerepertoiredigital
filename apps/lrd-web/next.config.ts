import type { NextConfig } from "next";

// GitHub Pages serves project sites from https://<user>.github.io/<repo>, so the
// app has to be built with that sub-path baked in. The workflow passes the value
// from actions/configure-pages; locally it stays empty so `next dev` works at /.
const rawBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const basePath = rawBasePath === "/" ? "" : rawBasePath.replace(/\/$/, "");

const nextConfig: NextConfig = {
  // Emit a fully static site into `out/` — Pages has no Node.js server.
  output: "export",
  basePath,
  assetPrefix: basePath || undefined,
  // Every route is exported as `<route>/index.html`, which is what Pages serves
  // for a directory URL.
  trailingSlash: true,
  images: {
    // The default loader needs the Next.js image optimization server.
    unoptimized: true,
  },
};

export default nextConfig;
