"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { WatchlistItem } from "@/lib/types";

export default function WatchlistPage() {
  const [rows, setRows] = useState<WatchlistItem[]>([]);
  const [symbol, setSymbol] = useState("NVDA");

  const load = async () => setRows(await api.watchlist());
  useEffect(() => { load(); }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Watchlist</h1>
      <div className="card flex gap-2">
        <input className="rounded border p-2" value={symbol} onChange={(e) => setSymbol(e.target.value.toUpperCase())} />
        <button className="rounded bg-indigo-700 px-3 py-2 text-white" onClick={async () => { await api.addWatchlist({ symbol, note: "" }); await load(); }}>Add</button>
      </div>
      <div className="card space-y-2">
        {rows.map((r) => (
          <div key={r.id} className="flex items-center justify-between rounded border p-2">
            <span>{r.symbol}</span>
            <button className="text-rose-700" onClick={async () => { await api.removeWatchlist(r.id); await load(); }}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}
