import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/loader/Loader";
import { CartQtyAction, ClearError, ClearSuccess, RemoveFromCartAction } from "../../redux/actions/CartAction";
import "./cart.css"

const Cart = ({history}) => {
    const {loading:cartLoading, success: cartSuccess, error: cartError, cart} = useSelector(state=>state.cart)
  const {user, success, loading, error, authenticate} = useSelector(state=>state.user)

    const dispatch = useDispatch()

    useEffect(()=>{
        if(cartSuccess){
            dispatch(ClearSuccess())
        }
        if(cartError){
            dispatch
            (ClearError())
        }
    },[cartSuccess, cartError])

     // dispatching increasing/decreasing qty to redux
     const qtyHandler = ({qty, id}) => {
        dispatch(CartQtyAction(qty, id))
    }

      // adding cart item to redux
      const removeFromCartHandler = (id) => {
        dispatch(RemoveFromCartAction(id))
    }

    const [cartSubTotal, setCartSubTotal] = useState()
    useEffect(()=>{
        if(cart){
            let x = 0
            cart.forEach(item=>{
                x+=+(item.price*item.quantity)
            })
            setCartSubTotal(x)
        }
    },[cartSuccess])

    const addOrderItem = () =>{
        if(authenticate){
        sessionStorage.setItem("orderItems", 
        JSON.stringify({
            cart:cart,
            subTotal: cartSubTotal, 
            tax: Number((cartSubTotal*0.18).toFixed()) , 
            deliveryCharge : cartSubTotal<500 ? 100 : 0,
            total : Number(((cartSubTotal) + (cartSubTotal*0.18) + (cartSubTotal<500 ? 100 : 0)).toFixed())
         }))
         history.push("/shipping/info")
        }
        else{
            history.push("/login")
        }
    }

    return (
    <div className="cartContainer" >
        <h3>Your Cart</h3>
        
       
        {cartLoading ? <Loader/> :
        <div className="cartContents">
            {cart.map((item,index)=>{
           return <div key={index} className="cartItem">
               <div className="cartItemsContainer">
                <img className="col col-3" src={item.images[0].url} alt="" />

                
                <div className="cartItemDetails">
                <div className="col col-12 cartItemName">{item.name}</div>
                <div className="cartItemCat">{item.category}</div>
                <div className="cartItemPrice">Rs.{item.price}</div>
               
                <div className=" col col-12 cartItemQtyBtns">
                    <button onClick={() => item.quantity > 1 && qtyHandler({qty:"-", id:item.product})}>-</button>
                    <div style={{}} className="cartItemQty">{item.quantity}</div>
                    <button onClick={() => qtyHandler({qty:"+", id:item.product})}>+</button>
                </div>
                    <button className="cartRemoveBtn" onClick={() => removeFromCartHandler(item.product)}>Remove</button>
                </div>

                <div className="col col-xl-1 col-2 cartItemTotal">
                    <span className="cartItemTotalPrice">{(item.quantity*item.price)}</span>
                </div>

            </div>
            </div>
        })}
        </div>
    }
    <div className="cartItemsProceedsContainer">
        <div className="cartItemsSubTotal">
            <span>Sub Total </span>
            <span>{cartSubTotal}/-</span>
        </div>
        <div className="cartItemsTax">
            <span>Tax</span>
            <span>{(cartSubTotal*0.18).toFixed()}/-</span>
        </div>
        <div className="cartItemsDeliverCharge">
            <span>Deliver Charge</span>
            <span>{cartSubTotal<500 ? 100 : 0}/-</span>
        </div>
        <div className="cartItemsDiscount">
            <span>Discount</span>
            <span>0/-</span>
        </div>
        <div className="cartItemsTotal">
            <span>Total</span>
            <span>{(cartSubTotal+(cartSubTotal*0.18)+(cartSubTotal<500 ? 100 : 0)).toFixed()}/-</span>
        </div>
        <button className="cartItemsProceedBtn" onClick={addOrderItem}>PROCEED</button>
    </div>
    </div>
    );
}
export default Cart;