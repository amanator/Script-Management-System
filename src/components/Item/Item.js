import React, { useContext, useState, useRef, useEffect } from 'react'
import AddItem from './AddItem'
import itemContext from '../../context/item/ItemContext'
import { useParams } from "react-router-dom"
import ItemComponent from "./ItemComponent"
import { useNavigate } from 'react-router-dom'

const Item = () => {

  const nav = useNavigate()
  const { id, group } = useParams()
  const context = useContext(itemContext)
  const { getItems, item, editItem } = context
  useEffect(() => {
    if(localStorage.getItem('token'))
        {
            getItems(id)
        }
        else
        {
            nav("/login")
        }
  }, [])

  const ref = useRef(null)
  const refClose = useRef(null)

  const [note, setNote] = useState({ctid:id, id: id, group: group, number:0, item: "", description: "", age: "", gender: "", category: "1", count: "1" })
  const [image1, setimage1] = useState([])

  // console.log(item)
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }

  const updateItem = (currentScene) => {
    ref.current.click();
    setNote({ctid:id, id:currentScene._id,group:currentScene.group,number:currentScene.number, item:currentScene.name,age:currentScene.age, dn:currentScene.dn,gender:currentScene.gender, description:currentScene.description, category:currentScene.category, count:currentScene.count})
}

  const handleClick = (e) => {
    e.preventDefault();
    // console.log(Scene.id)
    editItem(note, image1)
    // getItems(id)
    refClose.current.click();
    // addScene(Scene.etitle, Scene.edesceneion, Scene.etag);
  }

  return (
    <>
      <br />
      <AddItem />


      <button type="button" className="btn btn-primary" data-bs-toggle="modal" ref={ref} data-bs-target="#newItem" style={{ display: "none" }}>
                Launch demo modal
            </button>

      <div className="modal fade" id="newItem" tabIndex="-1" aria-labelledby="newItemLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="newItemLabel">Edit Items</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                {group === '1' &&
                  <div>
                    <div className="mb-3 my-3">
                      <label htmlFor="item" className="form-label">Item</label>
                      <input type="text" className="form-control" id="item" name='item' value={note.item} onChange={onChange} aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3 my-3">
                      <label htmlFor="description" className="form-label">Description</label>
                      <textarea type="text" className="form-control" id="description" name='description' value={note.description} onChange={onChange} aria-describedby="emailHelp" />
                    </div>
                    Images
                    <div className="input-group mb-3">

                      <input type="file" multiple className="form-control" name='image1' id="image1" onChange={
                        e => {
                          const file = e.target.files
                          setimage1(file)

                        }
                      } />

                    </div>
                    *Choose max 3 images

                  </div>
                }
                {group === '2' &&
                  <div>
                    <div className="mb-3 my-3">
                      <label htmlFor="item" className="form-label">Item</label>
                      <input type="text" className="form-control" id="item" name='item' value={note.item} onChange={onChange} aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3 my-3">
                      <label htmlFor="description" className="form-label">Description</label>
                      <textarea type="text" className="form-control" id="description" name='description' value={note.description} onChange={onChange} aria-describedby="emailHelp" />
                    </div>
                  </div>
                }
                {group === '3' &&
                  <div>
                    <div className="mb-3 my-3">
                      <label htmlFor="item" className="form-label">Character</label>
                      <input type="text" className="form-control" id="item" name='item' value={note.item} onChange={onChange} aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3 my-3">
                      <label htmlFor="description" className="form-label">Description</label>
                      <textarea type="text" className="form-control" id="description" name='description' value={note.description} onChange={onChange} aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3 my-3">
                      <label htmlFor="age" className="form-label">Age</label>
                      <input required type="number" className="form-control" id="age" name='age' value={note.age} onChange={onChange} aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3 my-3">
                      Gender
                      <div className="form-check">
                        <input className="form-check-input" type="radio" name="gender" value="Male" onChange={onChange} id="gender1" />
                        <label className="form-check-label" htmlFor="gender1">
                          Male
                        </label>
                      </div>
                      <div className="form-check">
                        <input className="form-check-input" type="radio" name="gender" value="Female" onChange={onChange} id="gender2" />
                        <label className="form-check-label" htmlFor="gender2">
                          Female
                        </label>
                      </div>
                    </div>
                    <div className="mb-3 my-3">
                      Category
                      <div className="form-check">
                        <input className="form-check-input" type="radio" name="category" onChange={onChange} value="1" id="category1" />
                        <label className="form-check-label" htmlFor="category">
                          1
                        </label>
                      </div>
                      <div className="form-check">
                        <input className="form-check-input" type="radio" name="category" onChange={onChange} value="2" id="category2" />
                        <label className="form-check-label" htmlFor="category">
                          2
                        </label>
                      </div>
                      <div className="form-check">
                        <input className="form-check-input" type="radio" name="category" onChange={onChange} value="3" id="flexRadioDefault2" />
                        <label className="form-check-label" htmlFor="flexRadioDefault2">
                          3
                        </label>
                      </div>
                    </div>
                  </div>
                }
                {group === '4' &&
                  <div>
                    <div className="mb-3 my-3">
                      <label htmlFor="item" className="form-label">Character</label>
                      <input type="text" className="form-control" id="item" name='item' value={note.item} onChange={onChange} aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3 my-3">
                      <label htmlFor="description" className="form-label">Description</label>
                      <textarea type="text" className="form-control" id="description" name='description' value={note.description} onChange={onChange} aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3 my-3">
                      <label htmlFor="age" className="form-label">Age</label>
                      <input required type="number" className="form-control" id="age" name='age' value={note.age} onChange={onChange} aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3 my-3">
                      Gender
                      <div className="form-check">
                        <input className="form-check-input" type="radio" name="gender" id="gender1" value='Male' onChange={onChange} />
                        <label className="form-check-label" htmlFor="gender1">
                          Male
                        </label>
                      </div>
                      <div className="form-check">
                        <input className="form-check-input" type="radio" name="gender" id="gender2" value='Female' onChange={onChange} />
                        <label className="form-check-label" htmlFor="gender2">
                          Female
                        </label>
                      </div>
                    </div>
                    <div className="mb-3 my-3">
                      Category
                      <div className="form-check">
                        <input className="form-check-input" type="radio" name="category" onChange={onChange} id="flexRadioDefault1" />
                        <label className="form-check-label" htmlFor="flexRadioDefault1">
                          1
                        </label>
                      </div>
                      <div className="form-check">
                        <input className="form-check-input" type="radio" name="category" onChange={onChange} id="flexRadioDefault2" />
                        <label className="form-check-label" htmlFor="flexRadioDefault2">
                          2
                        </label>
                      </div>
                      <div className="form-check">
                        <input className="form-check-input" type="radio" name="category" onChange={onChange} id="flexRadioDefault2" />
                        <label className="form-check-label" htmlFor="flexRadioDefault2">
                          3
                        </label>
                      </div>
                    </div>
                    <div className="mb-3 my-3">
                      <label htmlFor="description" className="form-label">Count</label>
                      <input required type="number" className="form-control" id="count" name='count' value={note.count} onChange={onChange} aria-describedby="emailHelp" />
                    </div>
                  </div>
                }
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" ref={refClose} data-bs-dismiss="modal">Close</button>
              <button type="submit" onClick={handleClick} className="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>




      <br />
      {
        (group === '2' || group === '1') &&
        <div >
          <div className="container">
            <div className="row">
              <div className="col-sm">
                <h3>No.</h3>
              </div>
              <div className="col-sm">
                <h3>Name</h3>
              </div>
              <div className="col-sm">
                <h3>Description</h3>
              </div>
              <div className="col-sm">
                {/* <h3>Description</h3> */}
              </div>
            </div>
            <hr />
          </div>

          {item.map((scr) => {
            return <ItemComponent key={scr._id} item={scr} updateItem={updateItem}/>
          })}
        </div>
      }
      {
        (group === '3' || group==='4') &&
        <div className='container row'>
          <h4>Items</h4>
          {item.map((scr) => {
            return <ItemComponent key={scr._id} item={scr} updateItem={updateItem}/>
          })}
        </div>
      }
    </>
  )
}

export default Item
