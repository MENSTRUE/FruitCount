from io import BytesIO
import warnings

from fastapi import APIRouter, Depends, File, HTTPException, Query, UploadFile
from PIL import Image, ImageOps, UnidentifiedImageError

from app.core.config import get_settings
from app.schemas.prediction import HealthResponse, PredictionResponse
from app.services.detector import get_detector

router = APIRouter(prefix="/api/v1")


def resolve_detector():
    try:
        return get_detector()
    except (FileNotFoundError, ValueError, RuntimeError, ImportError, OSError) as exc:
        raise HTTPException(status_code=503, detail=f"Model unavailable: {exc}") from exc


@router.get("/health", response_model=HealthResponse)
def health():
    return HealthResponse(status="ok", model_ready=get_settings().model_path.is_file())


@router.get("/ready", response_model=HealthResponse)
def ready():
    try:
        get_detector()
    except (FileNotFoundError, ValueError, RuntimeError, ImportError, OSError) as exc:
        raise HTTPException(status_code=503, detail=f"Model unavailable: {exc}") from exc
    return HealthResponse(status="ready", model_ready=True)


@router.post("/predict", response_model=PredictionResponse)
async def predict(
    image: UploadFile = File(...),
    confidence: float = Query(0.25, ge=0.05, le=0.95),
    iou: float = Query(0.65, ge=0.1, le=0.95),
    detector=Depends(resolve_detector),
):
    settings = get_settings()
    if image.content_type not in {"image/jpeg", "image/png", "image/webp"}:
        raise HTTPException(status_code=415, detail="Only JPEG, PNG, and WebP images are supported")
    body = await image.read(settings.max_upload_bytes + 1)
    await image.close()
    if len(body) > settings.max_upload_bytes:
        raise HTTPException(status_code=413, detail="Image exceeds upload size limit")
    if not body:
        raise HTTPException(status_code=400, detail="Empty image")
    try:
        with warnings.catch_warnings():
            warnings.simplefilter("error", Image.DecompressionBombWarning)
            with Image.open(BytesIO(body)) as source:
                source.load()
                if source.width * source.height > 35_000_000:
                    raise HTTPException(status_code=413, detail="Image dimensions too large")
                rgb = ImageOps.exif_transpose(source).convert("RGB")
    except (UnidentifiedImageError, OSError, Image.DecompressionBombError, Image.DecompressionBombWarning, ValueError) as exc:
        raise HTTPException(status_code=400, detail="Invalid or unsafe image") from exc
    try:
        return detector.predict(rgb, confidence, iou)
    except (RuntimeError, ValueError, OSError) as exc:
        raise HTTPException(status_code=503, detail=f"Inference unavailable: {exc}") from exc
