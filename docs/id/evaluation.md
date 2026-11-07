# Evaluasi dan interpretasi

## Hasil yang terverifikasi dari histori validasi V4
Dari `../../reports/train_results.csv`, baris **epoch terbaik 48**: P=0,49079, R=0,54330, mAP@50=0,47902, mAP@50:95=0,37599. Metrik deteksi ini berasal dari validasi saat training. Lihat `../../assets/plots/train_results.png` dan `../../assets/plots/train_confusion_matrix_normalized.png`.

## Yang belum terbukti
- Belum ada laporan revalidasi V4 terpisah terhadap checkpoint `best.pt` pada tahap dokumentasi ini.
- Belum ada MAE/RMSE counting V4 terhadap **raw manifest Total** maupun **jumlah kotak geometri**.
- Tidak ada **blind test independen** karena partisi test 95 gambar sudah dilihat pada eksperimen sebelumnya.
- Tidak ada tabel AP per kelas terverifikasi di JSON/CSV yang diaudit; kurva PR tersedia, tetapi nilainya tidak boleh dikarang.
- Belum ada benchmark domain baru, SLA latency, atau kalibrasi confidence.

## Cara evaluasi berikutnya
Tetapkan checkpoint, kelas, confidence/IoU hanya berdasarkan validasi. Prediksi setiap gambar validation sekali, hitung MAE/RMSE dan metrik per-modality secara terpisah terhadap hitungan COCO dan Total mentah. Catat identitas gambar, target, prediksi, galat, sumber/modality. Jika nanti melaporkan test, nyatakan eksposur sebelumnya dan jangan menyetel parameter menggunakan test. Untuk deteksi gunakan AP berbasis IoU (Ultralytics val) dan hasil per kelas. False positive, missed object, dan kelas langka perlu pemeriksaan manual.

## Failure case
Tomat kecil/tertutup, cahaya berbeda, kelompok buah rapat, transisi kematangan, serta domain foto drone yang berbeda. Confusion matrix menggambarkan validasi training, bukan jaminan untuk gambar baru.

**Dasar bukti (07-11-2026):** `reports/dataset_audit.json`, `reports/source_provenance.json`, `reports/experiment_config.json`, `reports/trained_model_manifest.json`, `reports/train_results.csv`, serta implementasi `backend/app/` dan `frontend/src/`. Dokumen ini hasil audit repository, bukan eksperimen baru.
