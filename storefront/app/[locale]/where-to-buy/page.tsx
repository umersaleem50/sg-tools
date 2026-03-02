import HeroHeader from "@/components/hero-header";
import CTA from "@/components/cta";
import WhereToBuyContent from "@/components/where-to-buy/where-to-buy-content";
import { setRequestLocale, getTranslations } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

const WhereToBuyPage = async ({ params }: Props) => {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("whereToBuy");

  return (
    <div className="w-full relative flex flex-col pt-16">
      <HeroHeader
        title={t("title")}
        description={t("description")}
      />
      <WhereToBuyContent />
      <CTA />
    </div>
  );
};

export default WhereToBuyPage;
