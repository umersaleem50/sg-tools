import HeroHeader from "@/components/hero-header";
import CategoryCard from "@/components/products/category-card";
import StatusMessage from "@/components/status-message";
import Wrapper from "@/components/wrapper";
import { getCategories } from "@/lib/api";
import { createPageMetadata } from "@/lib/metadata";
import { Package } from "lucide-react";

export const metadata = createPageMetadata({
  title: "Kategorije proizvoda",
  description:
    "Pregledaj kompletnu ponudu profesionalnog alata po kategorijama.",
  canonicalUrl: "https://www.prodavnicaalata.rs/proizvodi/kategorije/",
});

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
          <StatusMessage
            icon={Package}
            title="Trenutno nema dostupnih kategorija."
            description="Proveri ponovo uskoro."
          />
        ) : (
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-1.5 sm:gap-3 lg:gap-4">
            {categories.map((category, index) => (
              <CategoryCard
                key={category.slug}
                category={category}
                title={category.name}
                index={index}
              />
            ))}
          </div>
        )}
      </Wrapper>
    </div>
  );
};

export default CategoriesPage;
