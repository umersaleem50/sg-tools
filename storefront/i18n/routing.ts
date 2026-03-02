import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "sr"],
  defaultLocale: "sr",
  pathnames: {
    "/": "/",
    "/contact": {
      en: "/contact",
      sr: "/kontakt",
    },
    "/faq": {
      en: "/faq",
      sr: "/cesta-pitanja",
    },
    "/about": {
      en: "/about",
      sr: "/o-nama",
    },
    "/help": {
      en: "/help",
      sr: "/pomoc",
    },
    "/docs": {
      en: "/docs",
      sr: "/dokumentacija",
    },
    "/where-to-buy": {
      en: "/where-to-buy",
      sr: "/gde-kupiti",
    },
    "/products/categories": {
      en: "/products/categories",
      sr: "/proizvodi/kategorije",
    },
    "/products/categories/[slug]": {
      en: "/products/categories/[slug]",
      sr: "/proizvodi/kategorije/[slug]",
    },
    "/products/[slug]": {
      en: "/products/[slug]",
      sr: "/proizvodi/[slug]",
    },
  },
});
