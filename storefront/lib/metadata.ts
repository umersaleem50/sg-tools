import { SITE_URL } from "@/constants/links";
import type { Metadata } from "next";

const SITE_NAME = "SG Tools";
const SITE_DESCRIPTION =
  "Električni alati, ručni alati, brusilice i dijamantski alati nastali iz decenija praktičnog znanja. Profesionalni kvalitet po cenama koje imaju smisla.";

export function createRootMetadata(): Metadata {
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: "SG Tools — Profesionalni alati sa 30 godina iskustva",
      template: `%s | ${SITE_NAME}`,
    },
    description: SITE_DESCRIPTION,
    openGraph: {
      siteName: SITE_NAME,
      locale: "sr_RS",
      type: "website",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: SITE_NAME,
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
}

export function createPageMetadata({
  title,
  description,
  canonicalUrl,
}: {
  title: string;
  description: string;
  canonicalUrl: string;
}): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description,
    },
  };
}

function createListingMetadata({
  title,
  description,
  canonicalBase,
  currentPage,
}: {
  title: string;
  description: string;
  canonicalBase: string;
  currentPage: number;
}): Metadata {
  const pageSuffix = currentPage > 1 ? ` — Strana ${currentPage}` : "";
  const fullTitle = `${title}${pageSuffix}`;
  const canonical =
    currentPage > 1
      ? `${canonicalBase}?strana=${currentPage}`
      : canonicalBase;

  return {
    title: fullTitle,
    description,
    alternates: { canonical },
    openGraph: {
      title: `${fullTitle} | ${SITE_NAME}`,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: `${fullTitle} | ${SITE_NAME}`,
      description,
    },
  };
}

export function createProductsPageMetadata({
  currentPage,
}: {
  currentPage: number;
}): Metadata {
  return createListingMetadata({
    title: "Svi proizvodi",
    description:
      "Pregledaj kompletnu ponudu SG Tools profesionalnog alata — bušilice, brusilice, testere i još mnogo toga.",
    canonicalBase: `${SITE_URL}/proizvodi`,
    currentPage,
  });
}

export function createCategoryMetadata({
  title,
  description,
  slug,
  currentPage,
}: {
  title: string;
  description: string;
  slug: string;
  currentPage: number;
}): Metadata {
  return createListingMetadata({
    title,
    description,
    canonicalBase: `${SITE_URL}/proizvodi/kategorije/${slug}`,
    currentPage,
  });
}

export function createProductMetadata({
  title,
  description,
  slug,
}: {
  title: string;
  description: string;
  slug: string;
}): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: `https://www.prodavnicaalata.rs/proizvodi/${slug}/`,
    },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description,
    },
  };
}
