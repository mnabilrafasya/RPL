import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// src/App.jsx
import Navbar from './components/Navbar';
import Matches from './pages/Matches';
import Feed from './pages/Feed';
import Predict from './pages/Predict';
import Profile from './pages/Profile';
import CreateAccount from './pages/CreateAccount';

export default function App() {
  return (
    <div className="App">
    <Navbar />
    <main className="main">
      <div className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/matches" replace />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/predict" element={<Predict />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="*" element={<h2>404 – Halaman Tidak Ditemukan</h2>} />
        </Routes>
      </div>
    </main>
  </div>
  );
}
