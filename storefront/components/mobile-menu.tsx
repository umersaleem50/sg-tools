"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { NAV_LINKS, type NavLink } from "@/constants/links";
import { Link } from "@/i18n/navigation";
import { MenuIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "./language-switcher";

const MobileMenu = () => {
  const t = useTranslations("nav");

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="ghost">
          <MenuIcon className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="p-4">
        <SheetHeader className="sr-only">
          <SheetTitle>{t("menu")}</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-2 mt-8">
          {NAV_LINKS.map((link, index) =>
            link.children ? (
              <Accordion key={index} type="single" collapsible>
                <AccordionItem value="categories" className="border-b-0">
                  <AccordionTrigger className="py-2 text-lg font-medium hover:no-underline">
                    {t(link.labelKey as Parameters<typeof t>[0])}
                  </AccordionTrigger>
                  <AccordionContent className="pb-2">
                    <div className="flex flex-col gap-1 pl-2">
                      <SheetClose asChild>
                        <Link
                          href="/products/categories"
                          className="py-2 text-base text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {t("allCategories")}
                        </Link>
                      </SheetClose>
                      {link.children.map((child) => (
                        <SheetClose asChild key={child.slug}>
                          <Link
                            href={{
                              pathname: "/products/categories/[slug]",
                              params: { slug: child.slug },
                            }}
                            className="py-2 text-base text-muted-foreground hover:text-foreground transition-colors"
                          >
                            {t(child.labelKey as Parameters<typeof t>[0])}
                          </Link>
                        </SheetClose>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ) : (
              <SheetClose asChild key={index}>
                <Link href={link.href as "/about" | "/faq" | "/where-to-buy"} className="text-lg font-medium w-full py-2">
                  {t(link.labelKey as Parameters<typeof t>[0])}
                </Link>
              </SheetClose>
            ),
          )}
          <SheetClose asChild>
            <Link href="/contact" className="text-lg font-medium w-full py-2">
              {t("contactSales")}
            </Link>
          </SheetClose>
          <LanguageSwitcher />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
