import { revalidatePath } from "next/cache";

import { AppShell } from "@/components/app-shell";
import { money } from "@/lib/format";
import { prisma } from "@/lib/prisma";
import { dealSchema } from "@/lib/validators";

async function createDeal(formData: FormData) {
  "use server";
  const parsed = dealSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return;

  await prisma.deal.create({
    data: {
      name: parsed.data.name,
      amount: parsed.data.amount,
      expectedClose: parsed.data.expectedClose ? new Date(parsed.data.expectedClose) : null
    }
  });

  revalidatePath("/deals");
  revalidatePath("/dashboard");
}

const columns = ["LEAD", "DISCOVERY", "PROPOSAL", "NEGOTIATION", "CLOSED_WON", "CLOSED_LOST"] as const;

export default async function DealsPage() {
  const deals = await prisma.deal.findMany({ orderBy: { createdAt: "desc" }, take: 50 });

  return (
    <AppShell>
      <div className="mb-4 grid gap-4 lg:grid-cols-4">
        <form action={createDeal} className="card space-y-2 lg:col-span-1">
          <h3 className="font-semibold">New deal</h3>
          <input className="w-full rounded-lg border px-3 py-2" name="name" placeholder="Deal name" required />
          <input className="w-full rounded-lg border px-3 py-2" name="amount" placeholder="Amount" type="number" min="1" required />
          <input className="w-full rounded-lg border px-3 py-2" name="expectedClose" type="date" />
          <button className="rounded-lg bg-accent px-3 py-2 text-white">Create</button>
        </form>

        <div className="grid gap-3 lg:col-span-3 lg:grid-cols-3">
          {columns.map((column) => (
            <div className="card" key={column}>
              <h4 className="mb-2 text-sm font-semibold text-slate-500">{column.replace("_", " ")}</h4>
              <div className="space-y-2 text-sm">
                {deals
                  .filter((deal) => deal.stage === column)
                  .map((deal) => (
                    <div className="rounded-lg border p-2" key={deal.id}>
                      {deal.name} · {money(Number(deal.amount))}
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
