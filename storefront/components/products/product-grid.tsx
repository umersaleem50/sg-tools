import StatusMessage from "@/components/status-message";
import { Button } from "@/components/ui/button";
import type { Product } from "@/types/products";
import { ArrowLeft, Package } from "lucide-react";
import Link from "next/link";
import ProductCard from "./product-card";

interface ProductGridProps {
  products: Product[];
  totalRecords?: number;
  backLink?: { href: string; label: string };
}

const ProductGrid = ({
  products: productList,
  totalRecords,
  backLink = { href: "/proizvodi/kategorije", label: "Sve kategorije" },
}: ProductGridProps) => {
  const displayCount = totalRecords ?? productList.length;
  const productsFoundText =
    displayCount === 0
      ? "Nema proizvoda"
      : displayCount === 1
        ? "1 proizvod"
        : `${displayCount} proizvoda`;

  return (
    <div className="w-full">
      {productList.length === 0 ? (
        <StatusMessage
          icon={Package}
          title="Još nema proizvoda u ovoj kategoriji."
          description="Proveri ponovo uskoro ili pogledaj druge kategorije."
        >
          <Link href={backLink.href} className="mt-6">
            <Button variant="outline" size="sm">
              <ArrowLeft className="size-4" />
              {backLink.label}
            </Button>
          </Link>
        </StatusMessage>
      ) : (
        <>
          <div className="flex items-center justify-between mb-6">
            <Link
              href={backLink.href}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="size-4" />
              {backLink.label}
            </Link>
            <span className="text-sm text-muted-foreground">
              {productsFoundText}
            </span>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 lg:gap-6">
            {productList.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductGrid;
