// src/components/WeekScroller.jsx
import styles from './WeekScroller.module.css';
export default function WeekScroller({weeks,selected,onSelect}) {
  return (
    <div className={styles.scroll}>
      {weeks.map(w=>(
        <button key={w}
          className={w===selected?styles.active:styles.btn}
          onClick={()=>onSelect(w)}>
          <span className={styles.num}>{w}</span>
          <span>WEEK</span>
        </button>
      ))}
    </div>
  );
}
