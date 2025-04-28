// src/pages/Dashboard.jsx

import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Dashboard() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <h1>ThoughtStream Dashboard</h1>
        <div className="user-info">
          <span>Welcome, {user?.name}!</span>
          <button onClick={logout}>Logout</button>
        </div>
      </header>

      <main className="dashboard-main">
        <section id="text-entry">New entry form goes here</section>
        <section id="old-entries">old enties list goes here</section>
      </main>
    </div>
  );
}

export default Dashboard;