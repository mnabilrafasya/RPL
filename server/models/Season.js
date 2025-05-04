import { DataTypes } from 'sequelize';
import db from '../config/Database.js';

const Season = db.define('Season', {
  year_label: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'seasons'
});

export default Season;
