import { useState } from "react";
import SceneContext from "./SceneContext";
import FileDownload from "js-file-download";

const SceneState = (props) => {
  const host = process.env.REACT_APP_HOST
  


//  Getting scene data
  const [scene, setscene] = useState([])
  const getScenes = async (id) => {
    const response = await fetch(`${host}/api/scene/getScenes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: id })
    });
    if(response.status === 500)
    {
      alert(response.statusText)
    }
    else{
      const json = await response.json();
      setscene(json);
    }
  }

  // Add Scene
  const addScene = async (data) => {
    // console.log(data)
    // const {id, ie, dn, location, description, set, pagecount, est} = data
    const response = await fetch(`${host}/api/scene/createScene`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    if(response.status === 500)
    {
      alert(response.statusText)
    }
    const scr = await response.json();
    setscene(scene.concat(scr))
  }

  // Deleting Scenes
  const export_schedule = async (id)=>{
    const response = await fetch(`${host}/api/scene/export_schedule`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: id })
    });
    if(response.status === 500)
    {
      alert("Some Internal Server Error Occured")
    }
    else
    {
      let res = await response.blob()
      // console.log(res)
      FileDownload(res, "Schedule.xlsx")
    }
  }

  const deleteScene = async (id) => {
    const response = await fetch(`${host}/api/scene/deleteScene/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        // "auth-token": localStorage.getItem('token')
      }
    });
    if(response.status === 500)
    {
      alert(response.statusText)
    }
    else
    {
      const json = await response.json();
      // console.log(json)
      const newNotes = scene.filter((scene) => { return scene._id !== id })
      setscene(newNotes)
    }
  }

  // Edit a Note
  const editScene = async (id,scen) => {
    // console.log(scen)
    const response = await fetch(`${host}/api/scene/updateScene/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',

        // "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify(scen)
    });
    if(response.status === 500)
    {
      alert(response.statusText)
    }
    else{
      const json = await response.json();
      // console.log(json)
      let newScenes = JSON.parse(JSON.stringify(scene))
      for (let index = 0; index < newScenes.length; index++) {
        const element = newScenes[index];
        if (element._id === id) {
          newScenes[index] = scen;
          break;
        }
      }
      setscene(newScenes);

    }
    
  }

   // Importing data
   const importData = async(data, id)=>{
    // console.log(data)
    // console.log(id)
    const response = await fetch(`${host}/api/import/${id}`, {
      method:'POST',
      headers: {
        'Content-Type':'application/json',
      },
      body: (data)
    });
    if(response.status===500)
    {
      alert("Unable to Import Details")
    }
    else{
      const scr= await response.json();
      setscene(scr)
    }
  }


  return (
    <SceneContext.Provider value={{ scene, getScenes, addScene , deleteScene, editScene, importData, export_schedule}}>
      {props.children}
    </SceneContext.Provider>
  )
}

export default SceneState;