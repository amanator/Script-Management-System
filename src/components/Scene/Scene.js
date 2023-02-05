import React, { useContext, useEffect, useRef, useState } from 'react'
import { useParams } from "react-router-dom"
import sceneContext from '../../context/scenes/SceneContext'
import SceneItems from './SceneItems'
import AddScene from './AddScene'
import ItemPanel from '../Item_Panel'
import {useNavigate} from 'react-router-dom'

export default function Scene() {
    const { id } = useParams()
    const context = useContext(sceneContext)
    const { scene, getScenes, editScene, export_schedule } = context
    const [Scene, setScene] = useState({ id:"",number:0, script:"", ie: "", dn: "", location: "", description: "", set: "", pagecount: 0, est: 0 })
    const ref = useRef(null)
    const refClose = useRef(null)
    const nav = useNavigate()

    useEffect(() => {
        if(localStorage.getItem('token'))
        {
            getScenes(id)
        }
        else
        {
            nav("/login")
        }
    }, [])


    const updateScene = (currentScene) => {
        ref.current.click();
        setScene({id:currentScene._id,number:currentScene.number, script:currentScene.script,ie:currentScene.ie, dn:currentScene.dn,location:currentScene.location, description:currentScene.description, set:currentScene.set, pagecount:currentScene.pagecount, est:currentScene.est})
    }

    const exportss = (id)=>{
        // console.log("first")
        export_schedule(id)
    }

    const handleClick = (e)=>{
        e.preventDefault();
        // console.log(Scene.id)
        editScene(Scene.id, Scene)
        refClose.current.click();
        // addScene(Scene.etitle, Scene.edesceneion, Scene.etag);
    }

    const onChange = (e)=>{
        setScene({...Scene, [e.target.name]:e.target.value})
    }
    
    return (
        <>
            <br />
            <div className="row">
            <AddScene id={id} Type={"text"} title={"Add Scene"}/>
            <AddScene id={id} Type={"file"} title={"Import File"}/>
            <ItemPanel id={id} scene={scene}/>
            <div className="col">
                <button className="btn-primary btn" type='button' onClick={()=>{exportss(id)}}>Import</button>
            </div>
            </div>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" ref={ref} data-bs-target="#Scenenew" style={{ display: "none" }}>
                Launch demo modal
            </button>

            <div className="modal fade" id="Scenenew" tabIndex="-1" aria-labelledby="ScenenewLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="ScenenewLabel">Edit Scene</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3 my-3">
                                    <label htmlFor="title" className="form-label">Number</label>
                                    <input type="text" className="form-control" id="number" name='number' value={Scene.number} onChange={onChange} aria-describedby="emailHelp" />
                                </div>
                                <div className="mb-3 my-3">
                                    <label htmlFor="title" className="form-label">IE</label>
                                    <input type="text" className="form-control" id="ie" name='ie' value={Scene.ie} onChange={onChange} aria-describedby="emailHelp" />
                                </div>
                                <div className="mb-3 my-3">
                                    <label htmlFor="dn" className="form-label">DN</label>
                                    <input type="text" className="form-control" id="dn" name='dn' value={Scene.dn} onChange={onChange} aria-describedby="emailHelp" />
                                </div>
                                <div className="mb-3 my-3">
                                    <label htmlFor="location" className="form-label">Location</label>
                                    <input type="text" className="form-control" id="location" name='location' value={Scene.location} onChange={onChange} aria-describedby="emailHelp" />
                                </div>
                                <div className="mb-3 my-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="description" name='description' value={Scene.description} onChange={onChange} aria-describedby="emailHelp" />
                                </div>
                                <div className="mb-3 my-3">
                                    <label htmlFor="set" className="form-label">Set</label>
                                    <input type="text" className="form-control" id="set" name='set' value={Scene.set} onChange={onChange} aria-describedby="emailHelp" />
                                </div>
                                <div className="mb-3 my-3">
                                    <label htmlFor="pagecount" className="form-label">Page Count</label>
                                    <input type="number" className="form-control" id="pagecount" name='pagecount' value={Scene.pagecount} onChange={onChange} aria-describedby="emailHelp" />
                                </div>
                                <div className="mb-3 my-3">
                                    <label htmlFor="est" className="form-label">Est</label>
                                    <input type="number" className="form-control" id="est" name='est' value={Scene.est} onChange={onChange} aria-describedby="emailHelp" />
                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" disabled={Scene.ie.length < 2} onClick={handleClick} className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
     
            <br />
            {/* <div className='container row'>
                <h4>Scenes</h4>
                {scene.map((scr) => {
                    return <SceneItems key={scr._id} scene={scr} updateScene={updateScene}/>
                })}
            </div> */}

<div >
          <div className="container">
            <div className="row">
              <div className="col-sm">
                <h3>No.</h3>
              </div>
              <div className="col-sm">
                <h3>I/E</h3>
              </div>
              <div className="col-sm">
                <h3>Location</h3>
              </div>
              <div className="col-sm">
                <h3>D/N</h3>
              </div>
              
              <div className="col-sm">
                {/* <h3>Description</h3> */}
              </div>
            </div>
            <hr />
          </div>

          {scene.map((scr) => {
            return <SceneItems key={scr._id}  scene={scr} updateScene={updateScene}/>
          })}
        </div>
        </>
    )
}
