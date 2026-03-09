import { Metadata } from "next";

interface ConstructMetaData {
  title: Metadata["title"];
  description: Metadata["description"];
  canonical?: string;
  path: string;
  locale?: string;
}

export function constructMetaData({
  title,
  description,
  canonical,
  path,
  locale = "sr_RS",
}: ConstructMetaData): Metadata {
  return {
    metadataBase: new URL("https://sgtools.rs"),
    title,
    description,
    openGraph: {
      title: title ?? undefined,
      description: description ?? undefined,
      siteName: "SG Tools",
      locale,
      type: "website",
      url: "https://sgtools.rs" + path,
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
      canonical,
    },
  };
}
