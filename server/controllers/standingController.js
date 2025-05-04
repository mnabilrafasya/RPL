import { Standing, Team } from '../models/index.js';

export async function getStandings(req, res, next) {
  try {
    const standings = await Standing.findAll({
      include: [{ model: Team, attributes: ['id','name','logo_url'] }],
      order: [['win','DESC'], ['points','DESC']]
    });
    res.json(standings);
  } catch (err) {
    console.error('❌ Error getStandings:', err);
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
}
