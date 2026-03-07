"use client";

import Container from "@/components/container";
import HeroHeader from "@/components/hero-header";
import { Button } from "@/components/ui/button";
import { Home, RotateCcw } from "lucide-react";
import Link from "next/link";

export default function RootError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <HeroHeader
      title="Ups, nešto nije u redu"
      description="Došlo je do greške prilikom učitavanja podataka. Probaj ponovo ili se vrati na početnu stranu."
    >
      <Container delay={0.3}>
        <div className="flex items-center gap-3 mt-6">
          <Button variant="outline" size="sm" onClick={reset}>
            <RotateCcw className="size-4" />
            Probaj ponovo
          </Button>
          <Link href="/">
            <Button variant="ghost" size="sm">
              <Home className="size-4" />
              Početna
            </Button>
          </Link>
        </div>
      </Container>
    </HeroHeader>
  );
}
