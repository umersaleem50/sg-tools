import Categories from "@/components/categories";
import Companies from "@/components/companies";
import CTA from "@/components/cta";
import FeaturedProducts from "@/components/featured-products";
import Features from "@/components/features";
import Hero from "@/components/hero";
import Stats from "@/components/stats";
import Testimonials from "@/components/testimonials";
import { Suspense } from "react";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <Companies />
      <Suspense fallback={null}>
        <FeaturedProducts />
      </Suspense>
      <Suspense fallback={null}>
        <Categories />
      </Suspense>
      <Features />
      <Stats />
      <Testimonials />
      <CTA />
    </div>
  );
};

export default HomePage;
