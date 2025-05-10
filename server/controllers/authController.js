// File: server/controllers/authController.js
import { Admin } from "../models/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  console.log("Body:", req.body); // log input dari frontend

  try {
    const admin = await Admin.findOne({ where: { email } });
    console.log("Admin found:", admin); // log admin yang ditemukan

    if (!admin) return res.status(404).json({ msg: "Admin tidak ditemukan" });

    // Cek password biasa tanpa hashing
    if (password !== admin.password) {
      return res.status(401).json({ msg: "Password salah" });
    }
    
    const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    req.session.token = token;
    res.json({ msg: "Login berhasil", username: admin.username });
  } catch (err) {
    console.error("Login error:", err); // penting!
    res.status(500).json({ msg: err.message });
  }
};

export const logoutAdmin = (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).json({ msg: "Logout gagal" });
    res.json({ msg: "Logout berhasil" });
  });
};

export const getAdminProfile = async (req, res) => {
  if (!req.session.token) return res.status(401).json({ msg: "Belum login" });

  try {
    const decoded = jwt.verify(req.session.token, process.env.JWT_SECRET);
    const admin = await Admin.findByPk(decoded.id, { attributes: ['id', 'username'] });
    res.json(admin);
  } catch (err) {
    res.status(401).json({ msg: "Token tidak valid" });
  }
};
