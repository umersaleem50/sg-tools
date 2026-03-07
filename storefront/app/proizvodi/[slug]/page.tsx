import CTA from "@/components/cta";
import ProductDetail from "@/components/products/product-detail";
import {
  getProductBySlug,
  getProducts,
  getProductsByCategory,
} from "@/lib/api";
import type { Product } from "@/types/products";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  try {
    const allProducts = await getProducts(0, 1000);
    return allProducts.map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  const truncated = text.slice(0, maxLength - 1);
  const lastSpace = truncated.lastIndexOf(" ");
  return `${truncated.slice(0, lastSpace > 0 ? lastSpace : maxLength - 1)}…`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const product = await getProductBySlug(slug);

    if (!product) {
      return {};
    }

    const description = truncate(
      product.metaDescription || product.description || "",
      155,
    );

    return {
      title: product.metaTitle || product.title,
      description,
      alternates: {
        canonical: `https://prodavnicaalata.rs/proizvodi/${slug}/`,
      },
      openGraph: {
        title: product.metaTitle || product.title,
        description,
        images: [{ url: product.ogImageUrl || product.imageUrl }].filter(
          (img) => img.url,
        ),
      },
    };
  } catch (error) {
    console.error("Failed to fetch product metadata:", error);
    return {};
  }
}

const ProductPage = async ({ params }: Props) => {
  const { slug } = await params;

  const product = await getProductBySlug(slug);
  if (!product) notFound();

  let relatedProducts: Product[] = [];
  try {
    relatedProducts = product.categorySlug
      ? await getProductsByCategory(product.categorySlug)
      : [];
  } catch {
    relatedProducts = [];
  }
  relatedProducts = relatedProducts
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  return (
    <div>
      <ProductDetail product={product} relatedProducts={relatedProducts} />
      <CTA />
    </div>
  );
};

export default ProductPage;
