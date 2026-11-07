# Experiments and training lineage

## Earlier work
V2 scratch detector had poor detection/counting in an earlier exploratory run; V3 pretrained YOLO11n suffered lengthy post-training evaluation during Kaggle Save Version. These are **development observations**, not a controlled architecture comparison. V4 deliberately exports recovery/training archives before extended evaluation.

## V4 training protocol
`../../reports/experiment_config.json` and `../../reports/train_args.yaml` are the canonical settings. Maximum 60 epochs, patience 12, 960 input, batch 4, seed 42. Actual run has 60 history records. V4 selected epoch 48 with validation-history mAP50=0.47902 and mAP50:95=0.37599; training wall section in manifest 8835.91 seconds. This is a training duration record, **not** runtime inference benchmark.

## Selection and comparability
`best.pt` was selected by Ultralytics validation fitness. The epoch-48 history row is not automatically interchangeable with a separate checkpoint revalidation. V4 skipped post-training counting and test. V2 and V3 previously exposed the same test split, so later test reports are development-aware rather than pristine blind tests.

## Artifacts
`../../reports/train_results.csv` is the full training curve source, `../../assets/plots/train_results.png` its visualization. `../../reports/trained_model_manifest.json` records checkpoint SHA, while `../../reports/artifact_manifest.json` enumerates source ZIP export files. Avoid treating manifest inventory as proof of local model availability; `.pt` is Git-ignored.

## Next experiments
Evaluate count MAE/RMSE against separately defined raw-manifest and detection-box targets; inspect failure cases by class/modality; benchmark CPU and GPU inference and report system specs; run camera/session-separated generalization if labels permit.

**Evidence baseline (2026-11-07):** `reports/dataset_audit.json`, `reports/source_provenance.json`, `reports/experiment_config.json`, `reports/trained_model_manifest.json`, `reports/train_results.csv`, and source implementation in `backend/app/` and `frontend/src/`. This material is a repository audit, not a new experiment.
