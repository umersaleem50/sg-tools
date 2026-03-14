// import AboutContent from "@/components/about-content";
// import AboutStory from "@/components/about-story";
import CompanyBenefits from "@/components/company-benefits";
import CompanyStats from "@/components/company-stats";
import CompanyValues from "@/components/company-values";
import CTA from "@/components/cta";
import HeroHeader from "@/components/hero-header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "O nama",
  description:
    "Upoznaj SG Tools — brend nastao iz 30 godina iskustva u svetu alata. Profesionalni kvalitet oblikovan stvarnim potrebama majstora.",
  alternates: {
    canonical: "/o-nama",
  },
};

const AboutPage = () => {
  return (
    <div>
      <HeroHeader
        title="O nama"
        description="Upoznaj brend koji je nastao iz iskustva, znanja i potreba onih koji alat koriste svaki dan."
      />
      <CompanyStats />
      <CompanyValues />
      <CompanyBenefits />

      <CTA />
    </div>
  );
};

export default AboutPage;
