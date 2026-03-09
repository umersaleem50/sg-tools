import CTA from "@/components/cta";
import HeroHeader from "@/components/hero-header";
import ProductGrid from "@/components/products/product-grid";
import Wrapper from "@/components/wrapper";
import { getProductsByCategory } from "@/lib/api";
import { getCategoryBySlug, getCategorySlugs } from "@/lib/categories";
import type { Product } from "@/types/products";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  try {
    const slugs = await getCategorySlugs();
    return slugs.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const category = await getCategoryBySlug(slug);
    if (!category) return {};
    return {
      title: category.metaTitle,
      description: category.metaDescription,
      alternates: {
        canonical: `https://prodavnicaalata.rs/proizvodi/kategorije/${slug}/`,
      },
      openGraph: {
        title: category.metaTitle,
        description: category.metaDescription,
      },
    };
  } catch (error) {
    console.error("Failed to fetch category metadata:", error);
    return {};
  }
}

const CategoryPage = async ({ params }: Props) => {
  const { slug } = await params;

  let category;
  try {
    category = await getCategoryBySlug(slug);
  } catch (error) {
    console.error("Failed to fetch category:", error);
    notFound();
  }
  if (!category) notFound();

  const categoryName = category.name;
  const categoryDesc = category.description;

  let categoryProducts: Product[] = [];
  try {
    categoryProducts = await getProductsByCategory(slug);
  } catch (error) {
    console.error("Failed to fetch category products:", error);
  }

  return (
    <div>
      <HeroHeader title={categoryName} description={categoryDesc} />

      <Wrapper className="pb-16">
        <ProductGrid products={categoryProducts} />
      </Wrapper>

      <CTA />
    </div>
  );
};

export default CategoryPage;
