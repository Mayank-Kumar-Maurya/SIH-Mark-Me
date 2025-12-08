import React, { useState, useRef,useEffect } from "react";

export default function StudentPanel() {
  const [year1, setYear1] = useState("");
  const [branch1, setBranch1] = useState("");
  const [roll, setRoll] = useState("");
  const [subject1, setSubject1] = useState("");
  const [cameraOn, setCameraOn] = useState(false);

  const videoRef = useRef(null);

  // Start Camera
  // const startCamera = async () => {
  //   try {
  //     const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  //     videoRef.current.srcObject = stream;
  //     videoRef.current.play();
  //     setCameraOn(true);
  //   } catch (error) {
  //     alert("Camera Access Denied!");
  //     console.log(error);
  //   }
  // };

  const startCamera = () => {
    setCameraOn(true); 
  };

  useEffect(() => {
  async function attachStream() {
    if (cameraOn && videoRef.current) {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    }
  }
    attachStream();
  }, [cameraOn]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!year1 || !branch1 || !roll || !subject1) {
      alert("Please fill all fields.");
      return;
    }

    alert(
      `Attendance Request Submitted:
       Year: ${year1}
       Branch: ${branch1}
       Roll No: ${roll}
       Subject: ${subject1}
       Camera: ${cameraOn ? "Started" : "Not Started"}`
      );
      // cameraOn(false);
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", background: "rgba(240, 240, 240, 0.9)" }}
    >
      <div
        className="card shadow-lg p-4 border-0"
        style={{
          maxWidth: "430px",
          width: "100%",
          borderRadius: "20px",
          background: "white",
        }}
      >
        <h2 className="text-center mb-4 fw-bold text-primary">
          🎓 Student Attendance Panel
        </h2>

        <form onSubmit={handleSubmit}>
          {/* YEAR */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Select Year</label>
            <select
              className="form-select shadow-sm"
              value={year1}
              onChange={(e) => setYear1(e.target.value)}
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
              value={branch1}
              onChange={(e) => setBranch1(e.target.value)}
            >
              <option value="">Choose...</option>
              <option>CSE</option>
              <option>IT</option>
              <option>AIML</option>
              <option>ECE</option>
              <option>ME</option>
            </select>
          </div>

          {/* ROLL NO */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Roll Number</label>
            <input
              type="text"
              className="form-control shadow-sm"
              placeholder="Enter your roll no."
              value={roll}
              onChange={(e) => setRoll(e.target.value)}
            />
          </div>

          {/* SUBJECT */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Select Subject</label>
            <select
              className="form-select shadow-sm"
              value={subject1}
              onChange={(e) => setSubject1(e.target.value)}
            >
              <option value="">Choose...</option>
              <option>Data Structures</option>
              <option>Operating Systems</option>
              <option>DBMS</option>
              <option>Computer Networks</option>
              <option>Software Engineering</option>
            </select>
          </div>

          {/* CAMERA BUTTON */}
          {!cameraOn && (
          <div className="d-flex justify-content-center mb-3">
            <button
              type="button"
              onClick={startCamera}
              className="btn btn-success px-4 py-2 fw-bold shadow-sm"
              style={{ borderRadius: "12px" }}
            >
              📸 Start Video
            </button>
          </div>
          )}

          {/* VIDEO PREVIEW */}
          {cameraOn && (
            <div className="mb-3 text-center">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                style={{
                  width: "100%",
                  borderRadius: "12px",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                }}
              ></video>
            </div>
          )}

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            className="btn btn-primary w-100 py-2 fw-semibold shadow-sm"
            style={{ borderRadius: "12px", fontSize: "1.1rem" }}
          >
            ✅ Submit Attendance
          </button>
        </form>
      </div>
    </div>
  );
}
