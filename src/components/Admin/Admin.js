import React, {useEffect, useContext, useState} from 'react'
import adminContext from '../../context/admin/AdminContext'
import AdminItems from './AdminItems'
import {useNavigate} from 'react-router-dom'

function Admin() {
    const context = useContext(adminContext)
    const { user, getUser, createUser} = context
    const nav = useNavigate()
    const [credentials, setCredentials] = useState({username:"", password:""})
    
    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]:e.target.value})
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        createUser(credentials)
        setCredentials({username:"", password:""})
    }


    useEffect(() => {
        if(localStorage.getItem('token'))
            {
                getUser()
            }
            else
            {
                nav("/login")
            }
      }, [])
      console.log(user)
  return (
    <div>
        <div>
            <form autoComplete='none' onSubmit={handleSubmit}>
                <br />
                <h2>Add User</h2>
     
                <br />
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
                    <input type="text"  className="form-control" onChange={onChange} value={credentials.username} id="username" name='username' aria-describedby="emailHelp" />
                       
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" onChange={onChange} value={credentials.password} name='password' id="password" />
                </div>
                
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
            <br />
        <div className='container row'>
          <h2>Users</h2>
          {user.map((scr) => {
            return <AdminItems key={scr._id} item={scr} />
          })}
        </div>
    </div>

  )
}

export default Admin