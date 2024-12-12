import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaLock, FaBars, FaTimes } from "react-icons/fa";
import "./css/Navbar.css";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src="/images/logo1.png" alt="Logo" className="logo-image" />
        </Link>
        <div className="menu-icon" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </div>
        <ul className={isMenuOpen ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item nav-item-center">
            <Link to="/login" className="nav-links">
              <FaLock className="lock-icon" />
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-links">
              About Us
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/contact" className="nav-links">
              Contact Us
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
