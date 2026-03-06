import { revalidatePath } from "next/cache";

import { AppShell } from "@/components/app-shell";
import { prisma } from "@/lib/prisma";
import { contactSchema } from "@/lib/validators";

async function createContact(formData: FormData) {
  "use server";
  const parsed = contactSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return;

  await prisma.contact.create({ data: { ...parsed.data, email: parsed.data.email || null } });
  revalidatePath("/contacts");
}

export default async function ContactsPage() {
  const contacts = await prisma.contact.findMany({ include: { company: true }, orderBy: { createdAt: "desc" } });

  return (
    <AppShell>
      <div className="grid gap-4 lg:grid-cols-3">
        <form action={createContact} className="card space-y-2">
          <h3 className="font-semibold">New contact</h3>
          <input className="w-full rounded-lg border px-3 py-2" name="firstName" placeholder="First name" required />
          <input className="w-full rounded-lg border px-3 py-2" name="lastName" placeholder="Last name" required />
          <input className="w-full rounded-lg border px-3 py-2" name="email" placeholder="Email" type="email" />
          <input className="w-full rounded-lg border px-3 py-2" name="phone" placeholder="Phone" />
          <input className="w-full rounded-lg border px-3 py-2" name="title" placeholder="Title" />
          <button className="rounded-lg bg-accent px-3 py-2 text-white">Create</button>
        </form>
        <div className="card lg:col-span-2">
          <h3 className="mb-2 font-semibold">Contacts</h3>
          <ul className="space-y-2 text-sm">
            {contacts.map((contact) => (
              <li className="rounded-lg border p-2" key={contact.id}>
                {contact.firstName} {contact.lastName} · {contact.email ?? "no email"} · {contact.company?.name ?? "No company"}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </AppShell>
  );
}
