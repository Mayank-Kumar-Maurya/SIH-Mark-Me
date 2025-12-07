import React, { useState } from "react";

export default function FacultySession() {
  const [year, setYear] = useState("");
  const [branch, setBranch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (year === "" || branch === "") {
      alert("Please select both Year and Branch.");
      return;
    }

    alert(`Session opened for:\nYear: ${year}\nBranch: ${branch}`);
  };

  return (
    <div className="container mt-5 pt-5">
      <div className="card shadow p-4 mx-auto" style={{ maxWidth: "450px" }}>
        <h3 className="text-center mb-4 text-primary fw-bold">Faculty Panel</h3>

        <form onSubmit={handleSubmit}>
          {/* Year */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Select Year</label>
            <select
              className="form-select"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            >
              <option value="">Choose...</option>
              <option value="1st Year">1st Year</option>
              <option value="2nd Year">2nd Year</option>
              <option value="3rd Year">3rd Year</option>
              <option value="4th Year">4th Year</option>
            </select>
          </div>

          {/* Branch */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Select Branch</label>
            <select
              className="form-select"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
            >
              <option value="">Choose...</option>
              <option value="CSE">CSE</option>
              <option value="IT">IT</option>
              <option value="AIML">AIML</option>
              <option value="ECE">ECE</option>
              <option value="ME">ME</option>
            </select>
          </div>

          {/* Button */}
          <button type="submit" className="btn btn-primary w-100">
            Session Open
          </button>
        </form>
      </div>
    </div>
  );
}
