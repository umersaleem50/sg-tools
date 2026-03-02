export interface ApiCategory {
  id: number;
  g_id: number;
  parent_id: number | null;
  name: string;
  slug: string;
}

export interface ApiManufacturer {
  id: number;
  name: string;
  slug: string;
  description: string;
  text: string;
}

export interface GalleryImage {
  id: number;
  url: string;
  filename: string;
  title: string;
  extension: string;
}

export interface ProductSeo {
  title_tag: string;
  title: string;
  description: string;
  image: string;
  author: string;
}

export interface Product {
  id: number;
  title: string;
  slug: string;
  description: string;
  text: string;
  price: number;
  sale_price: number | null;
  sku: string | null;
  stock: number;
  status: string;
  manufacturer: ApiManufacturer | null;
  category: string;
  categories: ApiCategory[];
  tags: string;
  url: string;
  permalink: string;
  poster_url: string;
  gallery: GalleryImage[];
  seo: ProductSeo;
}

export interface ApiProductsResponse {
  pagination: Record<string, unknown>;
  data: {
    SEO: Record<string, unknown>;
    products: Product[];
  };
}
