import ContactForm from "@/components/contact/contact-form";
import ContactHero from "@/components/contact/contact-hero";
import CTA from "@/components/cta";
<<<<<<< HEAD:storefront/app/kontakt/page.tsx
=======
import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("contact");

  return {
    title: t("heroTitle"),
    description: t("heroDescription"),
  };
}

const ContactPage = async ({ params }: Props) => {
  const { locale } = await params;
  setRequestLocale(locale);
>>>>>>> 4791a63 (+template for open-graph and metadata generation for rest of page):storefront/app/[locale]/contact/page.tsx

const ContactPage = () => {
  return (
    <div className="w-full relative flex flex-col pt-16">
      <ContactHero />
      <ContactForm />
      <CTA />
    </div>
  );
};

export default ContactPage;
