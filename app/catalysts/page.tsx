import { api } from "@/lib/api";

export default async function CatalystsPage() {
  const rows = await api.catalysts();
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Catalyst Tracker</h1>
      <div className="card space-y-3">
        {rows.map((r) => (
          <div className="rounded border p-3" key={r.symbol}>
            <p className="font-medium">{r.symbol} · {r.company_name}</p>
            <p className="text-sm text-slate-600">Earnings: {r.earnings_date}</p>
            <ul className="list-disc pl-5 text-sm">{r.catalysts.map((c: string) => <li key={c}>{c}</li>)}</ul>
          </div>
        ))}
      </div>
    </div>
  );
}
