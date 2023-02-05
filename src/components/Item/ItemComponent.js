import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import itemContext from '../../context/item/ItemContext'
import { useParams } from 'react-router-dom'
// import imge from '../../../public/R.jpg'

export default function SceneItems(props) {
    const context = useContext(itemContext)
    const { deleteItem } = context
    let cage = 0;
    let ccount = "";
    let cgender = "";
    let ccategory = "";
    let cimages = []
    const {updateItem} = props

    const deleteTheItem = (id,group) => {
        alert("Warning: Item Will get Deleted")
        if (window.confirm("Sure you want to Delete Item")) {
            deleteItem(id,group)
        }
    }
    const { _id, number, name, description, group } = props.item

    if (group === '1') {
        const { images } = props.item
        cimages = images

        // console.log(cimages)
    }
    if (group === '3' || group === '4') {
        const { age, gender, ctg } = props.item
        cage = age
        cgender = gender
        ccategory = ctg
    }
    if (group === '4') {
        const { count } = props.item
        ccount = count
    }


    // console.log(scene )
    return (
        <>
            {group === "1" &&
                <div className="container">
                    <div className="row">
                        <div className="col-sm">
                            {number}
                        </div>
                        <div className="col-sm">
                            {name}
                        </div>
                        <div className="col-sm">
                            {description}
                        </div>
                        <div className="col-sm l">
                            <button className='  btn-primary' onClick={() => deleteTheItem(_id,group)}  >Delete</button>
                            <button className='  btn-primary' onClick={() => updateItem(props.item)}  >Edit</button>
                        </div>
                        <br />
                        <div className='row' style={{ height: "100px", marginTop: 10 }}>
                            {(cimages!=undefined) && cimages.map((url) => {
                                return(<div key={url} className='col'>
                                   
                                    <img src={`${process.env.REACT_APP_HOST}/uploads/images/${url}`} style={{ height: "80px", width: "120px" }} alt="Internal Server Error" />
                                </div>)

                            })
                        }
           
                        </div>
                    </div>
                    <hr />
                </div>
            }
            {group === '2' &&
                <div className="container">
                    <div className="row">
                        <div className="col-sm">
                            {number}
                        </div>
                        <div className="col-sm">
                            {name}
                        </div>
                        <div className="col-sm">
                            {description}
                        </div>
                        <div className="col-sm l">
                        <button className='  btn-primary' onClick={() => updateItem(props.item)}  >Edit</button>
                            <button className='  btn-primary' onClick={() => deleteTheItem(_id,group)}  >Delete</button>
                        </div>
                    </div>
                    <hr />
                </div>
            }
            {group === '3' &&
                <div className="col-md-3">
                    <div className="card my-3" >
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{number} {name}</h5>
                                <p className="card-text">{description}</p>
                                <div className="row card-text">
                                    <p className='card-text col-sm'><small >Age {cage} </small></p>
                                    <p className='card-text col-sm'><small >Category {ccategory} </small></p>

                                </div>
                                <p className='card-text'>Gender: {cgender}</p>
                                <button className='  btn-primary' onClick={() => updateItem(props.item)}  >Edit</button>
                                <button className='  btn-primary' onClick={() => deleteTheItem(_id,group)}  >Delete</button>
                            </div>
                        </div>
                    </div>
                </div>

            }
            {group === '4' &&
                <div className="col-md-3">
                    <div className="card my-3" >
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{number} {name}</h5>
                                <p className="card-text">{description}</p>
                                <div className="row card-text">
                                    <p className='card-text col-sm'><small >Age {cage} </small></p>
                                    <p className='card-text col-sm'><small >Category {ccategory} </small></p>

                                </div>
                                    <p className='card-text col-sm'><small >Count {ccount} </small></p>
                                <p className='card-text'>Gender: {cgender}</p>
                                <button className='  btn-primary' onClick={() => updateItem(props.item)}  >Edit</button>
                                <button className='  btn-primary' onClick={() => deleteTheItem(_id,group)}  >Delete</button>
                            </div>
                        </div>
                    </div>
                </div>

            }
        </>
    )
}
