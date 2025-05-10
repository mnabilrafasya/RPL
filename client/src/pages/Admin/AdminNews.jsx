import { useEffect, useState } from "react";

export default function AdminNews() {
  const [news, setNews] = useState([]);
  const [form, setForm] = useState({ title: "", content: "" });

  const fetchNews = async () => {
    const res = await fetch(import.meta.env.VITE_API_URL + "/news");
    const data = await res.json();
    setNews(data);
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(import.meta.env.VITE_API_URL + "/news", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(form),
    });
    fetchNews();
    setForm({ title: "", content: "" });
  };

  const deleteNews = async (id) => {
    await fetch(`${import.meta.env.VITE_API_URL}/news/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    fetchNews();
  };

  return (
    <div>
      <h2>Admin - News</h2>
      <form onSubmit={handleSubmit}>
        <input
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="Judul"
          required
        />
        <textarea
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          placeholder="Konten"
          required
        />
        <button type="submit">Tambah Berita</button>
      </form>
      <ul>
        {news.map((n) => (
          <li key={n.id}>
            <strong>{n.title}</strong> - {n.content}
            <button onClick={() => deleteNews(n.id)}>Hapus</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
