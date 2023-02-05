import { useState } from "react";
import ScriptContext from "./ScriptContext";


const ScriptState = (props) => {
  const host = process.env.REACT_APP_HOST

  const [script, setscript] = useState([])

  // Get all Note
  const getScripts = async () => {
    try {
      const response = await fetch(`${host}/api/script/getScripts`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify()
      });
      console.log(response)

      if (response.status === 500) {
        alert(response.statusText)
      } else {
        const json = await response.json();
        setscript(json);
      }
    }
    catch (error) {
      alert("Internal Server Error")
    }
  }
  // Add Script
  const addScript = async (title) => {
    const response = await fetch(`${host}/api/script/createScript`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title })
    });
    if (response.status === 500) {
      alert(response.statusText)
    } else {
      const scr = await response.json();
      setscript(script.concat(scr))
    }
  }

  const deleteScript = async (id) => {

    const response = await fetch(`${host}/api/script/deleteScript/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        // "auth-token": localStorage.getItem('token')
      }
    });
    if (response.status === 500) {
      alert(response.statusText)
    } else {
      const json = await response.json();
      // console.log(json)
      const newNotes = script.filter((script) => { return script._id !== id })
      setscript(newNotes)
    }
  }


  // Edit a Note
  const editScript = async (id, title) => {
    // API call
    const response = await fetch(`${host}/api/script/updateScript/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        // "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title })
    });
    if (response.status === 500) {
      alert(response.statusText)
    } else {
      const json = await response.json();
      // console.log(json)

      let newScripts = JSON.parse(JSON.stringify(script))
      for (let index = 0; index < newScripts.length; index++) {
        const element = newScripts[index];
        if (element._id === id) {
          newScripts[index].title = title;
          break;
        }
      }
      setscript(newScripts);
    }
  }



  return (
    <ScriptContext.Provider value={{ script, setscript, getScripts, addScript, deleteScript, editScript }}>
      {props.children}
    </ScriptContext.Provider>
  )
}

export default ScriptState;