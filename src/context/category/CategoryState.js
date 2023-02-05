import React, { useState } from 'react'
import CategoryContext from './CategoryContext'

function CategoryState(props) {
  const host = process.env.REACT_APP_HOST

  const data = [
    {
      "_id": "624a9252bef8518e66108b3d",
      "name": "Hey",
      "__v": 0
    },
    {
      "_id": "624a9252bew8518e66108b3d",
      "name": "624a8bcff08ud4ce698d4596",
      "__v": 0
    },
  ]



  //  Getting category data
  const [category, setcategory] = useState([])
  const getCategory = async (id) => {
    const response = await fetch(`${host}/api/category/getCategory/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.status === 500) {
      alert(response.statusText)
    } else {
      const json = await response.json();
      setcategory(json);
    }
  }

  // Add Scene
  const addCategory = async (data, group) => {
    // console.log(data.title + group)
    const response = await fetch(`${host}/api/category/createCategory`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: data.id, name: data.title, group: group })
    });
    if (response.status === 500) {
      alert(response.statusText)
    } else {
      const scr = await response.json();
      setcategory(category.concat(scr))
    }
  }


  // Deleting Category

  const deleteCategory = async (id) => {
    const response = await fetch(`${host}/api/category/deleteCategory/${id}`, {
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
      const newNotes = category.filter((category) => { return category._id !== id })
      setcategory(newNotes)
    }
  }

  // Edit a Note
  const editCategory = async (id, scen) => {

    const response = await fetch(`${host}/api/category/updateCategory/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        // "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify(scen)
    });
    if (response.status === 500) {
      alert(response.statusText)
    } else {
      const json = await response.json();

      let newScenes = JSON.parse(JSON.stringify(category))
      for (let index = 0; index < newScenes.length; index++) {
        const element = newScenes[index];
        if (element._id === id) {
          newScenes[index] = scen;
          break;
        }
      }
      setcategory(newScenes);
   
    }
  }

  return (
    <CategoryContext.Provider value={{ category, getCategory, addCategory, deleteCategory, editCategory }}>
      {props.children}
    </CategoryContext.Provider>
  )
}

export default CategoryState