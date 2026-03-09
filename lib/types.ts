export type StockRow = {
  symbol: string;
  company_name: string;
  sector: string;
  price: number;
  revenue_growth: number;
  pe_ratio: number;
  upside_score: number;
  earnings_momentum: number;
  relative_strength: number;
  sentiment: number;
  catalyst_strength: number;
  risk_score: number;
  catalysts: string[];
  headline_sentiment?: number;
  headlines?: string[];
};

export type CatalystRow = {
  symbol: string;
  company_name: string;
  earnings_date: string;
  catalysts: string[];
};

export type WatchlistItem = { id: number; symbol: string; note: string };

export type ScoringConfig = {
  revenue_growth_weight: number;
  earnings_momentum_weight: number;
  valuation_sanity_weight: number;
  relative_strength_weight: number;
  sentiment_weight: number;
  catalyst_weight: number;
  risk_penalty_weight: number;
};

export type PortfolioRisk = {
  diversification_score: number;
  concentration_risk: number;
  beta_exposure: number;
  overall_risk: number;
};
