// src/pages/Matches.jsx
import React, { useState, useEffect } from "react";
import "./Matches.css";
import Navbar from "../components/Navbar";

export default function Matches() {
  // 1) Deklarasi state – WAJIB sebelum return
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

  // 2) Tampilkan loading / error sebelum masuk ke return utama
  if (loading) return <p>Loading jadwal …</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  // 3) Return utama – sekarang `matches` pasti ada
  return (
    <div className="matches">
      <Navbar />

      <h2>Jadwal dan Skor</h2>
      {matches.map((m) => (
        <div key={m.id} className="match-row">
          <img
            src={m.HomeTeam.logo_url}
            alt={m.HomeTeam.name}
            className="logo"
          />
          <span className="team-name">{m.HomeTeam.name}</span>
          <span className="score">
            {m.status === "finished"
              ? `${m.home_score} - ${m.away_score}`
              : new Date(m.match_date).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
          </span>
          <span className="team-name">{m.AwayTeam.name}</span>
          <img
            src={m.AwayTeam.logo_url}
            alt={m.AwayTeam.name}
            className="logo"
          />
        </div>
      ))}
    </div>
  );
}
