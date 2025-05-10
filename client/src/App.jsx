// src/App.jsx
import React from "react";
import { Routes, Route, Navigate, Link } from "react-router-dom";
import Home from "./pages/Home/Home";
import Matches from "./pages/Matches/Matches";
import News from "./pages/News/News";
import Stats from "./pages/Stats/Stats";
import Login from "./pages/Admin/Login.jsx";
import AdminDashboard from "./pages/Admin/AdminDashboard.jsx";
import AdminMatches from "./pages/Admin/AdminMatches.jsx";
import AdminNews from "./pages/Admin/AdminNews.jsx";
import AdminStats from "./pages/Admin/AdminStats.jsx";

import "./App.css"; // Assuming you have some CSS for styling

export default function App() {
  return (
    <div className="app">
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/news" element={<News />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path="/admin" element={<Login />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/matches" element={<AdminMatches />} />
          <Route path="/admin/news" element={<AdminNews />} />
          <Route path="/admin/stats" element={<AdminStats />} />
        </Routes>
      </main>
    </div>
  );
}
