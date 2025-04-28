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
        <p>WeatherWidget will go here </p>
        <p>NewEntryForm will go here </p>
        <p>DiaryList will go here </p>
      </main>
    </div>
  );
}

export default Dashboard;