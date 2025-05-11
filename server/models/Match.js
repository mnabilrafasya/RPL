// File: server/models/Match.js
import { DataTypes } from "sequelize";
import db from "../config/Database.js";
import Team from "./Team.js";

const Match = db.define(
  "Match",
  {
    match_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("scheduled", "live", "finished"),
      allowNull: false,
      defaultValue: "scheduled",
    },
    home_score: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    away_score: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "matches",
  }
);

// Relasi
Team.hasMany(Match, { foreignKey: "home_team_id", as: "HomeMatches" });
Team.hasMany(Match, { foreignKey: "away_team_id", as: "AwayMatches" });
Match.belongsTo(Team, { foreignKey: "home_team_id", as: "HomeTeam" });
Match.belongsTo(Team, { foreignKey: "away_team_id", as: "AwayTeam" });

export default Match;
