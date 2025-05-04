import { DataTypes } from 'sequelize';
import db from '../config/Database.js';
import Team from './Team.js';
import Season from './Season.js';

const Standing = db.define('Standing', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  team_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    references: {
      model: Team,
      key: 'id'
    }
  },
  
  played: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  win: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  draw: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  loss: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  goals_for: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  goals_against: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  points: {
    type: DataTypes.VIRTUAL,
    get() {
      return this.win * 3 + this.draw;
    }
  }
}, {
  tableName: 'standings',
  createdAt: false,
  updatedAt: 'updated_at'
});

// Relasi
Team.hasOne(Standing, { foreignKey: 'team_id' });
Standing.belongsTo(Team, { foreignKey: 'team_id' });

Season.hasMany(Standing, { foreignKey: 'season_id' });
Standing.belongsTo(Season, { foreignKey: 'season_id' });

export default Standing;
