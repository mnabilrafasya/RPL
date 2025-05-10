import { useEffect, useState } from "react";

export default function AdminMatches() {
  const [matches, setMatches] = useState([]);
  const [form, setForm] = useState({ home_team: "", away_team: "", date: "" });

  const fetchMatches = async () => {
    const res = await fetch(import.meta.env.VITE_API_URL + "/matches");
    const data = await res.json();
    setMatches(data);
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(import.meta.env.VITE_API_URL + "/matches", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(form),
    });
    fetchMatches();
    setForm({ home_team: "", away_team: "", date: "" });
  };

  const deleteMatch = async (id) => {
    await fetch(`${import.meta.env.VITE_API_URL}/matches/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    fetchMatches();
  };

  return (
    <div>
      <h2>Admin - Matches</h2>
      <form onSubmit={handleSubmit}>
        <input
          value={form.home_team}
          onChange={(e) => setForm({ ...form, home_team: e.target.value })}
          placeholder="Home Team"
          required
        />
        <input
          value={form.away_team}
          onChange={(e) => setForm({ ...form, away_team: e.target.value })}
          placeholder="Away Team"
          required
        />
        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          required
        />
        <button type="submit">Tambah Match</button>
      </form>
      <ul>
        {matches.map((m) => (
          <li key={m.id}>
            {m.home_team} vs {m.away_team} - {m.date}
            <button onClick={() => deleteMatch(m.id)}>Hapus</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
