import React from 'react'
import axios from 'axios';
import ServerContext from './ServerContext.js';


function ServerContextProvider({children}) {


    let handleVideo = async()=>
    {
        
    }


  return (
    <ServerContext.Provider value={{}}>
      {children}
    </ServerContext.Provider>
  )
}

export default ServerContextProvider
