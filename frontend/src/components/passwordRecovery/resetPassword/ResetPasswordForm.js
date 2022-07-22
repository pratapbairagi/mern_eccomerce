import axios from "axios"
import { useState } from "react"
import { useAlert } from "react-alert"
import { useHistory, useParams } from "react-router-dom"

const ResetPasswordForm = () => {

    const { token } = useParams()
    const alert = useAlert()
    const history = useHistory()

    const [newPassword, setNewPassword] = useState({
        newPassword: "",
        confirmNewPassword: ""
    })

    const [passwordMatch, setPasswordMatch] = useState("")

    const resetPasswordInputHandler = (e) => {

        const { name, value } = e.target
        setNewPassword({ ...newPassword, [name]: value })
        setPasswordMatch("")
    }

    const setNewPasswordFormSubmit = async (e) => {

        e.preventDefault()
        
        if (newPassword.newPassword !== newPassword.confirmNewPassword) {
            setPasswordMatch("Password does not match !")
        }
        else {
            if (token) {
                await axios.put(`/api/v1/password/recover/${token}`, newPassword).then((res) => {
                    alert.success(res.data.message, { "position": "bottom center" })
                    history.push("/login")
                }).catch((err) => {
                    alert.error(err.response.data.message, { "position": "bottom center" })
                })
            }
        }
    }
    return (
        <div className='registration_container'>
            {/* {loading && <Loader/>} */}
            <form onSubmit={setNewPasswordFormSubmit} className='registration_form' action="">
                <h4>Create New Password</h4>
                <label htmlFor="loginPasswordInput" className='registration_input_label' >
                    <span className='registration_input_icon_container' >
                        <svg width="1.2rem" fill='tomato' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path d="M512 176.001C512 273.203 433.202 352 336 352c-11.22 0-22.19-1.062-32.827-3.069l-24.012 27.014A23.999 23.999 0 0 1 261.223 384H224v40c0 13.255-10.745 24-24 24h-40v40c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24v-78.059c0-6.365 2.529-12.47 7.029-16.971l161.802-161.802C163.108 213.814 160 195.271 160 176 160 78.798 238.797.001 335.999 0 433.488-.001 512 78.511 512 176.001zM336 128c0 26.51 21.49 48 48 48s48-21.49 48-48-21.49-48-48-48-48 21.49-48 48z" />
                        </svg>
                    </span>
                    <input onChange={resetPasswordInputHandler} className='registration_input' placeholder='New Password...' type="password" name="newPassword" id="loginPasswordInput" />
                </label>

                <label htmlFor="loginPasswordInput" className='registration_input_label' >
                    <span className='registration_input_icon_container' >
                        <svg width="1.2rem" fill='tomato' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path d="M512 176.001C512 273.203 433.202 352 336 352c-11.22 0-22.19-1.062-32.827-3.069l-24.012 27.014A23.999 23.999 0 0 1 261.223 384H224v40c0 13.255-10.745 24-24 24h-40v40c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24v-78.059c0-6.365 2.529-12.47 7.029-16.971l161.802-161.802C163.108 213.814 160 195.271 160 176 160 78.798 238.797.001 335.999 0 433.488-.001 512 78.511 512 176.001zM336 128c0 26.51 21.49 48 48 48s48-21.49 48-48-21.49-48-48-48-48 21.49-48 48z" />
                        </svg>
                    </span>
                    <input onChange={resetPasswordInputHandler} className='registration_input' placeholder='Confirm New Password...' type="password" name="confirmNewPassword" id="loginPasswordInput" />
                </label>

                <span style={{ height: "1.5rem", fontSize: "70%", color: "red", width: "100%", maxWidth: "17.5rem", textAlign: "center" }}>{passwordMatch.length > 0 ? passwordMatch : ""}</span>

                <button className='registration_form_submit_btn' style={{ width: "100%", maxWidth: "17.5rem" }} type="submit">
                    Submit
                </button>
            </form>
        </div>
    )
}
export default ResetPasswordForm;