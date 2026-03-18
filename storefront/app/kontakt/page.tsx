import ContactForm from "@/components/contact/contact-form";
import ContactHero from "@/components/contact/contact-hero";
import CTA from "@/components/cta";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Kontakt",
  description:
    "Kontaktiraj SG Tools — pitanja o alatima, pomoć pri izboru proizvoda ili saradnja. Tu smo da pomognemo.",
  canonicalUrl: "/kontakt",
});

const ContactPage = () => {
  return (
    <div>
      <ContactHero />
      <ContactForm />
      <CTA />
    </div>
  );
};

export default ContactPage;
