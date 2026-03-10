import Container from "@/components/container";
import Wrapper from "@/components/wrapper";
import { SITE_URL } from "@/constants/links";
import type { Product } from "@/types/products";
import { ChevronRight, ExternalLink, Package } from "lucide-react";
import Link from "next/link";
import ProductGallery from "./product-gallery";

interface ProductDetailProps {
  product: Product;
}

const ProductDetail = ({ product }: ProductDetailProps) => {
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.imageUrl,
    brand: {
      "@type": "Brand",
      name: product.brandName || "SG Tools",
    },
    offers: {
      "@type": "Offer",
      url: `https://www.prodavnicaalata.rs/proizvodi/${product.slug}/`,
      priceCurrency: "RSD",
      price: product.displayPrice,
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Svi proizvodi",
        item: `${SITE_URL}/proizvodi/kategorije`,
      },
      ...(product.categorySlug
        ? [
            {
              "@type": "ListItem",
              position: 2,
              name: product.categoryName,
              item: `${SITE_URL}/proizvodi/kategorije/${product.categorySlug}`,
            },
          ]
        : []),
      {
        "@type": "ListItem",
        position: product.categorySlug ? 3 : 2,
        name: product.title,
      },
    ],
  };

  return (
    <Wrapper className="py-8 lg:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* Breadcrumbs */}
      <Container>
        <nav className="flex items-center gap-1.5 text-sm text-muted-foreground mb-8 flex-wrap">
          <Link
            href="/proizvodi/kategorije"
            className="hover:text-foreground transition-colors"
          >
            Svi proizvodi
          </Link>
          {product.categorySlug && (
            <>
              <ChevronRight className="size-3.5" />
              <Link
                href={`/proizvodi/kategorije/${product.categorySlug}`}
                className="hover:text-foreground transition-colors"
              >
                {product.categoryName}
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
            posterUrl={product.imageUrl}
            imageUrls={product.productImageUrls}
            title={product.title}
          />
        </Container>

        {/* Right: Product info */}
        <Container delay={1}>
          <div className="flex flex-col">
            {product.brandName && (
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                {product.brandName}
              </span>
            )}

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-2">
              {product.title}
            </h1>

            {product.description && (
              <p
                className="text-muted-foreground mt-3 leading-relaxed whitespace-pre-line"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            )}

            {/* Price */}
            <div className="flex items-baseline gap-3 mt-6">
              <span className="text-2xl sm:text-3xl font-bold">
                {product.displayPrice.toLocaleString("sr-RS")} RSD
              </span>
              {product.hasDiscount && product.originalPrice && (
                <>
                  <span className="text-lg text-muted-foreground line-through">
                    {product.originalPrice.toLocaleString("sr-RS")} RSD
                  </span>
                  <span className="bg-primary text-primary-foreground text-xs font-semibold px-2 py-1 rounded">
                    {`-${product.discountPercentage}%`}
                  </span>
                </>
              )}
            </div>

            {/* Stock status */}
            <div className="flex items-center gap-2 mt-3">
              <Package className="size-4" />
              <span
                className={
                  !product.inStock
                    ? "text-sm text-muted-foreground"
                    : "text-sm text-green-500"
                }
              >
                {!product.inStock ? "Nema na stanju" : "Na stanju"}
              </span>
            </div>

            {/* Buy button */}
            <a
              href={`https://www.prodavnicaalata.rs/proizvodi/${product.slug}/`}
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-6 inline-flex items-center justify-center gap-2 rounded-lg text-base font-semibold h-12 px-8 transition-colors ${
                !product.inStock
                  ? "bg-muted text-muted-foreground pointer-events-none"
                  : "bg-primary text-primary-foreground hover:bg-primary/90"
              }`}
            >
              {!product.inStock ? "Nema na stanju" : "Kupi online"}
              {product.inStock && <ExternalLink className="size-4" />}
            </a>

            {/* Metadata */}
            <div className="mt-8 pt-6 border-t border-border/20 space-y-2 text-sm">
              {product.categorySlug && (
                <div className="flex gap-2">
                  <span className="text-muted-foreground">Kategorija:</span>
                  <Link
                    href={`/proizvodi/kategorije/${product.categorySlug}`}
                    className="text-primary hover:underline"
                  >
                    {product.categoryName}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>

      {/* Product details / HTML content */}
      {product.htmlDescription && (
        <Container delay={2} className="mt-12 lg:mt-16">
          <h2 className="text-xl font-bold mb-6">Detalji</h2>
          <div
            className="product-text"
            dangerouslySetInnerHTML={{ __html: product.htmlDescription }}
          />
        </Container>
      )}

    </Wrapper>
  );
};

export default ProductDetail;
