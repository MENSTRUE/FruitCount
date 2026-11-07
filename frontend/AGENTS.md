# Frontend-specific agent rules

Keep `src/api.ts` aligned with Pydantic `PredictionResponse`; do not hardcode detection results. Preserve upload limits (12 MiB), error/loading states, abort handling and revocation of object URLs. Preserve responsive styles and non-inert controls. Do not introduce new routes or dependencies without purpose. Run `npm ci` and `npm run build` before claiming compile success; test against actual FastAPI with a real checkpoint. Update English and Indonesian architecture/usage docs together. Follow root `../AGENTS.md`.
