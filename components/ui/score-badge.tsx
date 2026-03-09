export function ScoreBadge({ score }: { score: number }) {
  const color = score >= 70 ? "bg-emerald-600" : score >= 50 ? "bg-amber-600" : "bg-rose-600";
  return <span className={`rounded-full px-2 py-1 text-xs font-semibold text-white ${color}`}>{score.toFixed(1)}</span>;
}
