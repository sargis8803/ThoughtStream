import React, {useContext} from "react";
import { AuthContext } from "../context/AuthContext";

function Header(){
    const {user, logout} = useContext(AuthContext);
    return(
        <header className="dashboard-header">
            <h1>Though Stream Dashboard</h1>
            <div className="user-info">
                <span>Welcome, {user?.name}!</span>
                <button onClick={logout}>Logout</button>
            </div>
        </header>
    );
    
}
export default Header;