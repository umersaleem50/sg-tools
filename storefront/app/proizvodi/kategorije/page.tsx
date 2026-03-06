import CTA from "@/components/cta";
import HeroHeader from "@/components/hero-header";
import CategoryCard from "@/components/products/category-card";
import Wrapper from "@/components/wrapper";
import { getCategories } from "@/lib/categories";
<<<<<<< HEAD:storefront/app/proizvodi/kategorije/page.tsx
import type { Metadata } from "next";
=======
import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
>>>>>>> 4791a63 (+template for open-graph and metadata generation for rest of page):storefront/app/[locale]/products/categories/page.tsx

export const metadata: Metadata = {
  title: "Kategorije proizvoda | SG Tools",
  description:
    "Pregledaj kompletnu ponudu profesionalnog alata po kategorijama.",
  alternates: {
    canonical: "https://prodavnicaalata.rs/proizvodi/kategorije/",
  },
};

<<<<<<< HEAD:storefront/app/proizvodi/kategorije/page.tsx
const CategoriesPage = async () => {
=======
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("productsPage");

  return {
    title: t("title"),
    description: t("description"),
  };
}

const CategoriesPage = async ({ params }: Props) => {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("productsPage");
  const tList = await getTranslations("categoriesList");
  const items = tList.raw("items") as Array<{ title: string; desc: string }>;
>>>>>>> 4791a63 (+template for open-graph and metadata generation for rest of page):storefront/app/[locale]/products/categories/page.tsx
  const categories = await getCategories();

  return (
    <div className="w-full relative flex flex-col pt-16">
      <HeroHeader
        title="Kategorije proizvoda"
        description="Pregledaj kompletnu ponudu profesionalnog alata po kategorijama."
      />

      <Wrapper className="pb-16">
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
      </Wrapper>

      <CTA />
    </div>
  );
};

export default CategoriesPage;
