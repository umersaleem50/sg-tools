import { SITE_URL } from "@/constants/links";
import type { Category } from "@/types/categories";

export type BreadcrumbSegment = { label: string; href: string };

/**
 * Returns the root-to-target path through the category tree, or null if not found.
 */
export function findCategoryPath(
  categories: Category[],
  targetSlug: string,
): Category[] | null {
  for (const cat of categories) {
    if (cat.slug === targetSlug) return [cat];
    const sub = findCategoryPath(cat.subCategories, targetSlug);
    if (sub) return [cat, ...sub];
  }
  return null;
}

/**
 * Builds breadcrumb segments for a category, including all ancestors.
 */
export function buildCategoryBreadcrumbs(
  categories: Category[],
  targetSlug: string,
): BreadcrumbSegment[] {
  const path = findCategoryPath(categories, targetSlug);
  if (!path) return [];
  return path.map((cat) => ({
    label: cat.name,
    href: `/proizvodi/kategorije/${cat.slug}`,
  }));
}

/**
 * Builds a schema.org BreadcrumbList JSON-LD object from segments.
 * All segments get `item` URLs. If `currentPage` is provided, it is
 * appended as the final non-linked item.
 */
export function buildBreadcrumbJsonLd(
  segments: BreadcrumbSegment[],
  currentPage?: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Svi proizvodi",
        item: `${SITE_URL}/proizvodi/kategorije`,
      },
      ...segments.map((seg, i) => ({
        "@type": "ListItem" as const,
        position: i + 2,
        name: seg.label,
        item: `${SITE_URL}${seg.href}`,
      })),
      ...(currentPage
        ? [
            {
              "@type": "ListItem" as const,
              position: segments.length + 2,
              name: currentPage,
            },
          ]
        : []),
    ],
  };
}
