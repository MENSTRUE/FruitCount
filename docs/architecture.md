# Architecture

## Planned Inference Flow

Image Upload
    |
    v
FastAPI Input Validation
    |
    v
Image Preprocessing
    |
    v
YOLO11n Detection
    |
    v
Ripeness Aggregation
    |
    v
Counting Result
    |
    v
Frontend Visualization

## Components

- React frontend
- FastAPI backend
- YOLO11n inference
- Model artifact registry
- Experiment reports