import { useEffect, useState } from "react";
import Select from "react-select";
import NavbarAdmin from "../../components/NavbarAdmin";

export default function AdminMatches() {
  const [matches, setMatches] = useState([]);
  const [teams, setTeams] = useState([]);
  const [form, setForm] = useState({
    home_team_id: "",
    away_team_id: "",
    match_date: "",
    home_score: "",
    away_score: "",
  });
  const [editScores, setEditScores] = useState({});
  const [showEditForm, setShowEditForm] = useState({});
  const [formKey, setFormKey] = useState(Date.now()); // Untuk reset Select
  const API = import.meta.env.VITE_API_URL;

  const teamOptions = teams.map((team) => ({
    value: team.id,
    label: team.name,
  }));

  const fetchTeams = async () => {
    const res = await fetch(`${API}/teams`);
    const data = await res.json();
    setTeams(data);
  };

  const fetchMatches = async () => {
    const res = await fetch(`${API}/matches`, {
      credentials: "include",
    });
    const data = await res.json();
    setMatches(data);
  };

  useEffect(() => {
    fetchTeams();
    fetchMatches();
  }, []);

  const isPastDate = (date) => {
    if (!date) return false;
    return new Date(date) < new Date();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      home_team_id: form.home_team_id,
      away_team_id: form.away_team_id,
      match_date: form.match_date,
    };

    // Kalau tanggal sudah lewat, kirim juga skor
    if (isPastDate(form.match_date)) {
      payload.home_score = parseInt(form.home_score);
      payload.away_score = parseInt(form.away_score);
      payload.status = "finished";
    }

    const res = await fetch(`${API}/matches`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      setForm({
        home_team_id: "",
        away_team_id: "",
        match_date: "",
        home_score: "",
        away_score: "",
      });
      setFormKey(Date.now()); // ini akan reset komponen Select
      fetchMatches();
    }
  };

  const updateMatch = async (id) => {
    const updated = {
      home_score: parseInt(editScores[id]?.home_score || 0),
      away_score: parseInt(editScores[id]?.away_score || 0),
      status: "finished",
    };

    await fetch(`${API}/matches/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(updated),
    });

    setShowEditForm({ ...showEditForm, [id]: false });
    fetchMatches();
  };

  const deleteMatch = async (id) => {
    await fetch(`${API}/matches/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    fetchMatches();
  };

  const today = new Date().toISOString().slice(0, 16);
  const scheduledMatches = matches.filter((m) => m.status !== "finished");
  const finishedMatches = matches.filter((m) => m.status === "finished");

  return (
    <div className="admin-matches bg-gray-100 min-h-screen">
      <NavbarAdmin />
      <div className="container mx-auto p-6">
        <h3 className="text-3xl font-semibold mb-6">Tambah Pertandingan</h3>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <label className="block text-lg font-medium mb-2">
            Tim Tuan Rumah
          </label>
          <Select
            key={`home-${formKey}`}
            options={teamOptions}
            value={teamOptions.find((opt) => opt.value === form.home_team_id)}
            onChange={(selected) =>
              setForm({ ...form, home_team_id: selected?.value || "" })
            }
            placeholder="Pilih Tim Tuan Rumah"
            isClearable
          />

          <label className="block text-lg font-medium mt-4 mb-2">
            Tim Tamu
          </label>
          <Select
            key={`away-${formKey}`}
            options={teamOptions}
            value={teamOptions.find((opt) => opt.value === form.away_team_id)}
            onChange={(selected) =>
              setForm({ ...form, away_team_id: selected?.value || "" })
            }
            placeholder="Pilih Tim Tamu"
            isClearable
          />

          <label className="block text-lg font-medium mt-4 mb-2">
            Tanggal Pertandingan
          </label>
          <input
            type="datetime-local"
            value={form.match_date}
            onChange={(e) => setForm({ ...form, match_date: e.target.value })}
            required
            className="w-full p-2 border rounded-md"
          />

          {/* Tampilkan input skor jika tanggal sudah lewat */}
          {isPastDate(form.match_date) && (
            <>
              <label className="block text-lg font-medium mt-4 mb-2">
                Skor Tim Tuan Rumah
              </label>
              <input
                type="number"
                value={form.home_score}
                onChange={(e) =>
                  setForm({ ...form, home_score: e.target.value })
                }
                required
                className="w-full p-2 border rounded-md"
              />

              <label className="block text-lg font-medium mt-4 mb-2">
                Skor Tim Tamu
              </label>
              <input
                type="number"
                value={form.away_score}
                onChange={(e) =>
                  setForm({ ...form, away_score: e.target.value })
                }
                required
                className="w-full p-2 border rounded-md"
              />
            </>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 mt-4 rounded-lg hover:bg-blue-700"
          >
            Simpan Pertandingan
          </button>
        </form>

        {/* Pertandingan yang Akan Datang */}
        <div className="section mt-8">
          <h3 className="text-2xl font-semibold mb-4">
            Pertandingan Dijadwalkan
          </h3>
          {scheduledMatches.map((m) => {
            const isPast = new Date(m.match_date) < new Date();
            return (
              <div
                key={m.id}
                className="bg-white p-4 rounded-lg shadow-md mb-4 flex justify-between items-center"
              >
                <div className="flex items-center">
                  <img
                    src={m.HomeTeam?.logo_url}
                    alt={m.HomeTeam?.name}
                    className="h-10 w-10 object-contain mr-4"
                  />
                  <span className="text-lg font-semibold">
                    {m.HomeTeam?.name}
                  </span>
                </div>

                <span className="text-xl font-bold">
                  {isPast
                    ? "Waktu Lewat - Perlu Update Skor"
                    : new Date(m.match_date).toLocaleString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                </span>

                <div className="flex items-center">
                  <span className="text-lg font-semibold">
                    {m.AwayTeam?.name}
                  </span>
                  <img
                    src={m.AwayTeam?.logo_url}
                    alt={m.AwayTeam?.name}
                    className="h-10 w-10 object-contain ml-4"
                  />
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={() => deleteMatch(m.id)}
                    className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700"
                  >
                    Hapus
                  </button>

                  {isPast && !showEditForm[m.id] && (
                    <button
                      onClick={() =>
                        setShowEditForm({ ...showEditForm, [m.id]: true })
                      }
                      className="bg-yellow-500 text-white p-2 rounded-lg hover:bg-yellow-600"
                    >
                      Edit Skor
                    </button>
                  )}

                  {showEditForm[m.id] && (
                    <div className="flex space-x-4 mt-4">
                      <input
                        type="number"
                        placeholder="Skor Tuan Rumah"
                        value={editScores[m.id]?.home_score || ""}
                        onChange={(e) =>
                          setEditScores({
                            ...editScores,
                            [m.id]: {
                              ...editScores[m.id],
                              home_score: e.target.value,
                            },
                          })
                        }
                        className="p-2 border rounded-md"
                      />
                      <input
                        type="number"
                        placeholder="Skor Tamu"
                        value={editScores[m.id]?.away_score || ""}
                        onChange={(e) =>
                          setEditScores({
                            ...editScores,
                            [m.id]: {
                              ...editScores[m.id],
                              away_score: e.target.value,
                            },
                          })
                        }
                        className="p-2 border rounded-md"
                      />
                      <button
                        onClick={() => updateMatch(m.id)}
                        className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700"
                      >
                        Simpan Skor
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Pertandingan Selesai */}
        <div className="section mt-8">
          <h3 className="text-2xl font-semibold mb-4">Pertandingan Selesai</h3>
          {finishedMatches.map((m) => (
            <div
              key={m.id}
              className="bg-white p-4 rounded-lg shadow-md mb-4 flex justify-between items-center"
            >
              <div className="flex items-center">
                <img
                  src={m.HomeTeam?.logo_url}
                  alt={m.HomeTeam?.name}
                  className="h-10 w-10 object-contain mr-4"
                />
                <span className="text-lg font-semibold">
                  {m.HomeTeam?.name}
                </span>
              </div>

              <span className="text-xl font-bold">
                {m.home_score} - {m.away_score}
              </span>

              <div className="flex items-center">
                <span className="text-lg font-semibold">
                  {m.AwayTeam?.name}
                </span>
                <img
                  src={m.AwayTeam?.logo_url}
                  alt={m.AwayTeam?.name}
                  className="h-10 w-10 object-contain ml-4"
                />
              </div>

              <button
                onClick={() => deleteMatch(m.id)}
                className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700"
              >
                Hapus
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
