import { ImageResponse } from "next/og";
import { OG_SIZE } from "@/lib/og/constants";
import { loadFonts } from "@/lib/og/fonts";
import { DefaultTemplate, ProductTemplate } from "@/lib/og/templates";
import { getProductBySlug, getProducts } from "@/lib/api";

export const alt = "Proizvod — SG Tools";
export const size = OG_SIZE;
export const contentType = "image/png";

export async function generateStaticParams() {
  try {
    const products = await getProducts(0, 1000);
    return products.map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const fonts = await loadFonts();

  let product;
  try {
    product = await getProductBySlug(slug);
  } catch {
    product = null;
  }

  if (!product) {
    return new ImageResponse(
      <DefaultTemplate title="Proizvod" />,
      { ...size, fonts },
    );
  }

  return new ImageResponse(
    (
      <ProductTemplate
        title={product.title}
        categoryName={product.categoryName}
        displayPrice={product.displayPrice}
        originalPrice={product.originalPrice}
        hasDiscount={product.hasDiscount}
        discountPercentage={product.discountPercentage}
        imageUrl={product.imageUrl}
      />
    ),
    { ...size, fonts },
  );
}
