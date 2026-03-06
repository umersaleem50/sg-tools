import CTA from "@/components/cta";
import HeroHeader from "@/components/hero-header";
import WhereToBuyContent from "@/components/where-to-buy/where-to-buy-content";
import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("whereToBuy");

  return {
    title: t("title"),
    description: t("description"),
  };
}

const WhereToBuyPage = async ({ params }: Props) => {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("whereToBuy");

  return (
    <div className="w-full relative flex flex-col pt-16">
      <HeroHeader title={t("title")} description={t("description")} />
      <WhereToBuyContent />
      <CTA />
    </div>
  );
};

export default WhereToBuyPage;
