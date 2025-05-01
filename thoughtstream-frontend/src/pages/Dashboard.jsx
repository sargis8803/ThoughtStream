import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import DiaryList from "../components/DiaryList";
import Header from "../components/Header";
import NewEntryForm from "../components/NewEntryForm";

function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const [location, setLocation] = useState("");      // Location to pass into the form
  const [newEntry, setNewEntry] = useState(null);    // Newly submitted entry to pass to DiaryList

  // Get user location
  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            setLocation(`${lat}, ${lon}`);
          },
          (error) => {
            console.error("Error getting location: ", error);
            setLocation("Location not available");
          }
        );
      }
    };

    getLocation();
  }, []);

  return (
    <div className="dashboard-page">
      <Header setLocation={setLocation} />
      <main className="dashboard-main">
        <section id="text-entry">
          <NewEntryForm location={location} setNewEntry={setNewEntry} />
        </section>

        <section id="old-entries">
          {/* display list of diary entries */}
          <DiaryList newEntry={newEntry} />
        </section>
      </main>
    </div>
  );
}

export default Dashboard;