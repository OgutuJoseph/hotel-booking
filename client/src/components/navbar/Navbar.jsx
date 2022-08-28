import React, { useContext } from 'react';
import "./navbar.css";
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const Navbar = () => {
  
  const { user } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to='/' style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">Hotel-Booking</span>
        </Link>
        {!user && (
          <div className="navItems">
            <button className="navButton">Register</button>
            <Link to="/login">
              <button className="navButton">Login</button>
            </Link>
          </div>
        )}
        {user && <span>Logged in as, {user.username}</span>}
      </div>
    </div>
  )
}

export default Navbar