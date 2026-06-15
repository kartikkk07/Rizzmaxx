import React, { useState } from 'react';
import { PageHeader, PrimaryButton, ResultBox, Chips } from '../components/UI';
import { callClaude } from '../api';
import styles from './TierList.module.css';
import pageStyles from './Page.module.css';

const QUESTIONS = [
  { id: 'q1', text: 'How do you approach someone you like?', options: ['Direct and confident', 'Indirect / through friends', 'Wait for them to approach', 'I freeze up'] },
  { id: 'q2', text: "What's your texting style?", options: ['Witty and playful', 'Straight to the point', 'Overthink every message', 'Dry one-word replies'] },
  { id: 'q3', text: 'How do you handle rejection?', options: ['Brush it off and move on', 'Take it personally but recover', 'Dwell on it for days', 'Never recovered from it tbh'] },
  { id: 'q4', text: 'Your social energy?', options: ['Life of the party', 'Smooth in small groups', 'Better 1-on-1', 'Mostly online'] },
  { id: 'q5', text: "How's your fashion sense?", options: ['Always clean and dripped out', 'Decent, could be better', 'Functional not fashionable', "What's fashion"] },
  { id: 'q6', text: 'Eye contact game?', options: ['Intense and magnetic', 'Comfortable and natural', 'Shy but improving', 'I look at the floor'] },
];

export default function TierList() {
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function setAnswer(id, val) { setAnswers(a => ({ ...a, [id]: val })); }

  async function handleTier() {
    const filled = QUESTIONS.every(q => answers[q.id]);
    if (!filled) { setError('Answer all questions first!'); return; }
    setLoading(true); setError(''); setResult('');
    try {
      const summary = QUESTIONS.map(q => `${q.text}: ${answers[q.id]}`).join('\n');
      const text = await callClaude({
        system: 'You are a rizz tier judge. Assign a tier (S/A/B/C/D) with a memorable label, give a short roast/compliment combo, and list 2–3 specific things to improve. Be entertaining and direct.',
        messages: [{ role: 'user', content: `Quiz answers:\n${summary}\n\nAssign my rizz tier.` }]
      });
      setResult(text);
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  }

  return (
    <div className={pageStyles.page}>
      <PageHeader icon="🏆" title="Rizz Tier List" subtitle="Answer honestly. The AI will place you in your rightful tier." />
      {QUESTIONS.map(q => (
        <div key={q.id} className={styles.question}>
          <p className={styles.qText}>{q.text}</p>
          <Chips options={q.options} value={answers[q.id]} onChange={v => setAnswer(q.id, v)} />
        </div>
      ))}
      {error && <p className={pageStyles.error}>{error}</p>}
      <PrimaryButton onClick={handleTier} loading={loading}>
        ⚡ Get My Tier
      </PrimaryButton>
      <ResultBox text={result} />
    </div>
  );
}
