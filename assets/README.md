# Visual assets / Inventaris visual

All following file paths were verified in GitHub `main` on 2026-11-07 and are rendered in root `../README.md`. This directory does not contain final validation/test prediction examples, so do not label annotated ground truth as model outputs.

- `plots/dataset_distribution.png` — image/class distribution
- `plots/train_results.png` — training/validation history
- `plots/train_labels.jpg` — ground-truth label statistics
- `plots/train_BoxPR_curve.png` — precision–recall
- `plots/train_BoxF1_curve.png` — F1 against confidence
- `plots/train_BoxP_curve.png` — precision against confidence
- `plots/train_BoxR_curve.png` — recall against confidence
- `plots/train_confusion_matrix.png` — unnormalized confusion
- `plots/train_confusion_matrix_normalized.png` — normalized confusion
- `examples/train_ground_truth.jpg` — train annotated example
- `examples/val_ground_truth.jpg` — validation annotated example
- `screenshots/Screenshot 2026-11-07 201249.png` — local UI screenshot

**Rules / Aturan:** Keep original figures and filenames; source chart interpretation from training CSV. Use Markdown relative path image embeds (URL-encode spaces for screenshot). Jangan membuat gambar sintetis atau dekoratif sebagai bukti model. `diagrams/` currently contains only `.gitkeep`; real architecture is represented in the root README as Mermaid. Dataset license and app screenshot rights remain separate from code licensing.
