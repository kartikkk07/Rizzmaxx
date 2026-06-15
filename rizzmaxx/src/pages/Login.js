import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Auth.module.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();
    if (!email || !pass) { setError('Fill in all fields!'); return; }
    const users = JSON.parse(localStorage.getItem('rizzmaxx_users') || '[]');
    const user = users.find(u => u.email === email && u.password === pass);
    if (!user) { setError('Wrong email or password!'); return; }
    localStorage.setItem('rizzmaxx_user', JSON.stringify(user));
    navigate('/');
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.logo}><span className={styles.logoIcon}>⚡</span> RizzMaxx</div>
        <h2 className={styles.title}>Welcome Back</h2>
        <p className={styles.sub}>Login to your account</p>
        {error && <div className={styles.error}>{error}</div>}
        <form onSubmit={handleLogin} className={styles.form}>
          <div className={styles.field}>
            <label className={styles.label}>Email</label>
            <input className={styles.input} type="email" placeholder="you@email.com" value={email} onChange={e=>setEmail(e.target.value)} />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Password</label>
            <input className={styles.input} type="password" placeholder="••••••••" value={pass} onChange={e=>setPass(e.target.value)} />
          </div>
          <button className={styles.btn} type="submit">🔐 Login</button>
        </form>
        <p className={styles.switch}>Don't have an account? <Link to="/signup" className={styles.link}>Sign Up</Link></p>
      </div>
    </div>
  );
}
