import type { MetadataRoute } from "next";

import { routing } from "@/i18n/routing";
import { getProducts } from "@/lib/api";
import { getCategorySlugs } from "@/lib/categories";

const BASE_URL = "https://sgtools.rs";

type StaticEntry = {
  pathname: keyof typeof routing.pathnames;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
};

const staticPages: StaticEntry[] = [
  { pathname: "/", changeFrequency: "weekly", priority: 1.0 },
  { pathname: "/about", changeFrequency: "monthly", priority: 0.7 },
  { pathname: "/contact", changeFrequency: "monthly", priority: 0.6 },
  { pathname: "/faq", changeFrequency: "monthly", priority: 0.6 },
  { pathname: "/where-to-buy", changeFrequency: "monthly", priority: 0.7 },
  {
    pathname: "/products/categories",
    changeFrequency: "weekly",
    priority: 0.9,
  },
];

function getLocalizedPath(
  pathname: keyof typeof routing.pathnames,
  locale: string,
): string {
  const entry = routing.pathnames[pathname];
  if (typeof entry === "string") return entry;
  return (entry as Record<string, string>)[locale] ?? pathname;
}

function buildAlternates(pathname: keyof typeof routing.pathnames) {
  const languages: Record<string, string> = {};
  for (const locale of routing.locales) {
    languages[locale] =
      `${BASE_URL}/${locale}${getLocalizedPath(pathname, locale)}`;
  }
  return { languages };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];
  const lastModified = new Date();

  // Static pages
  for (const page of staticPages) {
    const defaultLocalePath = getLocalizedPath(
      page.pathname,
      routing.defaultLocale,
    );
    entries.push({
      url: `${BASE_URL}/${routing.defaultLocale}${defaultLocalePath}`,
      lastModified,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      alternates: buildAlternates(page.pathname),
    });
  }

  // Dynamic category pages
  const slugs = await getCategorySlugs();
  const categoryPathname =
    "/products/categories/[slug]" as keyof typeof routing.pathnames;

  for (const slug of slugs) {
    const languages: Record<string, string> = {};
    for (const locale of routing.locales) {
      const localizedPath = getLocalizedPath(categoryPathname, locale).replace(
        "[slug]",
        slug,
      );
      languages[locale] = `${BASE_URL}/${locale}${localizedPath}`;
    }

    const defaultPath = getLocalizedPath(
      categoryPathname,
      routing.defaultLocale,
    ).replace("[slug]", slug);

    entries.push({
      url: `${BASE_URL}/${routing.defaultLocale}${defaultPath}`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: { languages },
    });
  }

  // Dynamic product pages (skip in development to avoid heavy API calls)
  if (process.env.NODE_ENV !== "development")
    try {
      const products = await getProducts(undefined, 0, 1000); // TODO Don't put 1000 in the future
      const productPathname =
        "/products/[slug]" as keyof typeof routing.pathnames;

      for (const product of products) {
        const languages: Record<string, string> = {};
        for (const locale of routing.locales) {
          const localizedPath = getLocalizedPath(
            productPathname,
            locale,
          ).replace("[slug]", product.slug);
          languages[locale] = `${BASE_URL}/${locale}${localizedPath}`;
        }

        const defaultPath = getLocalizedPath(
          productPathname,
          routing.defaultLocale,
        ).replace("[slug]", product.slug);

        entries.push({
          url: `${BASE_URL}/${routing.defaultLocale}${defaultPath}`,
          lastModified,
          changeFrequency: "weekly",
          priority: 0.7,
          alternates: { languages },
        });
      }
    } catch {
      // Product API unavailable — sitemap still builds with static + category pages
    }

  return entries;
}
