// src/components/NewsCarousel.jsx
import { useState } from 'react';
import styles from './NewsCarousel.module.css';

export default function NewsCarousel({articles}) {
  const [idx, setIdx] = useState(0);
  const art = articles[idx];
  return (
    <div className={styles.wrapper}>
      <img src={art.image} alt={art.title} />
      <div className={styles.overlay}>
        <span className={styles.tag}>{art.tag}</span>
        <h3>{art.title}</h3>
        <p>{art.timeAgo}</p>
      </div>
      <div className={styles.dots}>
        {articles.map((_,i)=>(
          <button key={i}
            className={i===idx?styles.dotActive:styles.dot}
            onClick={()=>setIdx(i)} />
        ))}
      </div>
    </div>
  );
}
