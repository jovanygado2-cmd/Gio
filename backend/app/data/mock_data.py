from datetime import date

STOCKS = [
    {
        "symbol": "NVDA", "company_name": "NVIDIA", "sector": "Technology", "price": 132.2, "market_cap_b": 3250,
        "revenue_growth": 0.88, "earnings_momentum": 0.72, "pe_ratio": 54, "relative_strength": 0.91,
        "sentiment": 0.76, "catalyst_strength": 0.82, "risk_score": 0.45,
        "earnings_date": date(2026, 2, 18), "catalysts": ["AI chip product cycle", "Cloud demand contracts"]
    },
    {
        "symbol": "LLY", "company_name": "Eli Lilly", "sector": "Healthcare", "price": 873.5, "market_cap_b": 820,
        "revenue_growth": 0.34, "earnings_momentum": 0.51, "pe_ratio": 67, "relative_strength": 0.84,
        "sentiment": 0.62, "catalyst_strength": 0.9, "risk_score": 0.36,
        "earnings_date": date(2026, 1, 30), "catalysts": ["Obesity drug label expansion", "Pipeline readouts"]
    },
    {
        "symbol": "PLTR", "company_name": "Palantir", "sector": "Technology", "price": 31.7, "market_cap_b": 68,
        "revenue_growth": 0.25, "earnings_momentum": 0.58, "pe_ratio": 78, "relative_strength": 0.88,
        "sentiment": 0.66, "catalyst_strength": 0.69, "risk_score": 0.62,
        "earnings_date": date(2026, 2, 5), "catalysts": ["Government contract pipeline", "Commercial margin expansion"]
    },
    {
        "symbol": "ENPH", "company_name": "Enphase", "sector": "Energy", "price": 96.4, "market_cap_b": 13,
        "revenue_growth": 0.12, "earnings_momentum": 0.2, "pe_ratio": 29, "relative_strength": 0.41,
        "sentiment": 0.38, "catalyst_strength": 0.57, "risk_score": 0.71,
        "earnings_date": date(2026, 2, 10), "catalysts": ["Storage attach rate growth", "EU subsidy updates"]
    },
    {
        "symbol": "CRWD", "company_name": "CrowdStrike", "sector": "Technology", "price": 347.0, "market_cap_b": 86,
        "revenue_growth": 0.31, "earnings_momentum": 0.49, "pe_ratio": 76, "relative_strength": 0.79,
        "sentiment": 0.61, "catalyst_strength": 0.63, "risk_score": 0.48,
        "earnings_date": date(2026, 3, 3), "catalysts": ["Platform consolidation wins", "Federal cyber budget tailwinds"]
    },
]

NEWS = {
    "NVDA": [
        "NVIDIA announces new AI accelerator roadmap with improved energy efficiency",
        "Major cloud provider expands NVIDIA long-term supply agreement",
    ],
    "LLY": [
        "Eli Lilly reports positive phase results in obesity trial",
        "Analysts raise target prices on expanding GLP-1 demand",
    ],
}
