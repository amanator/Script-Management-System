import React from 'react'
import {Link, useLocation, useNavigate} from "react-router-dom"
export default function Navbar() {
    // let location = useLocation();
    let nav = useNavigate();

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="#">Script Management System</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to="/">Home</Link>
                        </li>
                    </ul>
                        <li className="nav-item">
                            <button className='btn' onClick={()=>{localStorage.removeItem('token') 
                            nav('/Login')}}>Logout</button>
                        </li>

                </div>
            </div>
        </nav>
    )
}
