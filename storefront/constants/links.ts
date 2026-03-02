export interface NavLinkChild {
  labelKey: string;
  slug: string;
}

export interface NavLink {
  labelKey: string;
  href: string;
  children?: readonly NavLinkChild[];
}

export const NAV_LINKS: readonly NavLink[] = [
  {
    labelKey: "products",
    href: "/products/categories",
    children: [
      { labelKey: "electricTools", slug: "elektricni-alati" },
      { labelKey: "handTools", slug: "rucni-alati" },
      { labelKey: "grinders", slug: "brusilice" },
      { labelKey: "diamondTools", slug: "dijamantske-ploce-za-keramiku" },
    ],
  },
  { labelKey: "about", href: "/about" },
  { labelKey: "faq", href: "/faq" },
  { labelKey: "whereToBuy", href: "/where-to-buy" },
];

export const PRODUCT_LINKS = [
  { labelKey: "about", href: "/about" },
  { labelKey: "faq", href: "/faq" },
  { labelKey: "demo", href: "/contact" },
] as const;

export const RESOURCES_LINKS = [
  { labelKey: "helpCenter", href: "/help" },
  { labelKey: "apiDocs", href: "/docs" },
  { labelKey: "contactUs", href: "/contact" },
] as const;
