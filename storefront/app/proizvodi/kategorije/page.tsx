import HeroHeader from "@/components/hero-header";
import CategoryCard from "@/components/products/category-card";
import StatusMessage from "@/components/status-message";
import Wrapper from "@/components/wrapper";
import { getCategories } from "@/lib/api";
import { Package } from "lucide-react";
import { createPageMetadata } from "@/lib/metadata";

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
    </div>
  );
};

export default CategoriesPage;
