import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GetAllUsersAction } from "../../../redux/actions/UserAction";
import {useAlert} from "react-alert"

import "./footer.css"
import { NavLink } from "react-router-dom";
const Footer = () => {

    const dispatch = useDispatch()
    const alert = useAlert()
  const { user,  authenticate } = useSelector(state => state.user)
  const { users } = useSelector(state => state.users)


  const [message, setMessage] = useState({
      message : "",
      name:"",
      mail:"",
      id:"",
      sellerId:"",
      by :""
  })

    useEffect(()=>{
    dispatch(GetAllUsersAction())

    if(user.name){
        setMessage({
            mail: user.email ? user.email : "",
            name: user.name ? user.name : "",
            id : user._id ? user._id : "",
            by : user._id ? user._id : ""
        })
    }
  },[user, dispatch])

  const messageInputHandler = (e) =>{
      const {name, value} = e.target
      setMessage({...message, [name]:value})
  }

  const messageFormSubmitHandler = async (e) =>{
      e.preventDefault()

      const config = {
          headers : { "Content-Type" : "application/json" }
      }

      if(message.mail && message.message && message.name ){
        await axios.post("/api/v1/user/message", message, config).then((res)=>{
            alert.success(res.data.message, { "position":"bottom center"})
        }).catch((err)=>{
            alert.error(err.data.message , { "position":"bottom center"})
        })
      }
  }

    return (
        <div className="footer_container" >
            <div className="about_websiteContent">
                <div className="about_websiteContent_heading">Contents</div>
                <div>Products</div>
                <div>Message</div>
                <div>Services</div>
                <div>About</div>
            </div>

            {authenticate && 
            <form onSubmit={messageFormSubmitHandler} className="about_subscribePart">
                <label htmlFor="loginNameInput" className='registration_input_label' >
                    <span className='registration_input_icon_container' style={{ background: "white" }} >
                    TO
                    </span>
                    <select onChange={messageInputHandler} className='registration_input' placeholder='Enter your name...' style={{ background: "white" }} type="text" name="sellerId" id="loginNameInput" >
                        <option value="">Choose Dealer</option>
                        { users.length > 0 &&  users.filter((v,i)=>v.role === "admin").map((admins, adminsIndex)=>{
                        return <option key={admins._id} value={admins._id}>{admins.name}</option>
                        })
                    }
                    </select>
                </label>
                <label htmlFor="loginNameInput" className='registration_input_label' >
                    <span className='registration_input_icon_container' style={{ background: "white" }} >
                    <svg width="1.2rem" fill='tomato' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                        <path d="M272 256h91.36c43.2 0 82-32.2 84.51-75.34a79.82 79.82 0 0 0-25.26-63.07 79.81 79.81 0 0 0 9.06-44.91C427.9 30.57 389.3 0 347 0h-75a16 16 0 0 0-16 16v224a16 16 0 0 0 16 16zm40-200h40a24 24 0 0 1 0 48h-40zm0 96h56a24 24 0 0 1 0 48h-56zM155.12 22.25A32 32 0 0 0 124.64 0H99.36a32 32 0 0 0-30.48 22.25L.59 235.73A16 16 0 0 0 16 256h24.93a16 16 0 0 0 15.42-11.73L68.29 208h87.42l11.94 36.27A16 16 0 0 0 183.07 256H208a16 16 0 0 0 15.42-20.27zM89.37 144L112 75.3l22.63 68.7zm482 132.48l-45.21-45.3a15.88 15.88 0 0 0-22.59 0l-151.5 151.5-55.41-55.5a15.88 15.88 0 0 0-22.59 0l-45.3 45.3a16 16 0 0 0 0 22.59l112 112.21a15.89 15.89 0 0 0 22.6 0l208-208.21a16 16 0 0 0-.02-22.59z"/>
                    </svg>
                    </span>
                    <input onChange={messageInputHandler} defaultValue={authenticate ? user.name : ""} className='registration_input' placeholder='Enter your name...' style={{ background: "white" }} type="text" name="name" id="loginNameInput" />
                </label> 
                <label htmlFor="loginNameInput" className='registration_input_label' >
                    <span className='registration_input_icon_container' style={{ background: "white" }} >
                        <svg width="1.2rem" fill='tomato' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path d="M256 8C118.941 8 8 118.919 8 256c0 137.059 110.919 248 248 248 48.154 0 95.342-14.14 135.408-40.223 12.005-7.815 14.625-24.288 5.552-35.372l-10.177-12.433c-7.671-9.371-21.179-11.667-31.373-5.129C325.92 429.757 291.314 440 256 440c-101.458 0-184-82.542-184-184S154.542 72 256 72c100.139 0 184 57.619 184 160 0 38.786-21.093 79.742-58.17 83.693-17.349-.454-16.91-12.857-13.476-30.024l23.433-121.11C394.653 149.75 383.308 136 368.225 136h-44.981a13.518 13.518 0 0 0-13.432 11.993l-.01.092c-14.697-17.901-40.448-21.775-59.971-21.775-74.58 0-137.831 62.234-137.831 151.46 0 65.303 36.785 105.87 96 105.87 26.984 0 57.369-15.637 74.991-38.333 9.522 34.104 40.613 34.103 70.71 34.103C462.609 379.41 504 307.798 504 232 504 95.653 394.023 8 256 8zm-21.68 304.43c-22.249 0-36.07-15.623-36.07-40.771 0-44.993 30.779-72.729 58.63-72.729 22.292 0 35.601 15.241 35.601 40.77 0 45.061-33.875 72.73-58.161 72.73z" />
                        </svg>
                    </span>
                    <input onChange={messageInputHandler} defaultValue={authenticate ? user.email : ""} className='registration_input' placeholder='Enter your email ID...' style={{ background: "white" }} type="email" name="mail" id="loginNameInput" />
                </label>
            

                <label htmlFor="loginNameInput" className='registration_input_label' >
                    <span className='registration_input_icon_container' style={{ background: "white" }} >
                    <svg width="1.2rem" fill='tomato' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                        <path d="M528 448H48c-26.51 0-48-21.49-48-48V112c0-26.51 21.49-48 48-48h480c26.51 0 48 21.49 48 48v288c0 26.51-21.49 48-48 48zM128 180v-40c0-6.627-5.373-12-12-12H76c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm-336 96v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm-336 96v-40c0-6.627-5.373-12-12-12H76c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm288 0v-40c0-6.627-5.373-12-12-12H172c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h232c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12z"/>
                    </svg>
                    </span>
                    <textarea onChange={messageInputHandler} className='registration_input' placeholder='Type your message...' style={{ background: "white", resize:"none" }} type="text" name="message" id="loginNameInput" ></textarea> 
                </label>
                <button type="submit">
                    MESSAGE
                </button>
            </form>
            }

            <div className="about_contactPart">

                <div className="aboutContact_container">
                    <div className="aboutContact_heading">Our Contacts</div>
                    <div style={{ width: "max-content", display: "flex", columnGap: ".5rem" }}>
                        <span style={{ width: "4rem" }}>Delhi</span>
                        <span style={{ width: "6rem" }}>+011 9876543</span>
                    </div>
                    <div style={{ width: "max-content", display: "flex" }}>
                        <span style={{ width: "4rem" }}>Mumbai</span>
                        <span style={{ width: "6rem" }}>+022 9876543</span>
                    </div>
                    <div style={{ width: "max-content", display: "flex" }}>
                        <span style={{ width: "4rem" }}>Kolkata</span>
                        <span style={{ width: "6rem" }}>+033 9876543</span>
                    </div>
                    <div style={{ width: "max-content", display: "flex" }}>
                        <span style={{ width: "4rem" }}>Banglore</span>
                        <span style={{ width: "6rem" }}>+044 9876543</span>
                    </div>
                </div>

                <div className="aboutLinks_container" >
                    <div className="aboutLinks_heading">Direct Links</div>
                    <div style={{ width: "max-content", display: "flex", columnGap: ".5rem" }}>
                        <span style={{ width: "4rem" }}>
                            <NavLink style={{textDecoration:"none", color:"grey"}} to="/">
                            Home
                            </NavLink>
                            </span>
                    </div>
                    <div style={{ width: "max-content", display: "flex" }}>
                        <span style={{ width: "4rem" }}>
                        <NavLink style={{textDecoration:"none", color:"grey"}} to="/products/">
                            PRODUCTS
                            </NavLink>
                            </span>
                            
                    </div>
                    <div style={{ width: "max-content", display: "flex" }}>
                        <span style={{ width: "4rem" }}>
                        <NavLink style={{textDecoration:"none", color:"grey"}} to="/about">
                            ABOUT
                            </NavLink>
                            </span>
                    </div>
                    <div style={{ width: "max-content", display: "flex" }}>
                        <span style={{ width: "4rem" }}>
                            <NavLink style={{textDecoration:"none", color:"grey"}} to="/" >
                            CONTACT
                            </NavLink>
                            </span>
                    </div>
                </div>


                <div className="aboutSocial_container">
                    <div className="aboutSocial_heading">Our Social Media</div>
                    <div style={{ width: "max-content", display: "flex", columnGap: ".5rem" }}>
                        {/* <span style={{ width: "4rem" }}>Facebook</span> */}
                        {/* <span style={{ width: "8rem" }}  >Pratap</span> */}
                        <a style={{ textDecoration:"none", color:"grey" }} href="https://www.facebook.com/pratap.bairagi">Facebook</a>

                    </div>
                    <div style={{ width: "max-content", display: "flex" }}>
                        {/* <span style={{ width: "4rem" }}>Twitter</span>
                        <span style={{ width: "8rem" }}>+022 9876543</span> */}
                        <a style={{ textDecoration:"none", color:"grey" }} href="https://www.facebook.com/pratap.bairagi">Twitter</a>

                    </div>
                    <div style={{ width: "max-content", display: "flex" }}>
                        {/* <span style={{ width: "4rem" }}>Instagram</span>
                        <span style={{ width: "8rem" }}>+033 9876543</span> */}
                        <a style={{ textDecoration:"none", color:"grey" }} href="https://www.instagram.com/its_protap">Instagram</a>

                    </div>
                    <div style={{ width: "max-content", display: "flex" }}>
                        {/* <span style={{ width: "4rem" }}>LinkedIn</span>
                        <span style={{ width: "8rem" }}>+044 9876543</span> */}
                        <a style={{ textDecoration:"none", color:"grey" }} href="https://www.facebook.com/pratap.bairagi">LinkedIn</a>

                    </div>
                    <div style={{ width: "max-content", display: "flex" }}>
                        {/* <span style={{ width: "4rem" }}>WhatsApp</span> */}
                        <a style={{ textDecoration:"none", color:"grey" }} href="https://wa.me/8287889123">WhatsApp</a>
                    </div>
                </div>

                <div className="aboutAddress_container">
                    <div className="aboutAddress_heading">Our Office Address</div>
                    <div style={{ width: "max-content", display: "flex", columnGap: ".5rem" }}>
                        <span style={{ width: "4rem" }}>Delhi</span>
                        <span style={{ width: "max-content", wordBreak: "break-all", wordWrap: "break-word", maxWidth: "10rem" }}>TA - 282/4, Tughlakabad ext, South Delhi, Delhi-110019</span>
                    </div>
                    <div style={{ width: "max-content", display: "flex" }}>
                        <span style={{ width: "4rem" }}>Mumbai</span>
                        <span style={{ width: "max-content", wordBreak: "break-all", wordWrap: "break-word", maxWidth: "10rem" }}>TA - 282/4, Tughlakabad ext, South Delhi, Delhi-110019</span>
                    </div>
                    <div style={{ width: "max-content", display: "flex" }}>
                        <span style={{ width: "4rem" }}>Kolkata</span>
                        <span style={{ width: "max-content", wordBreak: "break-all", wordWrap: "break-word", maxWidth: "10rem" }}>TA - 282/4, Tughlakabad ext, South Delhi, Delhi-110019</span>
                    </div>
                    <div style={{ width: "max-content", display: "flex" }}>
                        <span style={{ width: "4rem" }}>Banglore</span>
                        <span style={{ width: "max-content", wordBreak: "break-all", wordWrap: "break-word", maxWidth: "10rem" }}>TA - 282/4, Tughlakabad ext, South Delhi, Delhi-110019</span>
                    </div>
                </div>

            </div>

            <div className="footerPart" style={{ width: "100%", padding: ".5rem", boxShadow: "0 0 2px grey", display: "flex", justifyContent: "center", color: "grey" }}>
                <span style={{ width: "max-content" }}>Ecommerce copyrights @ by Pratap</span>
            </div>
        </div>
    );
}
export default Footer;