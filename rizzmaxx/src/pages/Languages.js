import React, { useState } from 'react';
import { PageHeader } from '../components/UI';
import styles from './Languages.module.css';
import pageStyles from './Page.module.css';

const SLANG = [
  { word: 'Rizz', meaning: 'Natural charm or ability to attract others', example: 'Bro has unspoken rizz fr', category: 'Dating' },
  { word: 'Looksmaxxing', meaning: 'Maximizing your physical attractiveness through self-improvement', example: 'He started looksmaxxing — jawline is crazy now', category: 'Looks' },
  { word: 'PSL', meaning: 'Pretty Scale Lookism — rating system for physical attractiveness 1-10', example: 'What\'s my PSL rating?', category: 'Looks' },
  { word: 'Mewing', meaning: 'Tongue posture technique to improve jawline over time', example: 'Been mewing for 6 months, results are insane', category: 'Looks' },
  { word: 'Mogging', meaning: 'Outclassing someone in looks or status', example: 'He was mogging everyone in the room', category: 'Looks' },
  { word: 'Slay', meaning: 'To perform exceptionally well or look amazing', example: 'She absolutely slayed that fit', category: 'General' },
  { word: 'No Cap', meaning: 'No lie, for real, being completely honest', example: 'No cap that fit goes hard', category: 'General' },
  { word: 'Fr Fr', meaning: 'For real for real — used for extra emphasis', example: 'He\'s top tier fr fr', category: 'General' },
  { word: 'Mid', meaning: 'Average, mediocre, nothing special', example: 'That haircut is mid bro', category: 'Rating' },
  { word: 'Bussin', meaning: 'Really good, excellent (usually food but can be anything)', example: 'His fit is bussin rn', category: 'General' },
  { word: 'Based', meaning: 'Being confidently yourself regardless of others\' opinions', example: 'That\'s a based take', category: 'Mindset' },
  { word: 'Glowup', meaning: 'A significant positive transformation in looks or life', example: 'His glowup from last year is insane', category: 'Looks' },
  { word: 'Soft maxxing', meaning: 'Easy improvements like grooming, haircut, skincare', example: 'Just softmaxx first before hitting the gym', category: 'Looks' },
  { word: 'Hard maxxing', meaning: 'Extreme measures like surgery to max attractiveness', example: 'Bro went full hardmaxx mode', category: 'Looks' },
  { word: 'Canthal tilt', meaning: 'The angle of your eye corners — positive tilt is attractive', example: 'His positive canthal tilt is top tier', category: 'Looks' },
  { word: 'Hunter eyes', meaning: 'Deep-set, slightly hooded eyes seen as highly attractive', example: 'He has hunter eyes — girls go crazy', category: 'Looks' },
  { word: 'Prey eyes', meaning: 'Wide, round eyes, opposite of hunter eyes', example: 'Getting rid of prey eyes through looksmaxxing', category: 'Looks' },
  { word: 'Gigachad', meaning: 'A man who is extremely attractive and confident', example: 'Bro is a literal gigachad', category: 'Rating' },
  { word: 'Sigma', meaning: 'A lone wolf type — successful without fitting into hierarchy', example: 'He doesn\'t care what anyone thinks, total sigma', category: 'Mindset' },
  { word: 'W', meaning: 'Win — something positive or impressive', example: 'That rizz was a massive W', category: 'General' },
  { word: 'L', meaning: 'Loss — a failure or embarrassing moment', example: 'Got left on read, massive L', category: 'General' },
  { word: 'Hitting', meaning: 'When someone is very attractive or a situation is going well', example: 'She was hitting at the party', category: 'Dating' },
  { word: 'Ghosting', meaning: 'Suddenly stopping all contact with someone', example: 'She ghosted me after 3 dates bro', category: 'Dating' },
  { word: 'Situationship', meaning: 'A romantic relationship without a clear label', example: 'We\'re in a situationship rn', category: 'Dating' },
  { word: 'Talking stage', meaning: 'The phase of getting to know someone before dating', example: 'We\'re in the talking stage', category: 'Dating' },
  { word: 'Main character', meaning: 'Acting like you\'re the protagonist of life — confidence', example: 'He walks in main character energy', category: 'Mindset' },
  { word: 'Rent free', meaning: 'Something living in your head constantly', example: 'She\'s living rent free in my head', category: 'General' },
  { word: 'Delulu', meaning: 'Delusional, but used positively for manifesting goals', example: 'Being delulu is the solulu', category: 'Mindset' },
  { word: 'NPC', meaning: 'Non-playable character — someone who acts mindlessly or follows crowds', example: 'Stop being an NPC, think for yourself', category: 'Mindset' },
  { word: 'Ratio', meaning: 'When a reply gets more likes than the original post — a dis', example: 'He got ratioed badly', category: 'Internet' },
  { word: 'Understood the assignment', meaning: 'Someone did exactly what was needed, perfectly', example: 'She understood the assignment with that fit', category: 'General' },
  { word: 'It\'s giving', meaning: 'Something gives off a certain vibe or energy', example: 'It\'s giving main character energy', category: 'General' },
  { word: 'Period', meaning: 'Used to emphasize a final statement, like a full stop', example: 'He\'s the most attractive guy here, period', category: 'General' },
  { word: 'Ate', meaning: 'Did something perfectly, nailed it', example: 'She ate that performance', category: 'General' },
  { word: 'Serve', meaning: 'Delivering an impressive look or performance', example: 'That fit is serving', category: 'General' },
  { word: 'Lowkey', meaning: 'Secretly, slightly, without drawing attention', example: 'I lowkey like her tbh', category: 'General' },
  { word: 'Highkey', meaning: 'Openly, obviously, without hiding it', example: 'Highkey one of the best fits I\'ve seen', category: 'General' },
  { word: 'Bet', meaning: 'Okay, agreed, sounds good', example: 'Meet at 8? Bet.', category: 'General' },
  { word: 'Vibe check', meaning: 'Testing someone\'s energy or mood', example: 'He failed the vibe check', category: 'General' },
  { word: 'Understood', meaning: 'Acknowledgment — got it, I see what you mean', example: 'Oh you have hunter eyes, understood the hype', category: 'General' },
  { word: 'Fanum tax', meaning: 'Taking someone\'s food without asking', example: 'Stop fanum taxing my food bro', category: 'Internet' },
  { word: 'Skibidi', meaning: 'Gen Z nonsense word, can mean anything — good or bad', example: 'That\'s skibidi rizz right there', category: 'Internet' },
  { word: 'Ohio', meaning: 'Something weird, cringe, or out of the ordinary', example: 'That was very Ohio of you', category: 'Internet' },
  { word: 'Rizz god', meaning: 'Someone with supreme ability to attract others', example: 'He\'s an absolute rizz god', category: 'Dating' },
  { word: 'Unspoken rizz', meaning: 'Attracting people without saying anything — pure aura', example: 'He has unspoken rizz, didn\'t say a word', category: 'Dating' },
  { word: 'Lore', meaning: 'Someone\'s backstory or mysterious past', example: 'He has so much lore, I need to know more', category: 'General' },
  { word: 'Aura', meaning: 'Someone\'s energy and presence they give off', example: 'His aura is on another level', category: 'Mindset' },
  { word: 'Drip', meaning: 'Stylish outfit or fashion sense', example: 'His drip is immaculate fr', category: 'Looks' },
  { word: 'Glow down', meaning: 'Opposite of glow up — when someone looks worse over time', example: 'Bro had a glow down since high school', category: 'Looks' },
  { word: 'Type shi', meaning: 'That\'s typical / that\'s exactly the type of thing', example: 'She ghosted him? Type shi fr', category: 'General' },
];

