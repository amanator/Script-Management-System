import React, { useState } from 'react'
import ItemContext from "./ItemContext"

export default function ItemState(props) {
  const host = process.env.REACT_APP_HOST
  const [item, setitem] = useState([])


  // Get Items
  const getItems = async (id) => {
    const response = await fetch(`${host}/api/item/getItem/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.status === 500) {
      alert(response.statusText)
    }
    else {
      const json = await response.json();
      setitem(json);
    }
  }



  // Add Item
  const addItem = async (data, image1) => {
    // console.log(data)
    const formData = new FormData();
    formData.append("data", JSON.stringify(data))
    for (const key of Object.keys(image1)) {
      formData.append('file', image1[key])
    }

    // console.log(formData)
    const response = await fetch(`${host}/api/item/createItem/`, {
      method: 'POST',
      headers: {
        // 'Content-Type': 'multipart/form-data', 
      },
      body: (formData)
    });
    if (response.status === 500) {
      alert(response.statusText)
    }
    else if (response.status === 400) {
      const json = await response.json();
      alert(json.errors)
    }
    else {
      const scr = await response.json();
      setitem(item.concat(scr))
    }

  }

  // Add Item from Item Panel

  const addItemPanel = async (data, image1, selected) => {
    // console.log(selected)
    const formData = new FormData();
    formData.append("data", JSON.stringify(data))
    formData.append("selected", JSON.stringify(selected))
    for (const key of Object.keys(image1)) {
      formData.append('file', image1[key])
    }
    const response = await fetch(`${host}/api/item/createItemPanel/`, {
      method: 'POST',
      headers: {
        // 'Content-Type': 'multipart/form-data', 
      },
      body: (formData)
    });
    if (response.status === 500) {
      alert(response.statusText)
    }
    else if (response.status === 400) {
      const json = await response.json();
      alert(json.errors)
    }
    else {
      alert("Item Created")
    }
  }

  // Deleting Scenes

  const deleteItem = async (id, group) => {
    const response = await fetch(`${host}/api/item/deleteItem/${id}/${group}`, {
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
      const newNotes = item.filter((item) => { return item._id !== id })
      setitem(newNotes)
    }
  }


  const editItem = async (data, image1) => {
    const id = data.id
    const formData = new FormData();
    formData.append("data", JSON.stringify(data))
    for (const key of Object.keys(image1)) {
      formData.append('file', image1[key])
    }

    const response = await fetch(`${host}/api/item/editItem`, {
      method: 'POST',
      headers: {
        // 'Content-Type': 'multipart/form-data', 
      },
      body: (formData)
    });
    if (response.status === 500) {
      alert(response.statusText)
    } else {
      const scr = await response.json();
      // console.log(scr)
      // setitem(item.concat(scr))
      let newScenes = JSON.parse(JSON.stringify(item))
      for (let index = 0; index < newScenes.length; index++) {
        const element = newScenes[index];
        if (element._id === id) {
          newScenes[index] = scr;
          break;
        }
      }
      setitem(newScenes);
    }
  }

  return (
    <ItemContext.Provider value={{ item, addItem, getItems, deleteItem, editItem, addItemPanel }}>
      {props.children}
    </ItemContext.Provider>
  )
}

