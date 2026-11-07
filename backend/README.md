# FruitCount FastAPI

Backend ready for real YOLO11n V4 checkpoint (`models/best.pt` at the repository root).

## Run from the repository root (Windows PowerShell)

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r backend/requirements.txt
$env:PYTHONPATH = (Resolve-Path 'backend').Path
python -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

Open http://127.0.0.1:8000/docs . Run `python -m pytest backend/tests -q` after setting `PYTHONPATH`.

- `GET /api/v1/health`: server status, checkpoint file presence.
- `GET /api/v1/ready`: loads and validates checkpoint; 503 if unavailable.
- `POST /api/v1/predict`: `multipart/form-data` field `image`; optional `confidence`, `iou` query parameters.

Never upload or version raw input photos; predictions do not persist uploaded files. The `best.pt` checkpoint is not tracked by Git, and is mandatory for real predictions.
