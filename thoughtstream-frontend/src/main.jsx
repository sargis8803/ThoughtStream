// File: src/main.jsx
/**
* Entry point for the ThoughtStream React frontend
*
* - Initializes and mounts the root React component (<App />) into the DOM
* - Wraps the app in:
* 1. <BrowserRouter> for client-side routing
* 2. <AuthProvider> for global authentication context
* 3. <React.StrictMode> for highlighting potential problems in development
*/
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import AuthProvider from "./context/AuthContext";
import React from 'react';
// Select the root DOM node from index.html (must match <div id="root">)
const rootElement = document.getElementById("root");
// Create a root rendering context (React 18+ API)
const root = ReactDOM.createRoot(rootElement);
// Render the application
root.render(
<React.StrictMode>
{/* Enables route-based navigation without full page reload */}
<BrowserRouter>
{/* Provides authentication context to the entire component tree */}
<AuthProvider>
{/* Main application component */}
<App />
</AuthProvider>
</BrowserRouter>
</React.StrictMode>
);
