import { SITE_URL } from "@/constants/links";
import type { CategoryBreadcrumb } from "@/types/products";

export type BreadcrumbSegment = { label: string; href: string };

/**
 * Maps API-provided category breadcrumbs to BreadcrumbSegment format.
 */
export function mapApiBreadcrumbs(
  apiBreadcrumbs: CategoryBreadcrumb[],
): BreadcrumbSegment[] {
  return apiBreadcrumbs.map((b) => ({
    label: b.name,
    href: b.path,
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
  const items: Record<string, unknown>[] = [
    { name: "Početna", item: `${SITE_URL}/` },
    { name: "Kategorije", item: `${SITE_URL}/proizvodi/kategorije` },
    ...segments.map((seg) => ({
      name: seg.label,
      item: `${SITE_URL}${seg.href}`,
    })),
    ...(currentPage ? [{ name: currentPage }] : []),
  ];

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((entry, i) => ({
      "@type": "ListItem",
      position: i + 1,
      ...entry,
    })),
  };
}
