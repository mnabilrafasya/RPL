import { News } from '../models/index.js';

export async function getAllNews(req, res, next) {
  try {
    const news = await News.findAll({
      order: [['published_at','DESC']],
      limit: 20
    });
    res.json(news);
  } catch (err) {
    next(err);
  }
}
