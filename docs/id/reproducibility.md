# Panduan reproduksibilitas

## Versi dan bukti
V4: seed 42, input 960, batch 4, 60 epoch, patience 12, workers 0, pretrained YOLO11n, Ultralytics 8.4.203, PyTorch 2.11.0+cu130. Dataset Kaggle di notebook: `/kaggle/input/datasets/wafabila/fruitcount-dataset`. Split resmi 477/105/95. Jangan menyalin dataset mentah ke Git. Notebook dilacak di `../../notebooks/fruitcount.ipynb`.

## Pulihkan/periksa checkpoint
Ambil `models/best.pt` dari ekspor Kaggle yang sah, lalu hitung SHA256 dan cocokkan dengan `../../reports/trained_model_manifest.json` (`af3339...bccd0e8`). Model binary memang tidak ada di Git. Jangan gunakan `yolo11n.pt` bawaan yang hanya bobot inisialisasi.

## Jalankan lokal (Windows PowerShell)
```powershell
cd 'D:\porto\100 day\day 33\FruitCount'
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r backend/requirements.txt
Get-FileHash .\models\best.pt -Algorithm SHA256
$env:PYTHONPATH=(Resolve-Path .\backend).Path
python -m pytest backend/tests -q
python -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```
Terminal kedua: `cd frontend; npm ci; npm run build; npm run dev`. Verifikasi GET `/api/v1/ready` dan POST gambar nyata. Jangan mengklaim reproduksibilitas penuh sampai command lulus pada perangkatmu. SHA-256 seluruh dataset belum dijalankan dan audit near-duplicate diperlukan untuk klaim integritas lebih kuat.

## Jejak eksperimen
Bandingkan `../../reports/experiment_config.json`, `../../reports/train_args.yaml`, `../../reports/train_results.csv`, `../../reports/dataset_audit.json`, dan `../../reports/artifact_manifest.json`; catat OS/GPU/paket saat rerun. Simpan run baru terpisah, jangan timpa histori V4.

**Dasar bukti (07-11-2026):** `reports/dataset_audit.json`, `reports/source_provenance.json`, `reports/experiment_config.json`, `reports/trained_model_manifest.json`, `reports/train_results.csv`, serta implementasi `backend/app/` dan `frontend/src/`. Dokumen ini hasil audit repository, bukan eksperimen baru.
