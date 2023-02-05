import React from 'react'
import { useContext, useState } from 'react'
import categoryContext from '../../context/category/CategoryContext'

const AddCategory = ({id}) => {
    const context = useContext(categoryContext)
    const { addCategory } = context;

    const [group, setgroup] = useState(1)
    const [note, setNote] = useState({id:id, title: "", color:"" })
    const handleClick = (e) => {
        e.preventDefault();
        addCategory(note, group);
        setNote({...note, title: "" })
    }



    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (

        <div>

            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#AddCategory">
                Add Category
            </button>


            <div className="modal fade" id="AddCategory" tabIndex="-1" aria-labelledby="AddCategoryLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="AddCategoryLabel">Add Category</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3 my-3">
                                    <button className='mx-3 btn-primary btn' type="button" onClick={() => {
                                        setgroup(1)
                                        
                                    }}>Group 1</button>
                                    <button className='mx-3 btn-primary btn' type="button" onClick={() => {
                                        setgroup(2)           
                                    }}>Group 2</button>
                                    <button className='mx-3 btn-primary btn' type="button" onClick={() => {
                                        setgroup(3)           
                                    }}>Group 3</button>
                                    <button className='mx-3 btn-primary btn' type="button" onClick={() => {
                                        setgroup(4)
                                    }}>Group 4</button>
                                </div>
                                <br />
                                <div className="mb-3 my-3">
                                    <label htmlFor="title" style={{fontSize:20}} className="form-label">Category Name</label>
                                    <input type="text" className="form-control" id="title" name='title' value={note.title} onChange={onChange} aria-describedby="emailHelp" />
                                </div>
                                <div className="mb-3 my-3">
                                    <label htmlFor="color" style={{fontSize:20}} className="form-label">Color</label>
                                    <input type="text" className="form-control" id="color" name='color' value={note.color} onChange={onChange} aria-describedby="emailHelp" />
                                </div>
                                {/* <button disabled={note.title.length<5 || note.deCategoryion.length<5} type="submit" onClick={handleClick} className="btn btn-primary">Add Note</button> */}
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" disabled={note.title.length < 2} onClick={handleClick} className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddCategory
