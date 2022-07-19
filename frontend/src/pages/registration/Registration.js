
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { UserRegisterAction, ClearSuccessAction, ClearErrorAction } from '../../redux/actions/UserAction';
import "./registration.css"
import {useAlert} from "react-alert"


function Registration({history}) {
    const dispatch = useDispatch()
    const alert = useAlert()
    const { loading, success, authenticate, user:loggedUser, error } = useSelector(state => state.user)

    const [user, setUser] = useState({
        name:"",
        email:"",
        phone:"",
        password:"",
        avatars:""
    })

    const registerInputHandler = (e) =>{
        const {name, value} = e.target
        if(name==="file"){

            const file = e.target.files[0]
            const reader = new FileReader()

            reader.onload = function(){
                if(reader.DONE){
                    setUser({...user, avatars : reader.result})
                }
            }
            reader.readAsDataURL(file)
        }
        else{
            setUser({...user, [name]:value })
        }
    }

    const userRegisterFormSubmit = (e) => {
        e.preventDefault()
        dispatch(UserRegisterAction(user))
    }

    useEffect(()=>{
        if(success){
            alert.success("Acount created successfilly !",{position:"bottom center",transition:"scale"})
            // history.push("/")
            dispatch(ClearSuccessAction())
        }
        if(error){
            alert.error(error, {position:"bottom center",transition:"scale"})
            dispatch(ClearErrorAction())
        }
    },[success, loggedUser,error, dispatch, alert, history])
    return (
        <div className='registration_container'>
            <form onSubmit={userRegisterFormSubmit} className='registration_form' action="">

                <label htmlFor="nameInput" className='registration_input_label' >
                    <span className='registration_input_icon_container' >
                        <svg width="1.2rem" fill='tomato' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z" />
                        </svg>
                    </span>
                    <input onChange={registerInputHandler} className='registration_input' placeholder='Enter your name...' type="text" name="name" id="nameInput" />
                </label>

                <label htmlFor="emailInput" className='registration_input_label' >
                    <span className='registration_input_icon_container' >
                        <svg width="1.2rem" fill='tomato' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path d="M256 8C118.941 8 8 118.919 8 256c0 137.059 110.919 248 248 248 48.154 0 95.342-14.14 135.408-40.223 12.005-7.815 14.625-24.288 5.552-35.372l-10.177-12.433c-7.671-9.371-21.179-11.667-31.373-5.129C325.92 429.757 291.314 440 256 440c-101.458 0-184-82.542-184-184S154.542 72 256 72c100.139 0 184 57.619 184 160 0 38.786-21.093 79.742-58.17 83.693-17.349-.454-16.91-12.857-13.476-30.024l23.433-121.11C394.653 149.75 383.308 136 368.225 136h-44.981a13.518 13.518 0 0 0-13.432 11.993l-.01.092c-14.697-17.901-40.448-21.775-59.971-21.775-74.58 0-137.831 62.234-137.831 151.46 0 65.303 36.785 105.87 96 105.87 26.984 0 57.369-15.637 74.991-38.333 9.522 34.104 40.613 34.103 70.71 34.103C462.609 379.41 504 307.798 504 232 504 95.653 394.023 8 256 8zm-21.68 304.43c-22.249 0-36.07-15.623-36.07-40.771 0-44.993 30.779-72.729 58.63-72.729 22.292 0 35.601 15.241 35.601 40.77 0 45.061-33.875 72.73-58.161 72.73z" />
                        </svg>
                    </span>
                    <input onChange={registerInputHandler} className='registration_input' placeholder='Enter your email ID...' type="email" name="email" id="emailInput" />
                </label>

                <label htmlFor="numberInput" className='registration_input_label'>
                    <span className='registration_input_icon_container'>
                        <svg height="1.2rem" fill='tomato' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                            <path d="M272 0H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h224c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48zM160 480c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm112-108c0 6.6-5.4 12-12 12H60c-6.6 0-12-5.4-12-12V60c0-6.6 5.4-12 12-12h200c6.6 0 12 5.4 12 12v312z" />
                        </svg>
                    </span>
                    <input onChange={registerInputHandler} className='registration_input' placeholder='Enter your phone number...' type="number" name="phone" id="numberInput" />
                </label>



                <label htmlFor="passwordInput" className='registration_input_label' >
                    <span className='registration_input_icon_container' >
                        <svg width="1.2rem" fill='tomato' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path d="M512 176.001C512 273.203 433.202 352 336 352c-11.22 0-22.19-1.062-32.827-3.069l-24.012 27.014A23.999 23.999 0 0 1 261.223 384H224v40c0 13.255-10.745 24-24 24h-40v40c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24v-78.059c0-6.365 2.529-12.47 7.029-16.971l161.802-161.802C163.108 213.814 160 195.271 160 176 160 78.798 238.797.001 335.999 0 433.488-.001 512 78.511 512 176.001zM336 128c0 26.51 21.49 48 48 48s48-21.49 48-48-21.49-48-48-48-48 21.49-48 48z" />
                        </svg>
                    </span>
                    <input onChange={registerInputHandler} className='registration_input' placeholder='Enter your password...' type="password" name="password" id="passwordInput" />
                </label>

                <label htmlFor="fileInput" className='registration_input_label' >
                    <span className='registration_input_icon_container' >
                        <svg width='1.2rem' fill='tomato' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path d="M512 144v288c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V144c0-26.5 21.5-48 48-48h88l12.3-32.9c7-18.7 24.9-31.1 44.9-31.1h125.5c20 0 37.9 12.4 44.9 31.1L376 96h88c26.5 0 48 21.5 48 48zM376 288c0-66.2-53.8-120-120-120s-120 53.8-120 120 53.8 120 120 120 120-53.8 120-120zm-32 0c0 48.5-39.5 88-88 88s-88-39.5-88-88 39.5-88 88-88 88 39.5 88 88z" />
                        </svg>
                    </span>
                    <input onChange={registerInputHandler} className='registration_input' type="file" name="file" id="fileInput" />
                </label>

                <span style={{ display: "flex", justifyContent: "space-between", alignItems:"center", width: "100%", maxWidth: "17.3rem", margin:"1rem 0" }}>
                    <span  style={{display:"flex", alignItems:"center"}}>
                        <span style={{ fontSize: "70%" }}>Already have account ?</span>
                        <button type="submit" style={{ width: "max-content", padding: "4px 10px", fontSize: "70%", fontWeight: "500", background: "transparent", border: "none", textDecoration: "underline" }}>
                           <NavLink to="/login"> Login </NavLink>
                        </button>
                    </span>

                    <button className='registration_form_submit_btn' type="submit">
                        Register
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

export default Registration;