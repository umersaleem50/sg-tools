"use client";
import { useCounter } from "@/lib/hooks/useCounter";
import { useRef } from "react";
import Stats from "./stats";

function CompanyStats() {
  const ref = useRef(null);

  const experience = useCounter(ref, 30, 2);
  const years = useCounter(ref, 7, 2.5);
  const satisfaction = useCounter(ref, 100, 2.5);
  const professionals = useCounter(ref, 1000, 3);

  const stats = [
    {
      value: `${experience}+`,

      label: "Godina iskustva u alatima",
    },
    {
      value: `${years}+`,

      label: "Godina razvoja brenda SG Tools",
    },
    {
      value: `${satisfaction}%`,
      label: "Fokus na kvalitet i funkcionalnost",
    },
    {
      value: `${professionals}+`,
      label: "Zadovoljnih profesionalnih korisnika",
    },
  ];
  return (
    <div ref={ref}>
      <Stats stats={stats} />
    </div>
  );
}

export default CompanyStats;
