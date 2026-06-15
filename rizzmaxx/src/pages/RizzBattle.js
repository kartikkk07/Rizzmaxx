import React, { useState, useRef } from 'react';
import { PageHeader, PrimaryButton, TextInput } from '../components/UI';
import { callClaude, fileToBase64 } from '../api';
import styles from './RizzBattle.module.css';
import pageStyles from './Page.module.css';

export default function RizzBattle() {
  const [f1,setF1]=useState(null); const [p1,setP1]=useState(null); const [n1,setN1]=useState('Player 1');
  const [f2,setF2]=useState(null); const [p2,setP2]=useState(null); const [n2,setN2]=useState('Player 2');
  const [result,setResult]=useState(null); const [loading,setLoading]=useState(false); const [error,setError]=useState('');
  const ref1=useRef(); const ref2=useRef();

  function handle1(f){setF1(f);setP1(URL.createObjectURL(f));}
  function handle2(f){setF2(f);setP2(URL.createObjectURL(f));}

  async function handleBattle(){
    if(!f1||!f2){setError('Upload both photos!');return;}
    setLoading(true);setError('');setResult(null);
    try{
      const[b1,b2]=await Promise.all([fileToBase64(f1),fileToBase64(f2)]);
      const text=await callClaude({
        system:`You are a brutally honest rizz battle judge. Compare two people on looks, charisma potential, and overall appeal. Return ONLY this JSON:
{"winner": "Player 1 or Player 2 name", "winnerScore": 8.2, "loserScore": 6.1, "p1": {"name":"","score":0,"tier":"","jawline":"","eyes":"","vibe":"","verdict":""}, "p2": {"name":"","score":0,"tier":"","jawline":"","eyes":"","vibe":"","verdict":""}, "battleSummary": "entertaining 2 sentence battle summary", "winReason": "why winner won"}`,
        messages:[{role:'user',content:[
          {type:'image',source:{type:'base64',media_type:f1.type||'image/jpeg',data:b1}},
          {type:'image',source:{type:'base64',media_type:f2.type||'image/jpeg',data:b2}},
          {type:'text',text:`Battle: ${n1||'Player 1'} (image 1) vs ${n2||'Player 2'} (image 2). Fill in the names in the JSON. Return ONLY valid JSON.`}
        ]}]
      });
      try{
        const parsed=JSON.parse(text.replace(/```json|```/g,'').trim());
        parsed.p1.name=n1||'Player 1'; parsed.p2.name=n2||'Player 2';
        setResult(parsed);
      }catch{setResult({raw:text});}
    }catch(e){setError(e.message);}
    setLoading(false);
  }

  return(
    <div className={pageStyles.page}>
      <PageHeader icon="⚔️" title="Rizz Battle" subtitle="Two photos enter. One winner leaves. AI judges the ultimate showdown." />
      <div className={styles.battleSetup}>
        <div className={styles.player}>
          <TextInput placeholder="Player 1 name" value={n1} onChange={setN1}/>
          <div className={styles.uploadBox} onClick={()=>ref1.current.click()}>
            {p1?<img src={p1} alt="p1" className={styles.playerImg}/>:<><div className={styles.uploadIcon}>📷</div><div className={styles.uploadText}>Upload Player 1</div></>}
            <input ref={ref1} type="file" accept="image/*" style={{display:'none'}} onChange={e=>e.target.files[0]&&handle1(e.target.files[0])}/>
          </div>
        </div>
        <div className={styles.vs}>VS</div>
        <div className={styles.player}>
          <TextInput placeholder="Player 2 name" value={n2} onChange={setN2}/>
          <div className={styles.uploadBox} onClick={()=>ref2.current.click()}>
            {p2?<img src={p2} alt="p2" className={styles.playerImg}/>:<><div className={styles.uploadIcon}>📷</div><div className={styles.uploadText}>Upload Player 2</div></>}
            <input ref={ref2} type="file" accept="image/*" style={{display:'none'}} onChange={e=>e.target.files[0]&&handle2(e.target.files[0])}/>
          </div>
        </div>
      </div>
      {error&&<p className={pageStyles.error}>{error}</p>}
      <PrimaryButton onClick={handleBattle} loading={loading}>⚔️ START BATTLE</PrimaryButton>

      {result&&!result.raw&&(
        <div className={styles.resultCard}>
          {/* Winner Banner */}
          <div className={styles.winnerBanner}>
            <div className={styles.winnerLabel}>🏆 WINNER</div>
            <div className={styles.winnerName}>{result.winner}</div>
            <div className={styles.winReason}>{result.winReason}</div>
          </div>

          {/* Comparison Table */}
          <div className={styles.table}>
            <div className={styles.tableHeader}>
              <div className={styles.thMetric}>Category</div>
              <div className={styles.thPlayer} style={result.winner===n1?{color:'#f59e0b'}:{}}>{n1||'Player 1'} {result.winner===n1?'👑':''}</div>
              <div className={styles.thPlayer} style={result.winner===n2?{color:'#f59e0b'}:{}}>{n2||'Player 2'} {result.winner===n2?'👑':''}</div>
            </div>
            {[
              {cat:'Score', v1:`${result.p1?.score}/10`, v2:`${result.p2?.score}/10`},
              {cat:'Tier', v1:result.p1?.tier, v2:result.p2?.tier},
              {cat:'Jawline', v1:result.p1?.jawline, v2:result.p2?.jawline},
              {cat:'Eyes', v1:result.p1?.eyes, v2:result.p2?.eyes},
              {cat:'Vibe', v1:result.p1?.vibe, v2:result.p2?.vibe},
              {cat:'Verdict', v1:result.p1?.verdict, v2:result.p2?.verdict},
            ].map((row,i)=>(
              <div key={i} className={styles.tableRow}>
                <div className={styles.rowCat}>{row.cat}</div>
                <div className={styles.rowVal}>{row.v1}</div>
                <div className={styles.rowVal}>{row.v2}</div>
              </div>
            ))}
          </div>

          <div className={styles.battleSummary}>{result.battleSummary}</div>
        </div>
      )}
      {result?.raw&&<div className={pageStyles.resultBox}>{result.raw}</div>}
    </div>
  );
}
