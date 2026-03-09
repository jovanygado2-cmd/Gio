from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session

from .data.mock_data import NEWS
from .database import Base, engine, get_db
from .models import ScoringConfig, StockSnapshot, WatchlistItem
from .schemas import PortfolioHolding, ScoringWeightsUpdate, ScreenerFilters, WatchlistCreate
from .services.scoring import ScoringWeights, compute_upside_score, weights_to_dict
from .services.seed import seed_if_empty
from .services.sentiment import score_headlines

app = FastAPI(title="Stock Opportunity Platform API", version="1.0.0")
Base.metadata.create_all(bind=engine)


@app.on_event("startup")
def startup() -> None:
    db = next(get_db())
    seed_if_empty(db)


def resolve_weights(db: Session) -> ScoringWeights:
    row = db.query(ScoringConfig).first()
    if not row:
        row = ScoringConfig()
        db.add(row)
        db.commit()
        db.refresh(row)
    return ScoringWeights(**{k: getattr(row, k) for k in weights_to_dict(ScoringWeights()).keys()})


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/screener")
def screener(filters: ScreenerFilters, db: Session = Depends(get_db)):
    weights = resolve_weights(db)
    stocks = db.query(StockSnapshot).all()
    output = []
    for stock in stocks:
        if stock.market_cap_b < filters.min_market_cap_b or stock.pe_ratio > filters.max_pe_ratio:
            continue
        if stock.revenue_growth < filters.min_revenue_growth:
            continue
        if filters.sector and stock.sector != filters.sector:
            continue
        row = stock.__dict__.copy()
        row.pop("_sa_instance_state", None)
        row["upside_score"] = compute_upside_score(row, weights)
        output.append(row)
    return sorted(output, key=lambda x: x["upside_score"], reverse=True)


@app.get("/stocks/{symbol}")
def stock_detail(symbol: str, db: Session = Depends(get_db)):
    stock = db.query(StockSnapshot).filter(StockSnapshot.symbol == symbol.upper()).first()
    if not stock:
        raise HTTPException(status_code=404, detail="Stock not found")
    weights = resolve_weights(db)
    row = stock.__dict__.copy()
    row.pop("_sa_instance_state", None)
    headlines = NEWS.get(row["symbol"], [])
    row["headlines"] = headlines
    row["headline_sentiment"] = score_headlines(headlines)
    row["upside_score"] = compute_upside_score(row, weights)
    return row


@app.get("/catalysts")
def catalysts(db: Session = Depends(get_db)):
    return [
        {"symbol": s.symbol, "company_name": s.company_name, "earnings_date": s.earnings_date, "catalysts": s.catalysts}
        for s in db.query(StockSnapshot).all()
    ]


@app.get("/watchlist")
def get_watchlist(db: Session = Depends(get_db)):
    return db.query(WatchlistItem).all()


@app.post("/watchlist")
def add_watchlist(payload: WatchlistCreate, db: Session = Depends(get_db)):
    symbol = payload.symbol.upper()
    exists = db.query(StockSnapshot).filter(StockSnapshot.symbol == symbol).first()
    if not exists:
        raise HTTPException(status_code=404, detail="Unknown symbol")
    row = WatchlistItem(symbol=symbol, note=payload.note)
    db.add(row)
    db.commit()
    db.refresh(row)
    return row


@app.delete("/watchlist/{item_id}")
def remove_watchlist(item_id: int, db: Session = Depends(get_db)):
    row = db.query(WatchlistItem).filter(WatchlistItem.id == item_id).first()
    if not row:
        raise HTTPException(status_code=404, detail="Not found")
    db.delete(row)
    db.commit()
    return {"deleted": True}


@app.get("/scoring-config")
def get_scoring_config(db: Session = Depends(get_db)):
    weights = resolve_weights(db)
    return weights_to_dict(weights)


@app.put("/scoring-config")
def update_scoring_config(payload: ScoringWeightsUpdate, db: Session = Depends(get_db)):
    row = db.query(ScoringConfig).first()
    if not row:
        row = ScoringConfig()
        db.add(row)
    for key, value in payload.model_dump().items():
        setattr(row, key, value)
    db.commit()
    db.refresh(row)
    return payload


@app.post("/portfolio-risk")
def portfolio_risk(holdings: list[PortfolioHolding]):
    if not holdings:
        return {"diversification_score": 0, "concentration_risk": 100, "beta_exposure": 0, "overall_risk": 100}
    weights = [h.allocation_pct / 100 for h in holdings]
    concentration = round(max(weights) * 100, 2)
    beta_exposure = round(sum((h.beta * w) for h, w in zip(holdings, weights)), 2)
    diversification = round(max(0, 100 - concentration), 2)
    overall = round(min(100, concentration * 0.5 + max(0, beta_exposure - 1) * 50), 2)
    return {
        "diversification_score": diversification,
        "concentration_risk": concentration,
        "beta_exposure": beta_exposure,
        "overall_risk": overall,
    }
