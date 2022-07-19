import axios from "axios"
import { useEffect, useState } from "react"
import { useAlert } from "react-alert"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { Clear_message_error, Clear_message_success, GetAllMessageAction } from "../../../redux/actions/MessageAction"

const AdminMessages = () => {

    const { user } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const alert = useAlert()
    const messages = useSelector(state => state.allMessages)

    const usermessagesToggleHandler = (id) => {
        document.getElementById(`messagesId${id}`).style.display === "none" ?
            document.getElementById(`messagesId${id}`).style.display = "flex" :
            document.getElementById(`messagesId${id}`).style.display = "none"
    }

    const [message, setMessage] = useState({
        message: "",
        name: "",
        mail: "",
        id: "",
        sellerId: "",
        by: ""
    })

    // user mssg reply
    const submitUserMsgReply = async () => {

        const config = {
            headers: { "Content-Type": "application/json" }
        }
        await axios.post(`/api/v1/user/message`, message, config).then((res) => {
            dispatch(GetAllMessageAction(user._id))
            alert.success(res.data.message, { "position": "bottom center " })
        }).catch((err) => {
            alert.error(err.response.data.message)
        })

    }

    useEffect(() => {
        if (messages.success) {
            dispatch(Clear_message_success())
        }
        if (messages.error) {
            dispatch(Clear_message_error())
        }
    }, [messages, dispatch])
    return (
        <div className="usersList_container" style={{ width: "100%" }}>
            <div className="tableContainer" style={{ width: "100%", maxWidth: "100%", overflowX: "auto", overflowY: "hidden" }}>

                <table className="table" style={{ width: "100%" }}>
                    <thead>
                        <tr>
                            <td>No</td>
                            <td>Msg. ID</td>
                            <td>Name</td>
                            <td>User ID</td>
                            <td>Email</td>
                            <td>Messages</td>
                            <td>Delete</td>
                        </tr>
                    </thead>
                    <tbody style={{ width: "100%", maxWidth: "100%", overflowY: "auto" }}>
                        {messages.messages?.map((m, i) => {
                            return <tr key={i} style={{ fontSize: "90%" }}>
                                <td>{i + 1}</td>
                                <td>{m._id}</td>
                                <td>{m.user.name}</td>
                                <td>{m.user.id}</td>

                                <td>{m.user.email}</td>
                                <td>
                                    <span> {m.messages.length}</span>
                                    <span style={{ cursor: "pointer" }} onClick={() => usermessagesToggleHandler(m.user.id)}>🔻</span>
                                    <span className="orderItems_container" id={`messagesId${m.user.id}`} style={{ display: "none", position: "absolute", width: "100%", right: "0", top: "4.2rem", border: "1px solid red", background: "white", zIndex: "1", height: "88vh", minHeight: "none", overflowY: "auto", flexDirection: "column", justifyContent: "space-between" }}>
                                        <span onClick={() => usermessagesToggleHandler(m.user.id)} style={{ background: "red", width: "max-content", padding: "2px 8px", backgroundColor: "tomato", color: "white", cursor: "pointer", position: "absolute" }}>close</span>
                                        <span style={{ display: "flex", flexDirection: "column", width: "100%", marginTop: "2rem", overflowY: "auto", }}>
                                            {m.messages.map((msg, msgI) => {
                                                return <span key={msgI} style={{ minWidth: "100%", width: "100%", padding: ".1rem 1rem", rowGap: ".2rem" }}>
                                                    <span style={{ width: "max-content", display: "flex", flexDirection: "column", maxWidth: "70%", padding: ".1rem .6rem", rowGap: ".2rem", background: "tomato", color: "white", borderRadius: "7px", float: `${msg.by === user._id ? "right" : "left"}` }}>
                                                        <span style={{ width: "max-content", padding: ".1rem 0", borderRadius: "4px", fontSize: "70%", fontWeight: "600" }}>{msg.by === m.seller.id ? m.seller.name : m.user.name}</span>
                                                        <span style={{ width: "max-content", padding: ".3rem 1rem", borderRadius: "4px", border: "1px solid white", fontSize: "80%", background: "white", color: "grey" }}>{msg.message}</span>
                                                        <span style={{ width: "max-content", padding: ".1rem 0", borderRadius: "4px", fontSize: "60%", alignSelf: "flex-end" }}>{new Date(msg.createdAt).toLocaleString()}</span>
                                                    </span>
                                                </span>
                                            })}

                                        </span>
                                        <span style={{ display: "flex", with: "100%" }}>
                                            <input defaultValue="" onChange={(e) => setMessage({ ...message, message: e.target.value, name: m.user.name, id: m.user.id, mail: m.user.email, sellerId: m.seller.id, by: m.seller.id })} placeholder="Type your message..." style={{ width: "100%", height: "2.2rem", padding:"1px 1rem" }} type="text" name="" id="" />
                                            <button onClick={submitUserMsgReply} style={{ width: "max-content", height: "2.2rem", padding: "0 1rem", background: "tomato", color: "white", fontWeight: "700" }}>SEND</button>
                                        </span>
                                    </span>
                                </td>

                                <td>
                                    <button >Delete</button>
                                </td>
                            </tr>
                        })}
                    </tbody>

                </table>
            </div>
        </div>
    )
}

export default AdminMessages