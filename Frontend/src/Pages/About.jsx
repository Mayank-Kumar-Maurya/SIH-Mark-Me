import React from "react";

export default function AboutUs() {
  return (
    <section className="py-5 bg-light">
      <div className="container">
        {/* Heading */}
        <div className="text-center mb-5">
          <h2 className="fw-bold">About Mark_Me</h2>
          <p className="text-muted">
            A smart and secure attendance system designed for modern classrooms.
          </p>
        </div>

        <div className="row align-items-center">
          {/* Left Side Text */}
          <div className="col-md-6">
            <h4 className="fw-bold mb-3">What is Mark_Me?</h4>
            <p className="text-muted">
              Mark_Me is a next-generation classroom attendance system where
              students can mark their attendance instantly using their mobile
              phones. The system uses secure <strong>Face Recognition</strong>
              to verify identity and prevent proxy attendance.
            </p>

            <h5 className="fw-bold mt-4">How It Works</h5>
            <ul className="text-muted">
              <li>
                The teacher starts a <strong>Session</strong> for the period.
              </li>
              <li>The session stays open only for a limited time.</li>
              <li>
                Students open the page on their phone and scan their face.
              </li>
              <li>
                If the session is active and face matches, attendance is marked.
              </li>
              <li>
                When the teacher closes the session, <strong>no more</strong>
                attendance can be submitted.
              </li>
            </ul>

            <h5 className="fw-bold mt-4">Why Face Scan?</h5>
            <p className="text-muted">
              Face scanning ensures fair and accurate attendance. It eliminates
              proxy, reduces manual workload, and gives teachers full control
              over who can mark attendance.
            </p>
          </div>

          {/* Right Side Image */}
          <div className="col-md-6 text-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/747/747376.png"
              alt="face scan"
              className="img-fluid"
              style={{ maxWidth: "70%" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
