import db from '../config/Database.js';
import Team from './Team.js';
import Match from './Match.js';
import News from './News.js';
import Season from './Season.js';
import Standing from './Standing.js';
import Admin from './Admin.js';

// Pastikan relasi di-define sebelum export
export { db, Team, Match, News, Season, Standing, Admin };
