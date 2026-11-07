# Scripts and utilities / Skrip

At the audited GitHub commit, `scripts/` contains only this README (no committed CLI utilities). Do not invent `scripts/train.py`, export scripts, ETL commands or automation tasks. Training/export lives in `../notebooks/fruitcount.ipynb`; app commands live in `../backend/README.md` and `../frontend/README.md`.

Future scripts might implement: asset-link checks, metadata validation, counting-evaluation export, checkpoint hash verification and input QA. Each new script should document its inputs, environment, output paths, safety requirements, and a reproducible example; it must not create `datasets/` or commit raw images. Jika menambah skrip, perbarui dokumentasi EN/ID dan tests pada perubahan yang sama.
