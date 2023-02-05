import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import scriptContext from '../../context/script/ScriptContext'

export default function ScriptItems(props) {
    const context = useContext(scriptContext)
    const { deleteScript } = context
    const { script, updateScript } = props
    const deleteScriptItem = (id) => {
        alert("Warning: Item Will get Deleted")
        if (window.confirm("Sure you want to Delete Item")) {
            deleteScript(id)
        }
    }
    return (
        <>
            <div className="col-md-3">
                <div className="card my-3" >
                    <div className="card-body">
                        <h5 className="card-title">{script.title}</h5>
                        <Link className='btn ' to={`/${script.title}/Scene/${script._id}`} >Open</Link>
                        <Link className='btn ' to="/" onClick={() => { updateScript(script) }} >Edit</Link>
                        <Link className='btn' to="/" onClick={() => { deleteScriptItem(script._id) }}>Delete</Link>

                    </div>
                </div>
            </div>
            

        </>
    )
}
