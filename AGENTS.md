# FruitCount — Agent Operating Contract

## Scope and source priority
1. Running code (`backend/app`, `frontend/src`) and tests. 2. V4 experiment files (`reports/*.json`, `train_args.yaml`, `train_results.csv`, checkpoint manifest). 3. Original dataset/source README and licenses. 4. Documentation. When sources disagree, disclose the contradiction rather than guessing.

## Repository invariants
- Preserve root structure `README.md`, `AGENTS.md`, `LICENSE`, `.gitignore`, `.env.example`, `notebooks/`, `models/`, `reports/`, `assets/`, `backend/`, `frontend/`, `docs/`, `scripts/`. Do not rename/move existing artifacts.
- Never create or commit `datasets/`, raw image collections, `.env`, credentials or model binaries; `models/best.pt` is ignored. Never edit `LICENSE` without explicit authorization.
- Update only documentation unless implementation changes are explicitly requested. Keep prior source/provenance JSON, CSV, YAML and plots unchanged.

## Scientific/ML integrity
- V4 YOLO11n pretrained; six classes in frozen order: Green, Breakers, Turning, Pink, Light Red, Red.
- Select checkpoint and tune thresholds on validation only; test partition previously seen during V2/V3 and **not blind**.
- Distinguish raw manually counted fruits (14,303) from filtered COCO boxes (14,190). Never conflate detection mAP with count accuracy.
- Never invent per-class AP, MAE, GPU benchmarks, published deployment or independent tests.
- Source data access/attribution/license and checkpoint provenance must be maintained; validate SHA-256 before making model claims.
- Track train/val/test split fidelity and identify session/block/perceptual leakage risks; do not declare zero leakage after a disabled hash audit.

## Implementation contracts
- FastAPI routes: GET `/api/v1/health`, GET `/api/v1/ready`, POST `/api/v1/predict`. Keep upload validation and typed Pydantic response unchanged without client coordination.
- Frontend: React + TypeScript + Vite; API contract lives in `frontend/src/api.ts`; maintain real network requests, responsive states, class overlays, JSON export. No mocked numbers presented as evidence.
- Test before reporting: `python -m pytest backend/tests -q`, `npm run build` inside `frontend`, `/ready`, and one real image. Unit tests override the model dependency and alone cannot certify real inference.
- Uploaded images may be sensitive; no broad permissive CORS, arbitrary file writes, public API exposure or undocumented persistence.

## Documentation rules
- English `docs/en/` and Indonesian `docs/id/` have equivalent depth, scope, and factual tables; update both when project facts change.
- Main README is the entry point; use existing relative image paths and real figures. Do not invent missing screenshots or missing benchmark tables.
- Existing `docs/architecture.md`, `docs/integration.md`, `docs/deployment.md`, `docs/roadmap.md` remain until explicit migration.

## Before / Now / Next
- Before: V2 weak baseline, V3 Save Version stalled late.
- Now: V4 checkpoint exported, API/UI code present, validation history tracked, assets pushed; local end-to-end metrics require verification.
- Next: real-inference smoke test, counting evaluation, error analysis, outside-domain testing, security and reproducible deployment.

## Definition of done / change checklist
Inspect repo tree and source first; implement minimal changes; run relevant tests; confirm relative paths and image embeds; compare all numeric claims with source files; disclose unknowns; show `git diff --stat`; never claim production readiness without independent evidence. Suggested commit: `docs: document FruitCount V4 with bilingual evidence and asset gallery`.
