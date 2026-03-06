import { Role } from "@prisma/client";

import { AppShell } from "@/components/app-shell";
import { requireRole } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function SettingsPage() {
  await requireRole([Role.OWNER, Role.MANAGER]);
  const users = await prisma.user.findMany({ orderBy: { createdAt: "asc" } });

  return (
    <AppShell>
      <div className="card">
        <h3 className="mb-3 font-semibold">Team & roles</h3>
        <p className="mb-4 text-sm text-slate-500">Role-based access is enforced for sensitive pages like settings.</p>
        <ul className="space-y-2 text-sm">
          {users.map((user) => (
            <li className="flex items-center justify-between rounded-lg border p-2" key={user.id}>
              <span>
                {user.name} ({user.email})
              </span>
              <span className="rounded bg-slate-100 px-2 py-1">{user.role}</span>
            </li>
          ))}
        </ul>
      </div>
    </AppShell>
  );
}
