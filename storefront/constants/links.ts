export interface NavLink {
  label: string;
  href: string;
}

export const NAV_LINKS: readonly NavLink[] = [
  { label: "Proizvodi", href: "/proizvodi/kategorije" },
  { label: "O nama", href: "/o-nama" },
  { label: "Česta pitanja", href: "/cesta-pitanja" },
  { label: "Gde kupiti", href: "/gde-kupiti" },
  { label: "Kontakt", href: "/kontakt" },
];

export const PRODUCT_LINKS = [
  { label: "O nama", href: "/o-nama" },
  { label: "Česta pitanja", href: "/cesta-pitanja" },
  { label: "Gde kupiti", href: "/gde-kupiti" },
] as const;

export const RESOURCES_LINKS = [
  { label: "Garancija i servis", href: "/cesta-pitanja" },
  { label: "Preuzmi katalog", href: "#" },
  { label: "Kontaktiraj nas", href: "/kontakt" },
] as const;
