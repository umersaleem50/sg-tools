import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as (typeof routing.locales)[number])) {
    locale = routing.defaultLocale;
  }

  const [common, home, faq, contact, whereToBuy, about] = await Promise.all([
    import(`../messages/${locale}/common.json`),
    import(`../messages/${locale}/home.json`),
    import(`../messages/${locale}/faq.json`),
    import(`../messages/${locale}/contact.json`),
    import(`../messages/${locale}/where-to-buy.json`),
    import(`../messages/${locale}/about.json`),
  ]);

  return {
    locale,
    messages: {
      ...common.default,
      ...home.default,
      ...faq.default,
      ...contact.default,
      ...whereToBuy.default,
      ...about.default,
    },
  };
});
