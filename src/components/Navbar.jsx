import { Link } from "react-router-dom";
import "./css/Navbar.css";
import { FaLock } from "react-icons/fa";
function Navbar() {
  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo">
            <img
              src="/images/logo1.png"
              style={{ width: "110px", height: "100px", marginRight: "110vh" }}
            ></img>
            <i className="fab fa-typo3" />
          </Link>
          <div className="menu-icon">
            <i className="fas fa-bars" />
          </div>
          <ul className="nav-menu">
            <li className="nav-item">
              <Link
                to="/login"
                className="nav-links"
                style={{
                  position: "absolute",
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
              >
                <FaLock
                  style={{
                    color: "white",
                    marginRight: "2px",
                  }}
                />
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
    </>
  );
}

export default Navbar;
