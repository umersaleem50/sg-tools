import HeroHeader from "@/components/hero-header";
import AboutStory from "@/components/about-story";
import AboutContent from "@/components/about-content";
import CTA from "@/components/cta";
import { setRequestLocale, getTranslations } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

const AboutPage = async ({ params }: Props) => {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("aboutPage");

  return (
    <div className="w-full relative flex flex-col pt-16">
      <HeroHeader
        title={t("title")}
        description={t("description")}
      />
      <AboutStory />
      <AboutContent />
      <CTA />
    </div>
  );
};

export default AboutPage;
