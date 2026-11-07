from __future__ import annotations

from collections import Counter
from functools import lru_cache
from pathlib import Path
from threading import Lock
from time import perf_counter

from PIL import Image

from app.core.config import get_settings
from app.schemas.prediction import Detection, PredictionResponse

CLASSES = ["Green", "Breakers", "Turning", "Pink", "Light Red", "Red"]


class Detector:
    """Load the fine-tuned checkpoint once, not on each request."""

    def __init__(self, model_path: Path, device: str):
        if not model_path.is_file():
            raise FileNotFoundError(f"Fine-tuned checkpoint missing: {model_path}")
        from ultralytics import YOLO
        self.model = YOLO(str(model_path), task="detect")
        names = self.model.names
        actual = [names[i] for i in range(len(names))]
        if actual != CLASSES:
            raise ValueError(f"Unexpected checkpoint classes: {actual}; expected {CLASSES}")
        self.device = device
        self.lock = Lock()  # inference safety with shared PyTorch model

    def predict(self, image: Image.Image, confidence: float, iou: float) -> PredictionResponse:
        settings = get_settings()
        start = perf_counter()
        with self.lock:
            result = self.model.predict(
                source=image, imgsz=960, conf=confidence, iou=iou,
                max_det=settings.max_detections, device=self.device,
                verbose=False, save=False,
            )[0]
        detections = []
        for box in result.boxes:
            idx = int(box.cls.item())
            if idx < 0 or idx >= len(CLASSES):
                raise ValueError(f"Unexpected prediction class ID: {idx}")
            coords = [round(float(n), 2) for n in box.xyxy[0].tolist()]
            detections.append(Detection(
                class_id=idx, class_name=CLASSES[idx],
                confidence=round(float(box.conf.item()), 5), box=coords,
            ))
        counter = Counter(d.class_name for d in detections)
        counts = {name: counter.get(name, 0) for name in CLASSES}
        warnings = ["Counts represent visible detected tomatoes, not total field yield."]
        if len(detections) == settings.max_detections:
            warnings.append("Detection limit reached; count may be truncated.")
        return PredictionResponse(
            model_name="YOLO11n · FruitCount V4", image_width=image.width,
            image_height=image.height, total_count=len(detections),
            counts=counts, detections=detections,
            inference_ms=round((perf_counter() - start) * 1000, 1),
            warnings=warnings,
        )


@lru_cache(maxsize=1)
def get_detector() -> Detector:
    settings = get_settings()
    return Detector(settings.model_path, settings.model_device)
