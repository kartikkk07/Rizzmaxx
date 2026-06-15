import React, { useState } from 'react';
import { PageHeader, PrimaryButton, Chips } from '../components/UI';
import { callClaude } from '../api';
import styles from './GlowUpGuide.module.css';
import pageStyles from './Page.module.css';

const TOPICS = ['🔥 Looksmaxxing', '👔 Style & Fashion', '🧠 Confidence', '💪 Gym Maxxing', '✨ Skincare', '🤝 Social Skills', '💇 Hair Maxxing', '😁 Teeth Maxxing'];

export default function GlowUpGuide() {
  const [topic, setTopic] = useState('🔥 Looksmaxxing');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleGuide() {
    setLoading(true); setError(''); setResult(null);
    try {
      const text = await callClaude({
        system: `You are the world's top looksmaxxing and self-improvement expert. Give actionable, specific guides. Return ONLY this JSON:
{"title": "guide title", "intro": "2 sentence overview", "steps": [{"step": "Step title", "desc": "detailed description", "tip": "pro tip"}], "products": ["product/tool 1", "product/tool 2", "product/tool 3"], "timeline": "realistic timeline", "verdict": "motivating closing statement"}`,
        messages: [{ role: 'user', content: `Create a complete glow-up guide for: ${topic.replace(/[^\w\s]/g,'').trim()}. Return ONLY valid JSON.` }]
      });
      try { setResult(JSON.parse(text.replace(/```json|```/g,'').trim())); }
      catch { setResult({ raw: text }); }
    } catch (e) { setError(e.message); }
    setLoading(false);
  }

  return (
    <div className={pageStyles.page}>
      <PageHeader icon="📖" title="Glow-Up Guide" subtitle="AI-powered self-improvement guides — no fluff, all action" />
      <Chips options={TOPICS} value={topic} onChange={setTopic} />
      {error && <p className={pageStyles.error}>{error}</p>}
      <PrimaryButton onClick={handleGuide} loading={loading}>📚 Load Guide</PrimaryButton>

      {result && !result.raw && (
        <div className={styles.resultCard}>
          <div className={styles.guideTitle}>{result.title}</div>
          <p className={styles.intro}>{result.intro}</p>

          <div className={styles.steps}>
            {result.steps?.map((s, i) => (
              <div key={i} className={styles.step}>
                <div className={styles.stepNum}>{i + 1}</div>
                <div className={styles.stepContent}>
                  <div className={styles.stepTitle}>{s.step}</div>
                  <div className={styles.stepDesc}>{s.desc}</div>
                  {s.tip && <div className={styles.stepTip}>💡 {s.tip}</div>}
                </div>
              </div>
            ))}
          </div>

          <div className={styles.productsSection}>
            <div className={styles.secLabel}>🛒 Recommended Products/Tools</div>
            <div className={styles.products}>
              {result.products?.map((p, i) => <div key={i} className={styles.product}>• {p}</div>)}
            </div>
          </div>

          <div className={styles.timelineBox}>
            <span className={styles.timelineLabel}>⏱ Timeline</span>
            <span>{result.timeline}</span>
          </div>

          <div className={styles.verdict}>{result.verdict}</div>
        </div>
      )}
      {result?.raw && <div className={pageStyles.resultBox}>{result.raw}</div>}
    </div>
  );
}
