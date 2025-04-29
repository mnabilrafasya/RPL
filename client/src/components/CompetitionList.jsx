// src/components/CompetitionList.jsx
import styles from './CompetitionList.module.css';
export default function CompetitionList({competitions}) {
  return (
    <div>
      {competitions.map(c=>(
        <section key={c.name} className={styles.section}>
          <h3>{c.name}</h3>
          {c.matches.map(m=>(
            <div key={m.id} className={styles.matchRow}>
              <span>{m.home}</span>
              <span>{m.time}</span>
              <span>{m.away}</span>
            </div>
          ))}
        </section>
      ))}
    </div>
  );
}
