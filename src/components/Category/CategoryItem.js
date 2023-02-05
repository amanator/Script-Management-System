import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import categoryContext from '../../context/category/CategoryContext'

export default function CategoryItem(props) {
    const context = useContext(categoryContext)
    const {deleteCategory} = context
    const { category, updateCategory} = props
    // console.log(category )
    const deleteCategoryItem = (id) => {
        alert("Warning: Item Will get Deleted")
        if (window.confirm("Sure you want to Delete Item")) {
            deleteCategory(id)
        }
    }
    return (
        <>
        <div className="col-md-3">
            <div className="card my-3" >
                <div className="card-body">
                    <h4 className="card-title">{category.name}</h4>
                    <Link className=' btn' to={`/Item/${category._id}/${category.group}`} >Open</Link>
                    <button className=' btn'  onClick={()=>{updateCategory(category)}} >Edit</button>
                    <button className=' btn'  onClick={()=>{deleteCategoryItem(category._id)}}>Delete</button>
                </div>
            </div>
        </div>
        </>
    )
}
