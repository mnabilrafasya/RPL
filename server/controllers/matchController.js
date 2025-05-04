import { Match, Team } from '../models/index.js';

export async function getAllMatches(req, res, next) {
  try {
    const matches = await Match.findAll({
      include: [
        { model: Team, as: 'HomeTeam', attributes: ['id','name','logo_url'] },
        { model: Team, as: 'AwayTeam', attributes: ['id','name','logo_url'] }
      ],
      order: [['match_date','ASC']]
    });
    res.json(matches);
  } catch (err) {
    next(err);
  }
}

export async function getMatchById(req, res, next) {
  try {
    const match = await Match.findByPk(req.params.id, {
      include: ['HomeTeam','AwayTeam']
    });
    if (!match) return res.status(404).json({ message: 'Match not found' });
    res.json(match);
  } catch (err) {
    next(err);
  }
}
