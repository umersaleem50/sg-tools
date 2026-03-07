import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { Toaster } from "@/components/ui/sonner";
import { base, heading } from "@/constants/fonts";
import { getCategories } from "@/lib/categories";
import { cn } from "@/lib/utils";
import type { Category } from "@/types/categories";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://sgtools.rs"),
  title: {
    default: "SG Tools — Profesionalni alati sa 30 godina iskustva",
    template: "%s | SG Tools",
  },
  description:
    "Električni alati, ručni alati, brusilice i dijamantski alati nastali iz decenija praktičnog znanja. Profesionalni kvalitet po cenama koje imaju smisla.",
  openGraph: {
    siteName: "SG Tools",
    locale: "sr_RS",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: "/",
  },
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  let categories: Category[] = [];
  try {
    categories = await getCategories();
  } catch (error) {
    console.error("Failed to fetch categories for navigation:", error);
    categories = [];
  }

  return (
    <html lang="sr">
      <body
        className={cn(
          "min-h-screen text-foreground font-base antialiased dark",
          base.variable,
          heading.variable,
        )}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "SG Tools",
              url: "https://sgtools.rs",
              logo: "https://sgtools.rs/logo-white.svg",
              sameAs: [
                "https://www.prodavnicaalata.rs/",
                "https://www.stridon.rs/",
              ],
            }),
          }}
        />
        <Navbar categories={categories} />
        <main className="pt-16">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
