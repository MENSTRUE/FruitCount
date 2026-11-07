from functools import lru_cache
from pathlib import Path
import os

from pydantic import BaseModel


class Settings(BaseModel):
    app_name: str = "FruitCount"
    app_env: str = "development"
    model_path: Path = Path("models/best.pt")
    model_device: str = "cpu"
    confidence_threshold: float = 0.25
    iou_threshold: float = 0.65
    max_detections: int = 500
    max_upload_bytes: int = 12 * 1024 * 1024
    cors_origins: list[str] = ["http://localhost:5173", "http://127.0.0.1:5173"]


@lru_cache(maxsize=1)
def get_settings() -> Settings:
    # Launched from repository root, backend folder, or arbitrary cwd.
    repo_root = Path(__file__).resolve().parents[3]
    supplied = Path(os.getenv("MODEL_PATH", "models/best.pt"))
    resolved = supplied if supplied.is_absolute() else repo_root / supplied
    origins = os.getenv("CORS_ORIGINS", "http://localhost:5173,http://127.0.0.1:5173")
    return Settings(
        app_env=os.getenv("APP_ENV", "development"),
        model_path=resolved,
        model_device=os.getenv("MODEL_DEVICE", "cpu"),
        confidence_threshold=float(os.getenv("CONFIDENCE_THRESHOLD", "0.25")),
        iou_threshold=float(os.getenv("IOU_THRESHOLD", "0.65")),
        max_detections=int(os.getenv("MAX_DETECTIONS", "500")),
        max_upload_bytes=int(os.getenv("MAX_UPLOAD_BYTES", str(12 * 1024 * 1024))),
        cors_origins=[v.strip() for v in origins.split(",") if v.strip()],
    )
