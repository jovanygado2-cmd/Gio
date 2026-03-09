from sqlalchemy.orm import Session

from ..data.mock_data import STOCKS
from ..models import ScoringConfig, StockSnapshot


def seed_if_empty(db: Session) -> None:
    if db.query(StockSnapshot).first():
        return
    for stock in STOCKS:
        db.add(StockSnapshot(**stock))
    db.add(ScoringConfig())
    db.commit()
