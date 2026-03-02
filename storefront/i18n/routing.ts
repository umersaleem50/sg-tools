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
  },
});
