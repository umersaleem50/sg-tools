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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {};
  }

  return {
    title: product.metaTitle || `${product.title} | SG Tools`,
    description: product.metaDescription || product.description,
    alternates: {
      canonical: `https://prodavnicaalata.rs/proizvodi/${slug}/`,
    },
    openGraph: {
      title: product.metaTitle || product.title,
      description: product.metaDescription || product.description,
      images: [{ url: product.ogImageUrl || product.imageUrl }].filter(
        (img) => img.url,
      ),
    },
  };
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
    <div className="w-full relative flex flex-col pt-16">
      <ProductDetail product={product} relatedProducts={relatedProducts} />
      <CTA />
    </div>
  );
};

export default ProductPage;
