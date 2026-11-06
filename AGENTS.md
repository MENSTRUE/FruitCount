# AGENTS.md — FruitCount

## Project Context

Day 33 of the 100 Days of Projects portfolio.

Task:
Tomato detection, ripeness classification, and fruit counting.

Primary model:
YOLO11n.

Backend:
Python + FastAPI.

Frontend:
React + TypeScript + Vite.

## Repository Rules

1. Preserve the existing directory structure.
2. Do not rename or remove folders without approval.
3. Do not create a datasets/ directory.
4. Do not commit raw datasets.
5. Do not commit secrets or environment files.
6. Do not fabricate evaluation metrics.
7. Keep train, validation, and test splits separate.
8. Select models and thresholds using validation data.
9. Document all dataset sources, licenses, and versions.
10. Keep notebooks reproducible and well documented.
11. Add tests for inference and API functionality.
12. Avoid breaking existing APIs.
13. Do not modify the LICENSE automatically.
14. Treat downloaded weights and dataset licenses separately.
15. Record limitations and known failure cases.

## AI Experiment Standards

- Dataset audit
- Integrity verification
- Label distribution analysis
- Leakage checks
- Reproducible split handling
- Pretrained baseline
- Training and validation tracking
- Checkpoint selection
- Test evaluation
- Error analysis
- Artifact export

## Backend Standards

- Typed request and response schemas
- Input validation
- Structured error responses
- Health and readiness endpoints
- Model loaded once per process
- No unsafe arbitrary file execution
- Automated tests

## Frontend Standards

- Responsive design
- Accessible interactions
- Upload validation
- Loading and error states
- Prediction visualizations
- No fabricated live metrics

## Completion Criteria

A project is completed only when implementation,
evaluation, documentation, and reproducibility
have been verified.