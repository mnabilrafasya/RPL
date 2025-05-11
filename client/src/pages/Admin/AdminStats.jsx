import { useEffect, useState } from "react";
import Select from "react-select";
import NavbarAdmin from "../../components/NavbarAdmin";

export default function AdminStats() {
  const [stats, setStats] = useState([]);
  const [teams, setTeams] = useState([]);
  const [form, setForm] = useState({
    teamId: "",
    played: "",
    win: "",
    draw: "",
    loss: "",
    points: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    played: "",
    win: "",
    draw: "",
    loss: "",
    points: "",
  });

  const fetchStats = async () => {
    const res = await fetch(import.meta.env.VITE_API_URL + "/standings");
    const data = await res.json();
    setStats(data);
  };

  const fetchTeams = async () => {
    const res = await fetch(import.meta.env.VITE_API_URL + "/teams");
    const data = await res.json();
    setTeams(data);
  };

  useEffect(() => {
    fetchStats();
    fetchTeams();
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
    setForm({
      teamId: "",
      played: "",
      win: "",
      draw: "",
      loss: "",
      points: "",
    });
  };

  const deleteStat = async (id) => {
    await fetch(`${import.meta.env.VITE_API_URL}/standings/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    fetchStats();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarAdmin />
      <div className="container mx-auto p-5">
        <h2 className="text-3xl font-semibold text-center mb-8">
          Admin - Statistik Tim
        </h2>

        {/* Form Input Stats */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6 mb-10 p-6 bg-white shadow-lg rounded-lg"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nama Tim
            </label>
            <Select
              options={teams.map((team) => ({
                value: team.id,
                label: team.name,
              }))}
              value={
                form.teamId
                  ? {
                      value: form.teamId,
                      label:
                        teams.find((t) => t.id === parseInt(form.teamId))
                          ?.name || "",
                    }
                  : null
              }
              onChange={(option) =>
                setForm({ ...form, teamId: option?.value || "" })
              }
              placeholder="Pilih Tim"
              className="mt-2"
            />
          </div>

          {/* Inputan angka */}
          {[
            { name: "played", label: "Jumlah Pertandingan" },
            { name: "win", label: "Jumlah Menang" },
            { name: "draw", label: "Jumlah Seri" },
            { name: "loss", label: "Jumlah Kalah" },
          ].map(({ name, label }) => (
            <div key={name}>
              <label className="block text-sm font-medium text-gray-700">
                {label}
              </label>
              <input
                type="number"
                inputMode="numeric"
                min="0"
                value={form[name]}
                onChange={(e) => {
                  const value = e.target.value;
                  setForm({
                    ...form,
                    [name]: value === "" ? "" : Math.max("", Number(value)),
                  });
                }}
                required
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Tambah Statistik
          </button>
        </form>

        {/* Daftar Statistik */}
        <div>
          {stats.length > 0 ? (
            <ul className="space-y-6">
              {stats.map((s) => {
                const team = s.Team || s.team;
                if (!team) return null;
                return (
                  <li
                    key={s.id}
                    className="bg-white p-5 rounded-lg shadow-md flex justify-between items-center"
                  >
                    <div>
                      <h4 className="text-xl font-semibold">{team.name}</h4>
                      <p className="text-gray-600">
                        Pertandingan: {s.played} | Menang: {s.win} | Seri:{" "}
                        {s.draw} | Kalah: {s.loss} | Poin: {s.points}
                      </p>
                    </div>
                    <div className="space-x-3 flex">
                      <button
                        onClick={() => {
                          setEditingId(s.id);
                          setEditForm({
                            played: s.played,
                            win: s.win,
                            draw: s.draw,
                            loss: s.loss,
                            points: s.points,
                          });
                        }}
                        className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteStat(s.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                      >
                        Hapus
                      </button>
                    </div>
                    {editingId === s.id && (
                      <form
                        onSubmit={async (e) => {
                          e.preventDefault();
                          await fetch(
                            `${import.meta.env.VITE_API_URL}/standings/${s.id}`,
                            {
                              method: "PUT",
                              headers: { "Content-Type": "application/json" },
                              credentials: "include",
                              body: JSON.stringify({
                                played: Number(editForm.played),
                                win: Number(editForm.win),
                                draw: Number(editForm.draw),
                                loss: Number(editForm.loss),
                                points: Number(editForm.points),
                              }),
                            }
                          );
                          setEditingId(null);
                          fetchStats();
                        }}
                        className="space-y-4 mt-4 w-full"
                      >
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Pertandingan
                          </label>
                          <input
                            type="number"
                            value={editForm.played}
                            onChange={(e) =>
                              setEditForm({
                                ...editForm,
                                played: e.target.value,
                              })
                            }
                            min={0}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Menang
                          </label>
                          <input
                            type="number"
                            value={editForm.win}
                            onChange={(e) =>
                              setEditForm({ ...editForm, win: e.target.value })
                            }
                            min={0}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Seri
                          </label>
                          <input
                            type="number"
                            value={editForm.draw}
                            onChange={(e) =>
                              setEditForm({ ...editForm, draw: e.target.value })
                            }
                            min={0}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Kalah
                          </label>
                          <input
                            type="number"
                            value={editForm.loss}
                            onChange={(e) =>
                              setEditForm({ ...editForm, loss: e.target.value })
                            }
                            min={0}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        <div className="flex space-x-3">
                          <button
                            type="submit"
                            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                          >
                            Simpan
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditingId(null)}
                            className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500"
                          >
                            Batal
                          </button>
                        </div>
                      </form>
                    )}
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-center text-gray-600">
              Belum ada data statistik.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
