import { signIn } from "@/lib/auth";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4">
      <form
        action={async (formData) => {
          "use server";
          await signIn("credentials", {
            email: formData.get("email"),
            password: formData.get("password"),
            redirectTo: "/dashboard"
          });
        }}
        className="w-full max-w-sm rounded-xl bg-white p-6 shadow-sm"
      >
        <h1 className="mb-4 text-2xl font-semibold">Sign in</h1>
        <div className="space-y-3">
          <input className="w-full rounded-lg border border-slate-200 px-3 py-2" name="email" placeholder="Email" type="email" required />
          <input className="w-full rounded-lg border border-slate-200 px-3 py-2" name="password" placeholder="Password" type="password" required />
        </div>
        <button className="mt-4 w-full rounded-lg bg-accent px-4 py-2 text-white" type="submit">
          Continue
        </button>
        <p className="mt-3 text-xs text-slate-500">Demo: owner@giocrm.com / password123</p>
      </form>
    </div>
  );
}
