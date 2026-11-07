from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes import router
from app.core.config import get_settings

settings = get_settings()
app = FastAPI(title="FruitCount API", version="1.0.0", description="Tomato detection, ripeness classification and visible-fruit counting")
app.add_middleware(
    CORSMiddleware, allow_origins=settings.cors_origins,
    allow_credentials=False, allow_methods=["GET", "POST"], allow_headers=["Content-Type"],
)
app.include_router(router)


@app.get("/")
def index():
    return {"name": "FruitCount", "docs": "/docs", "health": "/api/v1/health"}
