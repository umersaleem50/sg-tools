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
  manufacturer: string | null;
  category: string;
  categories: string;
  tags: string;
  url: string;
  permalink: string;
  poster_url: string;
  imageUrls: string[];
}
