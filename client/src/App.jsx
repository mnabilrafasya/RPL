// src/App.jsx
import React from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import Home from './pages/Home';
import Matches from './pages/Matches';
import News from './pages/News';
import Stats from './pages/Stats';
import './App.css'; // Assuming you have some CSS for styling

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
        </Routes>
      </main>
    </div>
  );
}