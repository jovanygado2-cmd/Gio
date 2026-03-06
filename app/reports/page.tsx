import { AppShell } from "@/components/app-shell";
import { money } from "@/lib/format";
import { prisma } from "@/lib/prisma";

export default async function ReportsPage() {
  const [leadBySource, totalWon, closedDeals] = await Promise.all([
    prisma.lead.groupBy({ by: ["source"], _count: { _all: true }, where: { status: "WON" } }),
    prisma.deal.aggregate({ _sum: { amount: true }, where: { stage: "CLOSED_WON" } }),
    prisma.deal.count({ where: { stage: { in: ["CLOSED_WON", "CLOSED_LOST"] } } })
  ]);

  const conversionRate = closedDeals ? (leadBySource.reduce((acc, src) => acc + src._count._all, 0) / closedDeals) * 100 : 0;

  return (
    <AppShell>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="card">
          <p className="text-sm text-slate-500">Total revenue won</p>
          <p className="text-2xl font-semibold">{money(Number(totalWon._sum.amount ?? 0))}</p>
        </div>
        <div className="card">
          <p className="text-sm text-slate-500">Closed deals</p>
          <p className="text-2xl font-semibold">{closedDeals}</p>
        </div>
        <div className="card">
          <p className="text-sm text-slate-500">Conversion rate by source</p>
          <p className="text-2xl font-semibold">{conversionRate.toFixed(1)}%</p>
        </div>
      </div>

      <div className="card mt-4">
        <h3 className="mb-3 font-semibold">Won leads by source</h3>
        <ul className="space-y-1 text-sm">
          {leadBySource.map((source) => (
            <li className="flex justify-between" key={source.source}>
              <span>{source.source}</span>
              <span>{source._count._all}</span>
            </li>
          ))}
        </ul>
      </div>
    </AppShell>
  );
}
