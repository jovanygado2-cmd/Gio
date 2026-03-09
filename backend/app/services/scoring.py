from dataclasses import asdict, dataclass


@dataclass
class ScoringWeights:
    revenue_growth_weight: float = 0.2
    earnings_momentum_weight: float = 0.15
    valuation_sanity_weight: float = 0.15
    relative_strength_weight: float = 0.15
    sentiment_weight: float = 0.15
    catalyst_weight: float = 0.15
    risk_penalty_weight: float = 0.15


def valuation_sanity(pe_ratio: float) -> float:
    if pe_ratio <= 0:
        return 0.0
    if pe_ratio <= 20:
        return 1.0
    if pe_ratio >= 80:
        return 0.1
    return max(0.1, 1 - ((pe_ratio - 20) / 60))


def compute_upside_score(stock: dict, weights: ScoringWeights) -> float:
    positive = (
        stock["revenue_growth"] * weights.revenue_growth_weight
        + stock["earnings_momentum"] * weights.earnings_momentum_weight
        + valuation_sanity(stock["pe_ratio"]) * weights.valuation_sanity_weight
        + stock["relative_strength"] * weights.relative_strength_weight
        + stock["sentiment"] * weights.sentiment_weight
        + stock["catalyst_strength"] * weights.catalyst_weight
    )
    penalty = stock["risk_score"] * weights.risk_penalty_weight
    return round(max(0.0, min(1.0, positive - penalty)) * 100, 2)


def weights_to_dict(weights: ScoringWeights) -> dict:
    return asdict(weights)
