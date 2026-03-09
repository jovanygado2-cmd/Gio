"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import { PortfolioRisk } from "@/lib/types";

export default function PortfolioPage() {
  const [result, setResult] = useState<PortfolioRisk | null>(null);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Portfolio Risk Overview</h1>
      <button className="rounded bg-indigo-700 px-3 py-2 text-white" onClick={async () => {
        setResult(await api.portfolioRisk([
          { symbol: "NVDA", allocation_pct: 40, beta: 1.7 },
          { symbol: "LLY", allocation_pct: 35, beta: 0.9 },
          { symbol: "CRWD", allocation_pct: 25, beta: 1.3 }
        ]));
      }}>Analyze Sample Portfolio</button>
      {result && <div className="card text-sm"><pre>{JSON.stringify(result, null, 2)}</pre></div>}
    </div>
  );
}
