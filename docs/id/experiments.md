# Riwayat eksperimen

## Eksperimen terdahulu
Detektor scratch V2 memiliki hasil deteksi/counting lemah dalam eksperimen eksploratif; V3 pretrained YOLO11n mengalami evaluasi setelah training yang terlalu panjang saat Kaggle Save Version. Itu adalah **pengamatan pengembangan**, bukan komparasi arsitektur terkontrol. V4 sengaja mengekspor arsip recovery/training lebih awal.

## Protokol training V4
`../../reports/experiment_config.json` dan `../../reports/train_args.yaml` menjadi sumber konfigurasi. Maksimal 60 epoch, patience 12, input 960, batch 4, seed 42. CSV mencatat 60 epoch. Epoch terpilih 48 memiliki validation-history mAP50=0,47902 dan mAP50:95=0,37599; manifest mencatat durasi bagian training 8835,91 detik. Ini catatan durasi training, **bukan** benchmark latency inference.

## Seleksi dan perbandingan
`best.pt` dipilih dari validation fitness Ultralytics. Baris histori epoch 48 tidak otomatis sama dengan revalidasi checkpoint terpisah. V4 tidak menjalankan counting maupun test setelah training. Karena partisi test sudah dilihat saat V2/V3, laporan test berikutnya bersifat development-aware, bukan blind test murni.

## Artefak
`../../reports/train_results.csv` adalah sumber kurva, `../../assets/plots/train_results.png` visualisasinya. `../../reports/trained_model_manifest.json` mencatat checksum model, dan `../../reports/artifact_manifest.json` inventaris hasil ekspor. Keberadaan manifest tidak membuktikan model binary ada di clone GitHub karena `.pt` di-ignore.

## Eksperimen berikutnya
Hitung MAE/RMSE terhadap target Total mentah dan jumlah kotak COCO secara terpisah; analisis kesalahan per kelas/modality, ukur latency CPU/GPU dengan spesifikasi perangkat, serta uji generalisasi lintas sesi/kamera bila data memadai.

**Dasar bukti (07-11-2026):** `reports/dataset_audit.json`, `reports/source_provenance.json`, `reports/experiment_config.json`, `reports/trained_model_manifest.json`, `reports/train_results.csv`, serta implementasi `backend/app/` dan `frontend/src/`. Dokumen ini hasil audit repository, bukan eksperimen baru.
