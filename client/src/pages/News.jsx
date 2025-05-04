import { useState, useEffect } from 'react';
import './News.css';

export default function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${API}/news`, { credentials: 'include' })
      .then(res => {
        if (!res.ok) throw new Error('Gagal memuat berita');
        return res.json();
      })
      .then(data => {
        setNews(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading berita …</p>;
  if (error)   return <p style={{ color:'red' }}>{error}</p>;

  return (
    <div className="news-list">
      <h2>Berita Terkini</h2>
      {news.map(n => (
        <div key={n.id} className="news-card">
          {n.image_url && <img src={n.image_url} alt={n.title} />}
          <div className="news-content">
            <h3>{n.title}</h3>
            <p>{n.caption}</p>
            <small>{new Date(n.published_at).toLocaleString()}</small>
          </div>
        </div>
      ))}
    </div>
  );
}
