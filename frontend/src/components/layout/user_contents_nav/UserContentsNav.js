import { NavLink } from 'react-router-dom';
import "./userContentNav.css"
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ClearErrorAction, ClearSuccessAction, UserLoggedAction, UserLogoutAction } from '../../../redux/actions/UserAction';
import { useAlert } from 'react-alert';

const UserContentsNav = ({ userData }) => {
    const dispatch = useDispatch()
    const { authenticate, user } = useSelector(state => state.user)
    const { success: logoutSuccess, error: logouterror } = useSelector(state => state.logout)
    const { success: cartSuccess, error: cartError, cart } = useSelector(state => state.cart)

    const alert = useAlert()


    // user contents toggling
    const userContentsToggleFun = () => {
        const userContents_container = document.querySelector(".userContents_container")
        const userContents_icons = document.querySelectorAll(".userContents_container span")
        if (!userContents_container.className.includes("active")) {
            userContents_container.classList.add("active")
            userContents_icons.forEach(content => {
                content.classList.add("active")
            })
        }
        else {
            userContents_container.classList.remove("active")
            userContents_icons.forEach(content => {
                content.classList.remove("active")
            })
        }
    }

    // logout user handler
    const logoutUserHandler = async () => {
        dispatch(UserLogoutAction())
    }

    useEffect(() => {
        if (logoutSuccess) {
            alert.success("User Logged out !", { position: "bottom center" })
            dispatch(UserLoggedAction())
            dispatch(ClearSuccessAction())
        }
        if (logouterror) {
            alert.error(logouterror)
            dispatch(ClearErrorAction())
        }
    }, [logoutSuccess, logouterror, alert, dispatch])

    const [cartItemQty, setcartItemQty] = useState(0)
    // updating cart quantity in DOM element
    useEffect(() => {
        if (cart) {
            if (cart.length >= 0) {
                let q = 0
                cart.forEach((item, i) => {
                    q += +item.quantity
                })
                setcartItemQty(q)
            }
            else {
                setcartItemQty(0)
            }
        }
    }, [cart])

    return (

        <div className="userContainer">
            <div onClick={userContentsToggleFun} className="userProfileBtn" >
                {userData === null ?
                    <svg xmlns="http://www.w3.org/2000/svg" className="userProfileIcon" viewBox="0 0 512 512">
                        <title>Person Circle</title><path d="M258.9 48C141.92 46.42 46.42 141.92 48 258.9c1.56 112.19 92.91 203.54 205.1 205.1 117 1.6 212.48-93.9 210.88-210.88C462.44 140.91 371.09 49.56 258.9 48zm126.42 327.25a4 4 0 01-6.14-.32 124.27 124.27 0 00-32.35-29.59C321.37 329 289.11 320 256 320s-65.37 9-90.83 25.34a124.24 124.24 0 00-32.35 29.58 4 4 0 01-6.14.32A175.32 175.32 0 0180 259c-1.63-97.31 78.22-178.76 175.57-179S432 158.81 432 256a175.32 175.32 0 01-46.68 119.25z" /><path d="M256 144c-19.72 0-37.55 7.39-50.22 20.82s-19 32-17.57 51.93C191.11 256 221.52 288 256 288s64.83-32 67.79-71.24c1.48-19.74-4.8-38.14-17.68-51.82C293.39 151.44 275.59 144 256 144z" />
                    </svg>
                    :
                    <img className="userProfileIcon" style={{ borderRadius: "50%" }} src={userData.avatars.url} alt="" />
                }
            </div>
            <div className="userContents_container" >
                <span className="userContentIcon">
                    {authenticate ?
                        <NavLink onClick={logoutUserHandler} className="userContentLink" to="/" >
                            <svg style={{ width: "1.2rem", height: "1.2rem" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path d="M497 273L329 441c-15 15-41 4.5-41-17v-96H152c-13.3 0-24-10.7-24-24v-96c0-13.3 10.7-24 24-24h136V88c0-21.4 25.9-32 41-17l168 168c9.3 9.4 9.3 24.6 0 34zM192 436v-40c0-6.6-5.4-12-12-12H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h84c6.6 0 12-5.4 12-12V76c0-6.6-5.4-12-12-12H96c-53 0-96 43-96 96v192c0 53 43 96 96 96h84c6.6 0 12-5.4 12-12z" />
                            </svg>
                        </NavLink>
                        :
                        <NavLink className="userContentLink" to="/login" >
                            <svg style={{ width: "1.2rem", height: "1.2rem" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path d="M416 448h-84c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h84c17.7 0 32-14.3 32-32V160c0-17.7-14.3-32-32-32h-84c-6.6 0-12-5.4-12-12V76c0-6.6 5.4-12 12-12h84c53 0 96 43 96 96v192c0 53-43 96-96 96zm-47-201L201 79c-15-15-41-4.5-41 17v96H24c-13.3 0-24 10.7-24 24v96c0 13.3 10.7 24 24 24h136v96c0 21.5 26 32 41 17l168-168c9.3-9.4 9.3-24.6 0-34z" />
                            </svg>
                        </NavLink>
                    }
                </span>

                {/* {authenticate && user.role === "admin" &&
                    <span className="userContentIcon">
                        <NavLink className="userContentLink" to="/admin" >
                            <svg style={{ width: "1.3rem", height: "1.5rem", margin: "2px 2px 4px 6px" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                                <path d="M610.5 341.3c2.6-14.1 2.6-28.5 0-42.6l25.8-14.9c3-1.7 4.3-5.2 3.3-8.5-6.7-21.6-18.2-41.2-33.2-57.4-2.3-2.5-6-3.1-9-1.4l-25.8 14.9c-10.9-9.3-23.4-16.5-36.9-21.3v-29.8c0-3.4-2.4-6.4-5.7-7.1-22.3-5-45-4.8-66.2 0-3.3.7-5.7 3.7-5.7 7.1v29.8c-13.5 4.8-26 12-36.9 21.3l-25.8-14.9c-2.9-1.7-6.7-1.1-9 1.4-15 16.2-26.5 35.8-33.2 57.4-1 3.3.4 6.8 3.3 8.5l25.8 14.9c-2.6 14.1-2.6 28.5 0 42.6l-25.8 14.9c-3 1.7-4.3 5.2-3.3 8.5 6.7 21.6 18.2 41.1 33.2 57.4 2.3 2.5 6 3.1 9 1.4l25.8-14.9c10.9 9.3 23.4 16.5 36.9 21.3v29.8c0 3.4 2.4 6.4 5.7 7.1 22.3 5 45 4.8 66.2 0 3.3-.7 5.7-3.7 5.7-7.1v-29.8c13.5-4.8 26-12 36.9-21.3l25.8 14.9c2.9 1.7 6.7 1.1 9-1.4 15-16.2 26.5-35.8 33.2-57.4 1-3.3-.4-6.8-3.3-8.5l-25.8-14.9zM496 368.5c-26.8 0-48.5-21.8-48.5-48.5s21.8-48.5 48.5-48.5 48.5 21.8 48.5 48.5-21.7 48.5-48.5 48.5zM96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm224 32c1.9 0 3.7-.5 5.6-.6 8.3-21.7 20.5-42.1 36.3-59.2 7.4-8 17.9-12.6 28.9-12.6 6.9 0 13.7 1.8 19.6 5.3l7.9 4.6c.8-.5 1.6-.9 2.4-1.4 7-14.6 11.2-30.8 11.2-48 0-61.9-50.1-112-112-112S208 82.1 208 144c0 61.9 50.1 112 112 112zm105.2 194.5c-2.3-1.2-4.6-2.6-6.8-3.9-8.2 4.8-15.3 9.8-27.5 9.8-10.9 0-21.4-4.6-28.9-12.6-18.3-19.8-32.3-43.9-40.2-69.6-10.7-34.5 24.9-49.7 25.8-50.3-.1-2.6-.1-5.2 0-7.8l-7.9-4.6c-3.8-2.2-7-5-9.8-8.1-3.3.2-6.5.6-9.8.6-24.6 0-47.6-6-68.5-16h-8.3C179.6 288 128 339.6 128 403.2V432c0 26.5 21.5 48 48 48h255.4c-3.7-6-6.2-12.8-6.2-20.3v-9.2zM173.1 274.6C161.5 263.1 145.6 256 128 256H64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4z" />
                            </svg>
                        </NavLink>
                    </span>
                } */}

                {authenticate &&
                    <>
                        <span className="userContentIcon" >
                            <NavLink className="userContentLink" to="/cart" >
                                <span>{cartItemQty}</span>

                                {/* <span style={{fontSize:`${cartItemQty.length > 2 ? "70%" : "50%"}`}}>{cartItemQty}</span> */}
                                <svg title='logout' style={{ width: "1.2rem", height: "1.2rem" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                    <path d="M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z" />
                                </svg>
                            </NavLink>
                        </span>

                        <span className="userContentIcon">
                            <NavLink className="userContentLink" to="/profile" >
                                <svg style={{ width: "1.3rem", height: "1.5rem", margin: "2px 2px 4px 6px" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                                    <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h274.9c-2.4-6.8-3.4-14-2.6-21.3l6.8-60.9 1.2-11.1 7.9-7.9 77.3-77.3c-24.5-27.7-60-45.5-99.9-45.5zm45.3 145.3l-6.8 61c-1.1 10.2 7.5 18.8 17.6 17.6l60.9-6.8 137.9-137.9-71.7-71.7-137.9 137.8zM633 268.9L595.1 231c-9.3-9.3-24.5-9.3-33.8 0l-37.8 37.8-4.1 4.1 71.8 71.7 41.8-41.8c9.3-9.4 9.3-24.5 0-33.9z" />
                                </svg>
                            </NavLink>
                        </span>

                            {user.role === "admin" &&
                        <span className="userContentIcon">
                            <NavLink className="userContentLink" to="/admin" >
                                <svg width="1.4rem" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                    <path d="M576 136c0 22.09-17.91 40-40 40c-.248 0-.4551-.1266-.7031-.1305l-50.52 277.9C482 468.9 468.8 480 453.3 480H122.7c-15.46 0-28.72-11.06-31.48-26.27L40.71 175.9C40.46 175.9 40.25 176 39.1 176c-22.09 0-40-17.91-40-40S17.91 96 39.1 96s40 17.91 40 40c0 8.998-3.521 16.89-8.537 23.57l89.63 71.7c15.91 12.73 39.5 7.544 48.61-10.68l57.6-115.2C255.1 98.34 247.1 86.34 247.1 72C247.1 49.91 265.9 32 288 32s39.1 17.91 39.1 40c0 14.34-7.963 26.34-19.3 33.4l57.6 115.2c9.111 18.22 32.71 23.4 48.61 10.68l89.63-71.7C499.5 152.9 496 144.1 496 136C496 113.9 513.9 96 536 96S576 113.9 576 136z" />
                                </svg>
                            </NavLink>
                        </span>
                            }
                    </>
                }
            </div>
        </div>
    );
}

export default UserContentsNav;