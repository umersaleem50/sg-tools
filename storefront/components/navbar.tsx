"use client";

import { NAV_LINKS } from "@/constants/links";
import { Link, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Container from "./container";
import LanguageSwitcher from "./language-switcher";
import Wrapper from "./wrapper";
const MobileMenu = dynamic(() => import("./mobile-menu"), { ssr: false });

const Navbar = () => {
  const t = useTranslations("nav");
  const router = useRouter();
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

        <div className="hidden lg:flex flex-row flex-1 absolute inset-0 items-center justify-center w-max mx-auto">
          <NavigationMenu>
            <NavigationMenuList className="gap-x-1">
              {NAV_LINKS.map((link, index) => (
                <Container key={index} animation="fadeDown" delay={0.1 * index}>
                  <NavigationMenuItem>
                    {link.children ? (
                      <>
                        <NavigationMenuTrigger
                          className="text-sm font-medium cursor-pointer"
                          onClick={() => {
                            router.push("/products/categories");
                          }}
                        >
                          {t(link.labelKey as Parameters<typeof t>[0])}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent className="min-w-[200px]">
                          <ul className="flex flex-col gap-0.5 p-1">
                            {link.children.map((child) => (
                              <li key={child.slug}>
                                <NavigationMenuLink asChild>
                                  <Link
                                    href={{
                                      pathname: "/products/categories/[slug]",
                                      params: { slug: child.slug },
                                    }}
                                    className="flex select-none rounded-sm px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                                  >
                                    {t(child.labelKey as Parameters<typeof t>[0])}
                                  </Link>
                                </NavigationMenuLink>
                              </li>
                            ))}
                            <li>
                              <hr className="my-1 border-border" />
                              <NavigationMenuLink asChild>
                                <Link
                                  href="/products/categories"
                                  className="flex select-none rounded-sm px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                                >
                                  {t("allCategories")}
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          </ul>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <NavigationMenuLink asChild>
                        <Link
                          href={link.href as "/about" | "/faq" | "/where-to-buy"}
                          className="hover:text-foreground transition-all duration-500 px-1.5 text-sm font-medium text-muted-foreground"
                        >
                          {t(link.labelKey as Parameters<typeof t>[0])}
                        </Link>
                      </NavigationMenuLink>
                    )}
                  </NavigationMenuItem>
                </Container>
              ))}
              <Container animation="fadeDown" delay={0.1 * NAV_LINKS.length}>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/contact"
                      className="hover:text-foreground transition-all duration-500 px-1.5 text-sm font-medium text-muted-foreground"
                    >
                      {t("contactSales")}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </Container>
            </NavigationMenuList>
          </NavigationMenu>
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
