// src/pages/Profile.jsx
import FavouritesCarousel from '../components/FavouritesCarousel';
import { Link } from 'react-router-dom';

export default function Profile() {
  const favs = [
    { label:'Real Madrid', logo:'/assets/rm.png' },
    { label:'Barcelona',   logo:'/assets/barca.png' },
    { label:'Brazil',      logo:'/assets/brazil.png' },
    // ...
  ];
  return (
    <div>
      <div style={{
        background:'#111 url(/assets/field-bg.jpg) center/cover',
        padding:'2rem', borderRadius:'1rem', position:'relative',
        textAlign:'center', marginBottom:'1rem'
      }}>
        <div style={{
          width:'6rem', height:'6rem', borderRadius:'50%',
          background:'#333', margin:'0 auto', position:'relative'
        }}>
          <button style={{
            position:'absolute', bottom:'-10px', right:'-10px',
            background:'#444', border:'none', borderRadius:'50%',
            padding:'.5rem'
          }}>✏️</button>
        </div>
        <h2>Muhammad Nabil</h2>
        <button style={{
          marginTop:'.5rem', padding:'.5rem 1rem',
          background:'#222', border:'none', borderRadius:'1rem'
        }}>SQUAD</button>
        <button style={{
          display:'block', width:'100%', marginTop:'1rem',
          padding:'.75rem', background:'#ff0', border:'none',
          borderRadius:'1rem', color:'#000'
        }}>Edit Profile</button>
      </div>

      <h3>My Favourites</h3>
      <FavouritesCarousel items={favs}/>
      <Link to="/create-account" style={{display:'block',marginTop:'2rem',textAlign:'center'}}>
        ➡️ Create Account
      </Link>
    </div>
  );
}
