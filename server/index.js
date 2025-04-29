import express from "express";
import dotenv from "dotenv";
import session from "express-session";
import cors from "cors";
import db from "./config/Database.js";

dotenv.config();

const app = express();

const store = new sessionStore({
  db: db,
  tableName: "sessions",
});

app.use(
  session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      secure: "auto",
    },
  })
);

app.use(
    cors({
      origin: ["http://localhost:3000", "http://localhost:5173"],
      credentials: true,
    })
  );

app.use(express.json());

app.get("/api/hello", (req, res) => {
  res.json({ message: "Halo dari Express!" });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
