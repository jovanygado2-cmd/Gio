from app.services.scoring import ScoringWeights, compute_upside_score


def test_score_bounds():
    weights = ScoringWeights()
    sample = {
        "revenue_growth": 0.3,
        "earnings_momentum": 0.2,
        "pe_ratio": 40,
        "relative_strength": 0.5,
        "sentiment": 0.6,
        "catalyst_strength": 0.5,
        "risk_score": 0.4,
    }
    result = compute_upside_score(sample, weights)
    assert 0 <= result <= 100
