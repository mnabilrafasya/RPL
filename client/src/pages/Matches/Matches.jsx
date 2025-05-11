import React, { useState, useEffect } from "react";
import "./Matches.css";
import Navbar from "../../components/Navbar";

export default function Matches() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${API}/matches`, { credentials: "include" })
      .then((res) => {
        if (!res.ok) throw new Error("Gagal memuat jadwal");
        return res.json();
      })
      .then((data) => {
        setMatches(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [API]);

  const scheduled = matches.filter((m) => m.status === "scheduled");
  const finished = matches.filter((m) => m.status === "finished");

  if (loading) return <p className="loading">Memuat jadwal pertandingan …</p>;
  if (error) return <p className="error">{error}</p>;

  const renderMatch = (m) => (
    <div key={m.id} className="match-card">
      <div className="team-side">
        <img src={m.HomeTeam.logo_url} alt={m.HomeTeam.name} />
        <span>{m.HomeTeam.name}</span>
      </div>

      <div className="match-center">
        {m.status === "finished" ? (
          <span className="score">
            {m.home_score} - {m.away_score}
          </span>
        ) : (
          <span className="scheduled-text">vs</span>
        )}
        <span className="date">
          {new Date(m.match_date).toLocaleString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>

      <div className="team-side">
        <span>{m.AwayTeam.name}</span>
        <img src={m.AwayTeam.logo_url} alt={m.AwayTeam.name} />
      </div>
    </div>
  );

  return (
    <div className="matches-page">
      <Navbar />
      <div className="matches-container">
        <h2>Jadwal & Hasil Pertandingan</h2>

        <div className="matches-section">
          <h3>Pertandingan Dijadwalkan</h3>
          {scheduled.length > 0 ? (
            scheduled.map(renderMatch)
          ) : (
            <p className="empty">Belum ada pertandingan terjadwal</p>
          )}
        </div>

        <div className="matches-section">
          <h3>Pertandingan Selesai</h3>
          {finished.length > 0 ? (
            finished.map(renderMatch)
          ) : (
            <p className="empty">Belum ada hasil pertandingan</p>
          )}
        </div>
      </div>
    </div>
  );
}
