import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Student from './Component/Student.jsx'
import ServerContextProvider from './Context/ServerContextProvider.jsx'
import Home from './Component/Home.jsx'
import FacultySession from "./Pages/FacultySession.jsx";
import StudentPanel from './Pages/StudentPanel.jsx'
import TeacherDashboard from './Pages/TeacherDashboard.jsx'
import AboutUs from './Pages/About.jsx'
import StudentRegistration from './Pages/StudentRegistrationForm.jsx'
import FacultyLogin from './Pages/FacultyLogin.jsx'
import FacultyRegistration from './Pages/FacultyRegistration.jsx'


let router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ServerContextProvider>
        <App />
      </ServerContextProvider>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/student",
        element: <Student />,
      },
      {
        path: "/faculty-session",
        element: <FacultySession />,
      },
      {
        path: "/student-login",
        element: <StudentPanel />,
      },
      {
        path: "/teacher-dashboard",
        element: <TeacherDashboard />,
      },
      {
        path: "/about",
        element: <AboutUs />,
      },
      {
        path: "/student-registration",
        element: <StudentRegistration />
      },
      {
        path: "/FacultyLogin",
        element: <FacultyLogin />
      },
      {
        path: "/FacultyR",
        element: <FacultyRegistration />
      }
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)
