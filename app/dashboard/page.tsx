import Link from "next/link";
import { Disclaimer } from "@/components/ui/disclaimer";
import { ScoreBadge } from "@/components/ui/score-badge";
import { api } from "@/lib/api";

export default async function DashboardPage() {
  const stocks = await api.screener({ min_market_cap_b: 1, max_pe_ratio: 90, min_revenue_growth: 0 });
  const top = stocks.slice(0, 5);
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Market Opportunity Dashboard</h1>
      <Disclaimer />
      <section className="card">
        <h2 className="mb-3 font-medium">Top Upside Candidates</h2>
        <div className="space-y-2">
          {top.map((stock) => (
            <div key={stock.symbol} className="flex items-center justify-between rounded border p-2">
              <div>
                <p className="font-medium">{stock.symbol} · {stock.company_name}</p>
                <p className="text-xs text-slate-600">{stock.sector} • ${stock.price}</p>
              </div>
              <div className="flex items-center gap-2">
                <ScoreBadge score={stock.upside_score} />
                <Link href={`/stocks/${stock.symbol}`} className="text-sm text-indigo-700">Details</Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
