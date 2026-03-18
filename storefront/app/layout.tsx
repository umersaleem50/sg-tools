import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import NavbarWithCategories from "@/components/navbar-with-categories";
import { Toaster } from "@/components/ui/sonner";
import { base, heading } from "@/constants/fonts";
import { SITE_URL } from "@/constants/links";
import { createRootMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";
import type { Viewport } from "next";
import { Suspense, type ReactNode } from "react";
import "./globals.css";

export const metadata = createRootMetadata();

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: ReactNode }) {
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
              url: SITE_URL,
              logo: `${SITE_URL}/logo-white.svg`,
              parentOrganization: {
                "@type": "Organization",
                name: "Stridon Group DOO",
                url: "https://www.stridon.rs",
              },
            }),
          }}
        />
        <Suspense fallback={<Navbar categories={[]} />}>
          <NavbarWithCategories />
        </Suspense>
        <main className="pt-16">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
