# Limitations and claim boundaries

**Detection is not yield estimation.** Returned `total_count` equals the number of detected boxes after confidence/IoU filtering; this may be lower/higher than visible reality. Rare classes and occluded or tiny fruit create errors. `max_det=500` may truncate dense images; API warns when reached.

**Validation is not independent test.** The epoch-48 scores refer to training-time validation. V4 did not calculate count MAE/RMSE or independent held-out test; 95-image official test split had been viewed in prior V2/V3 development. Do not silently promote those results to V4 test performance.

**Data independence is only partially checked.** No exhaustive SHA-256, perceptual near-duplicate or plant-identification check was performed in V4. Filename-derived groups do not prove independence; acquisition sessions are not held out. Mixed aerial and close-range images introduce domain shift.

**Operations/security.** Local UI can say model online if checkpoint file exists, but actual loading must be checked via `/ready` and real inference. API is not authenticated or rate-limited. Backend avoids intentional upload persistence but cannot guarantee privacy across logging/proxies. No deployment SLA or systematic field study.

**Licenses.** CC BY 4.0 dataset attribution is different from the repository software license and Ultralytics/weight terms. Do not advertise commercial readiness without review.

**Priorities:** checkpoint smoke test → count errors with both distinct targets → rare-class/error analysis → domain split → secure deployment.

**Evidence baseline (2026-11-07):** `reports/dataset_audit.json`, `reports/source_provenance.json`, `reports/experiment_config.json`, `reports/trained_model_manifest.json`, `reports/train_results.csv`, and source implementation in `backend/app/` and `frontend/src/`. This material is a repository audit, not a new experiment.
