import type { Category } from "@/types/categories";
import type { Product, ProductsResult, SitemapEntry } from "@/types/products";

export class ApiError extends Error {
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
    next: { revalidate: 3600 },
  });

  if (!res.ok)
    throw new ApiError(
      res.status,
      `API error: ${res.status} ${res.statusText}`,
    );
  return res.json() as Promise<T>;
}

export async function getProducts(offset = 0, limit = 20): Promise<Product[]> {
  const result = await apiFetch<ProductsResult>(
    "/api/Storefront/FilteredProducts",
    {
      method: "POST",
      body: JSON.stringify({
        brandSlugs: [BRAND_SLUG],
        tagSlugs: [],
        first: offset,
        rows: limit,
      }),
    },
  );
  return result.data;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    return await apiFetch<Product>(
      `/api/Storefront/ProductBySlug?slug=${encodeURIComponent(slug)}`,
    );
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) return null;
    throw error;
  }
}

export async function getProductsByCategory(
  categorySlug: string,
  offset = 0,
  limit = 20,
): Promise<Product[]> {
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

export async function getCategories(): Promise<Category[]> {
  return apiFetch<Category[]>(
    `/api/Storefront/Categories?brandSlug=${BRAND_SLUG}`,
  );
}

export async function getSitemapProducts(): Promise<SitemapEntry[]> {
  return apiFetch<SitemapEntry[]>(
    `/api/Storefront/SitemapProductsByBrand?brandSlug=${BRAND_SLUG}`,
  );
}
