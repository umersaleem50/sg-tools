import CompanyBenefits from "@/components/company-benefits";
import CompanyStats from "@/components/company-stats";
import CompanyValues from "@/components/company-values";
import CTA from "@/components/cta";
import HeroHeader from "@/components/hero-header";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "O nama",
  description:
    "Upoznaj SG Tools — brend nastao iz 30 godina iskustva u svetu alata. Profesionalni kvalitet oblikovan stvarnim potrebama majstora.",
  canonicalUrl: "/o-nama",
});

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
