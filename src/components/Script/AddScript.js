import React from 'react'
import { useContext, useState } from 'react'
import scriptContext from '../../context/script/ScriptContext'

const AddScript = (props) => {
    const context = useContext(scriptContext)
    const { addScript, getScripts } = context;

    const [note, setNote] = useState({ title: "" })
    const handleClick = (e) => {
        e.preventDefault();
        addScript(note.title);
        setNote({ title: "" })
    }

  

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }




    return (

        <div className='col'>


            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#new`}>
                Add Script
            </button>


            <div className="modal fade" id={`new`} tabIndex="-1" aria-labelledby={`newLabel`} aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id={`newLabel`}>Title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>

                                <div className="mb-3 my-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="title" name='title' value={note.title} onChange={onChange} aria-describedby="emailHelp" />
                                </div>



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

export default AddScript
