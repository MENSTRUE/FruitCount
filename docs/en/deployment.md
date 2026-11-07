# Deployment and operational readiness

## Local prototype only
There is working application code but no verified public deployment or production load test. From repository root, run backend with `PYTHONPATH=backend`, `python -m uvicorn app.main:app --host 127.0.0.1 --port 8000`; run frontend via `npm ci; npm run build; npm run dev` under `frontend/`.

## Configuration
Root `.env.example` is informational; Python backend currently reads **process environment variables** (`MODEL_PATH`, `MODEL_DEVICE`, `CORS_ORIGINS`, `MAX_UPLOAD_BYTES`, `MAX_DETECTIONS`, etc.) and does not automatically call dotenv. The frontend reads `VITE_API_BASE_URL` via Vite build-time environment. Place `models/best.pt` locally. `MODEL_DEVICE=cpu` defaults to CPU.

## Deployment checklist (not yet completed)
- Provision model weight only if license allows; verify SHA256, class mapping, 960-px preprocessing and result schema.
- Pin dependencies and run Python tests, TypeScript build, actual image inference and performance measurement.
- Serve HTTPS, add authentication, rate limiting, request body limits at reverse proxy, observability, safe CORS, secrets management and image retention policy.
- Define allowed image content and implement logging redaction; image files are currently processed in memory.
- Monitor low-confidence/rare-class errors, GPU/CPU resource pressure and model versioning.
- Review dataset CC BY 4.0 attribution and Ultralytics weight/software license separately.

**Not production-ready** until checks are demonstrably complete.

**Evidence baseline (2026-11-07):** `reports/dataset_audit.json`, `reports/source_provenance.json`, `reports/experiment_config.json`, `reports/trained_model_manifest.json`, `reports/train_results.csv`, and source implementation in `backend/app/` and `frontend/src/`. This material is a repository audit, not a new experiment.
