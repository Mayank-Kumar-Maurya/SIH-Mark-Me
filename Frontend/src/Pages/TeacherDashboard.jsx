import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import ServerContext from "../Context/ServerContext.js";

// Chart imports
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const TeacherDashboard = ({ user }) => {
  const [year, setYear] = useState("3");
  const [branch, setBranch] = useState("CSE");
  const [subject, setSubject] = useState("DBMS");
  const [rollNumber, setRollNumber] = useState("");
  const [students, setStudents] = useState(null);

  const { fetchData } = useContext(ServerContext);

  const fetchByRollNumber = async () => {
    if (!rollNumber) {
      alert("Enter roll number");
      return;
    }

    try {
      let datares = await fetchData(rollNumber);
      setStudents(datares);
    } catch (err) {
      console.error(err);
      alert("No data found");
    }
  };

  // Prepare chart data
  let pieData = null;

  if (students) {
    const attendance = students?.data?.attendance || 0;
    const absent = 100 - attendance;

    pieData = {
      labels: ["Present %", "Absent %"],
      datasets: [
        {
          data: [attendance, absent],
          backgroundColor: ["#28a745", "#dc3545"], // green & red
          hoverBackgroundColor: ["#218838", "#c82333"],
        },
      ],
    };
  }

  return (
    <div className="container mt-4">
      <h2>Teacher Dashboard - Attendance Report</h2>

      {/* Filters */}
      <div className="row my-3">
        <div className="col-md-2">
          <label>Year</label>
          <select
            className="form-select"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>

        <div className="col-md-2">
          <label>Branch</label>
          <select
            className="form-select"
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
          >
            <option value="CSE">CSE</option>
          </select>
        </div>

        <div className="col-md-2">
          <label>Roll Number</label>
          <input
            type="text"
            className="form-control"
            value={rollNumber}
            onChange={(e) => setRollNumber(e.target.value)}
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="my-2">
        <button className="btn btn-secondary" onClick={fetchByRollNumber}>
          Check Specific Student
        </button>
      </div>

      {/* Attendance Table */}
      <div className="table-responsive mt-4">
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Roll Number</th>
              <th>Year</th>
              <th>Branch</th>
              <th>Attendance %</th>
            </tr>
          </thead>

          <tbody>
            {!students ? (
              <tr>
                <td colSpan="6" className="text-center">
                  No data to display
                </td>
              </tr>
            ) : (
              <tr>
                <td>{students.data.rollno}</td>
                <td>{students.data.year}</td>
                <td>{students.data.branch}</td>
                <td>{students.data.attendance}%</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pie Chart */}
      {students && (
        <div className="mt-5 text-center">
          <h4>Attendance Overview</h4>
          <div style={{ width: "350px", margin: "0 auto" }}>
            <Pie data={pieData} />
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherDashboard;
