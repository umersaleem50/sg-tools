"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { NAV_LINKS } from "@/constants/links";
import { cn } from "@/lib/utils";
import type { Category } from "@/types/categories";
import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import BuyOnlineButton from "./buy-online-button";
import Container from "./container";
import Wrapper from "./wrapper";

const MobileMenu = dynamic(() => import("./mobile-menu"), { ssr: false });

interface NavbarProps {
  categories: Category[];
}

const Navbar = ({ categories }: NavbarProps) => {
  const router = useRouter();

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 w-full h-16 transition-all duration-300 backdrop-blur-md border-b border-border",
      )}
    >
      <Wrapper className="grid grid-cols-2 md:grid-cols-3 items-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Link href="/" className="flex items-center gap-2">
            <img
              src={"/sg-tools-logo.svg"}
              className="w-max h-3"
              alt="Spiderly Logo"
            />
          </Link>
        </motion.div>

        <div className="hidden md:flex justify-center">
          <NavigationMenu>
            <NavigationMenuList className="gap-x-1 flex-nowrap">
              <AnimatePresence>
                {NAV_LINKS.map((link, index) => (
                  <Container
                    key={index}
                    animation="fadeDown"
                    delay={0.1 * index}
                  >
                    <NavigationMenuItem>
                      {link.href === "/proizvodi/kategorije" ? (
                        <>
                          <NavigationMenuTrigger
                            className="text-sm font-medium cursor-pointer"
                            onClick={() => {
                              router.push("/proizvodi/kategorije");
                            }}
                          >
                            {link.label}
                          </NavigationMenuTrigger>
                          <NavigationMenuContent className="min-w-[200px]">
                            <ul className="flex flex-col gap-0.5 p-1">
                              {categories.map((cat) => (
                                <li key={cat.slug}>
                                  <NavigationMenuLink asChild>
                                    <Link
                                      href={`/proizvodi/kategorije/${cat.slug}`}
                                      className="flex select-none rounded-sm px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                                    >
                                      {cat.name}
                                    </Link>
                                  </NavigationMenuLink>
                                </li>
                              ))}
                              <li>
                                <hr className="my-1 border-border" />
                                <NavigationMenuLink asChild>
                                  <Link
                                    href="/proizvodi/kategorije"
                                    className="flex select-none rounded-sm px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                                  >
                                    Sve kategorije
                                  </Link>
                                </NavigationMenuLink>
                              </li>
                            </ul>
                          </NavigationMenuContent>
                        </>
                      ) : (
                        <NavigationMenuLink asChild>
                          <Link
                            href={link.href}
                            className="hover:text-foreground transition-all duration-500 px-1.5 text-sm font-medium text-muted-foreground whitespace-nowrap"
                          >
                            {link.label}
                          </Link>
                        </NavigationMenuLink>
                      )}
                    </NavigationMenuItem>
                  </Container>
                ))}
              </AnimatePresence>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center justify-end gap-x-4">
          <Container animation="fadeLeft" delay={0.1}>
            <BuyOnlineButton
              size="sm"
              variant={"outline"}
              className="hidden md:inline-flex"
            />
          </Container>
          <div className="md:hidden">
            <Container animation="fadeLeft" delay={0.1}>
              <MobileMenu categories={categories} />
            </Container>
          </div>
        </div>
      </Wrapper>
    </header>
  );
};

export default Navbar;
