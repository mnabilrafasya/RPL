import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

// Konfigurasi koneksi MySQL dengan Sequelize via .env
const db = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: "mysql"
    }
);

export default db;