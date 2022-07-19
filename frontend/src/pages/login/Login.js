
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { ClearErrorAction, ClearSuccessAction, UserLoginAction } from '../../redux/actions/UserAction';
import { useAlert } from "react-alert"
import Loader from '../../components/loader/Loader';

const Login = ({history}) => {
    const dispatch = useDispatch()
    const alert = useAlert()
    const { loading, success, authenticate, user:loggedUser, error } = useSelector(state => state.user)

    useEffect(()=>{
        if(success){
            alert.success("Logged in successful !",{position:"bottom center",transition:"scale"})
            // history.push("/")
            dispatch(ClearSuccessAction())
        }
        if(error){
            alert.error(error, {position:"bottom center",transition:"scale"})
            dispatch(ClearErrorAction())
        }
    },[success, loggedUser,error, dispatch, alert, history])


    const [user,setUser] = useState({
        name:"",
        password:""
    })
    const loginInputHandler = (e) =>{
        const {name, value} = e.target
        setUser({...user, [name]:value})
    }
    const loginFormSubmit = (e) =>{
        e.preventDefault()
        dispatch(UserLoginAction(user))
    }
    return (
        <div className='registration_container'>
            {loading && <Loader/>}
            <form onSubmit={loginFormSubmit} className='registration_form' action="">

                <label htmlFor="loginNameInput" className='registration_input_label' >
                    <span className='registration_input_icon_container' >
                        <svg width="1.2rem" fill='tomato' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path d="M256 8C118.941 8 8 118.919 8 256c0 137.059 110.919 248 248 248 48.154 0 95.342-14.14 135.408-40.223 12.005-7.815 14.625-24.288 5.552-35.372l-10.177-12.433c-7.671-9.371-21.179-11.667-31.373-5.129C325.92 429.757 291.314 440 256 440c-101.458 0-184-82.542-184-184S154.542 72 256 72c100.139 0 184 57.619 184 160 0 38.786-21.093 79.742-58.17 83.693-17.349-.454-16.91-12.857-13.476-30.024l23.433-121.11C394.653 149.75 383.308 136 368.225 136h-44.981a13.518 13.518 0 0 0-13.432 11.993l-.01.092c-14.697-17.901-40.448-21.775-59.971-21.775-74.58 0-137.831 62.234-137.831 151.46 0 65.303 36.785 105.87 96 105.87 26.984 0 57.369-15.637 74.991-38.333 9.522 34.104 40.613 34.103 70.71 34.103C462.609 379.41 504 307.798 504 232 504 95.653 394.023 8 256 8zm-21.68 304.43c-22.249 0-36.07-15.623-36.07-40.771 0-44.993 30.779-72.729 58.63-72.729 22.292 0 35.601 15.241 35.601 40.77 0 45.061-33.875 72.73-58.161 72.73z" />
                        </svg>
                    </span>
                    <input onChange={loginInputHandler} className='registration_input' placeholder='Enter your email ID...' type="email" name="email" id="loginNameInput" />
                </label>

                <label htmlFor="loginPasswordInput" className='registration_input_label' >
                    <span className='registration_input_icon_container' >
                        <svg width="1.2rem" fill='tomato' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path d="M512 176.001C512 273.203 433.202 352 336 352c-11.22 0-22.19-1.062-32.827-3.069l-24.012 27.014A23.999 23.999 0 0 1 261.223 384H224v40c0 13.255-10.745 24-24 24h-40v40c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24v-78.059c0-6.365 2.529-12.47 7.029-16.971l161.802-161.802C163.108 213.814 160 195.271 160 176 160 78.798 238.797.001 335.999 0 433.488-.001 512 78.511 512 176.001zM336 128c0 26.51 21.49 48 48 48s48-21.49 48-48-21.49-48-48-48-48 21.49-48 48z" />
                        </svg>
                    </span>
                    <input onChange={loginInputHandler} className='registration_input' placeholder='Enter your password...' type="password" name="password" id="loginPasswordInput" />
                </label>

                <span className='registration_input_label' style={{ justifyContent:"flex-end", maxWidth:"17rem"}}>
                    <NavLink style={{fontSize:"70%", textDecoration:"none", width:"max-content"}} to="/password/forgot">
                    Forgot Password
                    </NavLink>
                </span>

                <span style={{ display: "flex", justifyContent: "space-between", alignItems:"center", width: "100%", maxWidth: "17.3rem", margin:"1rem 0" }}>
                    <span  style={{display:"flex", alignItems:"center"}}>
                        <span style={{ fontSize: "70%" }}>Don't have account ?</span>
                        <button type="submit" style={{ width: "max-content", padding: "4px 10px", fontSize: "70%", fontWeight: "500", background: "transparent", border: "none", textDecoration: "underline" }}>
                           <NavLink to="/registration"> Register </NavLink>
                        </button>
                    </span>

                    <button className='registration_form_submit_btn' type="submit">
                        Login
                    </button>
                </span>



            </form>

            <div className='registration_with_container' >
                <h4 className='registration_with_heading' >LOGIN WITH</h4>

                <button className='registration_with_social_btn' >
                    <svg width="1rem" fill='red' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                        <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
                    </svg>
                    <span>
                        Google
                    </span>
                </button>

                <button className='registration_with_social_btn'>
                    <svg width='1rem' fill='red' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z" />
                    </svg>
                    <span>
                        Email
                    </span>
                </button>

                <button className='registration_with_social_btn' >
                    <svg width="1rem" fill='blue' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z" />
                    </svg>
                    <span>
                        Facebook
                    </span>
                </button>

            </div>
        </div>
    );
}

export default Login;