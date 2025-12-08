import React, { useState } from "react";

export default function FacultySession() {
  const [year, setYear] = useState("");
  const [branch, setBranch] = useState("");
  const [subject, setSubject] = useState("");
  const [isOnline, setIsOnline] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!year || !branch) {
      alert("Please select Year and Branch.");
      return;
    }

    if (year === "3rd Year" && branch === "CSE" && !subject) {
      alert("Please select a subject for CSE 3rd Year.");
      return;
    }

    alert(
      `Session opened for:
       Mode: ${isOnline ? "Online" : "Offline"}
       Year: ${year}
       Branch: ${branch}
       Subject: ${subject}`
    );
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", background: "rgba(255, 255, 255, 0.9)" }}
    >
      <div
        className="card shadow-lg p-4 border-0"
        style={{
          maxWidth: "430px",
          width: "100%",
          borderRadius: "20px",
          background: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(8px)",
        }}
      >
        <h2 className="text-center mb-4 fw-bold text-primary">
          Faculty Control Panel
        </h2>

        {/* Toggle Mode */}
        <div className="d-flex justify-content-center mb-4">
          <div
            className={`p-2 px-4 rounded-pill shadow-sm fw-bold ${
              isOnline ? "bg-success text-white" : "bg-danger text-white"
            }`}
            style={{ cursor: "pointer", transition: "0.3s" }}
            onClick={() => setIsOnline(!isOnline)}
          >
            {isOnline ? "🟢 Online Mode" : "🔴 Offline Mode"}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* YEAR */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Select Year</label>
            <select
              className="form-select shadow-sm"
              value={year}
              onChange={(e) => {
                setYear(e.target.value);
                setSubject("");
              }}
            >
              <option value="">Choose...</option>
              <option>1st Year</option>
              <option>2nd Year</option>
              <option>3rd Year</option>
              <option>4th Year</option>
            </select>
          </div>

          {/* BRANCH */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Select Branch</label>
            <select
              className="form-select shadow-sm"
              value={branch}
              onChange={(e) => {
                setBranch(e.target.value);
                setSubject("");
              }}
            >
              <option value="">Choose...</option>
              <option>CSE</option>
              <option>IT</option>
              <option>AIML</option>
              <option>ECE</option>
              <option>ME</option>
            </select>
          </div>

          {/* SUBJECT (Visible ONLY when CSE + 3rd Year) */}
          
            <div className="mb-4">
              <label className="form-label fw-semibold">Select Subject</label>
              <select
                className="form-select shadow-sm"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              >
                <option value="">Choose...</option>
                <option>Data Structures</option>
                <option>Operating Systems</option>
                <option>DBMS</option>
                <option>Computer Networks</option>
                <option>Software Engineering</option>
              </select>
            </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="btn btn-primary w-100 py-2 fw-semibold shadow-sm"
            style={{ borderRadius: "12px", fontSize: "1.1rem" }}
          >
            🚀 Open Session
          </button>
        </form>
      </div>
    </div>
  );
}
