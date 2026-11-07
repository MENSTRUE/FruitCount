# FruitCount Frontend

Interactive React + TypeScript + Vite dashboard: image upload, backend status, real model prediction, bounding box overlays, ripeness distribution, confidence adjustment, export JSON, responsive UI.

From `frontend/` run:

```powershell
npm install
npm run dev
npm run build
```

Open http://127.0.0.1:5173. For alternative backend set `VITE_API_BASE_URL` in `frontend/.env` (use `.env.example` as template).

The dashboard does not create mock predictions. It requires the real FastAPI service and `models/best.pt`. The inference count is the number of visible detected fruits, not all fruits on a tree or greenhouse yield.
