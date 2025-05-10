import React from "react";
import { Link } from "react-router-dom";

function AdminDashboard() {
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <nav>
        <ul>
          <li>
            <Link to="/admin/matches">Manage Matches</Link>
          </li>
          <li>
            <Link to="/admin/news">Manage News</Link>
          </li>
          <li>
            <Link to="/admin/stats">Manage Stats</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default AdminDashboard;
