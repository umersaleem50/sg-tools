"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

interface ProductGalleryProps {
  posterUrl: string;
  imageUrls: string[];
  title: string;
}

const ProductGallery = ({ posterUrl, imageUrls, title }: ProductGalleryProps) => {
  const allImages = [posterUrl, ...imageUrls].filter(Boolean);
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (allImages.length === 0) {
    return (
      <div className="aspect-square w-full rounded-lg bg-foreground/5 flex items-center justify-center">
        <span className="text-muted-foreground text-sm">No image</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-square w-full rounded-lg bg-foreground/5 overflow-hidden border border-border/20">
        <Image
          src={allImages[selectedIndex]}
          alt={title}
          fill
          className="object-contain p-4"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>

      {allImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {allImages.map((url, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={cn(
                "relative size-16 sm:size-20 shrink-0 rounded-md overflow-hidden border-2 transition-colors",
                index === selectedIndex
                  ? "border-primary"
                  : "border-border/20 hover:border-border/50"
              )}
            >
              <Image
                src={url}
                alt={`${title} ${index + 1}`}
                fill
                className="object-contain p-1"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
