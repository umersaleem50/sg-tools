"use cache";

import { TAGS } from "@/constants/cache-tags";
import type { Category } from "@/types/categories";
import type { Product, ProductsResult, SitemapEntry } from "@/types/products";
import { cacheLife, cacheTag } from "next/cache";

class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

const API_URL = process.env.API_URL;
const BRAND_SLUG = "sg-tools";

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  if (!API_URL) throw new Error("API_URL is required");

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers as Record<string, string>),
    },
  });

  if (!res.ok)
    throw new ApiError(
      res.status,
      `API error: ${res.status} ${res.statusText}`,
    );
  return res.json() as Promise<T>;
}

//#region Hours profile — structural/marketing data

export async function getCategories(): Promise<Category[]> {
  cacheLife("hours");
  cacheTag(TAGS.categories);
  return apiFetch<Category[]>(
    `/api/Storefront/Categories?brandSlug=${BRAND_SLUG}`,
  );
}

export async function getSitemapProducts(): Promise<SitemapEntry[]> {
  cacheLife("hours");
  cacheTag(TAGS.products);
  return apiFetch<SitemapEntry[]>(
    `/api/Storefront/SitemapProductsByBrand?brandSlug=${BRAND_SLUG}`,
  );
}

export async function getSitemapCategories(): Promise<SitemapEntry[]> {
  cacheLife("hours");
  cacheTag(TAGS.categories);
  return apiFetch<SitemapEntry[]>(
    `/api/Storefront/SitemapCategoriesByBrand?brandSlug=${BRAND_SLUG}`,
  );
}

//#endregion

//#region Minutes profile — product/detail data

export async function getProductBySlug(slug: string): Promise<Product | null> {
  cacheLife("minutes");
  cacheTag(TAGS.products);
  try {
    return await apiFetch<Product>(
      `/api/Storefront/ProductBySlug?slug=${encodeURIComponent(slug)}`,
    );
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) return null;
    throw error;
  }
}

export async function getCategoryBySlug(
  slug: string,
): Promise<Category | null> {
  cacheLife("minutes");
  cacheTag(TAGS.categories);
  try {
    return await apiFetch<Category>(
      `/api/Storefront/CategoryBySlug?slug=${encodeURIComponent(slug)}`,
    );
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) return null;
    throw error;
  }
}

export async function getFilteredProducts(
  offset: number,
  limit: number,
): Promise<ProductsResult> {
  cacheLife("minutes");
  cacheTag(TAGS.products);
  return apiFetch<ProductsResult>("/api/Storefront/FilteredProducts", {
    method: "POST",
    body: JSON.stringify({
      brandSlugs: [BRAND_SLUG],
      tagSlugs: [],
      first: offset,
      rows: limit,
    }),
  });
}

export async function getFilteredProductsByCategory(
  categorySlug: string,
  offset: number,
  limit: number,
): Promise<ProductsResult> {
  cacheLife("minutes");
  cacheTag(TAGS.products);
  return apiFetch<ProductsResult>("/api/Storefront/FilteredProducts", {
    method: "POST",
    body: JSON.stringify({
      brandSlugs: [BRAND_SLUG],
      tagSlugs: [],
      categorySlug,
      first: offset,
      rows: limit,
    }),
  });
}

export async function getProductsByCategory(
  categorySlug: string | null,
  offset: number | null = 0,
  limit: number | null = 20,
): Promise<Product[]> {
  cacheLife("minutes");
  cacheTag(TAGS.products);
  const result = await apiFetch<ProductsResult>(
    "/api/Storefront/FilteredProducts",
    {
      method: "POST",
      body: JSON.stringify({
        brandSlugs: [BRAND_SLUG],
        tagSlugs: [],
        categorySlug,
        first: offset,
        rows: limit,
      }),
    },
  );
  return result.data;
}

//#endregion
