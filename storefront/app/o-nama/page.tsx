import AboutContent from "@/components/about-content";
import AboutStory from "@/components/about-story";
import CTA from "@/components/cta";
import HeroHeader from "@/components/hero-header";
<<<<<<< HEAD:storefront/app/o-nama/page.tsx
=======
import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("aboutPage");

  return {
    title: t("title"),
    description: t("description"),
  };
}

const AboutPage = async ({ params }: Props) => {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("aboutPage");
>>>>>>> 4791a63 (+template for open-graph and metadata generation for rest of page):storefront/app/[locale]/about/page.tsx

const AboutPage = () => {
  return (
    <div className="w-full relative flex flex-col pt-16">
<<<<<<< HEAD:storefront/app/o-nama/page.tsx
      <HeroHeader
        title="O nama"
        description="Upoznaj brend koji je nastao iz iskustva, znanja i potreba onih koji alat koriste svaki dan."
      />
=======
      <HeroHeader title={t("title")} description={t("description")} />
>>>>>>> 4791a63 (+template for open-graph and metadata generation for rest of page):storefront/app/[locale]/about/page.tsx
      <AboutStory />
      <AboutContent />
      <CTA />
    </div>
  );
};

export default AboutPage;
