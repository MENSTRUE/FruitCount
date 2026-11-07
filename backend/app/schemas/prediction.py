from pydantic import BaseModel, Field


class Detection(BaseModel):
    class_id: int
    class_name: str
    confidence: float = Field(ge=0, le=1)
    box: list[float] = Field(description="[x1, y1, x2, y2] in original image pixels")


class PredictionResponse(BaseModel):
    model_name: str
    image_width: int
    image_height: int
    total_count: int
    counts: dict[str, int]
    detections: list[Detection]
    inference_ms: float
    warnings: list[str] = []


class HealthResponse(BaseModel):
    status: str
    model_ready: bool
