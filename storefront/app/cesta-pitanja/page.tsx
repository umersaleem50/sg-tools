import CTA from "@/components/cta";
import Faq from "@/components/faq";
import HeroHeader from "@/components/hero-header";
import { FAQ_ITEMS } from "@/constants/content";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Česta pitanja",
  description:
    "Odgovori na najčešća pitanja o SG Tools proizvodima — dostava, garancija, povrat, radno vreme i više.",
  canonicalUrl: "/cesta-pitanja",
});

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

const FaqPage = () => {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <HeroHeader
        title="Česta pitanja"
        description="Pronađi odgovore na najčešća pitanja o kupovini, isporuci i garanciji. Ne možeš da pronađeš odgovor? Kontaktiraj naš tim."
      />
      <Faq />
      <CTA />
    </div>
  );
};

export default FaqPage;
