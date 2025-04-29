// src/components/Navbar.jsx
import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';

export default function Navbar() {
  const links = [
    { to: '/matches', label: 'Matches', icon: '⚽' },
    { to: '/feed',    label: 'Feed',    icon: '📰' },
    { to: '/predict', label: 'Predict', icon: '🎯' },
    { to: '/profile', label: 'Profile', icon: '👤' },
  ];
  return (
    <nav className={styles.nav}>
      {links.map(({to,label,icon})=>(
        <NavLink key={to} to={to}
          className={({isActive})=>
            isActive ? styles.active : styles.link
          }>
          <span className={styles.icon}>{icon}</span>
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
