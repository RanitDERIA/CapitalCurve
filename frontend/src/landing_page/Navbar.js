import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <div style={{ backgroundColor: "#2E2E38", color: "#ffffff" }}>
      <nav className="navbar navbar-expand-lg border-bottom">
        <div className="container">
          {/* Brand */}
          <NavLink className="navbar-brand" to="/">
            <img
              className="ms-5"
              src="media/images/brand.png"
              style={{ width: "25%" }}
              alt="capital-curve"
            />
          </NavLink>

          {/* Mobile Toggle */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar Links */}
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <form className="d-flex" role="search">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      "nav-link" +
                      (isActive ? " active fw-bold text-warning" : "")
                    }
                    to="/signup"
                  >
                    Signup
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      "nav-link" +
                      (isActive ? " active fw-bold text-warning" : "")
                    }
                    to="/about"
                  >
                    About
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      "nav-link" +
                      (isActive ? " active fw-bold text-warning" : "")
                    }
                    to="/pricing"
                  >
                    Pricing
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      "nav-link" +
                      (isActive ? " active fw-bold text-warning" : "")
                    }
                    to="/support"
                  >
                    Support
                  </NavLink>
                </li>

                {/* Menu Icon → only visible in mobile view */}
                <li className="nav-item d-block d-lg-none">
                  <NavLink
                    className={({ isActive }) =>
                      "nav-link" + (isActive ? " active text-warning" : "")
                    }
                    to="#"
                  >
                    <i className="fa-solid fa-bars"></i>
                  </NavLink>
                </li>
              </ul>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
