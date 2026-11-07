# Keterbatasan dan batas klaim

**Deteksi bukan estimasi hasil panen.** `total_count` merupakan jumlah kotak hasil deteksi setelah filter confidence/IoU, bisa lebih rendah/tinggi daripada kenyataan. Kelas langka, buah kecil dan tertutup menimbulkan kesalahan. `max_det=500` bisa memotong jumlah pada foto rapat; API memberi warning bila batas tercapai.

**Validasi bukan test independen.** Skor epoch 48 berasal dari validasi selama training. V4 belum menghitung MAE/RMSE counting ataupun blind test; 95 gambar test pernah dilihat dalam pengembangan V2/V3. Jangan memindahkan metrik tersebut sebagai hasil test V4.

**Independensi data baru diperiksa sebagian.** Audit SHA-256 penuh, perceptual near-duplicate, dan identitas tanaman tidak dilakukan dalam V4. Grup dari nama file bukan bukti independensi; sesi akuisisi tidak di-holdout. Foto aerial dan close-range berisiko domain shift.

**Operasional/keamanan.** UI dapat menampilkan online saat file checkpoint ada, tetapi load model harus dicek via `/ready` dan inferensi nyata. API belum punya autentikasi/rate limit. Backend tidak sengaja menyimpan unggahan, tetapi privasi harus ditinjau sampai level proxy/log. Belum ada SLA deployment atau uji lapangan sistematis.

**Lisensi.** Atribusi dataset CC BY 4.0 terpisah dari lisensi software repo dan ketentuan Ultralytics/weights. Jangan mengiklankan kesiapan komersial tanpa peninjauan.

**Prioritas:** smoke test checkpoint → metrik count untuk kedua target → analisis kelas langka → domain split → deployment aman.

**Dasar bukti (07-11-2026):** `reports/dataset_audit.json`, `reports/source_provenance.json`, `reports/experiment_config.json`, `reports/trained_model_manifest.json`, `reports/train_results.csv`, serta implementasi `backend/app/` dan `frontend/src/`. Dokumen ini hasil audit repository, bukan eksperimen baru.
