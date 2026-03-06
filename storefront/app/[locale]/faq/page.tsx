import CTA from "@/components/cta";
import Faq from "@/components/faq";
import HeroHeader from "@/components/hero-header";
import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("faqPage");

  return {
    title: t("title"),
    description: t("description"),
  };
}

const FaqPage = async ({ params }: Props) => {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("faqPage");

  return (
    <div className="w-full relative flex flex-col pt-16">
      <HeroHeader title={t("title")} description={t("description")} />
      <Faq />
      <CTA />
    </div>
  );
};

export default FaqPage;
