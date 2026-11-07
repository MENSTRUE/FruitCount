# Model card — FruitCount V4 YOLO11n

| Property | Verified basis |
|---|---|
| Task | 6-stage tomato object detection and count of detected visible fruits |
| Base architecture | Ultralytics YOLO11n pretrained |
| Input | RGB images; model inference size 960 px |
| Outputs | Original-pixel `xyxy` boxes, class ID/name, detection confidence; aggregate total and per-class counts |
| Classes | Green; Breakers; Turning; Pink; Light Red; Red |
| Training data | AerialYield-T2M, 477 training /105 validation images; 95 prior-exposed test images |
| Champion | Ultralytics best.pt selected by validation fitness |
| Checkpoint SHA256 | `af3339a3593d6b273fd4be0c6e479ed4f83d701c27426de9605e3438ebccd0e8` |
| Size | 5,524,122 bytes (from export manifest) |
| Metrics | Epoch-48 validation-history P .49079, R .54330, mAP50 .47902, mAP50:95 .37599 |
| Counting MAE / test | **Not yet evaluated in V4** |
| Local availability | Git ignores `models/best.pt`: provision explicitly |

## Intended use
Research/demo support for reviewing *visible* tomatoes in images, not autonomous picking, grading certification, field yield, food safety or harvest forecasting. Confidence scores are not calibrated risk estimates. User must verify false positives, missed tiny/occluded objects and taxonomy differences.

## Bias, safety and constraints
Dataset blends two viewpoints from greenhouse tomato images; site, cultivar and acquisition conditions may not generalize. Rare ripeness classes can be underrepresented. Image uploads should follow consent/privacy policies. Ultralytics pretrained and fine-tuned weight distribution may require a separate license review. Do not call this production-certified.

**Evidence baseline (2026-11-07):** `reports/dataset_audit.json`, `reports/source_provenance.json`, `reports/experiment_config.json`, `reports/trained_model_manifest.json`, `reports/train_results.csv`, and source implementation in `backend/app/` and `frontend/src/`. This material is a repository audit, not a new experiment.
