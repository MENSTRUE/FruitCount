from io import BytesIO
from PIL import Image
from fastapi.testclient import TestClient

from app.main import app
from app.api.routes import resolve_detector
from app.schemas.prediction import PredictionResponse


class FakeDetector:
    def predict(self, image, confidence, iou):
        return PredictionResponse(
            model_name="fake", image_width=image.width, image_height=image.height,
            total_count=1, counts={"Green": 1, "Breakers": 0, "Turning": 0, "Pink": 0, "Light Red": 0, "Red": 0},
            detections=[{"class_id": 0, "class_name": "Green", "confidence": 0.91, "box": [1, 2, 9, 8]}],
            inference_ms=1.1,
        )


def test_health():
    with TestClient(app) as client:
        response = client.get("/api/v1/health")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"


def test_predict_and_upload_validation():
    app.dependency_overrides[resolve_detector] = lambda: FakeDetector()
    try:
        picture = BytesIO()
        Image.new("RGB", (32, 24), "orange").save(picture, format="PNG")
        with TestClient(app) as client:
            response = client.post("/api/v1/predict", files={"image": ("sample.png", picture.getvalue(), "image/png")})
            assert response.status_code == 200, response.text
            assert response.json()["total_count"] == 1
            assert response.json()["image_width"] == 32
            invalid = client.post("/api/v1/predict", files={"image": ("oops.txt", b"bad", "text/plain")})
            assert invalid.status_code == 415
            corrupted = client.post("/api/v1/predict", files={"image": ("oops.png", b"bad", "image/png")})
            assert corrupted.status_code == 400
    finally:
        app.dependency_overrides.clear()
