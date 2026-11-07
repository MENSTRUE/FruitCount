import { useEffect, useRef, useState } from 'react';
import { Activity, AlertCircle, ArrowDownToLine, ArrowRight, Camera, Check, ChevronDown, Clock3, CloudUpload, Github, Layers3, Leaf, LoaderCircle, RefreshCcw, ScanLine, Settings2, ShieldCheck, Sparkles, X } from 'lucide-react';
import { BASE_URL, getHealth, predictImage, type Prediction } from './api';

const CLASSES = ['Green', 'Breakers', 'Turning', 'Pink', 'Light Red', 'Red'] as const;
const COLORS: Record<string, string> = { Green: '#86D8AB', Breakers: '#D8D17A', Turning: '#E8B66D', Pink: '#E992B8', 'Light Red': '#EA836F', Red: '#E46C76' };
const MAX_BYTES = 12 * 1024 * 1024;
type Status = 'checking' | 'ready' | 'missing' | 'offline';

function downloadJSON(name: string, data: unknown) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href = url; a.download = name; a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export default function App() {
  const [status, setStatus] = useState<Status>('checking');
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState('');
  const [result, setResult] = useState<Prediction | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [confidence, setConfidence] = useState(0.25);
  const [showBoxes, setShowBoxes] = useState(true);
  const [drag, setDrag] = useState(false);
  const [filter, setFilter] = useState('All');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const request = useRef<AbortController | null>(null);

  async function checkConnection() {
    setStatus('checking');
    try { const h = await getHealth(); setStatus(h.model_ready ? 'ready' : 'missing'); }
    catch { setStatus('offline'); }
  }
  useEffect(() => { void checkConnection(); return () => { request.current?.abort(); }; }, []);
  useEffect(() => {
    if (!file) { setPreview(''); return; }
    const url = URL.createObjectURL(file); setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  function pick(f?: File) {
    if (!f) return;
    setError('');
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(f.type)) { setError('Gunakan JPG, PNG, atau WebP.'); return; }
    if (f.size > MAX_BYTES) { setError('Ukuran maksimum gambar 12 MB.'); return; }
    request.current?.abort(); setFile(f); setResult(null); setFilter('All');
  }
  async function analyze() {
    if (!file) return;
    setBusy(true); setError(''); setResult(null);
    request.current?.abort();
    const controller = new AbortController(); request.current = controller;
    try { setResult(await predictImage(file, confidence, controller.signal)); setStatus('ready'); }
    catch (err) { if ((err as Error).name !== 'AbortError') setError((err as Error).message || 'Prediction failed'); }
    finally { setBusy(false); }
  }
  function reset() { request.current?.abort(); setBusy(false); setFile(null); setResult(null); setError(''); if (inputRef.current) inputRef.current.value = ''; }
  const boxes = result?.detections.filter(d => filter === 'All' || d.class_name === filter) || [];
  const maxCount = Math.max(1, ...Object.values(result?.counts || {}));
  const statusLabel = status === 'ready' ? 'Model online' : status === 'missing' ? 'Checkpoint missing' : status === 'checking' ? 'Connecting' : 'Backend offline';

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand"><span className="brand-icon"><Leaf size={21} strokeWidth={2.1}/></span><span><b>Fruit<span className="brand-accent">Count</span></b><small>VISION INTELLIGENCE</small></span></div>
        <div className="side-label">WORKSPACE</div>
        <nav><a className="nav-active" href="#workspace"><ScanLine size={18}/> Detection Studio <span className="nav-dot"/></a><a href="#analysis"><Activity size={18}/> Analysis</a><a href="#methodology"><Layers3 size={18}/> Methodology</a></nav>
        <div className="sidebar-bottom"><div className="side-model"><span className="model-glyph"><Sparkles size={17}/></span><div><strong>YOLO11n · V4</strong><small>6 ripeness classes</small></div><Check size={15} color="#91ceb2"/></div><div className="sidebar-foot">DAY 33 <span>/</span> 100 PROJECTS <span className="muted-right">v1.0</span></div></div>
      </aside>
      <main className="main">
        <header className="topbar"><div className="breadcrumb">Projects <span>/</span> <strong>FruitCount</strong> <span>/</span> Detection Studio</div><div className="top-right"><span className={`status-pill ${status}`}><i/>{statusLabel}</span><button className="icon-button" title="Check connection" onClick={() => void checkConnection()}><RefreshCcw size={17}/></button><a className="github-link" href="https://github.com/MENSTRUE/FruitCount" target="_blank" rel="noreferrer"><Github size={18}/><span>GitHub</span></a></div></header>
        <div className="content">
          <div className="hero"><div className="eyebrow"><span className="mini-sun">✳</span> AGRICULTURAL COMPUTER VISION <span className="eyebrow-line"/></div><h1>See every fruit.<br/><em>Understand every stage.</em></h1><p>AI-powered tomato detection, ripeness classification, and visible fruit counting. Turn a single photograph into actionable visual insights.</p><div className="hero-meta"><span><ShieldCheck size={15}/> Research-backed model</span><span><Clock3 size={15}/> On-demand inference</span></div></div>
          <section className="workspace" id="workspace"><div className="section-heading"><div><span className="section-kicker">01 / WORKSPACE</span><h2>Detection studio</h2><p>Upload an image to analyze individual tomatoes and their ripeness.</p></div><button className="settings-btn" onClick={() => setSettingsOpen(v => !v)}><Settings2 size={17}/> Parameters <ChevronDown size={15}/></button></div>
          {settingsOpen && <div className="settings-panel"><label htmlFor="threshold">Confidence threshold <b>{Math.round(confidence * 100)}%</b></label><input id="threshold" type="range" min="0.05" max="0.95" step="0.05" value={confidence} onChange={e => setConfidence(Number(e.target.value))}/><span>Applied on the next analysis. Changing this setting requires re-running inference.</span></div>}
          <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp" hidden onChange={e => pick(e.target.files?.[0])}/>
          {!file ? <div className={`dropzone ${drag ? 'dragging' : ''}`} onDragOver={e => {e.preventDefault();setDrag(true);}} onDragLeave={e => {e.preventDefault();setDrag(false);}} onDrop={e => {e.preventDefault();setDrag(false);pick(e.dataTransfer.files[0]);}}><div className="upload-icon"><CloudUpload size={31}/></div><h3>Drop your tomato image here</h3><p>Drag and drop a photo, or browse your files to get started.</p><button className="primary-btn" onClick={() => inputRef.current?.click()}><Camera size={17}/> Browse image <ArrowRight size={16}/></button><span className="file-notice">JPG, PNG, WebP <span>·</span> Maximum 12 MB</span></div> : <div className="preview-panel"><div className="image-stage"><div className="image-content"><img src={preview} alt="Selected tomato crop"/>{result && showBoxes && <svg className="overlay" viewBox={`0 0 ${result.image_width} ${result.image_height}`} preserveAspectRatio="xMidYMid meet">{boxes.map((d,i) => <g key={i}><rect x={d.box[0]} y={d.box[1]} width={Math.max(0,d.box[2]-d.box[0])} height={Math.max(0,d.box[3]-d.box[1])} fill="none" stroke={COLORS[d.class_name]||'#fff'} strokeWidth={Math.max(2, result.image_width/500)}/><rect x={d.box[0]} y={Math.max(0,d.box[1]-Math.max(17,result.image_width/65))} width={Math.max(48,result.image_width/9)} height={Math.max(17,result.image_width/65)} rx="2" fill={COLORS[d.class_name]||'#fff'}/><text x={d.box[0]+4} y={Math.max(12,d.box[1]-4)} fill="#09111b" fontWeight="700" fontSize={Math.max(12,result.image_width/87)}>{d.class_name} {Math.round(d.confidence*100)}%</text></g>)}</svg>}</div></div><div className="preview-actions"><div className="file-info"><div className="file-icon"><Camera size={18}/></div><div><strong>{file.name}</strong><small>{(file.size/1024/1024).toFixed(2)} MB · Image ready</small></div></div><div className="preview-buttons"><button className="secondary-btn" onClick={() => inputRef.current?.click()}>Change image</button><button className="secondary-btn square" title="Remove" onClick={reset}><X size={17}/></button><button className="primary-btn" disabled={busy} onClick={() => void analyze()}>{busy ? <><LoaderCircle className="spin" size={17}/> Analyzing...</> : <><ScanLine size={17}/>{result ? 'Analyze again' : 'Analyze image'}<ArrowRight size={16}/></>}</button></div></div></div>}
          {error && <div className="error-box"><AlertCircle size={18}/>{error}</div>}
          {(status === 'missing' || status === 'offline') && <div className="notice-box"><AlertCircle size={17}/>{status === 'missing' ? 'Backend online, tetapi models/best.pt tidak ditemukan. Tambahkan checkpoint V4 dan periksa /api/v1/ready.' : `Backend belum terhubung di ${BASE_URL}. Jalankan FastAPI dahulu.`}</div>}
          </section>
          <section className="analysis" id="analysis"><div className="section-heading"><div><span className="section-kicker">02 / RESULTS</span><h2>Intelligence overview</h2><p>{result ? 'Detection results for your latest image.' : 'Your results will appear here after analysis.'}</p></div>{result && <button className="export-btn" onClick={() => downloadJSON('fruitcount-result.json',result)}><ArrowDownToLine size={17}/> Export JSON</button>}</div>
          <div className="metrics"><article className="metric"><div className="metric-label">VISIBLE FRUIT COUNT <ScanLine size={17}/></div><div className="metric-value">{result?.total_count ?? '—'}</div><span className="metric-caption">Detected tomato instances</span></article><article className="metric"><div className="metric-label">RIPENESS STAGES <Layers3 size={17}/></div><div className="metric-value">{result ? Object.values(result.counts).filter(x=>x>0).length : '—'}<small>{result ? ' / 6' : ''}</small></div><span className="metric-caption">Stages identified in image</span></article><article className="metric"><div className="metric-label">INFERENCE LATENCY <Clock3 size={17}/></div><div className="metric-value">{result ? `${Math.round(result.inference_ms)}` : '—'}<small>{result ? ' ms' : ''}</small></div><span className="metric-caption">Model inference elapsed time</span></article></div>
          <div className="chart-card"><div className="card-top"><div><h3>Ripeness distribution</h3><p>Detected fruits by six maturity categories</p></div>{result && <label className="toggle"><input type="checkbox" checked={showBoxes} onChange={e=>setShowBoxes(e.target.checked)}/> Show boxes</label>}</div><div className="bars">{CLASSES.map(cls => { const n = result?.counts[cls] || 0; return <button className={`bar-row ${filter===cls?'selected':''}`} key={cls} onClick={()=>setFilter(f=>f===cls?'All':cls)} title={`Highlight ${cls} detections`}><span className="bar-class"><i style={{background:COLORS[cls]}}/>{cls}</span><span className="bar-track"><span style={{width:`${result ? n / maxCount * 100 : 0}%`,background:COLORS[cls]}}/></span><b>{result ? n : '—'}</b></button>;})}</div><div className="chart-footer">{result ? <><span>{filter === 'All' ? 'Showing all detections' : `Filtering boxes: ${filter}`}</span><button onClick={()=>setFilter('All')}>Reset filter</button></> : <span>Awaiting prediction data</span>}</div></div>
          </section>
          <section className="methodology" id="methodology"><div><span className="section-kicker">03 / METHODOLOGY</span><h2>Built for transparent results.</h2><p>Fine-tuned YOLO11n model. Six tomato maturity classes: Green, Breakers, Turning, Pink, Light Red, and Red. Bounding boxes are returned in original image pixels; counts are detections, not total harvest estimates.</p></div><div className="method-tag"><Sparkles size={19}/> YOLO11n <span>·</span> V4</div></section>
          <footer className="footer"><span>© FruitCount · 100 Days of Projects</span><span>AI-assisted estimates · Verify before agricultural decisions</span></footer>
        </div>
      </main>
    </div>
  );
}
