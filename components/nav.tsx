import Link from "next/link";

const links = [
  ["Dashboard", "/dashboard"],
  ["Leads", "/leads"],
  ["Contacts", "/contacts"],
  ["Companies", "/companies"],
  ["Deals", "/deals"],
  ["Tasks", "/tasks"],
  ["Reports", "/reports"],
  ["Settings", "/settings"]
];

export function Nav() {
  return (
    <aside className="w-64 border-r border-slate-200 bg-white p-5">
      <h1 className="mb-6 text-xl font-bold">Gio CRM</h1>
      <nav className="space-y-1">
        {links.map(([label, href]) => (
          <Link className="block rounded-lg px-3 py-2 text-sm hover:bg-slate-100" href={href} key={href}>
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
