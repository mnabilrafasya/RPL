// src/components/FavouritesCarousel.jsx
import styles from './FavouritesCarousel.module.css';
export default function FavouritesCarousel({items}) {
  return (
    <div className={styles.carousel}>
      {items.map(i=>(
        <div key={i.label} className={styles.card}>
          <img src={i.logo} alt={i.label} />
          <span>{i.label}</span>
        </div>
      ))}
    </div>
  );
}
