import { getCategoryBySlug, getSitemapCategories } from "@/lib/api";
import { OG_SIZE } from "@/lib/og/constants";
import { loadFonts } from "@/lib/og/fonts";
import { CategoryTemplate, DefaultTemplate } from "@/lib/og/templates";
import { ImageResponse } from "next/og";

export const alt = "Kategorija — SG Tools";
export const size = OG_SIZE;
export const contentType = "image/png";

export async function generateStaticParams() {
  try {
    const categories = await getSitemapCategories();
    return categories.map((c) => ({ slug: c.slug }));
  } catch {
    return [];
  }
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const fonts = await loadFonts();

  let category;
  try {
    category = await getCategoryBySlug(slug);
  } catch {
    category = null;
  }

  if (!category) {
    return new ImageResponse(<DefaultTemplate title="Kategorija" />, {
      ...size,
      fonts,
    });
  }

  return new ImageResponse(
    <CategoryTemplate
      name={category.name}
      description={category.metaDescription || category.description}
    />,
    { ...size, fonts },
  );
}
