from pydantic import BaseModel
import os


class Settings(BaseModel):
    app_name: str = "Stock Opportunity Platform API"
    database_url: str = os.getenv("DATABASE_URL", "sqlite:///./stock_platform.db")
    news_api_key: str = os.getenv("NEWS_API_KEY", "")


settings = Settings()
