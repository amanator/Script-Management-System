import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import sceneContext from '../../context/scenes/SceneContext'

export default function SceneItems(props) {
    const context = useContext(sceneContext)
    const { deleteScene } = context
    const deleteSceneItem = (id) => {
        alert("Warning: Item Will get Deleted")
        if (window.confirm("Sure you want to Delete Item")) {
            deleteScene(id)
        }
    }
    const { scene, updateScene } = props
    // console.log(scene )
    return (
        <>
            {/* <div className="col-md-3">
            <div className="card my-3" >
                <div className="card-body">
                    <h3 className="card-title">Scene {scene.number}</h3>
                    <h5 className="card-title">{scene.description}</h5>
                    <div className="row">
                        <p className="col">I/E - {scene.ie}</p>
                        <p className="col">D/N - {scene.dn}</p>
                    </div>
                        <p className="col">Location - {scene.location}</p>
                    <Link className='btn' to={`/Category/${scene._id}`} >Open</Link>
                    <button className=' btn'  onClick={()=>{updateScene(scene)}} >Edit</button>
                    <button className='  btn'  onClick={()=>{deleteSceneItem(scene._id)}}>Delete</button>
                </div>
            </div>
        </div> */}
             <div className="container">
                    <div className="row">
                        <div className="col-sm">
                            {scene.number}
                        </div>
                        <div className="col-sm">
                            {scene.ie}
                        </div>
                        <div className="col-sm">
                            {scene.location}
                        </div>
                        <div className="col-sm">
                            {scene.dn}
                        </div>
                        {/* <div className="col-sm">
                            {scene.description}
                        </div> */}
                        <div className="col-sm ">
                        <Link className='btn' to={`/Category/${scene._id}`} >Open</Link>
                        <button className=' btn'  onClick={()=>{updateScene(scene)}} >Edit</button>
                    <button className='  btn'  onClick={()=>{deleteSceneItem(scene._id)}}>Delete</button>
                        </div>
                       
                    </div>
                    <hr />
                </div>
        </>
    )
}
