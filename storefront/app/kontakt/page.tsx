import ContactHero from "@/components/contact/contact-hero";
import ContactLocations from "@/components/contact/contact-locations";
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
      <ContactLocations />
      <CTA />
    </div>
  );
};

export default ContactPage;
