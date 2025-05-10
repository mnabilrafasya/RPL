import { DataTypes } from "sequelize";
import db from "../config/database.js";

const Admin = db.define("admin", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  freezeTableName: true  // ✅ letakkan di sini, sebagai opsi model
});

export default Admin;
