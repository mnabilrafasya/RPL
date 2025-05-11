import React from "react";
import { Link } from "react-router-dom"; // Mengimpor Link untuk navigasi
import Navbar from "../../components/Navbar";
import "./Home.css";

export default function Home() {
  return (
    <div className="home">
      <Navbar />
      <div className="hero-section">
        <h1 className="hero-title">Selamat datang di Aplikasi Sepak Bola!</h1>
        <p className="hero-subtitle">
          Temukan berita, jadwal pertandingan, dan statistik tim favorit Anda.
        </p>
        <button className="cta-button">
          <Link to="/news" style={{ color: "inherit", textDecoration: "none" }}>
            Lihat Berita Terbaru
          </Link>
        </button>
      </div>

      <div className="features">
        <div className="feature-card">
          <h3 className="feature-title">Berita Sepak Bola</h3>
          <p className="feature-description">
            Dapatkan informasi terkini seputar dunia sepak bola, termasuk berita
            tim, transfer pemain, dan lainnya.
          </p>
          <Link to="/news" className="feature-link">
            Lihat Berita
          </Link>{" "}
          {/* Link menuju News */}
        </div>
        <div className="feature-card">
          <h3 className="feature-title">Jadwal Pertandingan</h3>
          <p className="feature-description">
            Cek jadwal pertandingan tim kesayanganmu dan jangan lewatkan
            pertandingan seru.
          </p>
          <Link to="/matches" className="feature-link">
            Lihat Jadwal
          </Link>{" "}
          {/* Link menuju Matches */}
        </div>
        <div className="feature-card">
          <h3 className="feature-title">Statistik Tim</h3>
          <p className="feature-description">
            Lihat statistik tim favoritmu, termasuk jumlah kemenangan, seri, dan
            kekalahan.
          </p>
          <Link to="/stats" className="feature-link">
            Lihat Statistik
          </Link>{" "}
          {/* Link menuju Stats */}
        </div>
      </div>
    </div>
  );
}
