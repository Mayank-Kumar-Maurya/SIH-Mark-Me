import React, { useContext, useState } from 'react'
import ServerContext from '../Context/ServerContext';
import { Link } from "react-router-dom";

function FacultyLogin() {

    let {facultyLogin} = useContext(ServerContext);
    let [facultyId, setFacultyId] = useState("");
    let [password, setPassword] = useState("");

    let handleLogIn = async(e)=>
        {
            e.preventDefault();
            
            try {
                let res = await facultyLogin(facultyId, password);
                console.log(res);
                // if(res.status == 200)
                // {
                //     alert("Login Success");
                //     return;
                // }
                // else
                // {
                //     alert(res.message);
                //     return;
                // }
            } catch (error) {
                console.log(error);
                alert(error);
                return;
                // setMsg(error);
                // setErr(true);
            }
        }

  return (
    <div className='m-5'>
      <form className='d-flex justify-content-center align-items-center' onSubmit={handleLogIn}>
                    <div className='col-12 col-lg-6 col-md-8 col-sm-12 border rounded rounded-3 p-2' style={{backgroundColor: "whitesmoke"}}>
                    <div className='d-flex'>
                        <h4 className='text-center'>Login</h4>
                    {/* <h3 className='text-center border rounded rounded-4'><Link className='text-dark' to={'/LogIn'}>LogIn</Link></h3> */}
                    {/* <h3 className='text-center col-6 border rounded rounded-4'><Link className='text-dark' to={'/SignUp'}>SignUp</Link></h3> */}
                    </div>
                        <div className="mb-3">
                            <label htmlFor="InputEmail" className="form-label">Faculty Id</label>
                            <input  className="form-control" onChange={(e)=> setFacultyId(e.target.value)} value={facultyId} id="InputEmail" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="InputPassword" className="form-label">Password</label>
                            <input type="password" className="form-control" onChange={(e)=> setPassword(e.target.value)} value={password} min={8} max={16} id="InputPassword" />
                        </div>
                        <button type="submit" className="btn btn-success">LogIn</button>
                    </div>
                </form>
    </div>
  )
}

export default FacultyLogin
