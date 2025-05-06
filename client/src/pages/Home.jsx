// src/pages/Home.jsx
import React from "react";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div className="home">
      <Navbar />
      <h1>Welcome to the Football App</h1>
      <p>
        Your one-stop destination for all football news, matches, and stats.
      </p>
    </div>
  );
}
