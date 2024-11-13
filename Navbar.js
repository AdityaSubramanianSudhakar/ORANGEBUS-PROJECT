import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css'; // Adjust the path as necessary

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">OrangeBus</Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><a href="#about">About</a></li> {/* Link to the About section */}
        <li><a href="#contact">Contact</a></li> {/* Link to the Contact section */}
        <li><Link to="/login" className="login-btn">Login</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;