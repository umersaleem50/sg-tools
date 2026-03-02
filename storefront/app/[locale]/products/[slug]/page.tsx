import CTA from "@/components/cta";
import ProductDetail from "@/components/products/product-detail";
import { getProductBySlug, getProducts, getProductsByCategory } from "@/lib/api";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  try {
    const products = await getProducts();
    return products.map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = await getProductBySlug(slug, locale);

  if (!product) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: "productPage" });

  return {
    title: product.seo?.title_tag || t("metaTitle", { product: product.title }),
    description: product.seo?.description || product.description,
    openGraph: {
      title: product.seo?.title || product.title,
      description: product.seo?.description || product.description,
      images: [{ url: product.seo?.image || product.poster_url }].filter(
        (img) => img.url,
      ),
    },
  };
}

const ProductPage = async ({ params }: Props) => {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const product = await getProductBySlug(slug, locale);
  if (!product) notFound();

  // Fetch related products from same category (up to 4, excluding current)
  const categorySlug = product.categories?.[0]?.slug || product.category;
  let relatedProducts = categorySlug
    ? await getProductsByCategory(categorySlug, locale)
    : [];
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
