# Deployment dan kesiapan operasional

## Masih prototipe lokal
Kode aplikasi tersedia tetapi belum ada bukti deployment publik atau uji beban produksi. Dari root repo jalankan backend dengan `PYTHONPATH=backend`, `python -m uvicorn app.main:app --host 127.0.0.1 --port 8000`; frontend melalui `npm ci; npm run build; npm run dev` dari `frontend/`.

## Konfigurasi
Root `.env.example` bersifat acuan; backend Python saat ini membaca **environment variable proses** (`MODEL_PATH`, `MODEL_DEVICE`, `CORS_ORIGINS`, `MAX_UPLOAD_BYTES`, `MAX_DETECTIONS`, dsb.) dan tidak otomatis memuat dotenv. Frontend membaca `VITE_API_BASE_URL` dari Vite saat build. Siapkan `models/best.pt` secara lokal. `MODEL_DEVICE=cpu` default menggunakan CPU.

## Checklist deployment (belum terpenuhi)
- Siapkan bobot dengan hak distribusi yang jelas; cocokkan SHA256, nama enam kelas, preprocessing 960 px, dan schema JSON.
- Pin dependency, jalankan tes Python, build TypeScript, prediksi gambar nyata, serta benchmark performa.
- Gunakan HTTPS, autentikasi, rate limit, batas request di reverse proxy, observability, CORS ketat, pengelolaan secrets dan kebijakan retensi gambar.
- Tentukan konten gambar yang diizinkan, sembunyikan data sensitif dalam log; gambar saat ini diproses in-memory.
- Pantau galat kelas langka/confidence rendah, sumber daya CPU/GPU, dan versi model.
- Periksa atribusi lisensi dataset CC BY 4.0 dan lisensi model/software Ultralytics secara terpisah.

**Belum production-ready** sampai seluruh verifikasi dilakukan.

**Dasar bukti (07-11-2026):** `reports/dataset_audit.json`, `reports/source_provenance.json`, `reports/experiment_config.json`, `reports/trained_model_manifest.json`, `reports/train_results.csv`, serta implementasi `backend/app/` dan `frontend/src/`. Dokumen ini hasil audit repository, bukan eksperimen baru.
