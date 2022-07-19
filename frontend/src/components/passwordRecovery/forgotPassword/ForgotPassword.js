import axios from "axios";
import { useState } from "react";
import { useAlert } from "react-alert";

const ForgotPassword = () => {

    const alert = useAlert()
    const [mail,setMail] = useState("")
   
    const loginFormSubmit = async(e) =>{
        e.preventDefault()

        const config = { headers : { "Content-Type":"application/json"}}

        await axios.post("/api/v1/password/forgot", {mail, url: window.location.origin}, config).then((res)=>{
            alert.success(res.data.message,{"position":"bottom center"})
        }).catch((err)=>{
            alert.error(err.response.data.message,{"position":"bottom center"})
        })
    }

    return (
        <div className='registration_container'>
            <form onSubmit={loginFormSubmit} className='registration_form' action="">
                    <h4>Recovery Mail</h4>
                <label htmlFor="loginNameInput" className='registration_input_label' >
                    <span className='registration_input_icon_container' >
                        <svg width="1.2rem" fill='tomato' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path d="M256 8C118.941 8 8 118.919 8 256c0 137.059 110.919 248 248 248 48.154 0 95.342-14.14 135.408-40.223 12.005-7.815 14.625-24.288 5.552-35.372l-10.177-12.433c-7.671-9.371-21.179-11.667-31.373-5.129C325.92 429.757 291.314 440 256 440c-101.458 0-184-82.542-184-184S154.542 72 256 72c100.139 0 184 57.619 184 160 0 38.786-21.093 79.742-58.17 83.693-17.349-.454-16.91-12.857-13.476-30.024l23.433-121.11C394.653 149.75 383.308 136 368.225 136h-44.981a13.518 13.518 0 0 0-13.432 11.993l-.01.092c-14.697-17.901-40.448-21.775-59.971-21.775-74.58 0-137.831 62.234-137.831 151.46 0 65.303 36.785 105.87 96 105.87 26.984 0 57.369-15.637 74.991-38.333 9.522 34.104 40.613 34.103 70.71 34.103C462.609 379.41 504 307.798 504 232 504 95.653 394.023 8 256 8zm-21.68 304.43c-22.249 0-36.07-15.623-36.07-40.771 0-44.993 30.779-72.729 58.63-72.729 22.292 0 35.601 15.241 35.601 40.77 0 45.061-33.875 72.73-58.161 72.73z" />
                        </svg>
                    </span>
                    <input onChange={(e)=>setMail(e.target.value)} className='registration_input' placeholder='Enter your email ID...' type="email" name="email" id="loginNameInput" />
                </label>

                <button className='registration_form_submit_btn' style={{width:"100%", maxWidth:"17.5rem"}} type="submit">
                    Submit
                </button>
            </form>
        </div>
    );
}
export default ForgotPassword;