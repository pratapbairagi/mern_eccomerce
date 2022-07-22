import { useEffect, useState } from "react";
import "./confirmOrder.css"


const OrderConfirm = ({history}) => {
    const shippingAddress = localStorage.getItem("shippingAddress")
    const orderItemsArr = sessionStorage.getItem("orderItems")
    const [shippingAddressRef, setShippingAddressRef] = useState(null)
    const [orderItemsRef, setOrderItemsRef] = useState(null)
    // const [orderSummaryRef, setOrderSummaryRef] = useState(null)

    useEffect(()=>{
        if(shippingAddress){
           setShippingAddressRef(JSON.parse(shippingAddress))
        }
        if(orderItemsArr){
            setOrderItemsRef(JSON.parse(orderItemsArr))
        }
    },[shippingAddress, orderItemsArr])

    return(
        <div className="orderConfirmContainer" style={{marginTop:"17vh"}}>
            <div className="progressBar"></div>

            <div className="orderConfirm_subContainer">
                <div className="col col-12 col-md-7 colorderConfirm_shippingInfo">
                    <h4>Shipping Info</h4>
                    <div className="orderConfirm_ShippingInfo_name">
                        <span className="col col-2">Name : </span>
                        <span className="col col-9">{shippingAddressRef !==null && shippingAddressRef.name}</span>

                    </div>
                    <div className="orderConfirm_ShippingInfo_phone">
                        <span className="col col-2">Phone : </span>
                        <span className="col col-9">{shippingAddressRef !==null && shippingAddressRef.phone}</span>
                    </div>
                    <div className="orderConfirm_ShippingInfo_address">
                        <span className="col col-2">Address : </span>
                        <span className="col col-9">{shippingAddressRef !==null && `${shippingAddressRef.address + " , " + shippingAddressRef.country +  " , " + shippingAddressRef.state + " , " +  shippingAddressRef.city + " , " +  shippingAddressRef.state + " - " + shippingAddressRef.pinCode}`}</span>
                    </div>

                </div>
                <div className="col col-md-7 col-12 orderConfirm_items">
                    <h4>Order Items</h4>
                    
                    <div className="orderConfirm_orderItems_container">
                        {orderItemsRef !== null && orderItemsRef.cart.map((item,index)=>{
                       return <div key={index} className="orderConfirm_orderItems">
                           <div className="col col-3 orderConfirm_orderItem_itemImage">
                            <img src={item.images[0].url} style={{height:"4rem", aspectRation:"1/1"}} alt="" />
                           </div>
                            <div className="col col-4 orderConfirm_orderItem_itemName">
                                <span>{item.name}</span>
                            </div>
                            <div className="col col-3 orderConfirm_orderItem_itemPrice">
                                <span >{item.quantity}</span>
                                <span > X </span>
                                <span >{item.offer.avail === "yes" ? (item.price) - (item.price)*(item.offer.percentage/100) : item.price}</span>

                            </div>
                            <div className="col col-2 orderConfirm_orderItem_itemsQty" >
                                <span>{item.offer.avail === "yes" ? item.quantity*((item.price) - (item.price)*(item.offer.percentage/100)) : (item.price*item.quantity)}</span>
                            </div>

                        </div>
                    })}
                    </div>
                </div>
                <div className="col col-12 col-md-4 orderConfirm_orderSummary">
                    <h4>Order Summary</h4>

                    <div className="orderConfirm_orderSummary_container">
                        <div className="orderConfirm_orderSummary_subTotal">
                            <span>Sub Total : </span>
                            <span>{orderItemsRef !==null && orderItemsRef.subTotal}</span>
                        </div> 
                        <div className="orderConfirm_orderSummary_tax">
                            <span>Tax : </span>
                            <span>{orderItemsRef !==null && orderItemsRef.tax}</span>
                        </div>
                        <div className="orderConfirm_orderSummary_deliveryCharge">
                            <span>Delivery : </span>
                            <span>{orderItemsRef !==null && orderItemsRef.deliveryCharge}</span>
                        </div>
                        <div className="orderConfirm_orderSummary_discount">
                            <span>Discount : </span>
                            <span>{orderItemsRef !==null && orderItemsRef.discount}</span>
                        </div>
                        <div className="orderConfirm_orderSummary_total">
                            <span>Total : </span>
                            <span>{orderItemsRef !==null && orderItemsRef.total}</span>
                        </div>
                        <button onClick={()=>history.push("/order/payment")}>PROCEED</button>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default OrderConfirm;