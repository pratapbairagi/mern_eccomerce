import axios from "axios";
import { useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux"
import {useHistory} from "react-router-dom"
import "./orderPayment.css"
import { CardNumberElement, CardCvcElement, CardExpiryElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { ClearOrderSuccess, CreateOrderAction } from "../../../redux/actions/OrderAction";

const OrderPayment = () => {

    const savedOrderItems = sessionStorage.getItem("orderItems")
    const savedShipingAddress = localStorage.getItem("shippingAddress")


    const elements = useElements()
    const stripe = useStripe()
    const dispatch = useDispatch()
    const history = useHistory()
    const {loading, success, order, error} = useSelector(state=>state.createOrder)

    const newOrder= {
        shippingInfo: savedShipingAddress ? JSON.parse(savedShipingAddress):"",
        orderItems: savedOrderItems ? JSON.parse(savedOrderItems).cart : "",
        paymentInfo: "",
        itemsPrice: savedOrderItems ? JSON.parse(savedOrderItems).subTotal : 0,
        shippingPrice: savedOrderItems ? JSON.parse(savedOrderItems).deliveryCharge : 0,
        taxPrice: savedOrderItems ? JSON.parse(savedOrderItems).tax : 0,
        totalPrice: savedOrderItems ? JSON.parse(savedOrderItems).total : 0
    }


    const paymentSubmit = async (e) => {
        e.preventDefault()

        try {
            const paymentData = {
                amount: JSON.parse(savedOrderItems).total
            }

            const config = {
                headers: { "Content-Type": "application/json" }
            }

            const { data } = await axios.post("/api/v1/payment/create", paymentData, config)
            const client_secret = data.client_secret

            console.log(data)
            if (!elements || !stripe) {
                // error
            }
            else {
                const shippingDetails = localStorage.getItem("shippingAddress") && JSON.parse(localStorage.getItem("shippingAddress"))

                const result = await stripe.confirmCardPayment(client_secret, {
                    payment_method: {
                        card: elements.getElement(CardNumberElement),
                        billing_details: {
                            name: shippingDetails.name,
                            email: "",
                            phone: shippingDetails.phone,
                            address: {
                                line1: shippingDetails.address,
                                line2: "",
                                city: shippingDetails.city,
                                state: shippingDetails.state,
                                country: shippingDetails.country,
                                postal_code: shippingDetails.pinCode
                            }
                        }
                    }
                })
                

                if (result.error) {
                    // error
                }
                if (result.paymentIntent.status === "succeeded") {
                    newOrder.paymentInfo ={
                        id: result.paymentIntent.id,
                        status : result.paymentIntent.status
                    }

                    dispatch(CreateOrderAction(newOrder))
                }
            }
        } catch (error) {

        }
    }

    useEffect(()=>{
        if(success){
            dispatch(ClearOrderSuccess())
            history.push("/order/success")
        }
    },[loading, success, error])
    return (
        <div className="orderPayment_container" style={{ width: "100%", height: "max-content", minHeight: "90vh", marginTop: "10vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <div className="OrderPayment_subContainer" style={{ width: "max-content", minWidth: "10rem", boxShadow: "0 0 4px grey", padding: "2rem 2rem", borderRadius: "4px" }}>
                <h4 style={{ width: "max-content", margin: "0 auto", borderBottom: "2px solid red" }}>PAYMENT</h4>
                <form onSubmit={paymentSubmit} action="" style={{ display: "flex", flexDirection: "column", rowGap: "4px", padding: "0", width: "100%", marginTop: "1rem", maxWidth: "20rem", minWidth: "0" }}>

                    <CardNumberElement className="CardNumberElement" />
                    <CardExpiryElement className="CardExpiryElement" />
                    <CardCvcElement className="CardCvcElement" />

                    <input style={{ width: "100%", padding: "3px", background: "tomato", color: "white", border: "none", borderRadius: "4px", boxShadow: "0 1px 3px grey", marginTop: ".5rem" }} type="submit" value="SUBMIT" />
                </form>
            </div>
        </div>
    );
}
export default OrderPayment;