import CTA from "@/components/cta";
import HeroHeader from "@/components/hero-header";
import ProductGrid from "@/components/products/product-grid";
import Wrapper from "@/components/wrapper";
import { getProductsByCategory } from "@/lib/api";
import { getCategoryBySlug, getCategorySlugs } from "@/lib/categories";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await getCategorySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
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
      ...(category.ogImageUrl && { images: [{ url: category.ogImageUrl }] }),
    },
  };
}

const CategoryPage = async ({ params }: Props) => {
  const { slug } = await params;

  const category = await getCategoryBySlug(slug);
  if (!category) notFound();

  const categoryName = category.name;
  const categoryDesc = category.description;

  const categoryProducts = await getProductsByCategory(slug);

  return (
    <div className="w-full relative flex flex-col pt-16">
      <HeroHeader title={categoryName} description={categoryDesc} />

      <Wrapper className="pb-16">
        <ProductGrid products={categoryProducts} />
      </Wrapper>

      <CTA />
    </div>
  );
};

export default CategoryPage;
