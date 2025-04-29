// src/pages/Feed.jsx
import NewsCarousel from '../components/NewsCarousel';
import { Link } from 'react-router-dom';

const articles = [
  { tag:'NEWS', title:"OWNING A CLUB, LITERALLY", timeAgo:'11 hours ago',
    image:'/assets/modric.jpg' },
  // ... tambah sampai 10
];

export default function Feed() {
  return (
    <div>
      <NewsCarousel articles={articles}/>
      {/* bisa ditambahkan list artikel di bawah carousel */}
      <Link to="/predict" style={{display:'block',marginTop:'2rem',textAlign:'center'}}>
        ➡️ Go to Predict
      </Link>
    </div>
  );
}
