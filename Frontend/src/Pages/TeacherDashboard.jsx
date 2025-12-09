import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import ServerContext from "../Context/ServerContext.js";

// / Chart imports
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";


const TeacherDashboard = ({ user }) => {
  // Access control
//   if (user.role !== "teacher") {
//     return <h3 className="text-danger">Access Denied. Only teachers can view this page.</h3>;
//   }

  // State variables
  const [year, setYear] = useState("3");
  const [branch, setBranch] = useState("CSE");
  const [subject, setSubject] = useState("DBMS");
  // const [threshold, setThreshold] = useState(75);
  const [rollNumber, setRollNumber] = useState("");
  const [students, setStudents] = useState();

  const {fetchData} = useContext(ServerContext)

  // Fetch attendance by threshold
  // const fetchByThreshold = async () => {
  //   try {
  //     const res = await axios.get(`/teacher/attendance?year=${year}&branch=${branch}&subject=${subject}&threshold=${threshold}`);
  //     setStudents(res.data);
  //   } catch (err) {
  //     console.error(err);
  //     alert("Error fetching data");
  //   }
  // };

  // Fetch specific student
  const fetchByRollNumber = async () => {
    if (!rollNumber) 
      {
        alert("enter rollno");
        return;
      }
      
    try {
      let datares = await fetchData(rollNumber);
      console.log("data", datares, datares.rollno);
      setStudents(datares);
      console.log("student",students) // Wrap single student in array for table
    } catch (err) {
      console.error(err);
      alert("No data found");
    }
  };  

  ChartJS.register(ArcElement, Tooltip, Legend);
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
          backgroundColor: ["#28a745", "gray"], // green & red
          hoverBackgroundColor: ["#218838", "gray"],
        },
      ],
    };
  }


  return (
    <div className="container mt-4">
      <h2> Dashboard - Attendance Report</h2>

      {/* Filters */}
      <div className="row my-3 d-flex justify-content-center">
        {/* <div className="col-md-2">
          <label>Year</label>
          <select className="form-select" value={year} onChange={e => setYear(e.target.value)}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div> */}
        {/* <div className="col-md-2">
          <label>Branch</label>
          <select className="form-select" value={branch} onChange={e => setBranch(e.target.value)}>
            <option value="CSE">CSE</option>
          </select>
        </div> */}
        {/* <div className="col-md-2">
          <label>Subject</label>
          <select className="form-select" value={subject} onChange={e => setSubject(e.target.value)}>
            <option value="DBMS">DBMS</option>
            <option value="OS">OS</option>
            <option value="Networking">Networking</option>
          </select>
        </div> */}
        {/* <div className="col-md-2">
          <label>Attendance Threshold %</label>
          <input type="number" className="form-control" value={threshold} onChange={e => setThreshold(e.target.value)} />
        </div> */}
        <div className="col-md-2">
          <label>Roll Number</label>
          <input type="text" className="form-control" value={rollNumber} onChange={e => setRollNumber(e.target.value)} />
        </div>
      </div>

      {/* Buttons */}
      <div className="my-2">
        {/* <button className="btn btn-primary me-2" onClick={fetchByThreshold}>Show Students Below Threshold</button> */}
        <button className="btn btn-outline-success" onClick={fetchByRollNumber}>Check Attendence</button>
      </div>

      {/* Attendance Table */}
      <div className="table-responsive mt-4">
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Roll Number</th>
            
              {/* <th>Subject</th> */}
              <th>Year</th>
              <th>Branch</th>
              <th>Attendance %</th>
            </tr>
          </thead>
          <tbody>
            {/* <p>{students}</p> */}
            {!students ? (
              <tr><td colSpan="6" className="text-center">No data to display</td></tr>
            ) : (
              // students.map(student => (
                // <tr key={student.roll_number} style={{ color: student.attendance_percentage < threshold ? "red" : "black" }}>
                <tr>
                  <td>{students.data.rollno}</td>
                  {/* <td>{student.name}</td> */}
                  {/* <td>{student.subject}</td> */}
                  <td>{students.data.year}</td>
                  <td>{students.data.branch}</td>
                  <td>{students.data.attendance}%</td>
                </tr>
              // ))
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