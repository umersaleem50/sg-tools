import type { Product } from "@/types/products";

const API_URL = process.env.API_URL;
const BEARER_TOKEN = process.env.BEARER_TOKEN;

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
  limit: number = 50,
): Promise<Product[]> {
  return apiFetch<Product[]>(
    `/GET/products/short/?namespace=prodavnicaalata&limit=${offset},${limit}`,
    locale,
  );
}

export async function getProductBySlug(
  slug: string,
  locale?: string,
): Promise<Product | null> {
  const products = await apiFetch<Product[]>(
    `/GET/products/short/?namespace=prodavnicaalata&slug=${slug}&limit=0,1`,
    locale,
  );
  return products[0] ?? null;
}

export async function getProductsByCategory(
  categorySlug: string,
  locale?: string,
  offset: number = 0,
  limit: number = 50,
): Promise<Product[]> {
  try {
    const result = await apiFetch<Product[]>(
      `/GET/products/short/?namespace=prodavnicaalata&category=${categorySlug}&limit=${offset},${limit}`,
      locale,
    );
    if (Array.isArray(result)) return result;
  } catch {
    // Category filter endpoint failed — try fallback
  }

  try {
    const all = await getProducts(locale, 0, 200);
    const filtered = all.filter((p) => p.categories.includes(categorySlug));
    if (filtered.length > 0) return filtered;
  } catch {
    // Fallback filtering also failed
  }

  return [];
}
