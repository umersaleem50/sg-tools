import CTA from "@/components/cta";
import HeroHeader from "@/components/hero-header";
import { ListingPagination } from "@/components/products/listing-pagination";
import ProductGrid from "@/components/products/product-grid";
import { SectionErrorBoundary } from "@/components/ui/section-error-boundary";
import Wrapper from "@/components/wrapper";
import { SITE_URL } from "@/constants/links";
import { PRODUCTS_PER_PAGE } from "@/constants/cache-tags";
import {
  getCategoryBySlug,
  getFilteredProductsByCategory,
  getSitemapCategories,
} from "@/lib/api";
import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ strana?: string }>;
};

export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const categories = await getSitemapCategories();
    return categories.map((c) => ({ slug: c.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
  searchParams,
}: Props): Promise<Metadata> {
  const { slug } = await params;
  const { strana } = await searchParams;
  const currentPage = Math.max(1, parseInt(strana ?? "1", 10) || 1);
  const pageSuffix = currentPage > 1 ? ` — Strana ${currentPage}` : "";

  try {
    const category = await getCategoryBySlug(slug);
    if (!category) return {};

    const canonicalBase = `${SITE_URL}/proizvodi/kategorije/${slug}`;
    const canonical =
      currentPage > 1 ? `${canonicalBase}?strana=${currentPage}` : canonicalBase;

    return {
      title: `${category.metaTitle}${pageSuffix}`,
      description: category.metaDescription,
      alternates: { canonical },
      openGraph: {
        title: `${category.metaTitle}${pageSuffix}`,
        description: category.metaDescription,
      },
    };
  } catch (error) {
    console.error("Failed to fetch category metadata:", error);
    return {};
  }
}

async function CategoryProducts({
  slug,
  currentPage,
}: {
  slug: string;
  currentPage: number;
}) {
  const offset = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const products = await getFilteredProductsByCategory(
    slug,
    offset,
    PRODUCTS_PER_PAGE,
  );

  const totalPages = Math.ceil(products.totalRecords / PRODUCTS_PER_PAGE);
  if (totalPages > 0 && currentPage > totalPages) {
    redirect(`/proizvodi/kategorije/${slug}`);
  }

  return (
    <>
      <ProductGrid
        products={products.data}
        totalRecords={products.totalRecords}
      />
      <Suspense>
        <ListingPagination
          currentPage={currentPage}
          totalRecords={products.totalRecords}
          pageSize={PRODUCTS_PER_PAGE}
        />
      </Suspense>
    </>
  );
}

const CategoryPage = async ({ params, searchParams }: Props) => {
  const { slug } = await params;
  const { strana } = await searchParams;
  const currentPage = Math.max(1, parseInt(strana ?? "1", 10) || 1);

  const category = await getCategoryBySlug(slug);
  if (!category) notFound();

  return (
    <div>
      <HeroHeader title={category.name} description={category.description} />

      <Wrapper className="pb-16">
        <SectionErrorBoundary>
          <Suspense>
            <CategoryProducts slug={slug} currentPage={currentPage} />
          </Suspense>
        </SectionErrorBoundary>
      </Wrapper>

      <CTA />
    </div>
  );
};

export default CategoryPage;
