import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top">
      <div className="container">
        {/* Logo + Name */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          {/* <img
            src="logo.png"
            alt="logo"
            width="40"
            height="40"
            className="me-2"
          /> */}
          <h3 className="m-0 fw-bold text-primary">Mark_Me</h3>
        </Link>

        {/* Toggle button for mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto gap-3">
            <li className="nav-item">
              <Link className="nav-link fw-semibold" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-semibold" to="/teacher-dashboard">
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-semibold" to="/about">
                About
              </Link>
            </li>
          </ul>

          {/* Right side buttons */}
          <div className="d-flex gap-2">
            <Link to="/student-registration" className="btn btn-dark">
              Register
            </Link>
            <Link to="/student-login" className="btn btn-primary">
              Student
            </Link>
            <Link to="/faculty-session" className="btn btn-outline-primary">
              Faculty
            </Link>
            <Link to="/FacultyLogin" className="btn btn-success">
              Faculty Login
            </Link>
            
          </div>
        </div>
      </div>
    </nav>
  );
}

