# Architecture

- Next.js frontend consumes FastAPI endpoints from `lib/api.ts`.
- FastAPI uses SQLAlchemy models (`StockSnapshot`, `WatchlistItem`, `ScoringConfig`).
- `services/scoring.py` computes upside score:

```
score = 100 * clamp(
  revenue_growth*w1 + earnings_momentum*w2 + valuation_sanity*w3 +
  relative_strength*w4 + sentiment*w5 + catalyst_strength*w6 - risk_score*w7,
  0, 1
)
```

- `services/sentiment.py` performs lightweight lexical sentiment on headlines.
- Seed data is loaded at startup for deterministic MVP behavior.
