# FruitCount notebook / Notebook eksperimen

`fruitcount.ipynb` is the checked-in Kaggle V4 **training and export** notebook. It uses dataset mount `/kaggle/input/datasets/wafabila/fruitcount-dataset`, official 477 train/105 validation/95 test split, maps six COCO classes to YOLO 0–5, converts annotations and trains pretrained YOLO11n. Input size 960, batch 4, epochs up to 60, patience 12, workers 0 and seed 42 (see `../reports/experiment_config.json`).

## Recommended order / Urutan
1. Verify Kaggle input mount and original dataset license; do not redownload images into Git.
2. Inspect dataset audit, original split and image/box mapping; prevent leakage (prior test was development-exposed).
3. Install compatible Ultralytics / pretrained weights and use GPU T4 if available. Avoid full re-training just to inspect saved metrics.
4. Execute V4 training/export. Save generated ZIP/`best.pt`; confirm SHA-256 against `../reports/trained_model_manifest.json`.
5. Do counting MAE/RMSE and test reporting in **separate notebook/run** so model export is not gated on slow evaluation.

V4's Save Version was designed to export training before additional counting/test evaluation. Local usage must not claim independent blind test or ready-for-deployment metrics. Notebook outputs are not identical to frontend inference screenshots.
