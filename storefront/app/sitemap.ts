import type { MetadataRoute } from "next";

import { getSitemapProducts } from "@/lib/api";
import { getCategorySlugs } from "@/lib/categories";

const BASE_URL = "https://sgtools.rs";

const staticPages = [
  { path: "/", changeFrequency: "weekly" as const, priority: 1.0 },
  { path: "/o-nama", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/kontakt", changeFrequency: "monthly" as const, priority: 0.6 },
  {
    path: "/cesta-pitanja",
    changeFrequency: "monthly" as const,
    priority: 0.6,
  },
  { path: "/gde-kupiti", changeFrequency: "monthly" as const, priority: 0.7 },
  {
    path: "/proizvodi/kategorije",
    changeFrequency: "weekly" as const,
    priority: 0.9,
  },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];
  const lastModified = new Date();

  // Static pages
  for (const page of staticPages) {
    entries.push({
      url: `${BASE_URL}${page.path}`,
      lastModified,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    });
  }

  // Dynamic category pages
  let slugs: string[] = [];
  try {
    slugs = await getCategorySlugs();
  } catch (error) {
    console.error("Failed to fetch category slugs for sitemap:", error);
  }
  for (const slug of slugs) {
    entries.push({
      url: `${BASE_URL}/proizvodi/kategorije/${slug}`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    });
  }

  // Dynamic product pages
  if (process.env.NODE_ENV !== "development")
    try {
      const products = await getSitemapProducts();

      for (const entry of products) {
        entries.push({
          url: `${BASE_URL}/proizvodi/${entry.slug}`,
          lastModified: new Date(entry.modifiedAt),
          changeFrequency: "weekly",
          priority: 0.7,
        });
      }
    } catch {
      // Product API unavailable — sitemap still builds with static + category pages
    }

  return entries;
}
