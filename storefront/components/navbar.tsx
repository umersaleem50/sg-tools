"use client";

import { NAV_LINKS } from "@/constants/links";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Container from "./container";
import LanguageSwitcher from "./language-switcher";
import Wrapper from "./wrapper";
const MobileMenu = dynamic(() => import("./mobile-menu"), { ssr: false });

const Navbar = () => {
  const t = useTranslations("nav");
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 w-full h-16 transition-all duration-300",
        isScrolled ? "bg-[#050505]/50 backdrop-blur-md" : "bg-transparent",
      )}
    >
      <Wrapper className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <img
            src={"/sg-tools-logo.svg"}
            className="w-max h-3"
            alt="Spiderly Logo"
          />
        </Link>

        <div className="hidden lg:flex flex-row flex-1 absolute inset-0 items-center justify-center w-max mx-auto gap-x-3 text-sm text-muted-foreground font-medium">
          {NAV_LINKS.map((link, index) => (
            <Container key={index} animation="fadeDown" delay={0.1 * index}>
              <div className="relative">
                <Link
                  href={link.href}
                  className="hover:text-foreground transition-all duration-500 px-1.5"
                >
                  {t(link.labelKey)}
                </Link>
              </div>
            </Container>
          ))}
          <Container animation="fadeDown" delay={0.1 * NAV_LINKS.length}>
            <div className="relative">
              <Link
                href="/contact"
                className="hover:text-foreground transition-all duration-500 px-1.5"
              >
                {t("contactSales")}
              </Link>
            </div>
          </Container>
        </div>

        <Container animation="fadeLeft" delay={0.1}>
          <div className="flex items-center gap-x-4">
            <LanguageSwitcher className="hidden lg:block" />
            <div className="lg:hidden">
              <MobileMenu />
            </div>
          </div>
        </Container>
      </Wrapper>
    </header>
  );
};

export default Navbar;
