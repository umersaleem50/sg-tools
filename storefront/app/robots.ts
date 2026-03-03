import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/_next/"],
    },
    host: "https://sgtools.rs",
    sitemap: "https://sgtools.rs/sitemap.xml",
  };
}
