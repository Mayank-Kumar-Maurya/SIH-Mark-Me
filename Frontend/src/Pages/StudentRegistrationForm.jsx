import React, { useState, useRef, useContext, useEffect } from "react";
import ServerContext from "../Context/ServerContext.js";
import { loadModels, detectFace, drawBoundingBox } from "../faceDetection";

export default function StudentRegistration() {
  // const [year2, setYear2] = useState("");
  // const [branch2, setBranch2] = useState("");
  // const [roll2, setRoll2] = useState("");
  // const [subject2, setSubject2] = useState("");

  const [cameraOn, setCameraOn] = useState(false);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [loadingDescriptor, setLoadingDescriptor] = useState(false);

  // const [cameraOn, setCameraOn] = useState(false);

  const {year2, setYear2, branch2, setBranch2, roll2, setRoll2, subject2, setSubject2, setDescriptor, createStudent} = useContext(ServerContext);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const detectionInterval = useRef(null);

  const startCamera = () => setCameraOn(true);

  useEffect(() => {
    let stream;
    async function attachCamera() {
      if (cameraOn && videoRef.current) {
        try {
          stream = await navigator.mediaDevices.getUserMedia({ video: true });
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        } catch (err) {
          alert("Camera access denied!");
          console.error(err);
          setCameraOn(false);
        }
      }
    }
    attachCamera();

    return () => {
      if (stream) stream.getTracks().forEach((t) => t.stop());
    };
  }, [cameraOn]);

  useEffect(() => {
    loadModels().then(() => setModelsLoaded(true));
  }, []);

  useEffect(() => {
    if (!cameraOn || !modelsLoaded) return;

    detectionInterval.current = setInterval(async () => {
      if (!videoRef.current || !canvasRef.current) return;

      const video = videoRef.current;

      const detections = await window.faceapi
        .detectAllFaces(
          video,
          new window.faceapi.TinyFaceDetectorOptions()
        )
        .withFaceLandmarks();

      drawBoundingBox(video, canvasRef.current, detections);
    }, 120);

    return () => clearInterval(detectionInterval.current);
  }, [cameraOn, modelsLoaded]);

  const handleSubmit = async(e) => {
    e.preventDefault();

    // if (!year2 || !branch2 || !roll2 || !subject2) {
    if (!year2 || !branch2 || !roll2) {
      alert("Please fill all fields.");
      return;
    }

    if (!cameraOn) {
      alert("Start the video first!");
      return;
    }

    if (!modelsLoaded) {
      alert("Models still loading, please wait...");
      return;
    }

    try {
      setLoadingDescriptor(true);

      const result = await detectFace(videoRef.current);
      console.log("video result: ", result);
      

      if (!result || !result.descriptor) {
        alert("No face detected! Keep your face in front of camera.");
        setLoadingDescriptor(false);
        
        return;
      }

      // OPTION 2 → send object { descriptor: [...] }
      // sendFaceDescriptor({ descriptor: result.descriptor });
      setDescriptor(result.descriptor);
      console.log(result.descriptor);
      console.log(result.descriptor.length);

      // setSendToBackend(true);
    } catch (error) {
      console.error("Descriptor Error:", error);
      alert("Something went wrong while detecting your face.");
    } finally {
      setLoadingDescriptor(false);
    }

    // alert(
    //   `Attendance Request Submitted:
    //    Year: ${year2}
    //    Branch: ${branch2}
    //    Roll No: ${roll2}
    //    Subject: ${subject2}
    //    Camera: ${cameraOn ? "Started" : "Not Started"}`
    // );



  };

  return (
    <div
      className="d-flex justify-content-center align-items-center mt-4"
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
           Student Registration Form
        </h2>

        <form onSubmit={handleSubmit}>
          {/* YEAR */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Select Year</label>
            <select
              className="form-select shadow-sm"
              value={year2}
              onChange={(e) => setYear2(e.target.value)}
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
              value={branch2}
              onChange={(e) => setBranch2(e.target.value)}
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
              value={roll2}
              onChange={(e) => setRoll2(e.target.value)}
            />
          </div>

          {/* SUBJECT */}
          {/* <div className="mb-3">
            <label className="form-label fw-semibold">Select Subject</label>
            <select
              className="form-select shadow-sm"
              value={subject2}
              onChange={(e) => setSubject2(e.target.value)}
            >
              <option value="">Choose...</option>
              <option>Data Structures</option>
              <option>Operating Systems</option>
              <option>DBMS</option>
              <option>Computer Networks</option>
              <option>Software Engineering</option>
            </select>
          </div> */}

          {/* CAMERA BUTTON */}
          {!cameraOn && (
            <div className="d-flex justify-content-center mb-3">
              <button
                type="button"
                className="btn btn-success px-4 py-2 fw-bold shadow-sm"
                onClick={startCamera}
              >
                📸 Start Video
              </button>
            </div>
          )}

          {/* CAMERA BUTTON */}
          {cameraOn && (
            <div
              className="mb-3 text-center"
              style={{ position: "relative" }}
            >
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                style={{
                  width: "100%",
                  borderRadius: "12px",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                }}
              />
              <canvas
                ref={canvasRef}
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  width: "100%",
                  height: "100%",
                }}
              />
            </div>
          )}

          {/* SUBMIT */}
          <button
            type="submit"
            className="btn btn-primary w-100 py-2 fw-semibold shadow-sm"
            disabled={loadingDescriptor}
          >
            {loadingDescriptor ? "🔍 Detecting Face..." : "✅ Submit Attendance"}
          </button>
          <button className="btn btn-primary m-1" onClick={createStudent}>submit</button>
        </form>
      </div>
    </div>
  );
}
