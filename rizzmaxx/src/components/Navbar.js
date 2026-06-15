import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import styles from './Navbar.module.css';

const tabs = [
  { to: '/', label: '🏠', title: 'Home' },
  { to: '/psl', label: '📊', title: 'PSL' },
  { to: '/coach', label: '💬', title: 'Coach' },
  { to: '/guide', label: '📖', title: 'Guide' },
  { to: '/battle', label: '⚔️', title: 'Battle' },
  { to: '/tier', label: '🏆', title: 'Tier' },
  { to: '/leaderboard', label: '👑', title: 'Board' },
  { to: '/languages', label: '🌍', title: 'Slang' },
];

export default function Navbar() {
  return (
    <>
      {/* Top bar */}
      <nav className={styles.topNav}>
        <Link to="/" className={styles.logo}>
          <div className={styles.logoIcon}>⚡</div>
          <span>RizzMaxx</span>
        </Link>
        <div className={styles.topRight}>
          <NavLink to="/login" className={styles.loginBtn}>Login</NavLink>
          <NavLink to="/signup" className={styles.signupBtn}>Sign Up</NavLink>
        </div>
      </nav>
      {/* Bottom tab bar */}
      <div className={styles.bottomBar}>
        {tabs.map((t) => (
          <NavLink
            key={t.to}
            to={t.to}
            end={t.to === '/'}
            className={({ isActive }) => `${styles.bTab} ${isActive ? styles.bActive : ''}`}
          >
            <span className={styles.bIcon}>{t.label}</span>
            <span className={styles.bLabel}>{t.title}</span>
          </NavLink>
        ))}
      </div>
    </>
  );
}
