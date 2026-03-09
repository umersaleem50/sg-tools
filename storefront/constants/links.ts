export const SITE_URL = "https://www.sgtools.rs";

export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
}

export const NAV_LINKS: readonly NavLink[] = [
  { label: "Proizvodi", href: "/proizvodi/kategorije" },
  { label: "O nama", href: "/o-nama" },
  { label: "Česta pitanja", href: "/cesta-pitanja" },
  { label: "Gde kupiti", href: "/gde-kupiti" },
  { label: "Kontakt", href: "/kontakt" },
];

export const PRODUCTS_FOOTER_LINKS: readonly NavLink[] = [
  { label: "Svi proizvodi", href: "/proizvodi" },
  { label: "Kategorije", href: "/proizvodi/kategorije" },
  {
    label: "Kupi online",
    href: "https://www.prodavnicaalata.rs",
    external: true,
  },
  { label: "Preuzmi katalog", href: "#" },
];

export const COMPANY_FOOTER_LINKS: readonly NavLink[] = [
  { label: "O nama", href: "/o-nama" },
  { label: "Gde kupiti", href: "/gde-kupiti" },
  { label: "Kontakt", href: "/kontakt" },
  {
    label: "Stridon Group",
    href: "https://www.stridon.rs",
    external: true,
  },
];

export const SUPPORT_FOOTER_LINKS: readonly NavLink[] = [
  { label: "Česta pitanja", href: "/cesta-pitanja" },
  { label: "Garancija i servis", href: "/cesta-pitanja" },
];

export const SOCIAL_LINKS = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/prodavnicaalataa",
    icon: "facebook" as const,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/prodavnicaalata/",
    icon: "instagram" as const,
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@prodavnicaalata5203",
    icon: "youtube" as const,
  },
];

export const LEGAL_LINKS: readonly NavLink[] = [
  { label: "Politika privatnosti", href: "/politika-privatnosti" },
  { label: "Uslovi korišćenja", href: "/uslovi-koriscenja" },
];
