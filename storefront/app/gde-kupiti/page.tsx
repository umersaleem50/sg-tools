import CTA from "@/components/cta";
import HeroHeader from "@/components/hero-header";
import WhereToBuyContent from "@/components/where-to-buy/where-to-buy-content";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Gde kupiti",
  description:
    "Pronađi ovlašćene distributere, prodavnice i servisne centre SG Tools alata širom Srbije.",
  canonicalUrl: "/gde-kupiti",
});

const WhereToBuyPage = () => {
  return (
    <div>
      <HeroHeader
        title="Gde kupiti"
        description="Pronađi ovlašćene distributere, servisne centre i servise van garancije širom Srbije."
      />
      <WhereToBuyContent />
      <CTA />
    </div>
  );
};

export default WhereToBuyPage;
