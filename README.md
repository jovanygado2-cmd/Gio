# UpsideLens MVP

UpsideLens is a production-style MVP for identifying high-upside U.S. stock opportunities using a transparent scoring model, catalysts, sentiment, and risk controls.

## Phase-by-phase delivery

### Phase 1 — Product definition
- **Persona:** self-directed retail investors, research analysts, and newsletter writers who need faster opportunity triage.
- **Core features:** screener, catalyst tracker, news/sentiment module, watchlist, ranking dashboard, portfolio risk overview.
- **Differentiators:** transparent scoring, risk penalty, editable weights, catalyst-first workflow.
- **Monetization path:** freemium analytics with paid real-time data and alerts.
- **Final MVP scope:** full-stack web app + FastAPI analytics API + SQLite persistence.

### Phase 2 — System architecture
- **Frontend:** Next.js App Router + Tailwind UI.
- **Backend:** FastAPI with SQLAlchemy and service-layer scoring/sentiment modules.
- **DB:** SQLite for MVP (upgradable to Postgres).
- **Data flow:** user filter -> `/screener` -> scoring engine -> ranked opportunities in UI.
- **Tradeoff:** mock market/news data for reliability and deterministic demos; API adapters can be swapped later.

### Phase 3 — Project structure
- `app/`: dashboard, screener, stock detail, catalysts, watchlist, portfolio, settings pages.
- `components/ui/`: navigation, badge, mini-chart bar, disclaimer.
- `lib/api.ts`: frontend API client.
- `backend/app/`: FastAPI app, models, schemas, data, services.
- `backend/tests/`: scoring test.
- `docs/`: architecture and monetization docs.

### Phase 4 to 10 implementation summary
- Implemented all required modules and pages.
- Added transparent editable scoring formula (Phase 5).
- Built clean dashboard UI and all required routes (Phase 6).
- Added basic automated test + runtime validation/fallbacks (Phase 7).
- Added local and deployment instructions + env template (Phase 8).
- Added monetization and ROI roadmap docs (Phases 9 and 10).

## Quick start (beginner friendly)

### 1) Backend API
```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### 2) Frontend
In another terminal:
```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Environment variables
Copy `.env.example` to `.env.local` (frontend) and optionally `.env` in `backend/`.

## Deployment
- **Frontend:** Vercel (set `NEXT_PUBLIC_API_BASE_URL`).
- **Backend:** Render/Railway/Fly.io running `uvicorn app.main:app --host 0.0.0.0 --port $PORT`.
- **DB:** keep SQLite for demo; switch to managed Postgres by changing `DATABASE_URL`.

## Disclaimer
This tool is for educational/research purposes only and is not financial advice.
