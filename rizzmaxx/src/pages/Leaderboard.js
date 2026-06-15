import React, { useState, useEffect } from 'react';
import { PageHeader } from '../components/UI';
import styles from './Leaderboard.module.css';
import pageStyles from './Page.module.css';

const DEFAULT_SCORES = [
  { name: 'Chad_IRL', score: 9.2, date: '6/1/2026' },
  { name: 'GlowedUp99', score: 8.7, date: '6/3/2026' },
  { name: 'SilentMenace', score: 7.4, date: '6/7/2026' },
];

function getTierLabel(score) {
  if (score >= 9) return '👑 God Tier';
  if (score >= 7) return '⚡ High Tier';
  if (score >= 5) return '✅ Mid Tier';
  return '📉 Low Tier';
}

const RANK_ICONS = ['👑', '🥈', '🥉'];

export default function Leaderboard() {
  const [scores, setScores] = useState(DEFAULT_SCORES);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('rizzmaxx_scores') || '[]');
    if (saved.length) {
      const all = [...saved, ...DEFAULT_SCORES]
        .sort((a, b) => b.score - a.score)
        .slice(0, 10);
      setScores(all);
    }
  }, []);

  return (
    <div className={pageStyles.page}>
      <PageHeader icon="👑" title="PSL Leaderboard" subtitle="Top rated faces. Rate yourself in the PSL tab to join." />
      <div>
        {scores.map((s, i) => (
          <div key={i} className={`${styles.row} ${i === 0 ? styles.gold : ''}`}>
            <div className={styles.left}>
              <span className={styles.rank}>{RANK_ICONS[i] || `#${i + 1}`}</span>
              <div>
                <div className={styles.name}>{s.name}</div>
                <div className={styles.date}>{s.date}</div>
              </div>
            </div>
            <div className={styles.right}>
              <div className={styles.score}>{s.score}/10</div>
              <div className={styles.tier}>{getTierLabel(s.score)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
