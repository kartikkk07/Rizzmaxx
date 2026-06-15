import React, { useState, useRef } from 'react';
import { PageHeader, PrimaryButton, TextInput } from '../components/UI';
import { callClaude, fileToBase64 } from '../api';
import styles from './PSLRater.module.css';
import pageStyles from './Page.module.css';

export default function PSLRater() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [name, setName] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState('');
  const fileRef = useRef();

  function handleFile(f) { setFile(f); setPreview(URL.createObjectURL(f)); setResult(null); }

  async function handleRate() {
    if (!file) { setError('Upload a photo first!'); return; }
    setLoading(true); setScanning(true); setError(''); setResult(null);
    try {
      const b64 = await fileToBase64(file);
      setTimeout(() => setScanning(false), 3000);
      const text = await callClaude({
        system: `You are the world's most accurate PSL (Prettyscale Lookism) rating AI, trained on thousands of faces. Rate based on 2024-2025 looksmaxxing standards: facial harmony, jawline, cheekbones, canthal tilt, hunter/prey eyes, nose bridge, lip ratio, skin texture, facial thirds, and overall attraction. Be brutally honest like a real looksmaxxer would be. Return ONLY this JSON format, nothing else:
{"score": 7.2, "tier": "High Tier", "tierEmoji": "⚡", "tierColor": "#9b6dff", "summary": "concise honest summary", "jawline": "assessment", "eyes": "assessment", "nose": "assessment", "skin": "assessment", "harmony": "assessment", "strengths": ["s1","s2","s3"], "improvements": ["i1","i2","i3"], "verdict": "2-3 sentence final verdict like a real looksmaxxer"}`,
        messages: [{
          role: 'user',
          content: [
            { type: 'image', source: { type: 'base64', media_type: file.type || 'image/jpeg', data: b64 } },
            { type: 'text', text: 'Analyze this face accurately using PSL standards. Be specific and honest. Return ONLY valid JSON.' }
          ]
        }]
      });
      setScanning(false);
      const clean = text.replace(/```json|```/g, '').trim();
      try {
        setResult(JSON.parse(clean));
        if (name) {
          const scores = JSON.parse(localStorage.getItem('rizzmaxx_scores') || '[]');
          scores.unshift({ name, score: JSON.parse(clean).score, tier: JSON.parse(clean).tier, date: new Date().toLocaleDateString() });
          localStorage.setItem('rizzmaxx_scores', JSON.stringify(scores.slice(0, 20)));
        }
      } catch { setResult({ raw: text }); }
    } catch (e) { setError(e.message); setScanning(false); }
    setLoading(false);
  }

  const metrics = result ? [
    { label: 'Jawline', val: result.jawline },
    { label: 'Eyes', val: result.eyes },
    { label: 'Nose', val: result.nose },
    { label: 'Skin', val: result.skin },
    { label: 'Harmony', val: result.harmony },
  ] : [];

  return (
    <div className={pageStyles.page}>
      <PageHeader icon="📊" title="PSL & Appeal Rater" subtitle="Brutally honest AI looksmaxxing analysis — new gen standards" />
      <TextInput placeholder="Your name (for leaderboard)" value={name} onChange={setName} />

      <div className={styles.uploadArea} onClick={() => fileRef.current.click()}>
        {preview ? (
          <div className={styles.previewWrap}>
            <img src={preview} alt="preview" className={styles.previewImg} />
            {scanning && (
              <div className={styles.scanOverlay}>
                <div className={styles.scanLine} />
                <div className={styles.scanGrid} />
                <div className={styles.scanCorner} style={{top:8,left:8}} />
                <div className={styles.scanCorner} style={{top:8,right:8}} />
                <div className={styles.scanCorner} style={{bottom:8,left:8}} />
                <div className={styles.scanCorner} style={{bottom:8,right:8}} />
                <div className={styles.scanText}>ANALYZING FACIAL STRUCTURE...</div>
              </div>
            )}
          </div>
        ) : (
          <>
            <div className={styles.uploadIcon}>📷</div>
            <div className={styles.uploadText}>Drop your photo here</div>
            <div className={styles.uploadSub}>Click to upload • Best with clear face photo</div>
          </>
        )}
        <input ref={fileRef} type="file" accept="image/*" style={{display:'none'}} onChange={e => e.target.files[0] && handleFile(e.target.files[0])} />
      </div>

      {error && <p className={pageStyles.error}>{error}</p>}
      <PrimaryButton onClick={handleRate} loading={loading} disabled={!file}>🔍 Analyze My Face</PrimaryButton>

      {result && !result.raw && (
        <div className={styles.resultCard}>
          {/* Score */}
          <div className={styles.scoreRow}>
            <div className={styles.scoreBig}>{result.score}<span className={styles.scoreOf}>/10</span></div>
            <div>
              <div className={styles.tierBadge} style={{background: (result.tierColor||'#7c3aed')+'22', color: result.tierColor||'#9b6dff', border:`1px solid ${result.tierColor||'#7c3aed'}55`}}>
                {result.tierEmoji} {result.tier}
              </div>
              <p className={styles.summary}>{result.summary}</p>
            </div>
          </div>

          {/* Score bar */}
          <div className={styles.scoreBarWrap}>
            <div className={styles.scoreBar}>
              <div className={styles.scoreBarFill} style={{width: `${(result.score/10)*100}%`, background: result.tierColor||'#7c3aed'}} />
            </div>
            <div className={styles.scoreBarLabels}><span>0</span><span>5</span><span>10</span></div>
          </div>

          {/* Metrics */}
          <div className={styles.metricsGrid}>
            {metrics.map(m => (
              <div key={m.label} className={styles.metricCard}>
                <div className={styles.metricLabel}>{m.label}</div>
                <div className={styles.metricVal}>{m.val}</div>
              </div>
            ))}
          </div>

          <div className={styles.divider} />

          {/* Strengths & Improvements */}
          <div className={styles.siGrid}>
            <div>
              <div className={styles.siTitle} style={{color:'#22c55e'}}>✅ Strengths</div>
              {result.strengths?.map((s,i) => <div key={i} className={styles.siItem}><span className={styles.dot} style={{background:'#22c55e'}}/>  {s}</div>)}
            </div>
            <div>
              <div className={styles.siTitle} style={{color:'#f59e0b'}}>📈 Glow-Up Tips</div>
              {result.improvements?.map((s,i) => <div key={i} className={styles.siItem}><span className={styles.dot} style={{background:'#f59e0b'}}/> {s}</div>)}
            </div>
          </div>

          <div className={styles.divider} />
          <div className={styles.verdict}><span className={styles.verdictLabel}>Final Verdict</span>{result.verdict}</div>
        </div>
      )}
      {result?.raw && <div className={pageStyles.resultBox}>{result.raw}</div>}
    </div>
  );
}
