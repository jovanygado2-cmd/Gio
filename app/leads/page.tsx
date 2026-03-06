import { revalidatePath } from "next/cache";

import { AppShell } from "@/components/app-shell";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { leadSchema } from "@/lib/validators";

async function createLead(formData: FormData) {
  "use server";
  const session = await auth();
  if (!session?.user) return;

  const parsed = leadSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return;

  await prisma.lead.create({
    data: {
      name: parsed.data.name,
      source: parsed.data.source,
      email: parsed.data.email || null,
      phone: parsed.data.phone || null,
      followUpAt: parsed.data.followUpAt ? new Date(parsed.data.followUpAt) : null,
      ownerId: session.user.id
    }
  });

  await prisma.activity.create({ data: { message: `New lead created: ${parsed.data.name}`, userId: session.user.id } });
  revalidatePath("/leads");
  revalidatePath("/dashboard");
}

export default async function LeadsPage() {
  const leads = await prisma.lead.findMany({ orderBy: { createdAt: "desc" }, take: 30 });

  return (
    <AppShell>
      <div className="grid gap-4 lg:grid-cols-3">
        <form action={createLead} className="card space-y-3 lg:col-span-1">
          <h3 className="font-semibold">Capture lead</h3>
          <input name="name" placeholder="Lead name" className="w-full rounded-lg border px-3 py-2" required />
          <input name="source" placeholder="Source (Facebook Ads, Referral...)" className="w-full rounded-lg border px-3 py-2" required />
          <input name="email" placeholder="Email" type="email" className="w-full rounded-lg border px-3 py-2" />
          <input name="phone" placeholder="Phone" className="w-full rounded-lg border px-3 py-2" />
          <input name="followUpAt" type="datetime-local" className="w-full rounded-lg border px-3 py-2" />
          <button className="rounded-lg bg-accent px-4 py-2 text-white">Add lead</button>
        </form>

        <div className="card lg:col-span-2">
          <h3 className="mb-3 font-semibold">Leads</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-slate-500">
                <tr><th>Name</th><th>Source</th><th>Status</th><th>Follow-up</th></tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr key={lead.id} className="border-t">
                    <td className="py-2">{lead.name}</td>
                    <td>{lead.source}</td>
                    <td>{lead.status}</td>
                    <td>{lead.followUpAt?.toLocaleString() ?? "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
