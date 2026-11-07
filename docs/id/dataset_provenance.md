# Asal dan lisensi dataset

AerialYield-T2M merupakan dataset pelatihan V4 yang tercatat. Mirror tersedia di [Kaggle](https://www.kaggle.com/datasets/wafabila/fruitcount-dataset) dan README sumber mencantumkan [kode pembuatan dataset](https://github.com/afeefaaazam03/Tomato_dataset). Menurut README asli terdapat 535 foto close-range dan 142 foto drone (total 677 RGB JPEG). Arsip sumber juga memuat masks, deteksi COCO/YOLO, metadata, dan split resmi. **V4 melatih detektor, bukan model segmentasi.**

| Partisi | Gambar | Kotak COCO setelah filter geometri |
|---|---:|---:|
| Train | 477 | 10.050 |
| Validation | 105 | 1.938 |
| Test | 95 | 2.202 |

Total *raw visible-fruit* sebanyak 14.303, sedangkan anotasi deteksi setelah filter sebanyak 14.190 (selisih 113). Keduanya target berbeda: evaluasi counting mentah tidak boleh dianggap sama dengan jumlah kotak COCO. README sumber menerangkan filter geometri `<64 px²` pada koordinat dataset.

Enam kelas: Green (100% hijau), Breakers (<10% perubahan warna), Turning (10–40%), Pink (40–80%), Light Red (80–90% merah), Red (>90% merah). Indeks model 0–5 mengikuti urutan tersebut. Lisensi di paket sumber menyatakan CC BY 4.0; **atribusi penulis, sitasi manuskrip, dan izin penggunaan ulang tetap perlu diverifikasi**. Metadata mencatat akses 06-11-2026 14:19:06 UTC.

Audit V4 tidak mengaktifkan SHA-256 menyeluruh; tidak ditemukan decode/dimensi rusak atau blok nama file yang lintas split, tetapi tidak ada audit perceptual duplicate, identitas tanaman maupun holdout sesi akuisisi. Dataset mentah tidak di-commit. Lihat `../../reports/source_provenance.json` dan `../../reports/source_README.md`.

**Dasar bukti (07-11-2026):** `reports/dataset_audit.json`, `reports/source_provenance.json`, `reports/experiment_config.json`, `reports/trained_model_manifest.json`, `reports/train_results.csv`, serta implementasi `backend/app/` dan `frontend/src/`. Dokumen ini hasil audit repository, bukan eksperimen baru.
