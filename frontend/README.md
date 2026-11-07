# FruitCount web dashboard / Dokumentasi Frontend

React 19, TypeScript ~5.7, Vite 6, Lucide icons. Implemented in `src/App.tsx`, `src/api.ts`, `src/styles.css`, `src/main.tsx`. No router package: `Detection Studio`, `Analysis`, and `Methodology` are in-page anchors. Dashboard mengakses FastAPI nyata dan tidak mengarang hasil deteksi.

## UI architecture / Arsitektur UI
- `App.tsx`: upload (picker/drag-drop), client-side type/12 MiB validation, preview URL with cleanup, confidence slider, analyze, abort previous request, loading/error, six-class chart, filter boxes, SVG overlay, export JSON.
- `api.ts`: `GET /health` for status, `POST /predict` with image multipart, `confidence` and fixed `iou=0.65`, explicit errors; frontend has no actual model weights.
- `styles.css`: responsive page, status/sidebar/cards and visual layout.

## Start / Menjalankan
```powershell
cd 'D:\porto\100 day\day 33\FruitCount\frontend'
npm ci
npm run build
npm run dev
```
Open `http://127.0.0.1:5173`; backend must run at `http://127.0.0.1:8000` or set `VITE_API_BASE_URL` in `frontend/.env` using `.env.example`. Variables use Vite build-time substitution, not runtime server discovery.

## User workflow / Alur pengguna
Open page → check server indicator → select JPEG/PNG/WebP (`≤12 MiB`) → adjust confidence as needed → Analyze image → review boxes and per-class counts → optionally filter/highlight class → download JSON. Perubahan threshold baru diterapkan setelah klik Analyze lagi. UI overlay memakai dimensi asli dari respons API.

## Honest UX and failure states / Batasan
`Model online` comes from `/health` and means file presence, **not** `/ready` or a passed inference; verify `/ready` separately. When backend unavailable/weight missing, show error rather than fake prediction. No persistence, history, accounts, online deployment proof or accessibility audit is tracked. Mobile responsiveness is coded but cross-browser/mobile QA remains unverified.

## Tests / Pengujian
Run `npm run build`, inspect browser console and Network tab, verify `/predict` actual response, compare overlay to source image including EXIF rotation, check drag/drop, re-analysis, errors, keyboard controls. `npm run build` here is a prescribed check, not a claimed passing CI result.

[English architecture](../docs/en/architecture.md) · [Arsitektur Indonesia](../docs/id/architecture.md) · [API types](src/api.ts)
