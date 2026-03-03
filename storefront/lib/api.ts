import type { ApiProductsResponse, Product } from "@/types/products";

const API_URL = process.env.API_URL;
const BEARER_TOKEN = process.env.BEARER_TOKEN;

const HIDE_PARAMS =
  "&hide_seo=true&hide_tags=true&hide_attributes=true&hide_locations=true&hide_variations=true";

async function apiFetch<T>(path: string, locale?: string): Promise<T> {
  if (!API_URL || !BEARER_TOKEN) {
    throw new Error(
      "API_URL and BEARER_TOKEN environment variables are required",
    );
  }

  const headers: Record<string, string> = {
    Authorization: `Bearer ${BEARER_TOKEN}`,
  };

  if (locale) {
    headers["Accept-Language"] = locale;
  }

  const res = await fetch(`${API_URL}${path}`, {
    headers,
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`API request failed: ${res.status} ${res.statusText}`);
  }

  return res.json() as Promise<T>;
}

export async function getProducts(
  locale?: string,
  offset: number = 0,
  limit: number = 20,
): Promise<Product[]> {
  const response = await apiFetch<ApiProductsResponse>(
    `/GET/products/?namespace=prodavnicaalata&limit=${offset},${limit}${HIDE_PARAMS}`,
    locale,
  );
  return response.data.products;
}

export async function getProductBySlug(
  slug: string,
  locale?: string,
): Promise<Product | null> {
  const response = await apiFetch<ApiProductsResponse>(
    `/GET/products/?namespace=prodavnicaalata&slug=${slug}&limit=0,1`,
    locale,
  );
  return response.data.products[0] ?? null;
}

export async function getProductsByCategory(
  categorySlug: string,
  locale?: string,
  offset: number = 0,
  limit: number = 20,
): Promise<Product[]> {
  const response = await apiFetch<ApiProductsResponse>(
    `/GET/products/?namespace=prodavnicaalata&limit=${offset},${limit}`,
    locale,
  );
  return response.data.products.filter((p) =>
    p.categories.some((c) => c.slug === categorySlug),
  );
}
