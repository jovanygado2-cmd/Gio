"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { ScoringConfig } from "@/lib/types";

export default function SettingsPage() {
  const [weights, setWeights] = useState<ScoringConfig | null>(null);

  useEffect(() => {
    api.scoringConfig().then(setWeights);
  }, []);

  if (!weights) return <p>Loading...</p>;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Scoring Settings</h1>
      <p className="text-sm text-slate-600">Adjust scoring model weights. Formula = weighted positive factors - risk penalty.</p>
      <div className="card space-y-2">
        {(Object.keys(weights) as Array<keyof ScoringConfig>).map((k) => (
          <label key={k} className="block text-sm">{k}
            <input className="mt-1 w-full rounded border p-2" type="number" step="0.01" value={weights[k]} onChange={(e) => setWeights({ ...weights, [k]: Number(e.target.value) })} />
          </label>
        ))}
        <button className="rounded bg-indigo-700 px-3 py-2 text-white" onClick={async () => setWeights(await api.updateScoring(weights))}>Save Weights</button>
      </div>
    </div>
  );
}
