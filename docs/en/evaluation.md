# Evaluation and interpretation

## Verified V4 validation-history result
From `../../reports/train_results.csv`, the **selected epoch 48** row is P=0.49079, R=0.54330, mAP@50=0.47902, mAP@50:95=0.37599. These are detection metrics derived from training-time validation. See the plot `../../assets/plots/train_results.png` and normalized confusion matrix `../../assets/plots/train_confusion_matrix_normalized.png`.

## What is not established
- No separate V4 post-training validation report checked against `best.pt` in this documentation pass.
- No V4 image-level counting MAE/RMSE for either **raw manifest Total** or **filtered geometry-count**.
- No **independent blind test**: earlier development viewed the 95-image official test partition.
- No verified per-class AP table in the tracked JSON/CSV; visual PR curves exist, but values should not be invented.
- No cross-domain benchmark, latency SLA or calibration study.

## How to evaluate next
Freeze class order, confidence/IoU settings and checkpoint using validation. Predict each validation image once; compute MAE/RMSE and per-modality breakdown separately against COCO object count and raw visible-fruit count. Record image identifier, target, prediction, error, source/modality. If subsequently reporting test, disclose prior exposure and do not tune against it. For detection use IoU-based AP (Ultralytics val) and per-class results. False positives/negatives and rare-class confusion need manual review.

## Failure modes
Small/partially hidden tomatoes, lighting shifts, dense overlapping clusters, ripeness transitions and very different aerial imagery. The graph of confusion is evidence of training validation behavior, not guarantees on new images.

**Evidence baseline (2026-11-07):** `reports/dataset_audit.json`, `reports/source_provenance.json`, `reports/experiment_config.json`, `reports/trained_model_manifest.json`, `reports/train_results.csv`, and source implementation in `backend/app/` and `frontend/src/`. This material is a repository audit, not a new experiment.
