# Dataset provenance

AerialYield-T2M is the sole training dataset documented for V4. The repository mirrors it through [Kaggle](https://www.kaggle.com/datasets/wafabila/fruitcount-dataset); the bundled source README links [source-generation code](https://github.com/afeefaaazam03/Tomato_dataset). Source README reports 535 close-range and 142 drone JPEG images; 677 overall. The release carries masks, COCO/YOLO detection files, metadata and official split manifests. **V4 uses detection boxes and does not train segmentation.**

| Partition | Images | Geometry-filtered COCO boxes |
|---|---:|---:|
| Train | 477 | 10,050 |
| Validation | 105 | 1,938 |
| Test | 95 | 2,202 |

Manual *raw visible-fruit* counts sum to 14,303; geometry-filtered detection labels sum to 14,190 (113 difference). These are distinct targets; don't score counting against boxes while calling it raw count. The published guidance describes a `<64 px²` geometry filter in the release coordinate system.

Six category labels: Green (100% green), Breakers (<10% colour development), Turning (10–40%), Pink (40–80%), Light Red (80–90% red), Red (>90% red). Model index 0–5 follows this order. The bundled license is CC BY 4.0; **verify authors/manuscript citation and license** before redistribution. The release metadata access timestamp was 2026-11-06T14:19:06Z.

The V4 audit did *not* run full file SHA-256; no decode/dimension errors were reported, no filename-derived block sharing was recorded, but no perceptual near-duplicate audit, plant-identity validation or acquisition-session holdout exists. Dataset source is not committed. See `../../reports/source_provenance.json` and `../../reports/source_README.md`.

**Evidence baseline (2026-11-07):** `reports/dataset_audit.json`, `reports/source_provenance.json`, `reports/experiment_config.json`, `reports/trained_model_manifest.json`, `reports/train_results.csv`, and source implementation in `backend/app/` and `frontend/src/`. This material is a repository audit, not a new experiment.
