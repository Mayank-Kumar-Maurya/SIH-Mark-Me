import React from 'react'
import axios from 'axios';
import ServerContext from './ServerContext.js';


function ServerContextProvider({children}) {

    let server = axios.create({
        baseURL: "http://localhost:8070/api/v1",
        withCredentials: true,
    });

    let handleVideo = async()=>
    {

    }


    let sendFaceDescriptor = async()=>
    {
        let serres = await server.post("/sendFaceDescriptor",
            {
                faceDescriptor: ["hello"],
                rollno: 23239
            }
        );

        if(serres.status == 200)
        {
            console.log("send code res: ", serres.data);
        }
        else
        {
            console.log("false");
        }
    }

  return (
    <ServerContext.Provider value={{}}>
      {children}
    </ServerContext.Provider>
  )
}

export default ServerContextProvider
