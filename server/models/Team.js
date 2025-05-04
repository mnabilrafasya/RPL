import { DataTypes } from 'sequelize';
import db from '../config/Database.js';

const Team = db.define('Team', {
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  logo_url: {
    type: DataTypes.STRING(255),
    allowNull: true
  }
}, {
  tableName: 'teams'
});

export default Team;
