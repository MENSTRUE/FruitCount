# FruitCount — English documentation

This index links each audited technical chapter.

[Root README](../../README.md) · [Other language](../id/README.md)

## Chapters / Bab
- [Dataset & provenance](dataset_provenance.md)
- [Methodology](methodology.md)
- [Experiments](experiments.md)
- [Model card](model_card.md)
- [Evaluation](evaluation.md)
- [Architecture & API](architecture.md)
- [Reproducibility](reproducibility.md)
- [Deployment](deployment.md)
- [Limitations](limitations.md)
- [Troubleshooting](troubleshooting.md)

## Source of truth / Sumber bukti

- [`reports/train_results.csv`](../../reports/train_results.csv) — 60 epoch training history.
- [`reports/trained_model_manifest.json`](../../reports/trained_model_manifest.json) — V4 checkpoint identity.
- [`backend/app/services/detector.py`](../../backend/app/services/detector.py) — model inference implementation.
- [`frontend/src/App.tsx`](../../frontend/src/App.tsx) — web UI.

V4 counting metrics and independent blind test are not available.
