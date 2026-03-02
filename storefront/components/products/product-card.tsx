import Container from "@/components/container";
import { Link } from "@/i18n/navigation";
import type { Product } from "@/types/products";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
  index: number;
  buyLabel: string;
  outOfStockLabel: string;
  discountLabel: string;
  currency: string;
}

const ProductCard = ({
  product,
  index,
  buyLabel,
  outOfStockLabel,
  discountLabel,
  currency,
}: ProductCardProps) => {
  const hasDiscount =
    product.sale_price !== null && product.sale_price < product.price;
  const isOutOfStock = product.stock <= 0;
  const displayPrice = hasDiscount ? product.sale_price! : product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.price - product.sale_price!) / product.price) * 100)
    : 0;

  return (
    <Container delay={index * 0.05}>
      <div className="relative flex flex-col bg-foreground/5 border border-border/20 hover:border-border transition-all rounded-lg lg:rounded-xl overflow-hidden h-full">
        <Link
          href={{ pathname: "/products/[slug]", params: { slug: product.slug } }}
          className="absolute inset-0 z-10"
        >
          <span className="sr-only">{product.title}</span>
        </Link>
        <div className="relative aspect-square w-full bg-foreground/5">
          {product.poster_url && (
            <Image
              src={product.poster_url}
              alt={product.title}
              fill
              className="object-contain p-4"
              sizes="(max-width: 640px) 50vw, 25vw"
            />
          )}

          {hasDiscount && (
            <span className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs font-semibold px-2 py-1 rounded">
              {discountLabel.replace("{percent}", String(discountPercent))}
            </span>
          )}

          {isOutOfStock && (
            <span className="absolute top-2 right-2 bg-muted text-muted-foreground text-xs font-semibold px-2 py-1 rounded">
              {outOfStockLabel}
            </span>
          )}
        </div>

        <div className="flex flex-col flex-1 p-3 sm:p-4">
          {product.manufacturer?.name && (
            <span className="text-[10px] sm:text-xs font-medium text-muted-foreground uppercase tracking-wider">
              {product.manufacturer.name}
            </span>
          )}

          <h3 className="text-sm sm:text-base font-semibold mt-1 line-clamp-2">
            {product.title}
          </h3>

          {product.description && (
            <p className="text-xs sm:text-sm text-muted-foreground mt-1 line-clamp-2">
              {product.description}
            </p>
          )}

          <div className="flex items-baseline gap-2 mt-auto pt-3">
            <span className="text-base sm:text-lg font-bold">
              {displayPrice.toLocaleString("sr-RS")} {currency}
            </span>
            {hasDiscount && (
              <span className="text-xs sm:text-sm text-muted-foreground line-through">
                {product.price.toLocaleString("sr-RS")} {currency}
              </span>
            )}
          </div>

          <a
            href={product.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`relative z-20 mt-3 inline-flex items-center justify-center rounded-md text-sm font-medium h-9 px-4 ${
              isOutOfStock
                ? "bg-muted text-muted-foreground pointer-events-none"
                : "bg-primary text-primary-foreground hover:bg-primary/90"
            } transition-colors`}
          >
            {isOutOfStock ? outOfStockLabel : buyLabel}
          </a>
        </div>
      </div>
    </Container>
  );
};

export default ProductCard;
