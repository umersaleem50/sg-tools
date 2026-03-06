import AboutContent from "@/components/about-content";
import AboutStory from "@/components/about-story";
import CTA from "@/components/cta";
import HeroHeader from "@/components/hero-header";

const AboutPage = () => {
  return (
    <div className="w-full relative flex flex-col pt-16">
      <HeroHeader
        title="O nama"
        description="Upoznaj brend koji je nastao iz iskustva, znanja i potreba onih koji alat koriste svaki dan."
      />
      <AboutStory />
      <AboutContent />
      <CTA />
    </div>
  );
};

export default AboutPage;
