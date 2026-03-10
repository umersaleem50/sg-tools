import CTA from "@/components/cta";
import HeroHeader from "@/components/hero-header";
import { ListingPagination } from "@/components/products/listing-pagination";
import ProductGrid from "@/components/products/product-grid";
import StatusMessage from "@/components/status-message";
import Wrapper from "@/components/wrapper";
import { SITE_URL } from "@/constants/links";
import { getAllProductsPaginated, PRODUCTS_PER_PAGE } from "@/lib/api";
import { TriangleAlert } from "lucide-react";
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
  const pageSuffix = currentPage > 1 ? ` - Strana ${currentPage}` : "";

  return {
    title: `Svi proizvodi${pageSuffix}`,
    description:
      "Pregledaj kompletnu ponudu SG Tools profesionalnog alata — bušilice, brusilice, testere i još mnogo toga.",
    alternates: {
      canonical:
        currentPage > 1
          ? `${SITE_URL}/proizvodi?strana=${currentPage}`
          : `${SITE_URL}/proizvodi`,
    },
  };
}

const ProductsPage = async ({ searchParams }: Props) => {
  const { strana } = await searchParams;
  const currentPage = Math.max(1, parseInt(strana ?? "1", 10) || 1);
  const offset = (currentPage - 1) * PRODUCTS_PER_PAGE;

  let products: Awaited<ReturnType<typeof getAllProductsPaginated>> | null =
    null;
  let fetchFailed = false;

  try {
    products = await getAllProductsPaginated(offset, PRODUCTS_PER_PAGE);
  } catch (error) {
    console.error("Failed to fetch products:", error);
    fetchFailed = true;
  }

  if (products) {
    const totalPages = Math.ceil(products.totalRecords / PRODUCTS_PER_PAGE);
    if (totalPages > 0 && currentPage > totalPages) {
      redirect("/proizvodi");
    }
  }

  return (
    <div>
      <HeroHeader
        title="Svi proizvodi"
        description="Pregledaj kompletnu ponudu SG Tools profesionalnog alata."
      />

      <Wrapper className="pb-16">
        {fetchFailed ? (
          <StatusMessage
            icon={TriangleAlert}
            title="Nije moguće učitati proizvode."
            description="Došlo je do greške prilikom povezivanja sa serverom. Probaj ponovo malo kasnije."
            variant="destructive"
          />
        ) : (
          <>
            <ProductGrid
              products={products?.data ?? []}
              totalRecords={products?.totalRecords}
              backLink={{
                href: "/proizvodi/kategorije",
                label: "Sve kategorije",
              }}
            />
            <Suspense>
              <ListingPagination
                currentPage={currentPage}
                totalRecords={products?.totalRecords ?? 0}
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

export default ProductsPage;
