# FruitCount V4 integration

The delivered folders can be merged into an existing standard FruitCount repository **without** replacing `models/`, `reports/`, `notebooks/`, `assets/`, `README.md`, `LICENSE`, `AGENTS.md`, or `.gitignore`.

Place the **fine-tuned** Kaggle V4 `best.pt` at repository root `models/best.pt`; do not confuse with original `yolo11n.pt`.

## Backend

```powershell
cd 'D:\porto\100 day\day 33\FruitCount'
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r backend/requirements.txt
$env:PYTHONPATH = (Resolve-Path '.\backend').Path
python -m pytest backend/tests -q
python -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```

Try `http://127.0.0.1:8000/docs` and `/api/v1/ready`.

## Frontend, another terminal

```powershell
cd 'D:\porto\100 day\day 33\FruitCount\frontend'
npm install
npm run dev
npm run build
```

Open `http://127.0.0.1:5173`.

## Notes
- Prediction confidence defaults to 0.25; adjusting it changes results on next inference, not live reclassification of cached detections.
- Model performance comes from V4 validation reports, not from frontend; do not claim unseen held-out test performance.
- GPU training not needed for local inference; CPU will be slower.
- Image input capped at 12 MB; JPEG/PNG/WebP; no images stored.
- Files `models/*.pt` are ignored by `.gitignore`; deployment must explicitly provision model weights.
- Pretrained Ultralytics model usage and distribution may have license obligations; review before commercial deployment.
