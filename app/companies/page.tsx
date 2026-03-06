import { revalidatePath } from "next/cache";

import { AppShell } from "@/components/app-shell";
import { prisma } from "@/lib/prisma";
import { companySchema } from "@/lib/validators";

async function createCompany(formData: FormData) {
  "use server";
  const parsed = companySchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return;

  await prisma.company.create({ data: parsed.data });
  revalidatePath("/companies");
}

export default async function CompaniesPage() {
  const companies = await prisma.company.findMany({ include: { _count: { select: { contacts: true, deals: true } } }, orderBy: { createdAt: "desc" } });

  return (
    <AppShell>
      <div className="grid gap-4 lg:grid-cols-3">
        <form action={createCompany} className="card space-y-2">
          <h3 className="font-semibold">New company</h3>
          <input className="w-full rounded-lg border px-3 py-2" name="name" placeholder="Company name" required />
          <input className="w-full rounded-lg border px-3 py-2" name="domain" placeholder="Domain" />
          <input className="w-full rounded-lg border px-3 py-2" name="industry" placeholder="Industry" />
          <input className="w-full rounded-lg border px-3 py-2" name="size" placeholder="Company size" />
          <button className="rounded-lg bg-accent px-3 py-2 text-white">Create</button>
        </form>
        <div className="card lg:col-span-2">
          <h3 className="mb-2 font-semibold">Companies</h3>
          <ul className="space-y-2 text-sm">
            {companies.map((company) => (
              <li className="rounded-lg border p-2" key={company.id}>
                {company.name} · {company.industry ?? "-"} · {company._count.contacts} contacts · {company._count.deals} deals
              </li>
            ))}
          </ul>
        </div>
      </div>
    </AppShell>
  );
}
