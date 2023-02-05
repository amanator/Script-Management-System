import React, { useContext, useEffect, useRef, useState } from 'react'
import ScriptItems from './ScriptItems'
import scriptContext from '../../context/script/ScriptContext'
import AddScript from './AddScript'
import { useNavigate } from 'react-router-dom'

export default function Script() {
    const context = useContext(scriptContext)
    const { script, getScripts, editScript } = context
    const [Script, setScript] = useState({id:"", etitle:""})
    const ref = useRef(null)
    const refClose = useRef(null)
    const nav = useNavigate()
    useEffect(() => {
        if(localStorage.getItem('token'))
        {
            getScripts()
        }
        else
        {
            nav("/login")
        }
    }, [])

    // console.log(script)
    const updateScript = (currentnote) => {
        ref.current.click();
        setScript({id:currentnote._id, etitle:currentnote.title})
    }

    const handleClick = (e)=>{
        e.preventDefault();
        editScript(Script.id, Script.etitle)
        refClose.current.click();
    }

    const onChange = (e)=>{
        setScript({...Script, [e.target.name]:e.target.value})
    }

    return (
        <>
            <br />
            <div className="row">
            <AddScript />

            

            </div>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" ref={ref} data-bs-target="#exampleModal" style={{ display: "none" }}>
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Updata Script</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3 my-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name='etitle' value={Script.etitle} onChange={onChange} aria-describedby="emailHelp" />
                                </div>
                               
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" ref={refClose} data-bs-dismiss="modal">Close</button>
                            <button disabled={Script.etitle.length < 5} type="button" onClick={handleClick} className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <br />
            <div className='container row'>
                <h4>Scripts</h4>
                {script.map((scr) => {
                    return <ScriptItems key={scr._id} script={scr} updateScript={updateScript}/>
                })}
            </div>

        </>
    )
}
