import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import "./Home.css";

export default function Home() {
  const [news, setNews] = useState([]);
  const carouselRef = useRef(null);

  // Fetch berita terbaru
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/news`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setNews(data.slice(0, 10))) // Ambil 10 berita
      .catch((err) => console.error(err));
  }, []);

  // Auto-scroll carousel setiap 3 detik
  useEffect(() => {
    const carousel = carouselRef.current;
    let scrollAmount = 0;

    const interval = setInterval(() => {
      if (!carousel) return;
      const maxScroll = carousel.scrollWidth - carousel.clientWidth;

      scrollAmount += 260; // Sesuaikan dengan lebar kartu
      if (scrollAmount >= maxScroll) scrollAmount = 0;

      carousel.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [news]);

  return (
    <div className="home">
      <Navbar />

      <div className="hero-section">
        <h1 className="hero-title">Selamat datang di Aplikasi Sepak Bola!</h1>
        <p className="hero-subtitle">Temukan berita, jadwal pertandingan, dan statistik tim favorit Anda.</p>
        <button className="cta-button">
          <Link to="/news" style={{ color: "inherit", textDecoration: "none" }}>
            Lihat Berita Terbaru
          </Link>
        </button>
      </div>

      {/* Feature Section */}
      <div className="features">
        <div className="feature-card">
          <h3 className="feature-title">Berita Sepak Bola</h3>
          <p className="feature-description">Dapatkan informasi terkini seputar dunia sepak bola, termasuk berita tim, transfer pemain, dan lainnya.</p>
          <Link to="/news" className="feature-link">
            Lihat Berita
          </Link>
        </div>
        <div className="feature-card">
          <h3 className="feature-title">Jadwal Pertandingan</h3>
          <p className="feature-description">Cek jadwal pertandingan tim kesayanganmu dan jangan lewatkan pertandingan seru.</p>
          <Link to="/matches" className="feature-link">
            Lihat Jadwal
          </Link>
        </div>
        <div className="feature-card">
          <h3 className="feature-title">Statistik Tim</h3>
          <p className="feature-description">Lihat statistik tim favoritmu, termasuk jumlah kemenangan, seri, dan kekalahan.</p>
          <Link to="/stats" className="feature-link">
            Lihat Statistik
          </Link>
        </div>
      </div>

      {/* Highlight Section */}
      <div className="highlight-section">
        <h2 className="highlight-title">Highlight Berita</h2>
        <div className="highlight-carousel" ref={carouselRef}>
          {news.map((item) => (
            <div className="highlight-card" key={item.id}>
              <div className="highlight-image">
                <img src={`http://localhost:5000/uploads/${item.image_url}`} alt={item.title} />
              </div>
              <div className="highlight-info">
                <small>{new Date(item.published_at).toLocaleDateString()}</small>
                <h4>{item.title}</h4>
                <Link to="/news" className="highlight-link">
                  Baca Selengkapnya
                </Link>
              </div>
            </div>
          ))}
        </div>
        <Link to="/news" className="highlight-link">
          Lihat semua highlight
        </Link>
      </div>
    </div>
  );
}
