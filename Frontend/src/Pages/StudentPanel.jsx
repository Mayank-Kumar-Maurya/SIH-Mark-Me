// import React, { useState, useRef, useContext, useEffect } from "react";
// import ServerContext from "../Context/ServerContext.js";

// export default function StudentPanel() {
//   // const [year1, setYear1] = useState("");
//   // const [branch1, setBranch1] = useState("");
//   // const [roll, setRoll] = useState("");
//   // const [subject1, setSubject1] = useState("");
//   const [cameraOn, setCameraOn] = useState(false);

//   const {year1, branch1, roll, subject1, setYear1, setBranch1, setRoll, setSubject1, year, branch, subject, isOnline, setSendToBackend, sendFaceDescriptor} = useContext(ServerContext);

//   const videoRef = useRef(null);

//   // Start Camera
//   let vid = useState(null);
//   // const startCamera = async () => {
//   //   try {
//   //     const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
//   //     videoRef.current.srcObject = stream;
//   //     vid = stream;
//   //     setCameraOn(true);
//   //   } catch (error) {
//   //     console.log("err: ",error);
//   //     alert("Camera Access Denied!");
//   //   }
//   // };

// const startCamera = ()=>
// {
//   setCameraOn(true);
// }

// useEffect(()=>
//   {
//     async function attachStream()
//     {
//       if(cameraOn && videoRef.current)
//       {
//         const stream = await navigator.mediaDevices.getUserMedia({video: true})
//         videoRef.current.srcObject = stream;
//         videoRef.current.play();
//       }
//     }

//     attachStream();

//   }, [cameraOn]);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!year1 || !branch1 || !roll || !subject1) {
//       alert("Please fill all fields.");
//       return;
//     }

//     if(year1 == year && branch1 == branch && subject1 == subject)
//     {
//       setSendToBackend(true);
//       sendFaceDescriptor();
//       return;
//     }
//     else
//     {
//       alert("for this details no session is opend");
//     }

//     // alert(
//     //   `Attendance Request Submitted:
//     //    Year: ${year1}
//     //    Branch: ${branch1}
//     //    Roll No: ${roll}
//     //    Subject: ${subject1}
//     //    Camera: ${cameraOn ? "Started" : "Not Started"}`
//     // );
//   };

//   return (
//     <div
//       className="d-flex justify-content-center align-items-center"
//       style={{ minHeight: "100vh", background: "rgba(240, 240, 240, 0.9)" }}
//     >
//       <div
//         className="card shadow-lg p-4 border-0"
//         style={{
//           maxWidth: "430px",
//           width: "100%",
//           borderRadius: "20px",
//           background: "white",
//         }}
//       >
//         <h2 className="text-center mb-4 fw-bold text-primary">
//           🎓 Student Attendance Panel
//         </h2>

//         <form onSubmit={handleSubmit}>
//           {/* YEAR */}
//           <div className="mb-3">
//             <label className="form-label fw-semibold">Select Year</label>
//             <select
//               className="form-select shadow-sm"
//               value={year1}
//               onChange={(e) => setYear1(e.target.value)}
//             >
//               <option value="">Choose...</option>
//               <option>1st Year</option>
//               <option>2nd Year</option>
//               <option>3rd Year</option>
//               <option>4th Year</option>
//             </select>
//           </div>

//           {/* BRANCH */}
//           <div className="mb-3">
//             <label className="form-label fw-semibold">Select Branch</label>
//             <select
//               className="form-select shadow-sm"
//               value={branch1}
//               onChange={(e) => setBranch1(e.target.value)}
//             >
//               <option value="">Choose...</option>
//               <option>CSE</option>
//               <option>IT</option>
//               <option>AIML</option>
//               <option>ECE</option>
//               <option>ME</option>
//             </select>
//           </div>

//           {/* ROLL NO */}
//           <div className="mb-3">
//             <label className="form-label fw-semibold">Roll Number</label>
//             <input
//               type="text"
//               className="form-control shadow-sm"
//               placeholder="Enter your roll no."
//               value={roll}
//               onChange={(e) => setRoll(e.target.value)}
//             />
//           </div>

//           {/* SUBJECT */}
//           <div className="mb-3">
//             <label className="form-label fw-semibold">Select Subject</label>
//             <select
//               className="form-select shadow-sm"
//               value={subject1}
//               onChange={(e) => setSubject1(e.target.value)}
//             >
//               <option value="">Choose...</option>
//               <option>Data Structures</option>
//               <option>Operating Systems</option>
//               <option>DBMS</option>
//               <option>Computer Networks</option>
//               <option>Software Engineering</option>
//             </select>
//           </div>

//           {/* CAMERA BUTTON */}
//           {!cameraOn && (<div className="d-flex justify-content-center mb-3">
//             <button
//               type="button"
//               onClick={startCamera}
//               className="btn btn-success px-4 py-2 fw-bold shadow-sm"
//               style={{ borderRadius: "12px" }}
//             >
//               📸 Start Video
//             </button>
//           </div>)}

//           {/* VIDEO PREVIEW */}
//           {cameraOn && (
//             <div className="mb-3 text-center">
//               <video
//                 ref={videoRef}
//                 // src={vid}
//                 autoPlay
//                 playsInline
//                 muted
//                 style={{
//                   width: "100%",
//                   borderRadius: "12px",
//                   boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
//                 }}
//               >
//                  {/* <source  src={vid} type="video/mp4"></source> */}
//               </video>
//             </div>
//           )}

//           {/* SUBMIT BUTTON */}
//           <button
//             type="submit"
//             className="btn btn-primary w-100 py-2 fw-semibold shadow-sm"
//             style={{ borderRadius: "12px", fontSize: "1.1rem" }}
//           >
//             ✅ Submit Attendance
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }


import React, { useState, useRef, useContext, useEffect } from "react";
import ServerContext from "../Context/ServerContext.js";

import { loadModels, detectFace, drawBoundingBox } from "../faceDetection";

export default function StudentPanel() {
  const [cameraOn, setCameraOn] = useState(false);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [loadingDescriptor, setLoadingDescriptor] = useState(false);

  const {
    year1,
    branch1,
    roll,
    subject1,
    setYear1,
    setBranch1,
    setRoll,
    setSubject1,
    year,
    branch,
    subject,
    setSendToBackend,
    sendFaceDescriptor,
    setDescriptor
  } = useContext(ServerContext);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (!roll || !subject1) {
    if (!roll ) {
      alert("Please fill all fields!");
      return;
    }

    // if (!(subject1 === subject)) {
    //   alert("No active session for these details");
    //   return;
    // }

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

      setSendToBackend(true);
    } catch (error) {
      console.error("Descriptor Error:", error);
      alert("Something went wrong while detecting your face.");
    } finally {
      setLoadingDescriptor(false);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center py-4 mt-4"
      style={{ minHeight: "100vh", background: "rgba(240,240,240,0.9)" }}
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
          {/* <div className="mb-3">
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
          </div> */}

          {/* BRANCH */}
          {/* <div className="mb-3">
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
          </div> */}

          {/* ROLL */}
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
                className="btn btn-success px-4 py-2 fw-bold shadow-sm"
                onClick={startCamera}
              >
                📸 Start Video
              </button>
            </div>
          )}

          {/* VIDEO + CANVAS */}
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
            {loadingDescriptor ? "🔍 Detecting Face..." : "✅ Capture"}
          </button>
          <button className="btn btn-primary m-1" onClick={sendFaceDescriptor}>submit</button>
        </form>
      </div>
    </div>
  );
}
