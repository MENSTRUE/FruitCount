# Research methodology

## Objective and design
Train six-category tomato **object detection** on a mixed camera dataset and estimate visible fruit counts by counting predicted bounding boxes. This is not segmentation, ripeness calibration, or harvest estimation.

## Data workflow
Read COCO annotations and the official 477/105/95 image membership; map COCO category IDs 1–6 to YOLO class indices 0–5; normalize and clip bounding boxes, validate images, convert to a YOLO training structure. Exclude raw source archives from tracked artifacts. Keep official validation for training/checkpoint selection.

## Model and optimization
Pretrained Ultralytics YOLO11n (`yolo11n.pt` base); imgsz=960, batch=4, maximum 60 epochs, early-stopping patience 12, seed 42, deterministic mode, workers=0, AMP enabled. Optimizer `auto`, `close_mosaic=10`, mosaic and standard color/geometry augmentation as listed in `../../reports/train_args.yaml`. Training environment Ultralytics 8.4.203, torch 2.11.0+cu130.

## Selection and output
Ultralytics selects `best.pt` via **validation fitness**. The exported manifest records the checkpoint SHA-256 and size. Backend predicts with `imgsz=960`, `conf` default 0.25, `iou` default 0.65 and `max_det=500`, then groups returned boxes by class. `confidence` is a threshold, not calibration. No post-training counting/test evaluation was part of V4's Save Version. Restrict all later tuning to validation; disclose old test exposure.

## Threats to validity
Strong class imbalance, same-session correlations, possible near duplicates, domain shift, crop/weed confusion not relevant to this task, and noncalibrated confidences. Audit `../../reports/dataset_audit.json` before claiming independence.

**Evidence baseline (2026-11-07):** `reports/dataset_audit.json`, `reports/source_provenance.json`, `reports/experiment_config.json`, `reports/trained_model_manifest.json`, `reports/train_results.csv`, and source implementation in `backend/app/` and `frontend/src/`. This material is a repository audit, not a new experiment.
