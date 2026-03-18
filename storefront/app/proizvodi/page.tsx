import HeroHeader from "@/components/hero-header";
import { ListingPagination } from "@/components/products/listing-pagination";
import ProductGrid from "@/components/products/product-grid";
import Wrapper from "@/components/wrapper";
import { PRODUCTS_PER_PAGE } from "@/constants/cache-tags";
import { getFilteredProducts } from "@/lib/api";
import { createProductsPageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";

type Props = {
  searchParams: Promise<{ strana?: string }>;
};

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const { strana } = await searchParams;
  const currentPage = Math.max(1, parseInt(strana ?? "1", 10) || 1);
  return createProductsPageMetadata({ currentPage });
}

async function ProductsList({
  searchParams,
}: {
  searchParams: Promise<{ strana?: string }>;
}) {
  const { strana } = await searchParams;
  const currentPage = Math.max(1, parseInt(strana ?? "1", 10) || 1);
  const offset = (currentPage - 1) * PRODUCTS_PER_PAGE;

  const products = await getFilteredProducts(offset, PRODUCTS_PER_PAGE);

  const totalPages = Math.ceil(products.totalRecords / PRODUCTS_PER_PAGE);
  if (totalPages > 0 && currentPage > totalPages) {
    redirect("/proizvodi");
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

export default function ProductsPage({ searchParams }: Props) {
  return (
    <div>
      <HeroHeader
        title="Svi proizvodi"
        description="Pregledaj kompletnu ponudu SG Tools profesionalnog alata."
      />

      <Wrapper className="pb-16">
        <Suspense>
          <ProductsList searchParams={searchParams} />
        </Suspense>
      </Wrapper>
    </div>
  );
}
