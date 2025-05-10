import { useEffect, useState } from "react";

export default function AdminStats() {
  const [stats, setStats] = useState([]);
  const [form, setForm] = useState({ teamId: "", win: 0, draw: 0, loss: 0 });

  const fetchStats = async () => {
    const res = await fetch(import.meta.env.VITE_API_URL + "/standings");
    const data = await res.json();
    setStats(data);
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(import.meta.env.VITE_API_URL + "/standings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(form),
    });
    fetchStats();
    setForm({ teamId: "", win: 0, draw: 0, loss: 0 });
  };

  const deleteStat = async (id) => {
    await fetch(`${import.meta.env.VITE_API_URL}/standings/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    fetchStats();
  };

  return (
    <div>
      <h2>Admin - Stats</h2>
      <form onSubmit={handleSubmit}>
        <input
          value={form.teamId}
          onChange={(e) => setForm({ ...form, teamId: e.target.value })}
          placeholder="ID Tim"
          required
        />
        <input
          type="number"
          value={form.win}
          onChange={(e) => setForm({ ...form, win: +e.target.value })}
          placeholder="Menang"
        />
        <input
          type="number"
          value={form.draw}
          onChange={(e) => setForm({ ...form, draw: +e.target.value })}
          placeholder="Seri"
        />
        <input
          type="number"
          value={form.loss}
          onChange={(e) => setForm({ ...form, loss: +e.target.value })}
          placeholder="Kalah"
        />
        <button type="submit">Tambah Stats</button>
      </form>
      <ul>
        {stats.map((s) => {
          const team = s.Team || s.team; // antisipasi keduanya
          if (!team) return null;
          return (
            <li key={s.id}>
              {team.name} - W: {s.win}, D: {s.draw}, L: {s.loss}
              <button onClick={() => deleteStat(s.id)}>Hapus</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
