"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import Wrapper from "@/components/wrapper";
import Container from "@/components/container";
import DealerList from "./dealer-list";
import { DEALERS } from "@/constants/dealers";
import type { DealerCategory } from "@/types/dealers";

const DealerMap = dynamic(() => import("./dealer-map"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full rounded-lg bg-card animate-pulse flex items-center justify-center min-h-[400px]">
      <div className="text-muted-foreground text-sm">Loading map...</div>
    </div>
  ),
});

type CategoryFilter = "all" | DealerCategory;

export default function WhereToBuyContent() {
  const t = useTranslations("whereToBuy");
  const [selectedDealerId, setSelectedDealerId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories: { key: CategoryFilter; label: string }[] = [
    { key: "all", label: t("categoryAll") },
    { key: "online", label: t("categoryOnline") },
    { key: "service", label: t("categoryService") },
    { key: "outOfWarranty", label: t("categoryOutOfWarranty") },
  ];

  const filteredDealers = useMemo(() => {
    return DEALERS.filter((dealer) => {
      if (activeCategory !== "all" && dealer.category !== activeCategory) {
        return false;
      }
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          dealer.name.toLowerCase().includes(query) ||
          (dealer.city && dealer.city.toLowerCase().includes(query))
        );
      }
      return true;
    });
  }, [activeCategory, searchQuery]);

  function handleCategoryChange(category: CategoryFilter) {
    setActiveCategory(category);
    setSelectedDealerId(null);
  }

  return (
    <Wrapper className="py-8 sm:py-12">
      <Container delay={0.2}>
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder={t("searchPlaceholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-border bg-card pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => handleCategoryChange(cat.key)}
                className={cn(
                  "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                  activeCategory === cat.key
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-muted-foreground/30"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dealer count */}
        <p className="text-sm text-muted-foreground mb-4">
          {t("dealersCount", { count: filteredDealers.length })}
        </p>

        {/* Main grid: list left, map right */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6" style={{ minHeight: "500px" }}>
          {/* Map - shows first on mobile */}
          <div className="order-1 lg:order-2 lg:col-span-3 rounded-lg overflow-hidden border border-border h-[400px] lg:h-auto">
            <DealerMap
              dealers={filteredDealers}
              selectedDealerId={selectedDealerId}
              onSelectDealer={setSelectedDealerId}
            />
          </div>

          {/* List */}
          <div className="order-2 lg:order-1 lg:col-span-2 max-h-[600px] lg:max-h-none overflow-y-auto">
            <DealerList
              dealers={filteredDealers}
              selectedDealerId={selectedDealerId}
              onSelectDealer={setSelectedDealerId}
            />
          </div>
        </div>
      </Container>
    </Wrapper>
  );
}
