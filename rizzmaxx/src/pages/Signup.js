import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Auth.module.css';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  function handleSignup(e) {
    e.preventDefault();
    if (!name || !email || !pass) { setError('Fill in all fields!'); return; }
    if (pass.length < 6) { setError('Password must be at least 6 characters!'); return; }
    const users = JSON.parse(localStorage.getItem('rizzmaxx_users') || '[]');
    if (users.find(u => u.email === email)) { setError('Email already exists!'); return; }
    const user = { name, email, password: pass, joined: new Date().toLocaleDateString() };
    users.push(user);
    localStorage.setItem('rizzmaxx_users', JSON.stringify(users));
    localStorage.setItem('rizzmaxx_user', JSON.stringify(user));
    navigate('/');
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.logo}><span className={styles.logoIcon}>⚡</span> RizzMaxx</div>
        <h2 className={styles.title}>Create Account</h2>
        <p className={styles.sub}>Join the #1 rizz platform — free forever</p>
        {error && <div className={styles.error}>{error}</div>}
        <form onSubmit={handleSignup} className={styles.form}>
          <div className={styles.field}>
            <label className={styles.label}>Username</label>
            <input className={styles.input} type="text" placeholder="ChadMaxx99" value={name} onChange={e=>setName(e.target.value)} />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Email</label>
            <input className={styles.input} type="email" placeholder="you@email.com" value={email} onChange={e=>setEmail(e.target.value)} />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Password</label>
            <input className={styles.input} type="password" placeholder="Min. 6 characters" value={pass} onChange={e=>setPass(e.target.value)} />
          </div>
          <button className={styles.btn} type="submit">🚀 Create Account</button>
        </form>
        <p className={styles.switch}>Already have an account? <Link to="/login" className={styles.link}>Login</Link></p>
      </div>
    </div>
  );
}
