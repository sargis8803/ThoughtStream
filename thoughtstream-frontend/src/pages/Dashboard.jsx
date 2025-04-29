// src/pages/Dashboard.jsx

import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Dashboard() {
  const { user, logout } = useContext(AuthContext);

  const [entry, setEntry] = useState("");
  const [title, setTitle] = useState(""); // Added title field

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New entry submitted:", { title, entry });
    setTitle("");
    setEntry("");
  };

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
        <section id="text-entry">
        <form onSubmit={handleSubmit} className="entry-form">
            <div className="form-group">
              <label htmlFor="entryTitle"></label>
              <input
                id="entryTitle"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Entry title..."
                className="title-input"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="entryContent"></label>
              <textarea
                id="entryContent"
                value={entry}
                onChange={(e) => setEntry(e.target.value)}
                placeholder="Write your thoughts here..."
                className="content-textarea"
                rows={10}
                required
              />
            </div>
            
            <button type="submit" className="submit-button">
              Save Entry
            </button>
          </form>
        </section>
        <section id="old-entries">old enties list goes here</section>
      </main>
    </div>
  );
}

export default Dashboard;