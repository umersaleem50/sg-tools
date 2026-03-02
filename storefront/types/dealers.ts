export type DealerCategory = "online" | "service" | "outOfWarranty";

export interface Dealer {
  id: string;
  name: string;
  address?: string;
  city?: string;
  phone?: string;
  email?: string;
  website?: string;
  category: DealerCategory;
  coordinates: { lat: number; lng: number };
}
