import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { ClearOrderError, ClearOrderSuccess, GetUserOrdersAction } from "../../redux/actions/OrderAction";
import Loader from "../loader/Loader";
// import {} 

const Orders = () => {
    const dispatch = useDispatch()
    const {loading, success, error, orders} = useSelector(state=>state.userOrders)
    // const {loading:userLoading, success:userSuccess, error:userError, user, authenticate} = useSelector(state=>state.user)

    console.log(success)

    useEffect(()=>{
            dispatch(GetUserOrdersAction())
    },[])

    useEffect(()=>{
        if(success){
            dispatch(ClearOrderSuccess())
        }
        if(error){
            dispatch(ClearOrderError())
        }
    },[success,error])

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
                                                

                                            </tr>
                                        })}
                                    </tbody>
                                </table>
                            </div>
                           
                        </td>
                        <td>{v.orderStatus}</td>
                        
                    </tr>
                })}
            </tbody>
        </table>
    </div>
    );
}
export default Orders;