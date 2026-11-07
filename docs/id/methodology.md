# Metodologi penelitian

## Tujuan dan rancangan
Melatih **deteksi objek** tomat untuk enam kelas visual, kemudian mengestimasi jumlah tomat yang terlihat dari jumlah bounding box prediksi. Ini bukan segmentasi, kalibrasi kematangan, atau prediksi total hasil panen.

## Alur data
Baca anotasi COCO dan split resmi 477/105/95 gambar; petakan kategori COCO 1–6 ke kelas YOLO 0–5, normalisasi dan clipping kotak, validasi gambar, ubah ke format YOLO. Arsip dataset mentah tidak disimpan di Git. Validasi dipakai memilih checkpoint, bukan test.

## Model dan optimisasi
Pretrained Ultralytics YOLO11n (`yolo11n.pt` awal); imgsz=960, batch=4, maksimal 60 epoch, patience=12, seed 42, deterministic mode, workers=0, AMP aktif. Optimizer `auto`, `close_mosaic=10`, mosaic, augmentasi warna/geometri sesuai `../../reports/train_args.yaml`. Lingkungan tercatat Ultralytics 8.4.203 dan torch 2.11.0+cu130.

## Seleksi dan keluaran
Ultralytics memilih `best.pt` berdasarkan **validation fitness**. Manifest ekspor menyimpan SHA-256 dan ukuran checkpoint. Backend memprediksi pada `imgsz=960`, `conf` default 0.25, `iou` default 0.65, `max_det=500`; jumlah dihitung dari bounding box per kelas. Skor confidence bukan probabilitas terkalibrasi. Save Version V4 tidak memasukkan evaluasi counting/test lanjutan. Penyetelan berikutnya hanya boleh menggunakan validasi; status test yang pernah terlihat wajib diungkap.

## Ancaman validitas
Kelas tidak seimbang, korelasi dalam sesi, potensi gambar mirip, perbedaan kamera/drone, serta confidence belum terkalibrasi. Periksa `../../reports/dataset_audit.json` sebelum menyatakan bebas kebocoran.

**Dasar bukti (07-11-2026):** `reports/dataset_audit.json`, `reports/source_provenance.json`, `reports/experiment_config.json`, `reports/trained_model_manifest.json`, `reports/train_results.csv`, serta implementasi `backend/app/` dan `frontend/src/`. Dokumen ini hasil audit repository, bukan eksperimen baru.
