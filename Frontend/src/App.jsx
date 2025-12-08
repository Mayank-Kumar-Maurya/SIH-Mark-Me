import { useState } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import Navbar from './Component/Navbar'

function App() {

  return (
    <>
       <Navbar/>
        <Outlet />
    </>
  )
}

export default App
