import React, { useState } from 'react'
import AdminContext from './AdminContext'

function AdminState(props) {
    const host = process.env.REACT_APP_HOST
    const [user, setuser] = useState([])

    const getUser = async () => {
        // console.log("df")
        const response = await fetch(`${host}/api/auth/getUser`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
        });
        if (response.status === 500) {
            alert(response.statusText)
        }
        else {
            const json = await response.json();
            setuser(json);
        }
    }

    const createUser = async (credentials) => {

        const response = await fetch(`${host}/api/auth/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ username: credentials.username, password: credentials.password })
        });
        if (response.status === 500) {
            alert(response.statusText)
        }
        else {
            const json = await response.json();
            setuser(user.concat(json.user));
        }
    }

    const deleteUser = async (id) => {
        const response = await fetch(`${host}/api/auth/deleteuser/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
        });
        if (response.status === 500) {
            alert(response.statusText)
        }
        else {
            const res = response.json()
            const newNotes = user.filter((user) => { return user._id !== id })
            setuser(newNotes)
        }
    }

    return (
        <AdminContext.Provider value={{ user, getUser, createUser, deleteUser }}>
            {props.children}
        </AdminContext.Provider>
    )
}


export default AdminState