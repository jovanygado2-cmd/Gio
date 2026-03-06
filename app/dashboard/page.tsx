import { endOfWeek, startOfDay, startOfMonth } from "date-fns";

import { AppShell } from "@/components/app-shell";
import { StatCard } from "@/components/stat-card";
import { money } from "@/lib/format";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const today = startOfDay(new Date());
  const weekEnd = endOfWeek(new Date());
  const monthStart = startOfMonth(new Date());

  const [newLeadsToday, followUpNeeded, dealsClosingWeek, wonMonth, sources, activity, overdueTasks] = await Promise.all([
    prisma.lead.count({ where: { createdAt: { gte: today } } }),
    prisma.lead.findMany({ where: { followUpAt: { lte: new Date() }, status: { notIn: ["WON", "LOST"] } }, take: 5, orderBy: { followUpAt: "asc" } }),
    prisma.deal.findMany({ where: { expectedClose: { gte: new Date(), lte: weekEnd }, stage: { notIn: ["CLOSED_WON", "CLOSED_LOST"] } }, take: 5 }),
    prisma.deal.aggregate({ _sum: { amount: true }, where: { stage: "CLOSED_WON", wonAt: { gte: monthStart } } }),
    prisma.lead.groupBy({ by: ["source"], _count: { _all: true }, where: { status: "WON" } }),
    prisma.activity.findMany({ take: 8, orderBy: { createdAt: "desc" } }),
    prisma.task.count({ where: { status: { not: "DONE" }, dueAt: { lt: new Date() } } })
  ]);

  return (
    <AppShell>
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="New leads today" value={String(newLeadsToday)} />
        <StatCard label="Leads needing follow-up" value={String(followUpNeeded.length)} hint={`${overdueTasks} overdue tasks`} />
        <StatCard label="Deals closing this week" value={String(dealsClosingWeek.length)} />
        <StatCard label="Revenue won this month" value={money(Number(wonMonth._sum.amount ?? 0))} />
      </section>

      <section className="mt-4 grid gap-4 lg:grid-cols-3">
        <div className="card lg:col-span-2">
          <h3 className="mb-3 font-semibold">Leads needing attention now</h3>
          <div className="space-y-2 text-sm">
            {followUpNeeded.map((lead) => (
              <div className="flex items-center justify-between rounded-lg border border-slate-100 p-2" key={lead.id}>
                <span>{lead.name}</span>
                <span className="text-rose-600">{lead.followUpAt?.toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3 className="mb-3 font-semibold">Conversion rate by source</h3>
          <div className="space-y-2 text-sm">
            {sources.map((source) => (
              <div className="flex items-center justify-between" key={source.source}>
                <span>{source.source}</span>
                <span>{source._count._all} won</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="card mt-4">
        <h3 className="mb-3 font-semibold">Recent activity</h3>
        <ul className="space-y-2 text-sm">
          {activity.map((entry) => (
            <li key={entry.id}>
              {entry.message} · <span className="text-slate-400">{entry.createdAt.toLocaleString()}</span>
            </li>
          ))}
        </ul>
      </section>
    </AppShell>
  );
}
