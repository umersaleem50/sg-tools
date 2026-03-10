import CTA from "@/components/cta";
import HeroHeader from "@/components/hero-header";
import { ListingPagination } from "@/components/products/listing-pagination";
import ProductGrid from "@/components/products/product-grid";
import StatusMessage from "@/components/status-message";
import Wrapper from "@/components/wrapper";
import { SITE_URL } from "@/constants/links";
import {
  getCategoryBySlug,
  getProductsByCategoryPaginated,
  getSitemapCategories,
  PRODUCTS_PER_PAGE,
} from "@/lib/api";
import { TriangleAlert } from "lucide-react";
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

const CategoryPage = async ({ params, searchParams }: Props) => {
  const { slug } = await params;
  const { strana } = await searchParams;
  const currentPage = Math.max(1, parseInt(strana ?? "1", 10) || 1);
  const offset = (currentPage - 1) * PRODUCTS_PER_PAGE;

  const [categoryResult, productsResult] = await Promise.allSettled([
    getCategoryBySlug(slug),
    getProductsByCategoryPaginated(slug, offset, PRODUCTS_PER_PAGE),
  ]);

  if (categoryResult.status === "rejected" || !categoryResult.value) notFound();

  const category = categoryResult.value;
  const productsFailed = productsResult.status === "rejected";
  const productsData =
    productsResult.status === "fulfilled" ? productsResult.value : null;

  if (productsData) {
    const totalPages = Math.ceil(productsData.totalRecords / PRODUCTS_PER_PAGE);
    if (totalPages > 0 && currentPage > totalPages) {
      redirect(`/proizvodi/kategorije/${slug}`);
    }
  }

  return (
    <div>
      <HeroHeader title={category.name} description={category.description} />

      <Wrapper className="pb-16">
        {productsFailed ? (
          <StatusMessage
            icon={TriangleAlert}
            title="Nije moguće učitati proizvode."
            description="Došlo je do greške prilikom povezivanja sa serverom. Probaj ponovo malo kasnije."
            variant="destructive"
          />
        ) : (
          <>
            <ProductGrid
              products={productsData?.data ?? []}
              totalRecords={productsData?.totalRecords}
            />
            <Suspense>
              <ListingPagination
                currentPage={currentPage}
                totalRecords={productsData?.totalRecords ?? 0}
                pageSize={PRODUCTS_PER_PAGE}
              />
            </Suspense>
          </>
        )}
      </Wrapper>

      <CTA />
    </div>
  );
};

export default CategoryPage;
