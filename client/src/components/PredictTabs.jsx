// src/components/PredictTabs.jsx
import styles from './PredictTabs.module.css';
export default function PredictTabs({tabs,selected,onSelect}) {
  return (
    <div className={styles.scroll}>
      {tabs.map(t=>(
        <button key={t.label}
          className={t===selected?styles.active:styles.btn}
          onClick={()=>onSelect(t)}>
          {t.icon && <img src={t.icon} alt="" className={styles.icon} />}
          <span>{t.label}</span>
        </button>
      ))}
    </div>
  );
}
