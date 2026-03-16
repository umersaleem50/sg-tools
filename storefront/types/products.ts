export interface ProductImage {
  url: string;
  width: number;
  height: number;
}

export interface Product {
  id: number;
  defaultProductVariantId: number;
  title: string;
  description: string;
  slug: string;
  htmlDescription: string;
  specification: string | null;
  countryName: string | null;
  metaTitle: string;
  metaDescription: string;
  displayPrice: number;
  originalPrice: number | null;
  discountPercentage: number | null;
  hasDiscount: boolean;
  imageUrl: string;
  brandName: string;
  brandSlug: string;
  brandImageUrl: string;
  inStock: boolean;
  tags: { name: string; color: string; orderNumber: number }[];
  categoryName: string;
  categorySlug: string;
  productImages: ProductImage[];
  averageRating: number | null;
  reviewCount: number;
  maxOrderQuantity: number | null;
  ogImageUrl: string | null;
}

export interface ProductsResult {
  data: Product[];
  totalRecords: number;
}

export interface SitemapEntry {
  slug: string;
  modifiedAt: string;
}
