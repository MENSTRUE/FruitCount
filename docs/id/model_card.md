# Kartu model — FruitCount V4 YOLO11n

| Properti | Bukti |
|---|---|
| Tugas | Deteksi tomat 6 tahap dan hitung objek yang terlihat |
| Arsitektur | Ultralytics YOLO11n pretrained |
| Input | RGB; ukuran inferensi model 960 px |
| Output | Kotak `xyxy` koordinat piksel asli, ID/nama kelas, confidence; jumlah total dan per kelas |
| Kelas | Green; Breakers; Turning; Pink; Light Red; Red |
| Data training | AerialYield-T2M, 477 train/105 validasi; 95 test pernah terekspos |
| Champion | best.pt dipilih melalui validation fitness Ultralytics |
| SHA256 checkpoint | `af3339a3593d6b273fd4be0c6e479ed4f83d701c27426de9605e3438ebccd0e8` |
| Ukuran | 5.524.122 byte (manifest ekspor) |
| Metrik | History validasi epoch 48: P 0,49079; R 0,54330; mAP50 0,47902; mAP50:95 0,37599 |
| MAE counting / test | **Belum dievaluasi pada V4** |
| Ketersediaan lokal | Git mengabaikan `models/best.pt`, pasang secara eksplisit |

## Penggunaan yang dituju
Dukungan riset/demo untuk meninjau tomat yang *terlihat* pada gambar; bukan pemetikan otomatis, sertifikasi grading, perkiraan panen seluruh lahan, atau jaminan keamanan pangan. Confidence bukan nilai risiko terkalibrasi. Pengguna harus menguji false positive, objek kecil/tertutup, dan perbedaan label.

## Bias, keselamatan, batasan
Dataset memadukan dua sudut pandang foto greenhouse; kondisi kebun, kultivar dan kamera lain mungkin berbeda. Kelas ripeness langka bisa kurang terwakili. Unggahan mengikuti aturan privasi/persetujuan. Distribusi pretrained/fine-tuned weights bisa memerlukan peninjauan lisensi Ultralytics. Tidak dapat diklaim sebagai produk tersertifikasi.

**Dasar bukti (07-11-2026):** `reports/dataset_audit.json`, `reports/source_provenance.json`, `reports/experiment_config.json`, `reports/trained_model_manifest.json`, `reports/train_results.csv`, serta implementasi `backend/app/` dan `frontend/src/`. Dokumen ini hasil audit repository, bukan eksperimen baru.
