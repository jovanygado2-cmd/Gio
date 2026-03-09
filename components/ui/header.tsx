import Link from "next/link";

const links = [
  ["Dashboard", "/dashboard"],
  ["Screener", "/screener"],
  ["Catalysts", "/catalysts"],
  ["Watchlist", "/watchlist"],
  ["Portfolio", "/portfolio"],
  ["Settings", "/settings"]
];

export function Header() {
  return (
    <header className="border-b border-slate-800 bg-slate-950 text-slate-100">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link className="text-lg font-semibold" href="/dashboard">UpsideLens</Link>
        <nav className="flex gap-3 text-sm">
          {links.map(([label, href]) => (
            <Link key={href} href={href} className="rounded px-2 py-1 hover:bg-slate-800">{label}</Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
