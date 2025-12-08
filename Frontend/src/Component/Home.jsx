import React from 'react'
import Navbar from './Navbar'

function Home() {
  return (
    <>
      <div
        className="container-fluid py-5"
        style={{ backgroundColor: "#f5f8ff", minHeight: "100vh" }}
      >
        <div className="container">
          <div className="row align-items-center">
            {/* LEFT SIDE TEXT */}
            <div className="col-md-6 mb-4">
              <span className="badge bg-secondary px-3 py-2 mb-3">
                Next-gen Attendance
              </span>

              <h1 className="fw-bold display-5">
                Smart, secure, and effortless <br /> attendance
              </h1>

              <p className="text-muted my-3">
                Use camera-based face detection and one-click sessions to manage
                classes with ease. Built for speed, privacy, and accuracy.
              </p>

            </div>

            {/* RIGHT SIDE IMAGE IN ROUNDED CARD */}
            <div className="col-md-6">
              <div
                style={{
                  width: "80%",
                  height: "310px",
                  backgroundColor: "white",
                  borderRadius: "25px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  padding: "10px",
                  overflow: "hidden",
                }}
              >
                <img
                  src="https://skoolapp.com/wp-content/uploads/2018/03/website-attandence-features-page.png"
                  alt="Preview"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "20px",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home
