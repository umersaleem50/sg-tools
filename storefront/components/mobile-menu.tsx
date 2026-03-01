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
import { NAV_LINKS } from "@/constants/links";
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
        <div className="flex flex-col gap-6 mt-8">
          {NAV_LINKS.map((link, index) => (
            <SheetClose asChild key={index}>
              <Link href={link.href} className="text-lg font-medium w-full">
                {t(link.labelKey)}
              </Link>
            </SheetClose>
          ))}
          <SheetClose asChild>
            <Link href="/contact" className="text-lg font-medium w-full">
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
