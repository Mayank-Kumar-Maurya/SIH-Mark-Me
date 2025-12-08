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
    const [descriptor, setDescriptor] = useState(null);

    const [year2, setYear2] = useState("");
    const [branch2, setBranch2] = useState("");
    const [roll2, setRoll2] = useState("");
    const [subject2, setSubject2] = useState("");

    let handleVideo = async () => {

    }

    let createStudent = async()=>
    {
        let serres = await server.post("/CreateStudent",
            {
                year2,
                branch2,
                subject2,
                rollno: roll2,
                faceDescriptorCode: descriptor,
                lat,
                log
            });

            if(serres.status == 200)
            {
                alert("student registered");
                return;
            }
            else
            {
                alert("not registered");
                return
            }
    }

    let sendFaceDescriptor = async () => {

        console.log("descriptor: ", descriptor);
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
                faceDescriptor: descriptor,
                rollno: roll
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
        <ServerContext.Provider value={{ year, setYear, branch, setBranch, subject, setSubject, isOnline, setIsOnline, handleVideo, sendFaceDescriptor, year1, setSubject1,  setYear1, branch1, setBranch1, roll, setRoll, subject1, setSendToBackend, setDescriptor, year2, setYear2, branch2, setBranch2, roll2, setRoll2, subject2, setBranch2, createStudent}}>
            {children}
        </ServerContext.Provider>
    )
}

export default ServerContextProvider
