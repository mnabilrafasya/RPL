// File: server/index.js
import express from "express";
import dotenv from "dotenv";
import session from "express-session";
import cors from "cors";
import connectSessionSequelize from "connect-session-sequelize";
import path from "path";

import db from "./config/Database.js";
import routes from "./routes/index.js";
import errorHandler from "./middleware/errorHandler.js";
import authRoutes from "./routes/auth.js";
import teamRoutes from "./routes/team.js";
import matchRoutes from "./routes/matches.js";
import standingsRouter from './routes/standings.js';

dotenv.config();

const app = express();
const SequelizeStore = connectSessionSequelize(session.Store);

const store = new SequelizeStore({
  db,
  tableName: "sessions",
});

// 1) CORS & body‑parser
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.json());

// 2) Session
app.use(
  session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: false,
    store,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use("/api/admin", authRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/matches", matchRoutes);
app.use('/api/standings', standingsRouter);

// sinkronisasi tabel session
store.sync();

app.use('/uploads', express.static(path.join('public')));

// 3) Test endpoint
app.get("/api/hello", (req, res) => {
  res.json({ message: "Halo dari Express!" });
});

// 4) Mount routes
app.use("/api", routes);

// 5) Error handler
app.use(errorHandler);

// 6) Connect & start
const PORT = process.env.PORT || 5000;
db.authenticate()
  .then(() => db.sync())
  .then(() => {
    console.log("✅ DB connected & models synced");
    app.listen(PORT, () =>
      console.log(`🚀 Server berjalan di http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ DB error:", err);
  });
