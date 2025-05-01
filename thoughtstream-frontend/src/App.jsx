import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import './App.css';;

function App() {
  //const { isAuthenticated } = useContext(AuthContext);
  const isAuthenticated = true //temp for debugging
  console.log("Is Authenticated?", isAuthenticated);

  return (
    <Routes>
      
      <Route 
        path="/" 
        element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} 
      />
      <Route 
        path="/login" //route defined here, can test privateroute for auth verification
        element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} 
      />
      <Route 
        path="/dashboard" 
        element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} 
      />
    </Routes>
  );
}

export default App;
