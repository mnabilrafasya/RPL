import { useState, useEffect } from "react";
import "./Stats.css";

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
        console.log("Standings data:", data); // ⬅️ Tambahkan ini
        setTable(data);
        setLoading(false);
      })
      
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading klasemen …</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="stats">
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
          {table.map((row, i) => (
            <tr key={row.team.id}>
              <td>{i + 1}</td>
              <td className="team-cell">
                <img
                  src={row.team?.logo_url || "/assets/default.png"}
                  alt={row.team?.name || "Unknown"}
                  onError={(e) => (e.currentTarget.src = "/assets/default.png")}
                />
              </td>
              <td>{row.win}</td>
              <td>{row.draw}</td>
              <td>{row.loss}</td>
              <td>{row.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
