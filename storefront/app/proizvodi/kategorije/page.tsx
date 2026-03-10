import CTA from "@/components/cta";
import HeroHeader from "@/components/hero-header";
import CategoryCard from "@/components/products/category-card";
import StatusMessage from "@/components/status-message";
import Wrapper from "@/components/wrapper";
import { getCategories } from "@/lib/api";
import type { Category } from "@/types/categories";
import { Package, TriangleAlert } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kategorije proizvoda",
  description:
    "Pregledaj kompletnu ponudu profesionalnog alata po kategorijama.",
  alternates: {
    canonical: "https://prodavnicaalata.rs/proizvodi/kategorije/",
  },
};

const CategoriesPage = async () => {
  let categories: Category[] = [];
  let fetchFailed = false;

  try {
    categories = await getCategories();
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    fetchFailed = true;
  }

  return (
    <div>
      <HeroHeader
        title="Kategorije proizvoda"
        description="Pregledaj kompletnu ponudu profesionalnog alata po kategorijama."
      />

      <Wrapper className="pb-16">
        {fetchFailed ? (
          <StatusMessage
            icon={TriangleAlert}
            title="Nije moguće učitati kategorije."
            description="Došlo je do greške prilikom povezivanja sa serverom. Probaj ponovo malo kasnije."
            variant="destructive"
          />
        ) : categories.length === 0 ? (
          <StatusMessage
            icon={Package}
            title="Trenutno nema dostupnih kategorija."
            description="Proveri ponovo uskoro."
          />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-6">
            {categories.map((category, index) => (
              <CategoryCard
                key={category.slug}
                category={category}
                title={category.name}
                description={category.description}
                index={index}
              />
            ))}
          </div>
        )}
      </Wrapper>

      <CTA />
    </div>
  );
};

export default CategoriesPage;
