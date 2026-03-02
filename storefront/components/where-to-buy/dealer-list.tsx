"use client";

import { useEffect, useRef } from "react";
import { MapPin, Phone, Mail, ExternalLink } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import type { Dealer, DealerCategory } from "@/types/dealers";

interface DealerListProps {
  dealers: Dealer[];
  selectedDealerId: string | null;
  onSelectDealer: (id: string | null) => void;
}

const categoryColors: Record<DealerCategory, string> = {
  online: "bg-blue-500/20 text-blue-400",
  service: "bg-green-500/20 text-green-400",
  outOfWarranty: "bg-amber-500/20 text-amber-400",
};

function CategoryBadge({ category }: { category: DealerCategory }) {
  const t = useTranslations("whereToBuy");

  const labels: Record<DealerCategory, string> = {
    online: t("categoryOnline"),
    service: t("categoryService"),
    outOfWarranty: t("categoryOutOfWarranty"),
  };

  return (
    <span
      className={cn(
        "inline-block rounded-full px-2.5 py-0.5 text-xs font-medium",
        categoryColors[category]
      )}
    >
      {labels[category]}
    </span>
  );
}

export default function DealerList({
  dealers,
  selectedDealerId,
  onSelectDealer,
}: DealerListProps) {
  const t = useTranslations("whereToBuy");
  const listRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  useEffect(() => {
    if (selectedDealerId) {
      const card = cardRefs.current.get(selectedDealerId);
      if (card) {
        card.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }
  }, [selectedDealerId]);

  if (dealers.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground py-12">
        <p>{t("noResults")}</p>
      </div>
    );
  }

  return (
    <div ref={listRef} className="flex flex-col gap-3">
      {dealers.map((dealer) => {
        const isSelected = dealer.id === selectedDealerId;

        return (
          <div
            key={dealer.id}
            ref={(el) => {
              if (el) cardRefs.current.set(dealer.id, el);
            }}
            onClick={() => onSelectDealer(isSelected ? null : dealer.id)}
            className={cn(
              "cursor-pointer rounded-lg border p-4 transition-colors",
              isSelected
                ? "border-primary bg-primary/5"
                : "border-border bg-card hover:border-muted-foreground/30"
            )}
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="font-semibold text-sm text-foreground leading-tight">
                {dealer.name}
              </h3>
              <CategoryBadge category={dealer.category} />
            </div>

            {(dealer.address || dealer.city) && (
              <div className="flex items-start gap-2 text-sm text-muted-foreground mb-1.5">
                <MapPin className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                <span>
                  {dealer.address}
                  {dealer.address && dealer.city ? ", " : ""}
                  {dealer.city}
                </span>
              </div>
            )}

            {dealer.phone && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1.5">
                <Phone className="h-3.5 w-3.5 shrink-0" />
                <a
                  href={`tel:${dealer.phone}`}
                  onClick={(e) => e.stopPropagation()}
                  className="hover:text-foreground transition-colors"
                >
                  {dealer.phone}
                </a>
              </div>
            )}

            {dealer.email && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1.5">
                <Mail className="h-3.5 w-3.5 shrink-0" />
                <a
                  href={`mailto:${dealer.email}`}
                  onClick={(e) => e.stopPropagation()}
                  className="hover:text-foreground transition-colors"
                >
                  {dealer.email}
                </a>
              </div>
            )}

            {dealer.website && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                <a
                  href={dealer.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="hover:text-foreground transition-colors truncate"
                >
                  {dealer.website.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
                </a>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
