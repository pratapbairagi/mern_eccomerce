import { NavLink } from "react-router-dom";
import "./orderSuccess.css"


const OrderSuccess = () => {
    return (
    <div className="orderSuccess_container" >
        <div className="orderSuccess">
            <h3>Order Placed Successfully</h3>
            <button style={{boxShadow:"0 1px 2px black"}}> <NavLink style={{textDecoration:"none", color:"white"}} to="/orders"> View Order </NavLink> </button>
        </div>
    </div>
    );
}
export default OrderSuccess;