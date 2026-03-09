from sqlalchemy import JSON, Column, Date, Float, Integer, String

from .database import Base


class StockSnapshot(Base):
    __tablename__ = "stock_snapshots"

    id = Column(Integer, primary_key=True, index=True)
    symbol = Column(String, unique=True, index=True, nullable=False)
    company_name = Column(String, nullable=False)
    sector = Column(String, nullable=False)
    price = Column(Float, nullable=False)
    market_cap_b = Column(Float, nullable=False)
    revenue_growth = Column(Float, nullable=False)
    earnings_momentum = Column(Float, nullable=False)
    pe_ratio = Column(Float, nullable=False)
    relative_strength = Column(Float, nullable=False)
    sentiment = Column(Float, nullable=False)
    catalyst_strength = Column(Float, nullable=False)
    risk_score = Column(Float, nullable=False)
    catalysts = Column(JSON, default=list)
    earnings_date = Column(Date, nullable=True)


class WatchlistItem(Base):
    __tablename__ = "watchlist_items"

    id = Column(Integer, primary_key=True, index=True)
    symbol = Column(String, index=True, nullable=False)
    note = Column(String, default="")


class ScoringConfig(Base):
    __tablename__ = "scoring_config"

    id = Column(Integer, primary_key=True, index=True)
    revenue_growth_weight = Column(Float, default=0.2)
    earnings_momentum_weight = Column(Float, default=0.15)
    valuation_sanity_weight = Column(Float, default=0.15)
    relative_strength_weight = Column(Float, default=0.15)
    sentiment_weight = Column(Float, default=0.15)
    catalyst_weight = Column(Float, default=0.15)
    risk_penalty_weight = Column(Float, default=0.15)
