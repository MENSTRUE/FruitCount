# Troubleshooting

| Symptom | Likely cause | Check/fix |
|---|---|---|
| UI says Backend offline | FastAPI not running or wrong origin | Check `http://127.0.0.1:8000/api/v1/health`, inspect `VITE_API_BASE_URL`, start uvicorn |
| `health` OK but `/ready` 503 | Missing/wrong binary or dependencies | Check `models/best.pt`, SHA256, six exact classes, `MODEL_DEVICE` and Ultralytics install |
| Browser CORS error | Origin not in configured list | Set `CORS_ORIGINS=http://127.0.0.1:5173,http://localhost:5173` before server start |
| HTTP 415 | Wrong MIME | Send JPEG, PNG or WebP in multipart field `image` |
| HTTP 413 | File >12 MiB or >35M pixels | Downscale before upload; keep bounds consistent |
| HTTP 400 | Empty/corrupted/unsafe image | Confirm file is decodable; re-export RGB image |
| Predicted boxes mismatch positions | UI/image scaling or EXIF | Verify original-pixel coordinates, EXIF transpose and SVG viewBox |
| `npm run build` fails | Node version / TS errors | Run `npm ci` and inspect exact error; do not claim success beforehand |
| Git cannot see `best.pt` | `.gitignore` excludes `.pt` | Provision binary separately; do not force-add by default |
| Save Version too slow | Resource / evaluation after training | V4 uses training-only export; do not rerun full V3 blindly |

## Diagnostic sequence
Start at `/health` (availability), then `/ready` (loadability), then a real image `/predict` (functionality), followed by manual box review and tests. A green status pill alone is not proof of correctness.

**Evidence baseline (2026-11-07):** `reports/dataset_audit.json`, `reports/source_provenance.json`, `reports/experiment_config.json`, `reports/trained_model_manifest.json`, `reports/train_results.csv`, and source implementation in `backend/app/` and `frontend/src/`. This material is a repository audit, not a new experiment.
