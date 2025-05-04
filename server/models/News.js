import { DataTypes } from 'sequelize';
import db from '../config/Database.js';

const News = db.define('News', {
  title: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  caption: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  image_url: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  published_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'news',
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

export default News;
