import Container from "@/components/container";
import type { Category } from "@/types/categories";
import Image from "next/image";
import Link from "next/link";

interface CategoryCardProps {
  category: Category;
  title: string;
  index: number;
}

const CategoryCard = ({
  category,
  title,
  index,
}: CategoryCardProps) => {
  return (
    <Container delay={Math.min(index * 0.05, 0.3)}>
      <Link href={`/proizvodi/kategorije/${category.slug}`}>
        <div className="relative bg-foreground/5 border border-border/20 hover:border-border transition-all cursor-pointer rounded-lg lg:rounded-xl overflow-hidden">
          <Image
            src={category.imageUrl}
            alt={title}
            width={500}
            height={1000}
            className="object-contain w-full"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-2 pb-2 pt-10 sm:px-3 sm:pb-3 sm:pt-14">
            <span className="text-sm sm:text-base lg:text-lg font-semibold text-white">
              {title}
            </span>
          </div>
        </div>
      </Link>
    </Container>
  );
};

export default CategoryCard;
