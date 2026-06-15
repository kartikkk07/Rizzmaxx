import React, { useState } from 'react';
import styles from './UI.module.css';

export function PageHeader({ icon, title, subtitle }) {
  return (
    <div className={styles.header}>
      <h1 className={styles.title}>{icon} {title}</h1>
      <p className={styles.subtitle}>{subtitle}</p>
    </div>
  );
}

export function PrimaryButton({ children, onClick, disabled, loading }) {
  return (
    <button
      className={styles.btn}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? (
        <span className={styles.loadingInner}>
          <span className={styles.spinner} /> Thinking...
        </span>
      ) : children}
    </button>
  );
}

export function ResultBox({ text }) {
  if (!text) return null;
  return <div className={styles.result}>{text}</div>;
}

export function UploadZone({ onFile, preview, label }) {
  const ref = React.useRef();
  return (
    <div className={styles.uploadZone} onClick={() => ref.current.click()}>
      {preview ? (
        <img src={preview} alt="preview" className={styles.preview} />
      ) : (
        <>
          <div className={styles.uploadIcon}>📷</div>
          <div className={styles.uploadText}>{label || 'Drop your photo here'}</div>
          <div className={styles.uploadSub}>Click to upload</div>
        </>
      )}
      <input
        ref={ref}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={(e) => {
          const f = e.target.files[0];
          if (f) onFile(f);
        }}
      />
    </div>
  );
}

export function Chips({ options, value, onChange }) {
  return (
    <div className={styles.chips}>
      {options.map((o) => (
        <button
          key={o}
          className={`${styles.chip} ${value === o ? styles.chipActive : ''}`}
          onClick={() => onChange(o)}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

export function TextInput({ placeholder, value, onChange }) {
  return (
    <input
      className={styles.input}
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export function TextArea({ placeholder, value, onChange }) {
  return (
    <textarea
      className={styles.textarea}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={4}
    />
  );
}
