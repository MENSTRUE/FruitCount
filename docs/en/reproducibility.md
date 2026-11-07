# Reproducibility guide

## Evidence and version record
V4 seed 42, input 960, batch 4, 60 epochs, patience 12, worker 0, pretrained YOLO11n, Ultralytics 8.4.203, PyTorch 2.11.0+cu130. Dataset mount in source notebook: `/kaggle/input/datasets/wafabila/fruitcount-dataset`. Official split 477/105/95. Reuse original source dataset rather than copying raw images into Git. `../../notebooks/fruitcount.ipynb` is the tracked notebook.

## Restore/check checkpoint
From authorized Kaggle training export, provision `models/best.pt` in your local clone; calculate SHA256 and compare to `../../reports/trained_model_manifest.json` (`af3339...bccd0e8`). The model is intentionally absent from Git. Do not use bare `yolo11n.pt`, which is the baseline initialization.

## Run locally (Windows PowerShell)
```powershell
cd 'D:\porto\100 day\day 33\FruitCount'
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r backend/requirements.txt
Get-FileHash .\models\best.pt -Algorithm SHA256
$env:PYTHONPATH=(Resolve-Path .\backend).Path
python -m pytest backend/tests -q
python -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```
Second terminal: `cd frontend; npm ci; npm run build; npm run dev`. Verify GET `/api/v1/ready` and POST actual image. Do **not** claim reproducibility until runs pass in your environment. Original full-hash dataset audit was disabled; additional leakage/near-duplicate checks are needed for a stronger data-integrity claim.

## Experiment lineage
Compare `../../reports/experiment_config.json`, `../../reports/train_args.yaml`, `../../reports/train_results.csv`, `../../reports/dataset_audit.json`, and `../../reports/artifact_manifest.json`; snapshot package/OS/GPU details with the rerun. Track new runs separately—never overwrite V4 history.

**Evidence baseline (2026-11-07):** `reports/dataset_audit.json`, `reports/source_provenance.json`, `reports/experiment_config.json`, `reports/trained_model_manifest.json`, `reports/train_results.csv`, and source implementation in `backend/app/` and `frontend/src/`. This material is a repository audit, not a new experiment.
