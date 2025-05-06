import { useState, useEffect } from "react";
import "./Stats.css";
import Navbar from "../components/Navbar";

export default function Stats() {
  const [table, setTable] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${API}/standings`, { credentials: "include" })
      .then((res) => {
        if (!res.ok) throw new Error("Gagal memuat klasemen");
        return res.json();
      })
      .then((data) => {
        console.log("Standings data:", data);

        // Data API langsung array baris dengan properti `Team`
        let rows = [];
        if (Array.isArray(data) && data.length > 0 && data[0].Team) {
          rows = data;
        } else {
          // fallback jika struktur berubah
          rows = Array.isArray(data) ? data : [];
        }

        console.log("Processed rows:", rows);
        setTable(rows);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [API]);

  if (loading) return <p>Loading klasemen …</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="stats">
      <Navbar />
      <h2>Klasemen</h2>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Tim</th>
            <th>W</th>
            <th>D</th>
            <th>L</th>
            <th>Pts</th>
          </tr>
        </thead>
        <tbody>
          {table.map((row, i) => {
            const team = row.Team;
            // Pastikan Team ada sebelum render
            if (!team) return null;
            return (
              <tr key={team.id}>
                <td>{i + 1}</td>
                <td className="team-cell">
                  <img
                    src={team.logo_url || "/assets/default.png"}
                    alt={team.name}
                    onError={(e) =>
                      (e.currentTarget.src = "/assets/default.png")
                    }
                  />
                  {team.name}
                </td>
                <td>{row.win}</td>
                <td>{row.draw}</td>
                <td>{row.loss}</td>
                <td>{row.points}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
