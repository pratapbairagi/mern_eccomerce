import axios from "axios";
import { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { GetAllUsersAction } from "../../../redux/actions/UserAction";

// const UsersList = ({users}) => {
const UsersList = () => {


    const alert = useAlert()
    const dispatch = useDispatch()
    const history = useHistory("/admin")
    const { loading, success, error, users } = useSelector(state => state.users)

    useEffect(()=>{
        dispatch(GetAllUsersAction())
    },[])

    const deleteUserHandler = async (id) =>{
        const {data} = await axios.delete(`/api/v1/user/delete/${id}`)
        if(data.success){
            alert.success("user deleted successfully !", {"position":"bottom center"})
            dispatch(GetAllUsersAction())
        }
    }

    return (
    <div className="usersList_container" style={{width:"100%"}}>
        <div className="tableContainer" style={{width:"100%", maxWidth:"100%", overflowX:"auto", overflowY:"hidden"}}>
        
        <table className="table" style={{width:"100%"}}>
            <thead>
                <tr>
                    <td>No</td>
                    <td>ID</td>
                    <td>Name</td>
                    <td>Image</td>
                    <td>phone</td>
                    <td>Email</td>
                    <td>Role</td>
                    <td>Edit</td>
                    <td>Delete</td>
                </tr>
            </thead>
            <tbody style={{width:"100%", maxWidth:"100%", overflowY:"auto"}}>
                {users.map((u,i)=>{
               return <tr key={i} style={{fontSize:"90%"}}>
                    <td>{i+1}</td>
                    <td>{u._id}</td>
                    <td>{u.name}</td>
                    <td>
                        <img style={{width:"2rem"}} src={u.avatars?.url} alt="" />
                    </td>
                    <td>{u.phone}</td>
                    <td>{u.email}</td>
                    <td>{u.role}</td>

                    <td>
                        <button>
                            <NavLink to={`/user/role/update/${u._id}`}>Edit</NavLink>
                        </button>
                    </td>
                    <td>
                        <button onClick={()=>deleteUserHandler(u._id)}>Delete</button>
                    </td>
                </tr>
                 })}
            </tbody>

        </table>
        </div>
    </div>
    );
}
export default UsersList;