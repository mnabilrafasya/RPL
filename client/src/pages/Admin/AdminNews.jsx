import { useEffect, useState } from "react";
import NavbarAdmin from "../../components/NavbarAdmin";

export default function AdminNews() {
  const [news, setNews] = useState([]);
  const [form, setForm] = useState({
    title: "",
    caption: "",
    image: null,
  });

  const API = import.meta.env.VITE_API_URL;

  const fetchNews = async () => {
    const res = await fetch(`${API}/news`);
    const data = await res.json();
    setNews(data);
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("caption", form.caption);
    formData.append("image", form.image);

    await fetch(`${API}/news`, {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    setForm({ title: "", caption: "", image: null });
    e.target.reset(); // reset form tampilan
    fetchNews();
  };

  const deleteNews = async (id) => {
    await fetch(`${API}/news/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    fetchNews();
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <NavbarAdmin />
      <div className="container mx-auto p-6">
        <h2 className="text-3xl font-semibold mb-6">Kelola Berita</h2>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md space-y-4"
        >
          <input
            type="text"
            placeholder="Judul berita"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
            className="w-full p-3 border border-gray-300 rounded-md"
          />
          <textarea
            placeholder="Caption berita..."
            value={form.caption}
            onChange={(e) => setForm({ ...form, caption: e.target.value })}
            rows={5}
            required
            className="w-full p-3 border border-gray-300 rounded-md"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
            required
            className="w-full p-3 border border-gray-300 rounded-md"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
          >
            Tambah Berita
          </button>
        </form>

        <hr className="my-8" />

        <ul className="space-y-8">
          {news.map((n) => (
            <li
              key={n.id}
              className="bg-white p-6 rounded-lg shadow-md space-y-4 border-b border-gray-300"
            >
              {n.image_url && (
                <img
                  src={`http://localhost:5000/uploads/${n.image_url}`}
                  alt={n.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
              )}
              <h3 className="text-xl font-semibold">{n.title}</h3>
              <p className="text-gray-700">{n.caption}</p>{" "}
              {/* Caption tampilkan */}
              <button
                onClick={() => deleteNews(n.id)}
                className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                Hapus
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
