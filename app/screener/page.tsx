"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import { ScoreBadge } from "@/components/ui/score-badge";
import { StockRow } from "@/lib/types";

export default function ScreenerPage() {
  const [rows, setRows] = useState<StockRow[]>([]);
  const [filters, setFilters] = useState({ min_market_cap_b: 1, max_pe_ratio: 80, min_revenue_growth: 0.1, sector: "" });

  const run = useCallback(async () => {
    const payload = { ...filters, sector: filters.sector || null };
    setRows(await api.screener(payload));
  }, [filters]);

  useEffect(() => {
    run();
  }, [run]);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Stock Screener</h1>
      <div className="card grid grid-cols-2 gap-3 md:grid-cols-4">
        <label className="text-sm">Min Market Cap ($B)<input className="mt-1 w-full rounded border p-2" type="number" value={filters.min_market_cap_b} onChange={(e) => setFilters({ ...filters, min_market_cap_b: Number(e.target.value) })} /></label>
        <label className="text-sm">Max P/E<input className="mt-1 w-full rounded border p-2" type="number" value={filters.max_pe_ratio} onChange={(e) => setFilters({ ...filters, max_pe_ratio: Number(e.target.value) })} /></label>
        <label className="text-sm">Min Revenue Growth<input className="mt-1 w-full rounded border p-2" type="number" step="0.01" value={filters.min_revenue_growth} onChange={(e) => setFilters({ ...filters, min_revenue_growth: Number(e.target.value) })} /></label>
        <label className="text-sm">Sector<input className="mt-1 w-full rounded border p-2" value={filters.sector} onChange={(e) => setFilters({ ...filters, sector: e.target.value })} /></label>
        <button onClick={run} className="col-span-2 rounded bg-indigo-700 px-4 py-2 text-white md:col-span-1">Run Screen</button>
      </div>
      <div className="card overflow-auto">
        <table className="w-full text-sm">
          <thead><tr className="text-left"><th>Symbol</th><th>Company</th><th>Rev Growth</th><th>P/E</th><th>Score</th><th /></tr></thead>
          <tbody>
            {rows.map((r) => <tr key={r.symbol} className="border-t"><td>{r.symbol}</td><td>{r.company_name}</td><td>{(r.revenue_growth * 100).toFixed(1)}%</td><td>{r.pe_ratio}</td><td><ScoreBadge score={r.upside_score} /></td><td><Link href={`/stocks/${r.symbol}`} className="text-indigo-700">Open</Link></td></tr>)}
          </tbody>
        </table>
      </div>
    </div>
  );
}
