import { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { ClearErrorAction, ClearSuccessAction, EditUserAction, UserLoggedAction } from "../../redux/actions/UserAction";
import Loader from "../loader/Loader";

const EditProfile = () => {
    const {loading, success, error, user} = useSelector(state=>state.user)
    const {loading:updatedProfileLoading,success :updatedProfileSuccess, error:updatedProfileError, user:updatedProfileUser} = useSelector(state=>state.editUser)
    const dispatch = useDispatch()
    const alert = useAlert()
    const history = useHistory()
    const [editUser, setEditUser] = useState({
        name:"",
        email:"",
        phone:"",
        password:"",
        oldAvatar:"",
        newAvatar:""
    })
    useEffect(()=>{
        setEditUser({...editUser,
        name:user.name,
        email:user.email,
        phone:user.phone,
        oldAvatar:user.avatars.url
    })
    },[user.name])

    const editUserInputChangeHandler = (e) =>{
        const {name,value} = e.target

        if(name!=="avatar"){
            setEditUser({...editUser, [name]:value})            
        }else if(name==="avatar"){

            const reader = new FileReader()

            reader.onload = function(){
                if(reader.DONE){
                    setEditUser({...editUser, newAvatar : reader.result})
                    console.log(reader.result)
                }
            }

            reader.readAsDataURL(e.target.files[0])

        }
    }

    const submitEditUserHandler = (e) =>{
        e.preventDefault()
        dispatch(EditUserAction(editUser))
    }

    useEffect(()=>{
        if(updatedProfileSuccess){
            alert.success("Profile updated successfully !",{"position":"bottom center"})
            dispatch(ClearSuccessAction())
            dispatch(UserLoggedAction())
            history.push("/profile")
        }
        if(updatedProfileError){
            // alert.error()
            dispatch(ClearErrorAction())
        }
    },[updatedProfileSuccess, updatedProfileError, history, alert, dispatch])
    return (
        <div className='productCreate_container'>
        { loading ? <Loader/> : updatedProfileLoading ? <Loader/> :
        
    <form onSubmit={submitEditUserHandler}  className='productCreate_form' action="">
       <img style={{width:"5rem"}} src="" alt="" />

        <label htmlFor="nameInput" className='productCreate_input_label' >
            {/* <span style={{border:"1px solid grey",height:"2.5rem", borderRight:"none"}}>Name</span> */}
            <input defaultValue={user.name} onChange={editUserInputChangeHandler} className='productCreate_input' placeholder='Name' type="text" name="name" id="nameInput" />
        </label>

        <label htmlFor="emailInput" className='productCreate_input_label' >
            <input defaultValue={user.phone} onChange={editUserInputChangeHandler} className='productCreate_input' placeholder='Email' type="text" name="email" id="emailInput" />
        </label>

        <label htmlFor="numberInput" className='productCreate_input_label'>
            <input defaultValue={user.email} onChange={editUserInputChangeHandler} className='productCreate_input' placeholder='Phone Number' type="text" name="phone" id="numberInput" />
        </label>



        <label htmlFor="passwordInput" className='productCreate_input_label' >
            <input defaultValue={user.password} onChange={editUserInputChangeHandler} className='productCreate_input' placeholder='Password' type="number" name="password" id="passwordInput" />
        </label>

           

        <span style={{width:"100%", maxWidth:"250px", margin:"0 auto", display:"flex", columnGap:"3px", position:"relative"}}>
           
            <img style={{width:"2rem", height:"2.2rem", objectFit:"contain", boxShadow:"0 0 1px grey", position:"absolute", right:"0"}} src={ editUser.newAvatar ? editUser.newAvatar : user.avatars.url} alt="" />
            <span className="">
                <span  className="">
                    <label htmlFor="newImage" style={{color:"tomato", background:"white", cursor:"pointer", position:"relative"}}>
                    <svg style={{width:"1.5rem"}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path d="M512 144v288c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V144c0-26.5 21.5-48 48-48h88l12.3-32.9c7-18.7 24.9-31.1 44.9-31.1h125.5c20 0 37.9 12.4 44.9 31.1L376 96h88c26.5 0 48 21.5 48 48zM376 288c0-66.2-53.8-120-120-120s-120 53.8-120 120 53.8 120 120 120 120-53.8 120-120zm-32 0c0 48.5-39.5 88-88 88s-88-39.5-88-88 39.5-88 88-88 88 39.5 88 88z"/>
                    </svg>
                    </label>
                    <input onChange={editUserInputChangeHandler} type="file" defaultValue="" name="avatar" accept="image/*" id="newImage" style={{ position:"absolute", left:"0", zIndex:"-1" }} alt="new avatar" />
                </span>
            {/* <img style={{width:"2rem", height:"2.2rem", objectFit:"contain", boxShadow:"0 0 1px grey"}} src={editUser.avatar} alt="" /> */}
            </span>
        </span>

        <span style={{ display: "flex", justifyContent: "flex-end", alignItems:"center", width: "100%", maxWidth: "15.3rem",  margin:"1rem 0" }}>
            <button className='productCreate_form_submit_btn' style={{width:"100%"}} type="submit">
                Update
            </button>
        </span>
    </form>
      }  

</div>
    );
}
export default EditProfile;