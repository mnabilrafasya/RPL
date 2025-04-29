// src/components/DateScroller.jsx
import styles from './DateScroller.module.css';
export default function DateScroller({weeks,selected,onSelect}) {
  return (
    <div className={styles.scroll}>
      {weeks.map(w=>(
        <button key={w}
          className={
            w===selected ? styles.active : styles.btn
          }
          onClick={()=>onSelect(w)}>
          {w}
        </button>
      ))}
    </div>
  );
}
