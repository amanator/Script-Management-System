import React from 'react'
import { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import itemContext from '../../context/item/ItemContext'

const AddItem = (props) => {
    const context = useContext(itemContext)
    const { addItem } = context;
    const { id, group } = useParams()
    // console.log(group)

    const [note, setNote] = useState({ id: id, group: group, item: "", description: "", age: "", gender: "", category: "1", count: "1" })
    const [image1, setimage1] = useState([])

    const handleClick = (e) => {
        e.preventDefault();
        if(image1.length<=3){
        addItem(note, image1)
        setNote({ ...note, item: "", description: "", age: "", gender: "", category: "1", count: "1" })
        }
        else
        alert("Wrong Values")
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (

        <div>


            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModalnew">
                Add Item
            </button>

            <div className="modal fade" id="exampleModalnew" tabIndex="-1" aria-labelledby="exampleModalnewLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalnewLabel">Add Items</h5>
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
                                                <label className="form-check-label" htmlFor="gender1">
                                                <input className="form-check-input" type="radio" name="gender" value="Male" onChange={onChange} id="gender1" />
                                                    Male
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <label className="form-check-label" htmlFor="gender2">
                                                <input className="form-check-input" type="radio" name="gender" value="Female" onChange={onChange} id="gender2" />
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
                                                <label className="form-check-label" htmlFor="gender1">
                                                <input className="form-check-input" type="radio" name="gender" value='Male' onChange={onChange} />
                                                    Male
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <label className="form-check-label" htmlFor="gender">
                                                <input className="form-check-input" type="radio" name="gender"  value='Female' onChange={onChange} />
                                                    Female
                                                </label>
                                            </div>
                                        </div>
                                        <div className="mb-3 my-3">
                                            Category
                                            <div className="form-check">
                                                <input className="form-check-input" type="radio" name="category" value='1' onChange={onChange} id="flexRadioDefault1" />
                                                <label className="form-check-label" htmlFor="flexRadioDefault1">
                                                    1
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="radio" name="category" value='2' onChange={onChange} id="flexRadioDefault2" />
                                                <label className="form-check-label" htmlFor="flexRadioDefault2">
                                                    2
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="radio" name="category" value='3' onChange={onChange} id="flexRadioDefault2" />
                                                <label className="form-check-label" htmlFor="flexRadioDefault3">
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
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" onClick={handleClick} className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddItem