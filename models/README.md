# FruitCount V4 model registry / Registri model

The chosen checkpoint is a **fine-tuned pretrained YOLO11n detector**, *not* the unmodified `yolo11n.pt`. Train records: `../reports/experiment_config.json`, `../reports/train_args.yaml`, `../reports/train_results.csv`; exported binary identity: `../reports/trained_model_manifest.json`.

| Property | Source value |
|---|---|
| Classes / Kelas | Green, Breakers, Turning, Pink, Light Red, Red |
| Model preprocessing | Ultralytics YOLO, inference `imgsz=960` |
| Original image output | Boxes `[x1,y1,x2,y2]` in pixels; per-class counts, confidence |
| Checkpoint SHA-256 | `af3339a3593d6b273fd4be0c6e479ed4f83d701c27426de9605e3438ebccd0e8` |
| Checkpoint size | 5,524,122 bytes |
| Selected epoch | 48 (history-based; validation fitness selection) |
| Validation-history mAP50/mAP50:95 | 0.47902 / 0.37599 |
| V4 counting / held-out test | Not yet evaluated |

The binary `models/best.pt` is ignored by Git. Provision from your authorized Kaggle V4 export, then verify hash locally (`Get-FileHash models/best.pt -Algorithm SHA256` in PowerShell). Ensure `/api/v1/ready` succeeds; the trained checkpoint should declare the exact classes in above order. The application default confidence is 0.25, IoU 0.65 and max detections 500. Model output is **visible detected fruits**, not field yield. Confidence is uncalibrated; extremely small/occluded tomatoes may be missed. Check Ultralytics distribution rights before hosting weights.
