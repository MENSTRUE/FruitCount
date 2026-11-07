export const BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000').replace(/\/$/, '');

export type Detection = { class_id: number; class_name: string; confidence: number; box: [number, number, number, number] };
export type Prediction = {
  model_name: string; image_width: number; image_height: number; total_count: number;
  counts: Record<string, number>; detections: Detection[]; inference_ms: number; warnings: string[];
};

export async function getHealth(): Promise<{ status: string; model_ready: boolean }> {
  const res = await fetch(`${BASE_URL}/api/v1/health`, { signal: AbortSignal.timeout(7000) });
  if (!res.ok) throw new Error('Backend tidak tersedia');
  return res.json();
}

export async function predictImage(file: File, confidence: number, signal?: AbortSignal): Promise<Prediction> {
  const payload = new FormData();
  payload.append('image', file);
  const url = `${BASE_URL}/api/v1/predict?confidence=${confidence.toFixed(2)}&iou=0.65`;
  const res = await fetch(url, { method: 'POST', body: payload, signal });
  let data: unknown;
  try { data = await res.json(); } catch { throw new Error(`Server mengembalikan HTTP ${res.status}`); }
  if (!res.ok) {
    const detail = (data as { detail?: unknown })?.detail;
    throw new Error(typeof detail === 'string' ? detail : `Request gagal (HTTP ${res.status})`);
  }
  return data as Prediction;
}
