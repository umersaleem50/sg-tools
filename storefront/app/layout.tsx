import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import NavbarWithCategories from "@/components/navbar-with-categories";
import { Toaster } from "@/components/ui/sonner";
import { base, heading } from "@/constants/fonts";
import { SITE_URL } from "@/constants/links";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Suspense, type ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
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
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SG Tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
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
