import Container from "@/components/container";
import Wrapper from "@/components/wrapper";
import { Link } from "@/i18n/navigation";
import type { Product } from "@/types/products";
import { ArrowLeft, ChevronRight, ExternalLink, Package } from "lucide-react";
import { getTranslations } from "next-intl/server";
import ProductCard from "./product-card";
import ProductGallery from "./product-gallery";

interface ProductDetailProps {
  product: Product;
  relatedProducts: Product[];
}

const ProductDetail = async ({ product, relatedProducts }: ProductDetailProps) => {
  const t = await getTranslations("productPage");
  const tCategory = await getTranslations("categoryPage");

  const hasDiscount =
    product.sale_price !== null && product.sale_price < product.price;
  const isOutOfStock = product.stock <= 0;
  const displayPrice = hasDiscount ? product.sale_price! : product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.price - product.sale_price!) / product.price) * 100)
    : 0;

  // Extract first category slug for breadcrumb linking
  const categorySlug = product.categories?.split(",")[0]?.trim() || product.category;

  return (
    <Wrapper className="py-8 lg:py-12">
      {/* Breadcrumbs */}
      <Container>
        <nav className="flex items-center gap-1.5 text-sm text-muted-foreground mb-8 flex-wrap">
          <Link
            href="/products/categories"
            className="hover:text-foreground transition-colors"
          >
            {t("backToProducts")}
          </Link>
          {categorySlug && (
            <>
              <ChevronRight className="size-3.5" />
              <Link
                href={{ pathname: "/products/categories/[slug]", params: { slug: categorySlug } }}
                className="hover:text-foreground transition-colors"
              >
                {product.category}
              </Link>
            </>
          )}
          <ChevronRight className="size-3.5" />
          <span className="text-foreground">{product.title}</span>
        </nav>
      </Container>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Left: Gallery */}
        <Container>
          <ProductGallery
            posterUrl={product.poster_url}
            imageUrls={product.imageUrls ?? []}
            title={product.title}
          />
        </Container>

        {/* Right: Product info */}
        <Container delay={1}>
          <div className="flex flex-col">
            {product.manufacturer && (
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                {product.manufacturer}
              </span>
            )}

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-2">
              {product.title}
            </h1>

            {product.description && (
              <p className="text-muted-foreground mt-3 leading-relaxed">
                {product.description}
              </p>
            )}

            {/* Price */}
            <div className="flex items-baseline gap-3 mt-6">
              <span className="text-2xl sm:text-3xl font-bold">
                {displayPrice.toLocaleString("sr-RS")} {t("currency")}
              </span>
              {hasDiscount && (
                <>
                  <span className="text-lg text-muted-foreground line-through">
                    {product.price.toLocaleString("sr-RS")} {t("currency")}
                  </span>
                  <span className="bg-primary text-primary-foreground text-xs font-semibold px-2 py-1 rounded">
                    {t("discount", { percent: discountPercent })}
                  </span>
                </>
              )}
            </div>

            {/* Stock status */}
            <div className="flex items-center gap-2 mt-3">
              <Package className="size-4" />
              <span
                className={
                  isOutOfStock
                    ? "text-sm text-muted-foreground"
                    : "text-sm text-green-500"
                }
              >
                {isOutOfStock ? t("outOfStock") : t("inStock")}
              </span>
            </div>

            {/* Buy button */}
            <a
              href={product.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-6 inline-flex items-center justify-center gap-2 rounded-lg text-base font-semibold h-12 px-8 transition-colors ${
                isOutOfStock
                  ? "bg-muted text-muted-foreground pointer-events-none"
                  : "bg-primary text-primary-foreground hover:bg-primary/90"
              }`}
            >
              {isOutOfStock ? t("outOfStock") : t("buyOnline")}
              {!isOutOfStock && <ExternalLink className="size-4" />}
            </a>

            {/* Metadata */}
            <div className="mt-8 pt-6 border-t border-border/20 space-y-2 text-sm">
              {product.sku && (
                <div className="flex gap-2">
                  <span className="text-muted-foreground">{t("sku")}:</span>
                  <span>{product.sku}</span>
                </div>
              )}
              {categorySlug && (
                <div className="flex gap-2">
                  <span className="text-muted-foreground">{t("category")}:</span>
                  <Link
                    href={{ pathname: "/products/categories/[slug]", params: { slug: categorySlug } }}
                    className="text-primary hover:underline"
                  >
                    {product.category}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>

      {/* Product details / HTML content */}
      {product.text && (
        <Container delay={2} className="mt-12 lg:mt-16">
          <h2 className="text-xl font-bold mb-6">{t("details")}</h2>
          <div
            className="product-text"
            dangerouslySetInnerHTML={{ __html: product.text }}
          />
        </Container>
      )}

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <Container delay={3} className="mt-12 lg:mt-16">
          <h2 className="text-xl font-bold mb-6">{t("relatedProducts")}</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 lg:gap-6">
            {relatedProducts.map((related, index) => (
              <ProductCard
                key={related.id}
                product={related}
                index={index}
                buyLabel={tCategory("buyOnline")}
                outOfStockLabel={tCategory("outOfStock")}
                discountLabel={tCategory("discount")}
                currency={tCategory("currency")}
              />
            ))}
          </div>
        </Container>
      )}
    </Wrapper>
  );
};

export default ProductDetail;
