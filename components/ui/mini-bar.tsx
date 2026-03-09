export function MiniBar({ value }: { value: number }) {
  return (
    <div className="h-2 w-28 rounded bg-slate-200">
      <div className="h-2 rounded bg-indigo-600" style={{ width: `${Math.max(0, Math.min(100, value * 100))}%` }} />
    </div>
  );
}
