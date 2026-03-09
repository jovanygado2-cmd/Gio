from datetime import date
from pydantic import BaseModel, Field


class ScreenerFilters(BaseModel):
    min_market_cap_b: float = 1
    max_pe_ratio: float = 80
    min_revenue_growth: float = 0
    sector: str | None = None


class WatchlistCreate(BaseModel):
    symbol: str = Field(min_length=1, max_length=10)
    note: str = ""


class ScoringWeightsUpdate(BaseModel):
    revenue_growth_weight: float
    earnings_momentum_weight: float
    valuation_sanity_weight: float
    relative_strength_weight: float
    sentiment_weight: float
    catalyst_weight: float
    risk_penalty_weight: float


class StockOut(BaseModel):
    symbol: str
    company_name: str
    sector: str
    price: float
    market_cap_b: float
    revenue_growth: float
    earnings_momentum: float
    pe_ratio: float
    relative_strength: float
    sentiment: float
    catalyst_strength: float
    risk_score: float
    earnings_date: date | None
    catalysts: list[str]
    upside_score: float


class PortfolioHolding(BaseModel):
    symbol: str
    allocation_pct: float
    beta: float


class PortfolioRiskOut(BaseModel):
    diversification_score: float
    concentration_risk: float
    beta_exposure: float
    overall_risk: float
