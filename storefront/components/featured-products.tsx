import { getAllProducts } from "@/lib/api";
import type { Product } from "@/types/products";
import Container from "./container";
import ProductCard from "./products/product-card";
import Section from "./section";
import Wrapper from "./wrapper";

const FeaturedProducts = async () => {
  let products: Product[] = [];
  try {
    products = await getAllProducts(0, 4);
  } catch (error) {
    console.error("Error fetching products", error);
    return null;
  }

  if (!products || products.length === 0) return null;

  return (
    <Section>
      <Wrapper>
        <Container>
          <div className="flex flex-col items-start justify-start lg:items-center lg:justify-center">
            <h2 className="text-3xl lg:text-4xl font-semibold text-left lg:text-center tracking-tight">
              Izdvajamo iz ponude
            </h2>
            <p className="text-base text-muted-foreground mt-2 text-left lg:text-center">
              Najpopularniji alati iz našeg asortimana
            </p>
          </div>
        </Container>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6 mt-10">
          {products.map((product, index) => (
            <ProductCard key={product.slug} product={product} index={index} />
          ))}
        </div>
      </Wrapper>
    </Section>
  );
};

export default FeaturedProducts;
