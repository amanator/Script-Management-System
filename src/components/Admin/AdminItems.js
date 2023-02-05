import React, {useContext} from 'react'
import adminContext from '../../context/admin/AdminContext'
function AdminItems(props) {
    const {username, _id} = props.item
    const context = useContext(adminContext)
    const { deleteUser} = context
    return (
        <div className="container">
            <div className="row">
                <div className="col-sm">
                    {username}
                </div>
                <div className="col-sm l">
                    <button className='  btn-primary' onClick={() => deleteUser(_id)}  >Delete</button>
                </div>
            </div>
            <hr />
        </div>
    )
}

export default AdminItems