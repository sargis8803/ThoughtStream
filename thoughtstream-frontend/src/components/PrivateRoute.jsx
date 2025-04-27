import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
const PrivateRoute = ({
    children}) => {
  const {isAuthenticated} = useContext(AuthContext);

  if (!isAuthenticated()){//checks for authentication, proceeds accordingly
    return <Navigate to="/login" replace />;//user not authenticated so redirects back to login
  }
  return children;//reached here so we can render page components. 
};

export default PrivateRoute;
