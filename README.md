# FruitCount

**Day 33/100 — 100 Days of Projects**

AI-powered tomato detection, ripeness classification,
and fruit counting for precision agriculture.

## Problem

Manual fruit counting in agricultural environments is
time-consuming and subject to observation errors.

## Solution

FruitCount explores computer vision for detecting tomatoes,
classifying ripeness stages, and estimating visible fruit counts
from agricultural imagery.

## Core Capabilities

- Tomato object detection
- Six-stage ripeness classification
- Visible fruit counting
- Prediction visualization
- Confidence-aware inference
- Model evaluation and error analysis
- REST API integration (planned)
- Interactive web demonstration (planned)

## Machine Learning

Architecture: Pretrained YOLO11n

Dataset: AerialYield-T2M

Classes:
1. Green
2. Breakers
3. Turning
4. Pink
5. Light Red
6. Red

Evaluation:
- Precision and recall
- mAP@50
- mAP@50:95
- Counting MAE and RMSE
- Per-class performance
- Failure-case analysis

## Project Structure

- notebooks/ — Experiments and Kaggle notebooks
- models/ — Model documentation and selected artifacts
- reports/ — Data provenance and evaluation results
- assets/ — Visualizations and screenshots
- backend/ — FastAPI inference service
- frontend/ — React-based application
- docs/ — Architecture and deployment documentation
- scripts/ — Reproducibility and utility scripts

## Dataset

AerialYield-T2M.

The source dataset is not redistributed in this repository.

See reports/dataset_provenance.md.

## Status

Experimental pipeline developed.

Final training artifacts, verified metrics, and deployment
status will be documented after Kaggle output verification.

## Limitations

The model estimates visible fruits, not total field yield.

Performance depends on image quality, occlusion,
acquisition conditions, and class distribution.

## License

See LICENSE for the repository's software license.

Dataset, pretrained weights, and third-party dependencies
may have separate license requirements.