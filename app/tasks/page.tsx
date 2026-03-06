import { revalidatePath } from "next/cache";

import { AppShell } from "@/components/app-shell";
import { prisma } from "@/lib/prisma";
import { taskSchema } from "@/lib/validators";

async function createTask(formData: FormData) {
  "use server";
  const parsed = taskSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return;

  await prisma.task.create({
    data: {
      title: parsed.data.title,
      dueAt: new Date(parsed.data.dueAt),
      priority: parsed.data.priority
    }
  });
  revalidatePath("/tasks");
  revalidatePath("/dashboard");
}

async function completeTask(formData: FormData) {
  "use server";
  const id = String(formData.get("id"));
  await prisma.task.update({ where: { id }, data: { status: "DONE" } });
  revalidatePath("/tasks");
}

export default async function TasksPage() {
  const tasks = await prisma.task.findMany({ orderBy: { dueAt: "asc" }, take: 50 });

  return (
    <AppShell>
      <div className="grid gap-4 lg:grid-cols-3">
        <form action={createTask} className="card space-y-2">
          <h3 className="font-semibold">New task</h3>
          <input className="w-full rounded-lg border px-3 py-2" name="title" placeholder="Task title" required />
          <input className="w-full rounded-lg border px-3 py-2" name="dueAt" type="datetime-local" required />
          <select className="w-full rounded-lg border px-3 py-2" name="priority" defaultValue="medium">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <button className="rounded-lg bg-accent px-3 py-2 text-white">Create</button>
        </form>

        <div className="card lg:col-span-2">
          <h3 className="mb-2 font-semibold">Tasks</h3>
          <ul className="space-y-2 text-sm">
            {tasks.map((task) => (
              <li className="flex items-center justify-between rounded-lg border p-2" key={task.id}>
                <div>
                  <p>{task.title}</p>
                  <p className="text-xs text-slate-500">
                    {task.priority.toUpperCase()} · {task.status} · due {task.dueAt.toLocaleString()}
                  </p>
                </div>
                {task.status !== "DONE" ? (
                  <form action={completeTask}>
                    <input type="hidden" name="id" value={task.id} />
                    <button className="rounded-lg border px-3 py-1">Complete</button>
                  </form>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </AppShell>
  );
}