const CATEGORIES = ['All', 'Dating', 'Looks', 'General', 'Mindset', 'Rating', 'Internet'];

export default function Languages() {
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState('All');

  const filtered = SLANG.filter(s =>
    (cat === 'All' || s.category === cat) &&
    (s.word.toLowerCase().includes(search.toLowerCase()) || s.meaning.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className={pageStyles.page}>
      <PageHeader icon="🌍" title="Gen Z Slang Dictionary" subtitle={`${SLANG.length} terms — every rizz & looksmaxxing word explained`} />

      <input className={styles.search} placeholder="🔍 Search a term..." value={search} onChange={e=>setSearch(e.target.value)} />

      <div className={styles.cats}>
        {CATEGORIES.map(c => (
          <button key={c} className={`${styles.cat} ${cat===c?styles.catActive:''}`} onClick={()=>setCat(c)}>{c}</button>
        ))}
      </div>

      <div className={styles.count}>{filtered.length} terms</div>

      <div className={styles.grid}>
        {filtered.map((s, i) => (
          <div key={i} className={styles.card}>
            <div className={styles.cardTop}>
              <span className={styles.word}>{s.word}</span>
              <span className={styles.catBadge}>{s.category}</span>
            </div>
            <div className={styles.meaning}>{s.meaning}</div>
            <div className={styles.example}>"{s.example}"</div>
          </div>
        ))}
      </div>
    </div>
  );
}
