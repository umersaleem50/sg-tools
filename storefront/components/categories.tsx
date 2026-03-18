import Container from "@/components/container";
import CategoryCard from "@/components/products/category-card";
import Section from "@/components/section";
import Wrapper from "@/components/wrapper";
import { getCategories } from "@/lib/api";
import type { Category } from "@/types/categories";

const Categories = async () => {
  let categories: Category[] = [];
  try {
    categories = await getCategories();
  } catch (error) {
    console.error("Failed to fetch categories", error);
    return null;
  }

  if (!categories || categories.length === 0) return null;

  return (
    <Section className="relative">
      <Wrapper>
        <Container>
          <div className="flex flex-col items-start justify-start lg:items-center lg:justify-center">
            <h2 className="text-3xl lg:text-4xl font-semibold text-left lg:text-center tracking-tight">
              Kategorije
            </h2>
            <p className="text-base lg:text-lg font-normal text-muted-foreground text-left lg:text-center mt-2 max-w-md">
              Istraži naš širok izbor profesionalnog alata za svaku potrebu.
            </p>
          </div>
        </Container>

        <div className="w-full mt-10">
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
        </div>
      </Wrapper>
    </Section>
  );
};

export default Categories;
