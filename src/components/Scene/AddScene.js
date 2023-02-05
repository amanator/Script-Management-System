import React from 'react'
import { useContext, useState } from 'react'
import sceneContext from '../../context/scenes/SceneContext'

const AddScene = (props) => {
    const context = useContext(sceneContext)
    const { addScene, importData } = context;

    const [note, setNote] = useState({ id: props.id,number:0, ie: "", dn: "", location: "", description: "", set: "", pagecount: 0, est: 0 })
    const handleClick = (e) => {
        e.preventDefault();
        if(Type==="text")
        {
            addScene(note);
            setNote({...note, number:0, ie: "", dn: "", location: "", description: "", set: "", pagecount: 0, est: 0 })
        }
        else if(Type)
        {
            importData(text, props.id)
        }
    }

    const { Type, title } = props

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    const [text, settext] = useState("")
    const showFile = async (e) => {
        e.preventDefault()
        const reader = new FileReader()
        reader.onload = async (e) => {
            settext(e.target.result)
            //   console.log(text)
            // importData(text)
        };
        reader.readAsText(e.target.files[0])
    }

    return (

        <div className='col'>


            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#example${Type}`}>
                {title}
            </button>


            <div className="modal fade" id={`example${Type}`} tabIndex="-1" aria-labelledby={`example${Type}Label`} aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id={`example${Type}Label`}>Add Scene</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                {(Type === "text") &&
                                    <div>
                                        <div className="mb-3 my-3">
                                            <label htmlFor="title" className="form-label">Scene Number</label>
                                            <input type="number" className="form-control" id="number" name='number' value={note.number} onChange={onChange} aria-describedby="emailHelp" />
                                        </div>
                                        <div className="mb-3 my-3">
                                            <label htmlFor="title" className="form-label">IE</label>
                                            <input type="text" className="form-control" id="ie" name='ie' value={note.ie} onChange={onChange} aria-describedby="emailHelp" />
                                        </div>
                                        <div className="mb-3 my-3">
                                            <label htmlFor="dn" className="form-label">DN</label>
                                            <input type="text" className="form-control" id="dn" name='dn' value={note.dn} onChange={onChange} aria-describedby="emailHelp" />
                                        </div>
                                        <div className="mb-3 my-3">
                                            <label htmlFor="location" className="form-label">Location</label>
                                            <input type="text" className="form-control" id="location" name='location' value={note.location} onChange={onChange} aria-describedby="emailHelp" />
                                        </div>
                                        <div className="mb-3 my-3">
                                            <label htmlFor="description" className="form-label">Description</label>
                                            <input type="text" className="form-control" id="description" name='description' value={note.description} onChange={onChange} aria-describedby="emailHelp" />
                                        </div>
                                        <div className="mb-3 my-3">
                                            <label htmlFor="set" className="form-label">Set</label>
                                            <input type="text" className="form-control" id="set" name='set' value={note.set} onChange={onChange} aria-describedby="emailHelp" />
                                        </div>
                                        <div className="mb-3 my-3">
                                            <label htmlFor="pagecount" className="form-label">Page Count</label>
                                            <input type="number" className="form-control" id="pagecount" name='pagecount' value={note.pagecount} onChange={onChange} aria-describedby="emailHelp" />
                                        </div>
                                        <div className="mb-3 my-3">
                                            <label htmlFor="est" className="form-label">Est</label>
                                            <input type="number" className="form-control" id="est" name='est' value={note.est} onChange={onChange} aria-describedby="emailHelp" />
                                        </div>
                                    </div>
                                }
                                {(Type === "file") &&
                                    <div className="mb-3 my-3">
                                        <label htmlFor="title" className="form-label">Title</label>
                                        <input type="file" accept='.txt' className="form-control" onChange={(e) => showFile(e)} />
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

export default AddScene