import Team from '../models/Team.js';

export async function getAllTeams(req, res, next) {
  try {
    const teams = await Team.findAll({
      attributes: ['id', 'name', 'logo_url'],
      order: [['name', 'ASC']]
    });
    res.json(teams);
  } catch (err) {
    next(err);
  }
}
