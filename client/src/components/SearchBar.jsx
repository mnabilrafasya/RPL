// src/components/SearchBar.jsx
import styles from './SearchBar.module.css';
export default function SearchBar({onSearch}) {
  return (
    <div className={styles.wrapper}>
      <input
        type="text"
        placeholder="Search matches..."
        className={styles.input}
        onChange={e=>onSearch && onSearch(e.target.value)}
      />
    </div>
  );
}
