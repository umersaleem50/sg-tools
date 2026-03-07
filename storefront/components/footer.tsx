import { Facebook, Instagram, Youtube } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  COMPANY_FOOTER_LINKS,
  LEGAL_LINKS,
  type NavLink,
  PRODUCTS_FOOTER_LINKS,
  SOCIAL_LINKS,
  SUPPORT_FOOTER_LINKS,
} from "../constants/links";
import Container from "./container";
import Glow from "./glow";
import Wrapper from "./wrapper";

const socialIcons = {
  facebook: Facebook,
  instagram: Instagram,
  youtube: Youtube,
} as const;

function FooterLinkColumn({
  title,
  links,
  animation,
  delay,
}: {
  title: string;
  links: readonly NavLink[];
  animation: "fadeUp" | "fadeLeft" | "fadeRight";
  delay: number;
}) {
  return (
    <Container animation={animation} delay={delay}>
      <div>
        <h3 className="text-base font-medium">{title}</h3>
        <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
          {links.map((link) => (
            <li key={link.href + link.label}>
              {link.external ? (
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  {link.label}
                  <span className="ml-1 text-xs">&#8599;</span>
                </a>
              ) : (
                <Link
                  href={link.href}
                  className="hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
}

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative pt-16 w-full overflow-hidden">
      <Glow />
      <Wrapper>
        <Container animation="scaleUp" delay={0.3}>
          <div className="absolute top-0 w-4/5 mx-auto inset-x-0 h-px bg-linear-to-r from-[#050505] via-primary/40 to-[#050505]"></div>
        </Container>

        <div className="grid gap-10 grid-cols-3 xl:grid-cols-4 xl:gap-8">
          {/* Link columns */}
          <FooterLinkColumn
            title="Proizvodi"
            links={PRODUCTS_FOOTER_LINKS}
            animation="fadeUp"
            delay={0.5}
          />
          <FooterLinkColumn
            title="Kompanija"
            links={COMPANY_FOOTER_LINKS}
            animation="fadeUp"
            delay={0.6}
          />
          <FooterLinkColumn
            title="Podrška"
            links={SUPPORT_FOOTER_LINKS}
            animation="fadeUp"
            delay={0.7}
          />

          {/* Logo column */}
          <Container
            animation="fadeRight"
            delay={0.4}
            className="col-span-3 xl:col-span-1"
          >
            <div className="flex flex-col items-start justify-start xl:pr-8">
              <div className="flex items-center gap-2">
                <Image
                  src="/sg-tools-logo.svg"
                  alt="SG Tools Logo"
                  width={32}
                  height={32}
                  className="w-24 h-8"
                />
              </div>
              <p className="text-muted-foreground mt-4 text-sm">
                Profesionalni alati nastali iz 30 godina iskustva.
              </p>
              <div className="mt-4 text-sm text-muted-foreground px-4 py-2 cursor-pointer rounded-full border border-border/40 bg-foreground/5 hover:bg-foreground/10 transition-colors duration-300">
                <a href="tel:+381111234567">
                  <p>+381 11 123 4567</p>
                </a>
              </div>
              <div className="mt-6 flex items-center gap-3">
                {SOCIAL_LINKS.map((social) => {
                  const Icon = socialIcons[social.icon];
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Icon className="size-5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </Container>
        </div>

        {/* Copyright bar */}
        <Container animation="fadeUp" delay={0.9}>
          <div className="mt-10 border-t border-border/80 py-8 flex flex-col md:flex-row items-center justify-center gap-2 text-sm text-muted-foreground">
            <p>{`\u00A9 ${year} SG Tools`}</p>
            <span className="hidden md:inline">&middot;</span>
            <div className="flex items-center gap-2">
              {LEGAL_LINKS.map((link, index) => (
                <span key={link.href} className="flex items-center gap-2">
                  {index > 0 && <span>&middot;</span>}
                  <Link
                    href={link.href}
                    className="hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </span>
              ))}
            </div>
          </div>
        </Container>
      </Wrapper>
    </footer>
  );
};

export default Footer;
