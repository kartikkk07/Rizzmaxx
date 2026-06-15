import React, { useState } from 'react';
import { PageHeader, PrimaryButton, Chips, TextArea } from '../components/UI';
import { callClaude } from '../api';
import styles from './RizzCoach.module.css';
import pageStyles from './Page.module.css';

const TYPES = ['Opening Line', 'How to Reply', 'Ask on Date', 'Recover from L', 'Red Flag Check', 'Ghosted?', 'Rizz Up'];

export default function RizzCoach() {
  const [type, setType] = useState('Opening Line');
  const [situation, setSituation] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleAdvice() {
    if (!situation.trim()) { setError('Describe your situation first!'); return; }
    setLoading(true); setError(''); setResult(null);
    try {
      const text = await callClaude({
        system: `You are an elite rizz coach and dating strategist. Give brutally real, actionable advice. Return ONLY this JSON:
{"headline": "short punchy headline", "mainAdvice": "2-3 sentence core advice", "lines": ["line 1 to use", "line 2 to use", "line 3 to use"], "doThis": ["action 1", "action 2"], "avoidThis": ["mistake 1", "mistake 2"], "confidenceTip": "one mindset tip"}`,
        messages: [{ role: 'user', content: `Advice type: ${type}\nSituation: ${situation}\nReturn ONLY valid JSON.` }]
      });
      try { setResult(JSON.parse(text.replace(/```json|```/g,'').trim())); }
      catch { setResult({ raw: text }); }
    } catch (e) { setError(e.message); }
    setLoading(false);
  }

  return (
    <div className={pageStyles.page}>
      <PageHeader icon="💬" title="Rizz Coach" subtitle="Describe your situation — get elite, no-BS dating advice" />
      <Chips options={TYPES} value={type} onChange={setType} />
      <TextArea placeholder="Describe your situation... (e.g. 'She left me on read for 2 days', 'Met her at the gym')" value={situation} onChange={setSituation} />
      {error && <p className={pageStyles.error}>{error}</p>}
      <PrimaryButton onClick={handleAdvice} loading={loading}>😤 Get Rizz Advice</PrimaryButton>

      {result && !result.raw && (
        <div className={styles.resultCard}>
          <div className={styles.headline}>{result.headline}</div>
          <p className={styles.mainAdvice}>{result.mainAdvice}</p>

          <div className={styles.section}>
            <div className={styles.sectionTitle}>💬 Lines to Use</div>
            {result.lines?.map((l,i) => (
              <div key={i} className={styles.lineCard}>
                <span className={styles.lineNum}>{i+1}</span>
                <span className={styles.lineText}>"{l}"</span>
              </div>
            ))}
          </div>

          <div className={styles.twoCol}>
            <div className={styles.section}>
              <div className={styles.sectionTitle} style={{color:'#22c55e'}}>✅ Do This</div>
              {result.doThis?.map((d,i) => <div key={i} className={styles.bullet}><span>→</span>{d}</div>)}
            </div>
            <div className={styles.section}>
              <div className={styles.sectionTitle} style={{color:'#ef4444'}}>❌ Avoid This</div>
              {result.avoidThis?.map((d,i) => <div key={i} className={styles.bullet}><span>→</span>{d}</div>)}
            </div>
          </div>

          <div className={styles.confidenceBox}>
            <span className={styles.confLabel}>🧠 Mindset</span>
            <span>{result.confidenceTip}</span>
          </div>
        </div>
      )}
      {result?.raw && <div className={pageStyles.resultBox}>{result.raw}</div>}
    </div>
  );
}
