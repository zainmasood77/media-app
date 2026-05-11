import React, { useState, useRef } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:ital,wght@0,300;0,400;1,300&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #0a0a0a;
    --surface: #111111;
    --border: #222222;
    --accent: #e8ff47;
    --accent2: #ff6b35;
    --text: #f0f0f0;
    --muted: #555555;
    --success: #47ff8a;
    --error: #ff4747;
  }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: 'DM Mono', monospace;
    min-height: 100vh;
    overflow-x: hidden;
  }

  .grain {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 100;
    opacity: 0.03;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  }

  .app {
    max-width: 900px;
    margin: 0 auto;
    padding: 60px 24px;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 80px;
    animation: fadeDown 0.6s ease both;
  }

  .logo {
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    font-size: 13px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--accent);
  }

  .badge {
    font-size: 11px;
    letter-spacing: 0.15em;
    color: var(--muted);
    text-transform: uppercase;
    border: 1px solid var(--border);
    padding: 6px 12px;
  }

  .hero {
    margin-bottom: 60px;
    animation: fadeDown 0.6s 0.1s ease both;
  }

  .hero h1 {
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    font-size: clamp(48px, 8vw, 88px);
    line-height: 0.95;
    letter-spacing: -0.03em;
    margin-bottom: 24px;
  }

  .hero h1 span {
    color: var(--accent);
    display: block;
  }

  .hero p {
    font-size: 13px;
    color: var(--muted);
    letter-spacing: 0.05em;
    max-width: 400px;
    line-height: 1.8;
  }

  .upload-zone {
    border: 1px solid var(--border);
    background: var(--surface);
    padding: 60px 40px;
    text-align: center;
    cursor: pointer;
    position: relative;
    transition: border-color 0.2s, background 0.2s;
    animation: fadeUp 0.6s 0.2s ease both;
    margin-bottom: 24px;
  }

  .upload-zone:hover, .upload-zone.drag-over {
    border-color: var(--accent);
    background: #151515;
  }

  .upload-zone input {
    position: absolute;
    inset: 0;
    opacity: 0;
    cursor: pointer;
    width: 100%;
    height: 100%;
  }

  .upload-icon {
    width: 48px;
    height: 48px;
    border: 1px solid var(--border);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 24px;
    font-size: 20px;
    transition: border-color 0.2s, transform 0.2s;
  }

  .upload-zone:hover .upload-icon {
    border-color: var(--accent);
    transform: translateY(-4px);
  }

  .upload-zone h2 {
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    font-size: 18px;
    letter-spacing: -0.02em;
    margin-bottom: 8px;
  }

  .upload-zone p {
    font-size: 12px;
    color: var(--muted);
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .file-selected {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid var(--accent);
    background: #111a00;
    padding: 16px 20px;
    margin-bottom: 24px;
    animation: fadeUp 0.3s ease both;
  }

  .file-info {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .file-dot {
    width: 8px;
    height: 8px;
    background: var(--accent);
    border-radius: 50%;
  }

  .file-name {
    font-size: 13px;
    color: var(--accent);
  }

  .file-size {
    font-size: 11px;
    color: var(--muted);
  }

  .btn-remove {
    background: none;
    border: none;
    color: var(--muted);
    cursor: pointer;
    font-size: 18px;
    font-family: 'DM Mono', monospace;
    transition: color 0.2s;
    padding: 0;
  }

  .btn-remove:hover { color: var(--error); }

  .btn-upload {
    width: 100%;
    padding: 20px;
    background: var(--accent);
    color: #0a0a0a;
    border: none;
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    font-size: 14px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    cursor: pointer;
    transition: background 0.2s, transform 0.1s;
    animation: fadeUp 0.6s 0.3s ease both;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
  }

  .btn-upload:hover:not(:disabled) {
    background: #f5ff70;
    transform: translateY(-2px);
  }

  .btn-upload:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    transform: none;
  }

  .btn-upload.loading {
    background: var(--surface);
    color: var(--accent);
    border: 1px solid var(--accent);
  }

  .spinner {
    width: 16px;
    height: 16px;
    border: 2px solid transparent;
    border-top-color: var(--accent);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  .result {
    margin-top: 40px;
    animation: fadeUp 0.5s ease both;
  }

  .result-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 24px;
    padding-bottom: 16px;
    border-bottom: 1px solid var(--border);
  }

  .result-dot {
    width: 8px;
    height: 8px;
    background: var(--success);
    border-radius: 50%;
    box-shadow: 0 0 8px var(--success);
  }

  .result-label {
    font-size: 11px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--success);
  }

  .result-meta {
    font-size: 11px;
    color: var(--muted);
    margin-left: auto;
    letter-spacing: 0.1em;
  }

  .image-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  .image-card {
    border: 1px solid var(--border);
    overflow: hidden;
    background: var(--surface);
  }

  .image-card-label {
    padding: 10px 14px;
    font-size: 10px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--muted);
    border-bottom: 1px solid var(--border);
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .image-card-label span {
    width: 6px;
    height: 6px;
    background: var(--accent2);
    border-radius: 50%;
  }

  .image-card img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    display: block;
  }

  .s3-paths {
    margin-top: 16px;
    border: 1px solid var(--border);
    overflow: hidden;
  }

  .s3-row {
    display: flex;
    align-items: center;
    padding: 12px 16px;
    border-bottom: 1px solid var(--border);
    gap: 12px;
  }

  .s3-row:last-child { border-bottom: none; }

  .s3-key {
    font-size: 10px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--muted);
    min-width: 80px;
  }

  .s3-val {
    font-size: 11px;
    color: var(--accent);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .error-box {
    border: 1px solid var(--error);
    background: #1a0000;
    padding: 16px 20px;
    margin-top: 16px;
    display: flex;
    align-items: center;
    gap: 12px;
    animation: fadeUp 0.3s ease both;
  }

  .error-dot {
    width: 8px;
    height: 8px;
    background: var(--error);
    border-radius: 50%;
    flex-shrink: 0;
  }

  .error-text {
    font-size: 12px;
    color: var(--error);
    letter-spacing: 0.05em;
  }

  .footer {
    margin-top: auto;
    padding-top: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid var(--border);
    animation: fadeUp 0.6s 0.4s ease both;
  }

  .footer-text {
    font-size: 11px;
    color: var(--muted);
    letter-spacing: 0.1em;
  }

  .footer-stack {
    display: flex;
    gap: 16px;
  }

  .stack-tag {
    font-size: 10px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--muted);
    border: 1px solid var(--border);
    padding: 4px 8px;
  }

  @keyframes fadeDown {
    from { opacity: 0; transform: translateY(-16px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  @media (max-width: 600px) {
    .image-grid { grid-template-columns: 1fr; }
    .hero h1 { font-size: 48px; }
    .header { flex-direction: column; gap: 16px; }
  }
`;

export default function App() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef();

  const handleFile = (f) => {
    if (!f || !f.type.startsWith("image/")) return;
    setFile(f);
    setResult(null);
    setError(null);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(f);
  };

  const handleChange = (e) => handleFile(e.target.files[0]);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    setError(null);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setResult(data);
    } catch (err) {
      setError(err.message || "Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const reset = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
    setError(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const formatSize = (bytes) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  return (
    <>
      <style>{styles}</style>
      <div className="grain" />
      <div className="app">
        <header className="header">
          <div className="logo">MediaFlow</div>
          <div className="badge">AWS Cloud Platform</div>
        </header>

        <section className="hero">
          <h1>
            Upload.
            <span>Process.</span>
            Store.
          </h1>
          <p>
            Cloud-native image processing with auto-scaling infrastructure,
            event-driven architecture, and S3 storage.
          </p>
        </section>

        {!file ? (
          <div
            className={`upload-zone ${dragOver ? "drag-over" : ""}`}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
          >
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              onChange={handleChange}
            />
            <div className="upload-icon">↑</div>
            <h2>Drop image here</h2>
            <p>or click to browse — PNG, JPG, WEBP</p>
          </div>
        ) : (
          <div className="file-selected">
            <div className="file-info">
              <div className="file-dot" />
              <div>
                <div className="file-name">{file.name}</div>
                <div className="file-size">{formatSize(file.size)}</div>
              </div>
            </div>
            <button className="btn-remove" onClick={reset}>×</button>
          </div>
        )}

        <button
          className={`btn-upload ${uploading ? "loading" : ""}`}
          onClick={handleUpload}
          disabled={!file || uploading}
        >
          {uploading ? (
            <>
              <div className="spinner" />
              Processing...
            </>
          ) : (
            "Upload & Process →"
          )}
        </button>

        {error && (
          <div className="error-box">
            <div className="error-dot" />
            <div className="error-text">{error}</div>
          </div>
        )}

        {result && (
          <div className="result">
            <div className="result-header">
              <div className="result-dot" />
              <div className="result-label">Processing complete</div>
              <div className="result-meta">{new Date().toLocaleTimeString()}</div>
            </div>

            <div className="image-grid">
              {preview && (
                <div className="image-card">
                  <div className="image-card-label">
                    <span />
                    Original
                  </div>
                  <img src={preview} alt="original" />
                </div>
              )}
              {result.image_url && (
                <div className="image-card">
                  <div className="image-card-label">
                    <span />
                    Processed — 300×300
                  </div>
                  <img src={result.image_url} alt="processed" />
                </div>
              )}
            </div>

            {(result.s3_original || result.s3_processed) && (
              <div className="s3-paths">
                {result.s3_original && (
                  <div className="s3-row">
                    <div className="s3-key">Original</div>
                    <div className="s3-val">{result.s3_original}</div>
                  </div>
                )}
                {result.s3_processed && (
                  <div className="s3-row">
                    <div className="s3-key">Processed</div>
                    <div className="s3-val">{result.s3_processed}</div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        <footer className="footer">
          <div className="footer-text">© 2026 Zain Masood — 2022458</div>
          <div className="footer-stack">
            <div className="stack-tag">React</div>
            <div className="stack-tag">Flask</div>
            <div className="stack-tag">AWS S3</div>
            <div className="stack-tag">Lambda</div>
          </div>
        </footer>
      </div>
    </>
  );
}
