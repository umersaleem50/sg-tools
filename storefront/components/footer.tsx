import Image from "next/image";
import Link from "next/link";
import { PRODUCT_LINKS, RESOURCES_LINKS } from "../constants/links";
import Container from "./container";
import Wrapper from "./wrapper";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative pt-16 w-full overflow-hidden">
      <Wrapper>
        <Container animation="scaleUp" delay={0.3}>
          <div className="absolute top-0 w-4/5 mx-auto inset-x-0 h-px bg-linear-to-r from-[#050505] via-primary/40 to-[#050505]"></div>
        </Container>

        <div className="grid gap-8 xl:grid-cols-2 xl:gap-8">
          <Container animation="fadeRight" delay={0.4}>
            <div className="flex flex-col items-start justify-start md:max-w-75">
              <div className="flex items-center gap-2">
                <Image
                  src="/sg-tools-logo.svg"
                  alt="SG Tools Logo"
                  width={32}
                  height={32}
                  className="w-24 h-12"
                />
              </div>
              <p className="text-muted-foreground mt-4 text-sm">
                Profesionalni alati nastali iz
                <br />
                30 godina praktičnog iskustva.
              </p>
              <div className="mt-4 text-sm text-muted-foreground px-4 py-2 cursor-pointer rounded-full border border-border/40 bg-foreground/5 hover:bg-foreground/10 transition-colors duration-300">
                <a href="tel:+381111234567">
                  <p>+381 11 123 4567</p>
                </a>
              </div>
            </div>
          </Container>

          <div className="grid grid-cols-2 md:place-items-end w-full">
            <Container animation="fadeUp" delay={0.5}>
              <div>
                <h3 className="text-base font-medium">Kompanija</h3>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  {PRODUCT_LINKS.map((link, index) => (
                    <li key={index}>
                      <Link
                        href={link.href}
                        className="hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Container>

            <Container animation="fadeUp" delay={0.5}>
              <div>
                <h3 className="text-base font-medium">Podrška</h3>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  {RESOURCES_LINKS.map((link, index) => (
                    <Container
                      key={index}
                      animation="fadeLeft"
                      delay={0.7 + index * 0.1}
                    >
                      <li>
                        <Link
                          href={link.href}
                          className="hover:text-foreground transition-colors"
                        >
                          {link.label}
                        </Link>
                      </li>
                    </Container>
                  ))}
                </ul>
              </div>
            </Container>
          </div>
        </div>

        <Container animation="fadeUp" delay={1}>
          <div className="mt-16 border-t border-border/80 p-8 flex flex-col md:flex-row items-center justify-center">
            <p className="text-sm text-muted-foreground">
              {`\u00A9 ${year} SG Tools. Sva prava zadržana.`}
            </p>
          </div>
        </Container>
      </Wrapper>
    </footer>
  );
};

export default Footer;
