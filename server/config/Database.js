// config/Database.js
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const db = new Sequelize(
  process.env.DB_NAME,      
  process.env.DB_USER,      
  process.env.DB_PASS,     
  {
    host: process.env.DB_HOST,  // misal "localhost"
    dialect: 'mysql',
    port: process.env.DB_PORT || 3306,
    logging: false,
    define: {
      timestamps: true,
      underscored: true
    }
  }
);

export default db;
