import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import WeatherWidget from "../components/WeatherWidget";

function Header({ setLocation }) {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="dashboard-header">
      <div className="header-left">
        <h1>Thought Stream</h1>
        <WeatherWidget setLocation={setLocation} />
      </div>
      <div className="user-info">
        <span>Welcome, {user?.name}!</span>
        <button onClick={logout}>Logout</button>
      </div>
    </header>
  );
}

export default Header;