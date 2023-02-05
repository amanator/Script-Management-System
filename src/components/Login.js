import React, {useState, useContext} from 'react'
import {useNavigate} from 'react-router-dom'
// import AlertContext from '../context/notes/AlertContext';

const Login = () => {
    // const context = useContext(AlertContext)
    // const {showAlert} = context
    let history = useNavigate();
    const [credentials, setCredentials] = useState({username:"", password:""})

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]:e.target.value})
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.REACT_APP_HOST}/api/auth/login`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({username: credentials.username, password: credentials.password})
              });
            let json = await response.json();
            console.log(json)
            if(json.success)
            {
                // Save the auth token
                alert("Login Successful")
                localStorage.setItem('token', json.authtoken)
                if(credentials.username === 'admin')
                {
                    history("/Admin")
                }
                else
                {
                    history("/");
                }
            }
            else
            {
                alert("Invalid Username or Password")
            }
            
        } catch (error) {
            alert("Internal Server Error")
        }
    }


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <br />
                <h2>Login</h2>
     
                <br />
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
                    <input type="text" className="form-control" onChange={onChange} value={credentials.username} id="username" name='username' aria-describedby="emailHelp" />
                       
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" onChange={onChange} value={credentials.password} name='password' id="password" />
                </div>
                
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Login
