import type common from "./messages/en/common.json";
import type home from "./messages/en/home.json";
import type faq from "./messages/en/faq.json";
import type contact from "./messages/en/contact.json";
import type whereToBuy from "./messages/en/where-to-buy.json";
import type about from "./messages/en/about.json";

type Messages = typeof common & typeof home & typeof faq & typeof contact & typeof whereToBuy & typeof about;

declare module "next-intl" {
  interface AppConfig {
    Messages: Messages;
  }
}
