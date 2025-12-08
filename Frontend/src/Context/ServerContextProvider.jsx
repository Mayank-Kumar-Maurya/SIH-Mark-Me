import React, { useState } from 'react'
import axios from 'axios';
import ServerContext from './ServerContext.js';



function ServerContextProvider({ children }) {

    let server = axios.create({
        baseURL: "http://localhost:8070/",
        withCredentials: true,
    });

    // faculty
    
    const [year, setYear] = useState("");
    const [branch, setBranch] = useState("");
    const [subject, setSubject] = useState("");
    const [isOnline, setIsOnline] = useState(false);
    // Student
    const [year1, setYear1] = useState("");
    const [branch1, setBranch1] = useState("");
    const [roll, setRoll] = useState("");
    const [subject1, setSubject1] = useState("");
    const [sendToBackend, setSendToBackend] = useState();
    const [lat, setLat] = useState();
    const [log, setLog] = useState();

    let handleVideo = async () => {

    }


    let sendFaceDescriptor = async () => {


        function getLocation() {
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(showPosition, ()=>{
                console.log("error at geoLocation");
              });
            } else {
              console.log("geolocation is not working");
            }
          }
      
          function showPosition(position) {
            let lati = position.coords.latitude;
            let long = position.coords.longitude;
            setLat(lati);
            setLog(long); 
          }

          getLocation();

        let serres = await server.post("/Face/sendFaceDescriptor",
            {
                faceDescriptor: [0.25, 0.45, 0.11],
                rollno: 23239
            }
        );

        if (serres.status == 200) {
            console.log("send code res: ", serres.data);
            alert("Attendence marked");
        }
        else {
            console.log("false");
            alert("Attendence not marked");
        }
    }

    return (
        <ServerContext.Provider value={{ year, setYear, branch, setBranch, subject, setSubject, isOnline, setIsOnline, handleVideo, sendFaceDescriptor, year1, setSubject1,  setYear1, branch1, setBranch1, roll, setRoll, subject1, setSendToBackend}}>
            {children}
        </ServerContext.Provider>
    )
}

export default ServerContextProvider
