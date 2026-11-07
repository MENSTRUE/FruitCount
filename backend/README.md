# FruitCount FastAPI backend / Dokumentasi Backend

The implementation is at `app/main.py`, `app/api/routes.py`, `app/core/config.py`, `app/schemas/prediction.py`, `app/services/detector.py`, with `tests/test_api.py`. It is **implemented**, not merely planned. The root `models/best.pt` is ignored by Git and required for real inference.

## Architecture / Arsitektur
`main.py` configures a FastAPI instance and CORS; `routes.py` validates upload and routes requests; `detector.py` checks checkpoint class names, caches model and serializes inference with a lock; `prediction.py` supplies Pydantic schemas. Backend memanggil model nyata, bukan membuat prediksi acak.

## Contract / Kontrak API
| Endpoint | Semantics |
|---|---|
| `GET /api/v1/health` | HTTP server alive and `model_path.is_file()`; **not** evidence of usable model |
| `GET /api/v1/ready` | Instantiate/check 6-stage checkpoint; HTTP 503 if unavailable |
| `POST /api/v1/predict` | Multipart `image` (JPG/PNG/WebP); `confidence` default 0.25, range 0.05–0.95; `iou` default 0.65, range 0.1–0.95 |

JSON response: `model_name`, `image_width`, `image_height`, `total_count`, `counts`, `detections` (class ID/name, confidence, `box` original-pixel `xyxy`), `inference_ms`, `warnings`. `total_count` is **detected visible fruit**, not harvest volume. Backend menggunakan batas file 12 MiB, maksimum 35 juta piksel, dan transformasi EXIF. MIME salah → 415; terlalu besar → 413; gambar rusak → 400; model gagal → 503.

## Run / Menjalankan (Windows PowerShell)
```powershell
cd 'D:\porto\100 day\day 33\FruitCount'
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r backend/requirements.txt
$env:PYTHONPATH = (Resolve-Path '.\backend').Path
python -m pytest backend/tests -q
python -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

Use `http://127.0.0.1:8000/docs`, `/api/v1/health`, `/api/v1/ready`. Tests replace the real detector with a fake dependency, so passing tests **does not** confirm model accuracy or real checkpoint integration. Jalankan inference sungguhan setelah `/ready` berhasil.

## Configuration / Konfigurasi
Backend reads OS/process variables (`MODEL_PATH`, `MODEL_DEVICE`, `CORS_ORIGINS`, `MAX_UPLOAD_BYTES`, `MAX_DETECTIONS`), defaults CPU, and resolves relative model path from repo root. Root `.env.example` is a **template only**: Python code does not automatically load `.env`. For test image use `curl.exe -X POST 'http://127.0.0.1:8000/api/v1/predict' -F 'image=@sample.jpg'`.

## Security / Keamanan
No auth, rate limit, audit log policy or public deployment hardening; don't expose beyond localhost. Inference loads input image in memory and the route does not intentionally persist files. No persistent upload storage is implemented. CORS is restricted to configured origins. Image content should be treated as untrusted; monitor resource pressure and avoid disclosing exception details in production.

## Troubleshooting / Solusi
- 503 `/ready`: missing/wrong `best.pt`, invalid six-class mapping or broken dependency; confirm checkpoint SHA256 from `reports/trained_model_manifest.json`.
- 415/413/400: MIME, size/pixel, or decode error; verify upload.
- CORS: configure exact `CORS_ORIGINS` before start.
- Slow CPU: batch and GPU benchmark separately before claiming performance.

[English architecture](../docs/en/architecture.md) · [Arsitektur Indonesia](../docs/id/architecture.md) · [API source](app/api/routes.py)
