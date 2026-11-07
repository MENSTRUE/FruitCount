# AerialYield-T2M

A dual-modality greenhouse tomato dataset with six-stage ripeness masks, instance annotations
and fruit counts. Full methodology, technical validation, and reference baselines are described
in the accompanying Data Descriptor manuscript.

## Contents

| Folder / file | Contents | Notes |
|---|---|---|
| `dataset_images.zip` | 677 RGB JPEG images from both acquisition sources (535 close-range, 142 drone). | |
| `dataset_masks_binary.zip` | Lossless binary PNG masks, one subfolder per ripeness class: `Green/`, `Breakers/`, `Turning/`, `Pink/`, `Light Red/`, `Red/`. | 4,739 mask files. |
| `dataset_masks_semantic.zip` | Single-channel semantic maps, values 0 (background) to 6 (ripeness classes 1-6 in Table order). No 255 ignore value is used. | 677 files. |
| `dataset_masks_overall.zip` | Overall-fruit masks, independent of ripeness class. | |
| `metadata.zip` | `image_manifest.csv` (image identifier, source, modality, split, geometry, raw per-class counts, the visible-fruit `Total` count, checksums, audit fields), `instances.csv` (one row per geometry-filtered instance), `classification_crops.csv` (filtered instance-crop manifest). | |
| `splits.zip` | Recommended train/validation/test membership files (image-level and instance-level). | 477/105/95 images. |
| `dataset_detection_coco.zip` | COCO-format detection annotations. | |
| `dataset_detection_yolo.zip` | YOLO-format detection annotations. | |
| `reports.zip` | Integrity, duplicate, mask-consistency, and annotation-audit reports generated during technical validation. | |
| `figures.zip` | Dataset and benchmark inspection figures. | |
| `checksums.sha256` | SHA-256 checksum for every file under `dataset/` in the unzipped layout, one line per file, format `<hash>  <relative_path>`. | 8,075 entries. |

## Ripeness taxonomy

Six visual stages, following the Silal Quality Standard Guide for Tomato: Green (100% green),
Breakers (<10% colour development), Turning (10-40%), Pink (40-80%), Light Red (80-90% red),
Red (>90% red). Semantic/detection identifiers are 1-6 in this order; classification indices
are 0-5.

## Image-level counting target

Image-level counting uses the raw visible-fruit `Total` field in `image_manifest.csv`, which
includes every manually annotated visible tomato (14,303 across the release; 2,221 on the
95-image test split). A separate `<64 px^2` stored-area filter is applied only to
geometry-dependent products (masks, polygons, boxes, classification crops), yielding 14,190
filtered instances (2,202 on test) used by classification and detection -- this filtered count
is not a second counting ground truth.

## Recommended split

A deterministic, block-grouped 477 (train) / 105 (validation) / 95 (test) image split (seed 42,
300-frame-number blocks within each acquisition session). No block is shared across partitions;
acquisition sessions themselves are not held out (block-grouped within sessions, not
session-held-out). See the manuscript's Technical Validation section for split-integrity and
domain-shift sensitivity analysis.

## License

Released under CC-BY 4.0 (see `LICENSE`).

## Citation

Please cite the accompanying Data Descriptor manuscript when using this dataset.

## Code

Preprocessing, release-generation and technical-validation code:
https://github.com/afeefaaazam03/Tomato_dataset
