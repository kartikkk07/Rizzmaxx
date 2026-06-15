import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';

const features = [
  { icon: '📊', name: 'PSL Rater', desc: 'AI rates your looks on the 1–10 scale with full breakdown', to: '/psl' },
  { icon: '💬', name: 'Rizz Coach', desc: 'Get real advice for any dating situation you\'re in', to: '/coach' },
  { icon: '📖', name: 'Glow-Up Guide', desc: 'Full guides on looksmaxxing, style, gym, and confidence', to: '/guide' },
  { icon: '⚔️', name: 'Rizz Battle', desc: 'Upload two photos — AI judges who wins the rizz war', to: '/battle' },
  { icon: '🏆', name: 'Tier List', desc: 'Answer honestly — AI places you in your rightful tier', to: '/tier' },
  { icon: '👑', name: 'Leaderboard', desc: 'Top rated faces — see who\'s dominating', to: '/leaderboard' },
  { icon: '🌍', name: 'Gen Z Slang', desc: 'Every gen z rizz word, term & language explained', to: '/languages' },
];

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <div className={styles.badge}>✦ AI-POWERED ✦</div>
        <h1 className={styles.heroTitle}>
          RIZZ &<br />
          <span className={styles.accent}>LOOKSMAXING</span>
        </h1>
        <p className={styles.heroDesc}>
          AI-powered tools to rate your looks, level up your game,<br />
          and dominate the dating scene.
        </p>
        <button className={styles.heroCta} onClick={() => navigate('/psl')}>
          🔥 Get Rated Now
        </button>
        <div className={styles.stats}>
          <div className={styles.stat}><span className={styles.statNum}>10K+</span><span className={styles.statLabel}>Users Rated</span></div>
          <div className={styles.statDiv} />
          <div className={styles.stat}><span className={styles.statNum}>99%</span><span className={styles.statLabel}>AI Accuracy</span></div>
          <div className={styles.statDiv} />
          <div className={styles.stat}><span className={styles.statNum}>Free</span><span className={styles.statLabel}>Forever</span></div>
        </div>
      </div>

      <div className={styles.grid}>
        {features.map((f) => (
          <div key={f.to} className={styles.card} onClick={() => navigate(f.to)}>
            <div className={styles.cardTop}>
              <span className={styles.cardIcon}>{f.icon}</span>
              <span className={styles.cardArrow}>↗</span>
            </div>
            <div className={styles.cardName}>{f.name}</div>
            <div className={styles.cardDesc}>{f.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
