import { CatalystRow, PortfolioRisk, ScoringConfig, StockRow, WatchlistItem } from "@/lib/types";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...(init?.headers || {}) },
    cache: "no-store"
  });
  if (!res.ok) throw new Error(`Request failed (${res.status})`);
  return res.json() as Promise<T>;
}

export const api = {
  screener: (payload: unknown) => request<StockRow[]>("/screener", { method: "POST", body: JSON.stringify(payload) }),
  stock: (symbol: string) => request<StockRow>(`/stocks/${symbol}`),
  catalysts: () => request<CatalystRow[]>("/catalysts"),
  watchlist: () => request<WatchlistItem[]>("/watchlist"),
  addWatchlist: (payload: unknown) => request<WatchlistItem>("/watchlist", { method: "POST", body: JSON.stringify(payload) }),
  removeWatchlist: (id: number) => request<{ deleted: boolean }>(`/watchlist/${id}`, { method: "DELETE" }),
  scoringConfig: () => request<ScoringConfig>("/scoring-config"),
  updateScoring: (payload: ScoringConfig) => request<ScoringConfig>("/scoring-config", { method: "PUT", body: JSON.stringify(payload) }),
  portfolioRisk: (payload: unknown) => request<PortfolioRisk>("/portfolio-risk", { method: "POST", body: JSON.stringify(payload) })
};
