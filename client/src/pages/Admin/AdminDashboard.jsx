import React from "react";
import { Link } from "react-router-dom";
import NavbarAdmin from "../../components/NavbarAdmin";

function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarAdmin />
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-semibold text-gray-800">
          Admin Dashboard
        </h2>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold text-gray-700">
              Manage Matches
            </h3>
            <p className="mt-2 text-gray-600">View and edit match details.</p>
            <Link
              to="/admin/matches"
              className="mt-4 inline-block text-blue-600 hover:text-blue-800"
            >
              Go to Matches
            </Link>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold text-gray-700">Manage News</h3>
            <p className="mt-2 text-gray-600">
              Update and manage news articles.
            </p>
            <Link
              to="/admin/news"
              className="mt-4 inline-block text-blue-600 hover:text-blue-800"
            >
              Go to News
            </Link>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold text-gray-700">
              Manage Stats
            </h3>
            <p className="mt-2 text-gray-600">Analyze and update statistics.</p>
            <Link
              to="/admin/stats"
              className="mt-4 inline-block text-blue-600 hover:text-blue-800"
            >
              Go to Stats
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
