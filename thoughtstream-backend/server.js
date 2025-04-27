/**
 * @file server.js
 * @description Main entry point for the ThoughtStream API.
 * Initializes Express, connects to MongoDB, sets up middleware,
 * and defines API routes.
 */

import express from "express"; // Web framework for Node.js
import dotenv from "dotenv"; // Loads environment variables from .env file
import cors from "cors"; // Enables Cross-Origin Resource Sharing
import connectDB from "./config/db.js"; // Database connection function
import diaryRoutes from "./routes/diaryRoutes.js"; // API routes for app;
import authRoutes from "./routes/authRoutes.js";

// Load environment variables from .env into process.env
dotenv.config();

// Initialize an Express application
const app = express();

// Establish a connection to the MongoDB database
connectDB();

/**
 * Middleware setup.
 * Processes incoming requests before reaching route handlers.
 * Executed in the order it is declared.
 */
app.use(express.json()); // Parses JSON request bodies
app.use(cors()); // Allows cross-origin requests (for frontend interaction)
// Parses cookies attached to incoming requests.
// Required by express-session to read the session ID from the cookie.





/**
 * Configures session management using express-session. This middleware
 * stores session data on the server and issues a session ID cookie
 * to the client (e.g., connect.sid). This cookie (s:<sessionId>.<hmac>)
 * contains a session ID and a HMAC for integrity verification.
 *
 * The HMAC (Hash-based Message Authentication Code) is generated using the
 * SESSION_SECRET and allows the server to verify that the cookie was not
 * altered by the client. If the cookie is tampered with, verification fails
 * and the session is invalidated.
 *
 * Generate a 32-byte secure secret using OpenSSL, an open source
 * cryptographic toolkit and library (https://www.openssl.org/):
 * openssl rand -hex 32
 * Store the 64-char hex string in your .env file as SESSION_SECRET.
 */


 
app.use("/api/auth", authRoutes);
  // Define API routes
// All requests to /api/diary are forwarded to diaryRoutes.js
app.use("/api/diary", diaryRoutes); // Mount routes under /api/diary
  


// Default route to check if the server is running
app.get("/", (req, res) => {
    res.send("Welcome to ThoughtStream API");
});

// Define the server port (uses environment variable or defaults to 5000)
const PORT = process.env.PORT || 4000;

// Start the Express server and listen for incoming requests
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
