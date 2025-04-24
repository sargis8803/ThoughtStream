// middleware/authMiddleware.js
//
// Note: Install jsonwebtoken in your project directory for this middleware to work.
// npm install jsonwebtoken
//
// The jsonwebtoken library provides all the core functionality for:
// - Signing a JWT (e.g., jwt.sign(...) when creating a token during login)
// - Verifying a JWT (e.g., jwt.verify(...) in your authMiddleware.js)
// - Decoding and validating the payload
import jwt from "jsonwebtoken";
/**
* This middleware function verifies the presence and validity of a JWT token
* in the Authorization header of incoming requests.
*
* If the token is valid, it decodes it and attaches the user's ID to the
* request object, allowing route handlers to identify the user.
*
* This is essential for protecting routes in Part 3 of the ThoughtStream project.
*/
const authenticateJWT = (req, res, next) => {
// Read the Authorization header (format: "Bearer <token>")
const authHeader = req.headers.authorization;
// Check if the token is present and properly formatted
if (!authHeader || !authHeader.startsWith("Bearer ")) {
return res.status(401).json({ message: "Authorization token missing or malformed" });
}
// Extract the token from the header string
const token = authHeader.split(" ")[1]; // the part after "Bearer"
try {
/**
* Verify the token using the JWT secret
*
* - The token should have been signed using the same JWT_SECRET on login.
* - The payload should include a field named "userId" that was set when the JWT was issued.
* - If verification succeeds, the payload is returned and we can extract the user info.
*/
const decoded = jwt.verify(token, process.env.JWT_SECRET);
/**
* 🧾 Step 3: Attach the decoded user ID to the request object
*
* - req.user.userId will be available in all route handlers that follow.
* - You will use this in your diary entry logic to enforce ownership:
* DiaryEntry.find({ userId: req.user.userId })
*/
req.user = { userId: decoded.userId };
// Allow the request to proceed to the route handler
next();
} catch (err) {
// If the token is invalid or expired, deny access
console.error("JWT verification failed:", err.message);
return res.status(403).json({ message: "Invalid or expired token" });
}
};
export default authenticateJWT;