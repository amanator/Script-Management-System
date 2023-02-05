import React, { useContext, useEffect, useRef, useState } from 'react'
import CategoryItem from './CategoryItem'
import { useParams } from 'react-router-dom'
import categoryContext from '../../context/category/CategoryContext'
import AddCategory from './AddCategory'
import { useNavigate } from 'react-router-dom'

export default function Category() {
    const context = useContext(categoryContext)
    const { category, getCategory, editCategory } = context
    const { id } = useParams()
    const [Category, setCategory] = useState({ id: "", name: "", group: 0 , color:""})
    const ref = useRef(null)
    const refClose = useRef(null)
    const nav = useNavigate()
    const [temp, settemp] = useState("second")
    useEffect(() => {
        if(localStorage.getItem('token'))
        {
            getCategory(id)
        }
        else
        {
            nav("/login")
        }
    }, [temp])
    const [group, setgroup] = useState("1")
    // console.log(Category)
    const updateCategory = (currentnote) => {
        ref.current.click();
        setCategory({ id: currentnote._id, name: currentnote.name, group: currentnote.group, color:currentnote.color })
        setgroup(currentnote.group)
    }

    const handleClick = (e) => {
        e.preventDefault();
        editCategory(Category.id, Category)
        refClose.current.click();
        settemp('temp')
        // window.location.reload(false)
    }

    const onChange = (e) => {
        setCategory({ ...Category, [e.target.name]: e.target.value })
    }


    return (
        <>
            <br />
            <AddCategory id={id} />
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" ref={ref} data-bs-target="#CategoryModal" style={{ display: "none" }}>
                Launch demo modal
            </button>

            <div className="modal fade" id="CategoryModal" tabIndex="-1" aria-labelledby="CategoryModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="CategoryModalLabel">Edit Category</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3 my-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="name" name='name' value={Category.name} onChange={onChange} aria-describedby="emailHelp" />
                                </div>
                                <div className="mb-3 my-3">
                                    <label htmlFor="title" className="form-label">Current Group : {group}</label>
                                </div>
                                <div className="mb-3 my-3">
                                    <label htmlFor="title" className="form-label">Color</label>
                                    <input type="text" className="form-control" id="color" name='color' value={Category.color} onChange={onChange} aria-describedby="emailHelp" />
                                </div>
                                <div className="mb-3 my-3">
                                    <div className="mb-3 my-3">
                                        Group
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="group" value="1" onChange={onChange} id="flexRadioDefault1" />
                                            <label className="form-check-label" htmlFor="flexRadioDefault1">
                                                1
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="group" value="2" onChange={onChange} id="flexRadioDefault2" />
                                            <label className="form-check-label" htmlFor="flexRadioDefault2">
                                                2
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="group" value="3" onChange={onChange} id="flexRadioDefault2" />
                                            <label className="form-check-label" htmlFor="flexRadioDefault2">
                                                3
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="group" value="4" onChange={onChange} id="flexRadioDefault2" />
                                            <label className="form-check-label" htmlFor="flexRadioDefault2">
                                                4
                                            </label>
                                        </div>
                                    </div>

                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" ref={refClose} data-bs-dismiss="modal">Close</button>
                            <button disabled={Category.name.length < 5} type="button" onClick={handleClick} className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <br />
            <div className='container row'>
                <h4>Category</h4>
                {category.map((scr) => {
                    return <CategoryItem key={scr._id} category={scr} updateCategory={updateCategory} />
                })}
            </div>

        </>
    )
}
