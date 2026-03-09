POSITIVE_WORDS = {"positive", "raise", "growth", "expands", "improved", "win", "strong", "beats"}
NEGATIVE_WORDS = {"miss", "cut", "risk", "down", "weak", "decline", "delay", "lawsuit"}


def score_headlines(headlines: list[str]) -> float:
    if not headlines:
        return 0.5
    score = 0.0
    for headline in headlines:
        words = set(headline.lower().split())
        score += len(words & POSITIVE_WORDS) * 0.2
        score -= len(words & NEGATIVE_WORDS) * 0.2
    normalized = 0.5 + (score / max(1, len(headlines)))
    return round(max(0, min(1, normalized)), 2)
