import { api } from "@/lib/api";
import { MiniBar } from "@/components/ui/mini-bar";
import { ScoreBadge } from "@/components/ui/score-badge";

export default async function StockDetailPage({ params }: { params: { symbol: string } }) {
  const stock = await api.stock(params.symbol);
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">{stock.symbol} · {stock.company_name}</h1>
      <div className="card flex items-center justify-between">
        <p>Upside Score</p><ScoreBadge score={stock.upside_score} />
      </div>
      <div className="card grid gap-3 md:grid-cols-2">
        <div className="space-y-2">
          <p className="text-sm">Revenue Growth</p><MiniBar value={stock.revenue_growth} />
          <p className="text-sm">Earnings Momentum</p><MiniBar value={stock.earnings_momentum} />
          <p className="text-sm">Relative Strength</p><MiniBar value={stock.relative_strength} />
          <p className="text-sm">Risk Score</p><MiniBar value={stock.risk_score} />
        </div>
        <div>
          <p className="font-medium">Catalysts</p>
          <ul className="list-disc pl-5 text-sm text-slate-700">{stock.catalysts.map((c: string) => <li key={c}>{c}</li>)}</ul>
          <p className="mt-4 font-medium">News Sentiment</p>
          <p className="text-sm">Headline sentiment score: {((stock.headline_sentiment ?? 0.5) * 100).toFixed(0)}%</p>
          <ul className="mt-2 list-disc pl-5 text-sm text-slate-700">{(stock.headlines ?? []).map((h: string) => <li key={h}>{h}</li>)}</ul>
        </div>
      </div>
    </div>
  );
}
