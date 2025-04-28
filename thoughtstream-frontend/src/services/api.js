// services/api.js
// Import Axios for making HTTP requests
import axios from "axios";
// Import your utility function that retrieves the stored authentication token (JWT)
import { getAuthToken } from "../utils/auth";
/**
* Create a customized Axios instance for communicating with the backend API.
*
* The baseURL is loaded from an environment variable using Vite’s import.meta.env
* This allows for easy switching between development and production servers.
*
*/
const api = axios.create({
baseURL: import.meta.env.VITE_API_BASE_URL,
});
/**
* Request Interceptor
*
* This function runs before every outgoing HTTP request made through the api
* instance. It automatically adds an Authorization header with the JWT token if
* one exists.
*
* The token is expected to be stored (e.g., in localStorage) and retrieved using
* getAuthToken().
*
* Format of the header:
* Authorization: Bearer <token>
*
* This ensures all authenticated API requests include the necessary credentials
* without repeating code.
*/
api.interceptors.request.use((config) => {
// Equivalent to: const token = localStorage.getItem("jwt")
// Retrieves the JWT stored after login to authenticate outgoing API requests
const token = getAuthToken();
if (token) {
// Attach the token to the Authorization header if it exists
config.headers.Authorization = `Bearer ${token}`;
}
// Return the updated config to proceed with the request
return config;
});
/**
* Export the configured Axios instance
*
* This can now be used throughout your React app to make secure API calls.
* Example usage:
* api.get("/diary") or api.post("/diary", { title, content })
*/
export default api;