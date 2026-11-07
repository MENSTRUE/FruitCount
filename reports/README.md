# FruitCount scientific evidence / Laporan eksperimen

**Source-of-truth order:** `dataset_audit.json` and `source_provenance.json` for source/quality claims; `experiment_config.json`, `train_args.yaml`, `train_results.csv` for training; `trained_model_manifest.json` and `artifact_manifest.json` for selected checkpoint and exported file identities. `source_README.md` and `source_LICENSE` preserve the dataset's bundled statements. Existing narrative reports remain historical notes and must not override newer source artifacts.

## V4 verified records
- 677 images (477/105/95), 14,190 filtered COCO boxes and 14,303 manually counted visible fruit objects (different targets).
- Full SHA-256 dataset audit **not performed** in V4, `sha256_audit_ran=false`; no confirmed image decode/dimension errors; no filename-group overlap, but not proof of independent plants.
- Pretrained YOLO11n, 960 input, batch 4, 60 history epochs; selected epoch 48 validation-history mAP50=0.47902 and mAP50:95=0.37599.
- Checkpoint manifest SHA-256 `af3339a3593d6b273fd4be0c6e479ed4f83d701c27426de9605e3438ebccd0e8`.
- Counting MAE/RMSE and independent final test in V4 **not evaluated**. The older 95-image test was already viewed in V2/V3.

## How to interpret
`train_results.csv` records training-time validation progression, not a new benchmark of test images. Graphics in `../assets/plots/` present these curves/confusion. `artifact_manifest.json` inventory is not proof all files are present after cloning (model `.pt` is ignored). See [evaluation EN](../docs/en/evaluation.md) / [evaluasi ID](../docs/id/evaluation.md). Keep raw sources and reports unchanged when adding subsequent evidence.
