import { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ClearErrorAction, ClearSuccessAction, GetSingleUserAction, UpdateUserRoleAction } from "../../../redux/actions/UserAction";

const UpdateUserRole = () => {
    const {loading, success, error, user} = useSelector(state=>state.userDetailsByAdmin)
    const {loading:updateUserRoleLoading, success:updateUserRoleSuccess, error:updateUserRoleError, user:updateUserRoleUser} = useSelector(state=>state.updateUserRole)

    const {id} = useParams()
    const dispatch = useDispatch()
    const alert = useAlert()

    useEffect(()=>{
        if(id){
            dispatch(GetSingleUserAction(id))
        }
    },[id])

    useEffect(()=>{
        if(updateUserRoleSuccess){
            alert.success("User updated successfully !", {"position":"bottom center"})
            dispatch(ClearSuccessAction())
        }
        if(updateUserRoleError){
            alert.error(updateUserRoleError, {"position":"bottom center"})
            dispatch(ClearErrorAction())
        }
    },[updateUserRoleSuccess, updateUserRoleError])

    const [updateUser, setUpdateUser] = useState({
        name :"",
        phone :"",
        email :"",
        password:"",
        oldAvatar:"",
        oldAvatarId :"",
        newAvatar :"",
        role:""
    })

    useEffect(()=>{
        setUpdateUser({
            name : user.name,
            email : user.email,
            phone : user.phone,
            role : user.role,
            password : user.password,
            oldAvatar : user.avatars?.url,
            oldAvatarId : user.avatars?.public_id
        })
    },[user.name])
    
    const editUserRoleInputChangeHandler = (e) =>{
        const {name, value} = e.target

        if(name==="avatar"){
            const reader = new FileReader()

            reader.onload = function(){
                if(reader.DONE){
                    setUpdateUser({...updateUser, newAvatar: reader.result})
                }
            }
            reader.readAsDataURL(e.target.files[0])
        }
        else if(name!=="avatar"){
            setUpdateUser({...updateUser, [name]:value})
        }
    }
    const submitUpdateUserHandler = (e) =>{
        e.preventDefault()
        dispatch(UpdateUserRoleAction(id,updateUser))
    }
    
    return (
        <div className='productCreate_container'>
        {/* { loading ? <Loader/> : updatedProfileLoading ? <Loader/> : */}
        
    <form onSubmit={submitUpdateUserHandler}  className='productCreate_form' action="">
       <img style={{width:"5rem"}} src="" alt="" />

        <label htmlFor="nameInput" className='productCreate_input_label' >
            {/* <span style={{border:"1px solid grey",height:"2.5rem", borderRight:"none"}}>Name</span> */}
            <input defaultValue={user.name} onChange={editUserRoleInputChangeHandler} className='productCreate_input' placeholder='Name' type="text" name="name" id="nameInput" />
        </label>

        <label htmlFor="emailInput" className='productCreate_input_label' >
            <input defaultValue={user.email} onChange={editUserRoleInputChangeHandler} className='productCreate_input' placeholder='Email' type="text" name="email" id="emailInput" />
        </label>

        <label htmlFor="numberInput" className='productCreate_input_label'>
            <input defaultValue={user.phone} onChange={editUserRoleInputChangeHandler} className='productCreate_input' placeholder='Phone Number' type="text" name="phone" id="numberInput" />
        </label>



        <label htmlFor="passwordInput" className='productCreate_input_label' >
            <input defaultValue={user.password} onChange={editUserRoleInputChangeHandler} className='productCreate_input' placeholder='Password' type="number" name="password" id="passwordInput" />
        </label>

        <label htmlFor="passwordInput" className='productCreate_input_label' >
            {/* <input defaultValue={user.password} onChange={editUserRoleInputChangeHandler} className='productCreate_input' placeholder='Password' type="number" name="password" id="passwordInput" /> */}
        <select className="productCreate_input" defaultValue={user.role} onChange={editUserRoleInputChangeHandler} name="role" id="">
            <option value="user">User</option>
            <option value="admin">Admin</option>
        </select>
        </label>

        {/* <span className="productCreate_input_label" style={{width:"100%", maxWidth:"250px", margin:"0 auto", display:"flex", columnGap:"3px", position:"relative"}}> */}
        <label className="productCreate_input_label" style={{position:"relative"}}>

           
                    <label className="productCreate_input" htmlFor="newImage" style={{color:"tomato", width:"67.5%", background:"white", cursor:"pointer", position:"relative"}}>
                    <svg style={{width:"1.5rem"}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path d="M512 144v288c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V144c0-26.5 21.5-48 48-48h88l12.3-32.9c7-18.7 24.9-31.1 44.9-31.1h125.5c20 0 37.9 12.4 44.9 31.1L376 96h88c26.5 0 48 21.5 48 48zM376 288c0-66.2-53.8-120-120-120s-120 53.8-120 120 53.8 120 120 120 120-53.8 120-120zm-32 0c0 48.5-39.5 88-88 88s-88-39.5-88-88 39.5-88 88-88 88 39.5 88 88z"/>
                    </svg>
                    </label>
                    <input onChange={editUserRoleInputChangeHandler} type="file" defaultValue="" name="avatar" accept="image/*" id="newImage" style={{ position:"absolute", left:"0", zIndex:"-1", opacity:"0" }} alt="new avatar" />
            <img style={{width:"2.5rem", height:"2.5rem", objectFit:"contain", boxShadow:"0 0 1px grey", right:"0"}} src={ updateUser.newAvatar ? updateUser.newAvatar : user.avatars?.url} alt="" />
            {/* <img style={{width:"2rem", height:"2.2rem", objectFit:"contain", boxShadow:"0 0 1px grey"}} src={editUser.avatar} alt="" /> */}
        </label>

        

        <span style={{ display: "flex", justifyContent: "flex-end", alignItems:"center", width: "100%", maxWidth: "15.3rem",  margin:"1rem 0" }}>
            <button className='productCreate_form_submit_btn' style={{width:"100%"}} type="submit">
                Update
            </button>
        </span>
    </form>
      {/* }   */}

</div>
    );
}
export default UpdateUserRole;