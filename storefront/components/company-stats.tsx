"use client";
import { useCounter } from "@/lib/hooks/useCounter";
import { useRef } from "react";
import Stats from "./stats";

function CompanyStats() {
  const ref = useRef(null);

  const buyers = useCounter(ref, 1000, 2);
  const dealers = useCounter(ref, 120, 4);
  const satisfaction = useCounter(ref, 100, 5);

  const stats = [
    { value: buyers, label: "Veleprodajnih kupaca" },
    { value: `${dealers}+`, label: "Dilera širom Srbije" },
    { value: `${satisfaction}%`, label: "Zadovoljstvo uslugom" },
  ];
  return (
    <div ref={ref}>
      <Stats stats={stats} />
    </div>
  );
}

export default CompanyStats;
