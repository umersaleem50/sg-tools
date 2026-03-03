import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import type { Product } from "@/types/products";
import { ArrowLeft, Package } from "lucide-react";
import { getTranslations } from "next-intl/server";
import ProductCard from "./product-card";

interface ProductGridProps {
  products: Product[];
}

const ProductGrid = async ({ products }: ProductGridProps) => {
  const t = await getTranslations("categoryPage");

  return (
    <div className="w-full">
      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="flex items-center justify-center size-12 rounded-xl bg-primary/15 border border-primary/30 mb-4">
            <Package className="size-6 text-primary" strokeWidth={1.5} />
          </div>
          <p className="text-lg font-medium">{t("noProducts")}</p>
          <p className="text-sm text-muted-foreground mt-2 max-w-sm">
            {t("noProductsDescription")}
          </p>
          <Link href="/products/categories" className="mt-6">
            <Button variant="outline" size="sm">
              <ArrowLeft className="size-4" />
              {t("backToCategories")}
            </Button>
          </Link>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between mb-6">
            <Link
              href="/products/categories"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="size-4" />
              {t("backToCategories")}
            </Link>
            <span className="text-sm text-muted-foreground">
              {t("productsFound", { count: products.length })}
            </span>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 lg:gap-6">
            {products.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductGrid;
