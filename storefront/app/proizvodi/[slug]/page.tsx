import CTA from "@/components/cta";
import ProductDetail from "@/components/products/product-detail";
import RelatedProducts from "@/components/products/related-products";
import { getProductBySlug, getSitemapProducts } from "@/lib/api";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const products = await getSitemapProducts();
    return products.map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const product = await getProductBySlug(slug);

    if (!product) {
      return {};
    }

    return {
      title: product.metaTitle,
      description: product.metaDescription,
      alternates: {
        canonical: `https://prodavnicaalata.rs/proizvodi/${slug}/`,
      },
      openGraph: {
        title: product.metaTitle,
        description: product.metaDescription,
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

  return (
    <div>
      <ProductDetail product={product} />
      {product.categorySlug && (
        <Suspense fallback={null}>
          <RelatedProducts
            categorySlug={product.categorySlug}
            excludeProductId={product.id}
          />
        </Suspense>
      )}
      <CTA />
    </div>
  );
};

export default ProductPage;
