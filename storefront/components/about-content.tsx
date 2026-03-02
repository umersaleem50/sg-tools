import { ExternalLinkIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Container from "./container";
import { Button } from "./ui/button";
import Wrapper from "./wrapper";

const AboutContent = async () => {
  const t = await getTranslations("aboutContent");
  const paragraphs = t.raw("paragraphs") as string[];

  return (
    <div className="w-full py-16 lg:py-24">
      <Wrapper>
        <Container>
          <div className="flex flex-col gap-6">
            {paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="text-base text-neutral-300 leading-relaxed"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </Container>

        <Container delay={0.1}>
          <div className="mt-10">
            <a
              href="https://www.prodavnicaalata.rs/proizvodjaci/sg-tools/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg">
                {t("linkText")}
                <ExternalLinkIcon className="size-4" />
              </Button>
            </a>
          </div>
        </Container>
      </Wrapper>
    </div>
  );
};

export default AboutContent;
