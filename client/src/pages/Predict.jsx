// src/pages/Predict.jsx
import { useState } from 'react';
import PredictTabs from '../components/PredictTabs';
import WeekScroller from '../components/WeekScroller';

const tabs = [
  { label:'Join prediction', icon:null },
  { label:'433 Picks',       icon:'/assets/picks.png' },
  { label:'Champions League',icon:'/assets/ucl.png' },
  { label:'Europa League',   icon:'/assets/el.png' },
  { label:'Conference League',icon:'/assets/cl.png' },
];
const weeks = ['13','14','15','16','17','18','19'];

export default function Predict() {
  const [tab, setTab] = useState(tabs[1]);
  const [week, setWeek] = useState('16');
  return (
    <div>
      <PredictTabs tabs={tabs} selected={tab} onSelect={setTab}/>
      <WeekScroller weeks={weeks} selected={week} onSelect={setWeek}/>
      <div style={{
        background:'#222 url(/assets/predict-banner.jpg) center/cover',
        padding:'2rem', borderRadius:'1rem', textAlign:'center',
        marginBottom:'1rem'
      }}>
        <h2>GAMES PREDICTED 0/5</h2>
        <button style={{
          marginTop:'1rem', padding:'1rem 2rem',
          borderRadius:'2rem', border:'none', background:'#ff0', color:'#000'
        }}>PREDICT NOW</button>
        <p style={{marginTop:'.5rem'}}>14–20 April 2025</p>
      </div>
      {/* Leaderboard sederhana */}
      <section>
        <h3>Leaderboard</h3>
        <p>GLOBAL | FRIENDS</p>
      </section>
    </div>
  );
}
