// File: server/controllers/matchController.js
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

export async function createMatch(req, res, next) {
  try {
    const { match_date, status, home_team_id, away_team_id, home_score, away_score } = req.body;

    const newMatch = await Match.create({
      match_date,
      status,
      home_team_id,
      away_team_id,
      home_score,
      away_score
    });

    res.status(201).json(newMatch);
  } catch (err) {
    next(err);
  }
}

// Update Match
export async function updateMatch(req, res, next) {
  try {
    const { home_score, away_score, status } = req.body;
    const match = await Match.findByPk(req.params.id);

    if (!match) return res.status(404).json({ message: 'Match not found' });

    // Update the match details
    match.home_score = home_score;
    match.away_score = away_score;
    match.status = status;

    await match.save();
    res.json(match);
  } catch (err) {
    next(err);
  }
}

// Delete Match
export async function deleteMatch(req, res, next) {
  try {
    const match = await Match.findByPk(req.params.id);

    if (!match) return res.status(404).json({ message: 'Match not found' });

    await match.destroy();
    res.status(204).send();  // Mengembalikan status 204 jika berhasil dihapus
  } catch (err) {
    next(err);
  }
}
