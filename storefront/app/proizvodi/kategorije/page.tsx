import CTA from "@/components/cta";
import HeroHeader from "@/components/hero-header";
import CategoryCard from "@/components/products/category-card";
import Wrapper from "@/components/wrapper";
import { getCategories } from "@/lib/categories";
import { Package } from "lucide-react";
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
  const categories = await getCategories();

  return (
    <div>
      <HeroHeader
        title="Kategorije proizvoda"
        description="Pregledaj kompletnu ponudu profesionalnog alata po kategorijama."
      />

      <Wrapper className="pb-16">
        {categories.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="flex items-center justify-center size-12 rounded-xl bg-primary/15 border border-primary/30 mb-4">
              <Package className="size-6 text-primary" strokeWidth={1.5} />
            </div>
            <p className="text-lg font-medium">
              Trenutno nema dostupnih kategorija.
            </p>
            <p className="text-sm text-muted-foreground mt-2 max-w-sm">
              Proveri ponovo uskoro.
            </p>
          </div>
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
