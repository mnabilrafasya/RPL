import { News } from "../models/index.js";
import path from "path";
import fs from "fs/promises";

export async function getAllNews(req, res, next) {
  try {
    const news = await News.findAll({
      order: [["published_at", "DESC"]],
      limit: 20,
    });
    res.json(news);
  } catch (err) {
    next(err);
  }
}

export async function addNews(req, res, next) {
  try {
    const { title, caption } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const newNews = await News.create({
      title,
      caption,
      image_url: image,
      published_at: new Date(),
    });

    res.status(201).json(newNews);
  } catch (err) {
    next(err);
  }
}

export async function deleteNews(req, res, next) {
  try {
    const { id } = req.params;
    const news = await News.findByPk(id);

    if (!news) return res.status(404).json({ error: "Not found" });

    // Hapus file gambar jika ada
    if (news.image_url) {
      const imagePath = path.join("public", news.image_url);
      await fs.unlink(imagePath).catch(() => {});
    }

    await news.destroy();
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}
