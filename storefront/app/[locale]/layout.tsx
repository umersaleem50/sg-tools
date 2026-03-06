import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { base, heading } from "@/constants/fonts";
import { routing } from "@/i18n/routing";
import { pick } from "@/lib/pick";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { notFound } from "next/navigation";
import "../globals.css";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: {
      template: `%s | SG Tools`,
      default: `${t("title")} | SG Tools`,
    },
    description: t("description"),
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={cn(
          "min-h-screen text-foreground font-base antialiased dark",
          base.variable,
          heading.variable,
        )}
      >
        <NextIntlClientProvider
          messages={pick(messages, ["nav", "languageSwitcher", "whereToBuy"])}
        >
          <Navbar />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
