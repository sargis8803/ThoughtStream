// src/pages/Dashboard.jsx

import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Dashboard() {
  const { user, logout } = useContext(AuthContext);

  const [title, setTitle] = useState("");
  const [entry, setEntry] = useState("");
  const [reflection, setReflection] = useState("");
  const [tags, setTags] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const token = localStorage.getItem('jwt');
    if (!token) {
      alert('Please login again');
      return;
    }
  
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/diary`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({  
          title,
          content: entry,
          reflection,
          tags: tags.split(",").map(tag => tag.trim()),
          location
          // user comes from token
        })
      });
  
      if (response.status === 403) {
        localStorage.removeItem('jwt');
        localStorage.removeItem('user');
        alert('Session expired. Please login again.');
        return;
      }
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save entry');
      }
  
      const data = await response.json();
      console.log("Entry saved:", data);
  
      // Reset form
      setTitle("");
      setEntry("");
      setReflection("");
      setTags("");
      setLocation("");
  
    } catch (error) {
      console.error("Submission error:", error);
      alert(error.message.includes('token') 
        ? 'Session expired. Please login again.' 
        : error.message || 'Failed to save entry');
    }
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
                required
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

            <div className="form-group">
              <label htmlFor="reflection"></label>
              <textarea
                id="reflection"
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
                placeholder="Reflection..."
                className="content-textarea"
                rows={5}
              />
            </div>

            <div className="form-group">
              <label htmlFor="tags"></label>
              <input
                id="tags"
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Tags (comma-separated)"
                className="title-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="location"></label>
              <input
                id="location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Location"
                className="title-input"
              />
            </div>

            <button type="submit" className="submit-button">
              Save Entry
            </button>
          </form>
        </section>

        <section id="old-entries">
          old entries list goes here
        </section>
      </main>
    </div>
  );
}

export default Dashboard;