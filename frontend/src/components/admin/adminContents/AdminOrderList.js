// import { useEffect } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom"
// import { ClearOrderError, ClearOrderSuccess, GetAllOrderAction } from "../../redux/actions/OrderAction";
// import Loader from "../loader/Loader";
import { useAlert } from "react-alert"

import { ClearOrderError, ClearOrderSuccess, UpdateOrderAction } from "../../../redux/actions/OrderAction";

const AdminOrderList = ({ orders }) => {
    const dispatch = useDispatch()
    const messageAlert = useAlert()
    // const {loading, success, error, orders} = useSelector(state=>state.orders)
    const { loading: updateOrderLoading, success: updateOrderSuccess, error: updateOrderError, order, message } = useSelector(state => state.updateOrder)

    useEffect(()=>{
        if(updateOrderSuccess){
            messageAlert.success(message,{"position":"bottom center"})
            dispatch(ClearOrderSuccess())
        }
        if(updateOrderError){
            messageAlert.error(updateOrderError,{"position":"bottom center"})
            dispatch(ClearOrderError())
        }
    },[updateOrderSuccess,updateOrderError])

    const orderStatusChangeHandler = ({ id, orderStatus, productId }) => {
        dispatch(UpdateOrderAction(orderStatus, id, productId))
    }

    const OrderItemsToggleHandler = (id) =>{
        document.getElementById(`orderId${id}`).style.display ==="none"? 
        document.getElementById(`orderId${id}`).style.display="block" :
        document.getElementById(`orderId${id}`).style.display="none"
    }

    return (
        <div className="ordersContainer" style={{ width: "100%", overflow: "auto", minHeight: "90vh", maxHeight: "100vh", marginTop: "10vh", display: "flex", flexDirection: "column" }}>
            <h3>Orders</h3>
            <table className="table table-responsive">
                <thead>
                    <tr>
                        <td>Date</td>
                        <td style={{ whiteSpace: "nowrap" }}>O. Id</td>
                        <td style={{ whiteSpace: "nowrap" }}>User Id</td>
                        <td style={{ whiteSpace: "nowrap" }}>O. Amt.</td>
                        <td>Items</td>
                        <td style={{ whiteSpace: "nowrap" }}>O. Status</td>
                        {/* <td style={{ whiteSpace: "nowrap" }}>O. Update</td> */}

                    </tr>
                </thead>
                <tbody>
                    {/* {loading ? <Loader/> : orders.map((v,i)=>{ */}
                    {orders.map((v, i) => {

                        return <tr key={i} style={{ position: "relative" }}>
                            <td style={{ display: "flex", flexDirection: "column", fontSize: "80%" }}>
                                <span >{new Date(v.createdAt).toLocaleString().split(",")[0]}</span>
                                <span style={{ whiteSpace: "nowrap" }}>{new Date(v.createdAt).toLocaleString().split(",")[1]}</span>
                            </td>
                            <td style={{ fontSize: "80%" }}>{v._id}</td>
                            <td style={{ fontSize: "80%" }}>{v.user}</td>
                            <td>{v.totalPrice}</td>
                            <td>
                                <button onClick={()=>OrderItemsToggleHandler(v._id)}>🔻</button>
                                <div className="orderItems_container" id={`orderId${v._id}`} style={{ display:"none", position: "absolute", width: "100%", left: "0", top: "3.6rem", border: "1px solid red", background: "white", zIndex: "1", height: "max-content", minHeight: "none", overflow: "auto" }}>
                                    <table className="table table-responsive">
                                        <thead>
                                            <tr style={{ fontSize: "80%" }}>
                                                <td>Pro. Id</td>
                                                <td>Pro. Name</td>
                                                <td>Pro. Price</td>
                                                <td>Pro. Qty</td>
                                                <td>Pro. View</td>
                                                <td>O. Status</td>
                                                <td>O. Update</td>
                                            </tr>
                                        </thead>
                                        <tbody style={{ fontSize: "70%" }}>
                                            {v.orderItems.map((oItem, oIndex) => {
                                                return <tr key={oIndex}>
                                                    <td>{oItem.product}</td>
                                                    <td>{oItem.name}</td>
                                                    <td>{oItem.price}</td>
                                                    <td>{oItem.quantity}</td>
                                                    <td>
                                                        <NavLink to={`/product/view/${oItem.product}`}>Link</NavLink>
                                                    </td>
                                                    <td>status</td>
                                                    <td>
                                                        <select defaultValue={oItem.orderStatus} onChange={(e) => orderStatusChangeHandler({ id: v._id, orderStatus: e.target.value, productId:oItem.product })} name="" id="">
                                                            <option disabled={oItem.orderStatus === "processing" || oItem.orderStatus === "shipped" || oItem.orderStatus === "delivered" ? true : false} value={"processing"}>Processing</option>
                                                            <option disabled={oItem.orderStatus === "shipped" || oItem.orderStatus === "delivered" ? true : false} value={"shipped"}>Shipped</option>
                                                            <option disabled={oItem.orderStatus === "delivered" ? true : false} value={"delivered"}>Delivered</option>
                                                        </select>
                                                    </td>

                                                </tr>
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                                {/* <select name="" id="">
                        {v.orderItems.map((oItem,oIndex)=>{
                           return <option key={oIndex} style={{display:"flex"}} value="">
                               <span>{oItem.name}</span>
                               <span style={{margin:"0 2px"}}>{oItem.price}</span>
                               <span style={{margin:"0 2px"}}>X</span>
                               <span style={{margin:"0 2px"}}>{oItem.quantity}</span>
                           </option>
                        })}
                        </select> */}
                            </td>
                            <td>{v.orderStatus}</td>
                            {/* <td>

                                <select defaultValue={v.orderStatus} onChange={(e) => orderStatusChangeHandler({ id: v._id, orderStatus: e.target.value })} name="" id="">
                                    <option disabled={v.orderStatus === "processing" || v.orderStatus === "shipped" || v.orderStatus === "delivered" ? true : false} value={"processing"}>Processing</option>
                                    <option disabled={v.orderStatus === "shipped" || v.orderStatus === "delivered" ? true : false} value={"shipped"}>Shipped</option>
                                    <option disabled={v.orderStatus === "delivered" ? true : false} value={"delivered"}>Delivered</option>
                                </select>
                            </td> */}
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    );
}
export default AdminOrderList;