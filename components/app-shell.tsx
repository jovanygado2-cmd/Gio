import { auth, signOut } from "@/lib/auth";
import { Nav } from "@/components/nav";
import { redirect } from "next/navigation";

export async function AppShell({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen">
      <Nav />
      <main className="flex-1 p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500">Welcome back</p>
            <h2 className="text-xl font-semibold">{session.user.name}</h2>
          </div>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/login" });
            }}
          >
            <button className="rounded-lg border border-slate-200 px-3 py-2 text-sm hover:bg-slate-100" type="submit">
              Sign out
            </button>
          </form>
        </div>
        {children}
      </main>
    </div>
  );
}
