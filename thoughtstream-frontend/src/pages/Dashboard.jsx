import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import DiaryList from "../components/DiaryList";
import Header from "../components/Header";

function Dashboard() {
  const { user, logout } = useContext(AuthContext);

  const [title, setTitle] = useState("");
  const [entry, setEntry] = useState("");
  const [reflection, setReflection] = useState("");
  const [tags, setTags] = useState("");
  const [location, setLocation] = useState("");  // Location state   
  const [newEntry, setNewEntry] = useState(null);


  // Call WeatherWidget's location functionality directly here
  useEffect(() => {
    // You can use the same logic that was inside WeatherWidget to get location data
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            // Here you could get more location details if needed or just pass lat/lon
            setLocation(`${lat}, ${lon}`); // Set location with lat and lon or full address
          },
          (error) => {
            console.error("Error getting location: ", error);
            setLocation("Location not available");
          }
        );
      }
    };

    getLocation();  // Trigger location fetching on mount
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Location on submit:", location);

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

      setNewEntry(data); // Pass the saved entry

      // Reset form
      setTitle("");
      setEntry("");
      setReflection("");
      setTags("");
      

    } catch (error) {
      console.error("Submission error:", error);
      alert(error.message.includes('token') 
        ? 'Session expired. Please login again.' 
        : error.message || 'Failed to save entry');
    }
  };

  return (
    <div className="dashboard-page">
      <Header setLocation={setLocation} />
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
            
            <button type="submit" className="submit-button">
              Save Entry
            </button>
          </form>
        </section>

        <section id="old-entries">
        <DiaryList newEntry={newEntry} />
        </section>
      </main>
    </div>
  );
}

export default Dashboard;