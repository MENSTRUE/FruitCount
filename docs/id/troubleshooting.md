# Pemecahan masalah

| Gejala | Kemungkinan | Pemeriksaan/solusi |
|---|---|---|
| UI menulis Backend offline | FastAPI mati atau origin salah | Cek `http://127.0.0.1:8000/api/v1/health`, `VITE_API_BASE_URL`, jalankan uvicorn |
| `health` OK tetapi `/ready` 503 | Model/dependency salah atau tidak ada | Periksa `models/best.pt`, SHA256, enam kelas persis, `MODEL_DEVICE`, instalasi Ultralytics |
| Browser CORS error | Origin tidak diizinkan | Set `CORS_ORIGINS=http://127.0.0.1:5173,http://localhost:5173` sebelum start |
| HTTP 415 | MIME tidak didukung | JPEG, PNG, WebP dengan form field `image` |
| HTTP 413 | File >12 MiB atau >35 juta piksel | Kecilkan resolusi sebelum upload |
| HTTP 400 | Gambar kosong/rusak/berbahaya | Pastikan dapat didecode, ekspor sebagai RGB |
| Bounding box bergeser | Skala gambar/EXIF UI | Periksa koordinat piksel asli, EXIF transpose, SVG viewBox |
| `npm run build` gagal | Versi Node/TypeScript | Jalankan `npm ci` dan baca error aktual; jangan klaim lulus sebelum diuji |
| Git tidak menemukan `best.pt` | `.gitignore` mengabaikan `.pt` | Siapkan file secara terpisah; jangan force-add otomatis |
| Save Version terlalu lama | Resource/evaluasi sesudah training | V4 memisahkan ekspor training; jangan ulang V3 sembarangan |

## Urutan diagnosis
Mulai `/health` (server), lanjut `/ready` (model dimuat), kemudian `/predict` dengan gambar nyata, tinjau bounding box, dan jalankan tes. Indikator hijau saja tidak membuktikan hasil benar.

**Dasar bukti (07-11-2026):** `reports/dataset_audit.json`, `reports/source_provenance.json`, `reports/experiment_config.json`, `reports/trained_model_manifest.json`, `reports/train_results.csv`, serta implementasi `backend/app/` dan `frontend/src/`. Dokumen ini hasil audit repository, bukan eksperimen baru.
