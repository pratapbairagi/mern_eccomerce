import "./product.css"
import shirt1 from "./images/shirt.jpg"
// import {Rating} from "material-ui-rating"
// import {Dialog, DialogActions, DialogContent} from "@material-ui/core/"
// import {Box} from "@material-ui/core"
// import Rating from "react-rating"
// import StarRatings from "react-star-ratings"
// import Rating from 'material-ui-rating'
// import Rating from "material-ui-rating/lib/components/Rating/Rating"
import ReactStar from "react-rating-stars-component"
import { NavLink, useHistory } from "react-router-dom"
import { AddToCartAction, RemoveFromCartAction } from "../../redux/actions/CartAction"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"

const Product = ({ values }) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const { success, error, cart } = useSelector(state => state.cart)

    // dispatch item to redux for cart
    const addToCartHandler = (id) => {
        dispatch(AddToCartAction(id))
    }

    const [addToCartBtn, setAddToCartBtn] = useState(false)
    // cart btn text
    useEffect(() => {
        let itemExist = false
        if (cart) {
            itemExist = cart.find(item => item.product === values._id)
        }
        if (itemExist) {
            setAddToCartBtn(true)
        }
        else {
            setAddToCartBtn(false)
        }
    }, [cart, values, dispatch])

    // remove item from cart/redux
    const removeFromCartHandler = (id) => {
        dispatch(RemoveFromCartAction(id))
    }

    // updating redux cart quantity in every case like add,qty, increase qty, deccrease qty
    useEffect(() => {
        if (cart) {
            localStorage.setItem("cart", JSON.stringify(cart))
        }
    }, [cart, dispatch])

    return (
        <div className="cardContainer">
           
            <div onClick={() => history.push(`/product/view/${values?._id}`)} className="cardImageContainer">
                <img src={values?.images[0].url} alt="" />
            </div>


            <div className="productDetailsContainer">
                <div className="productName" title={values?.name}>{values?.name}</div>
                <div className="productPrice">₹ {values?.price}</div>
                <div className="productAddTocartBtnContainer">
                    {/* <button disabled={addToCartBtn? true : false} style={{background:`${addToCartBtn?"white":""}`, color:`${addToCartBtn? "tomato":""}`,boxShadow:`${addToCartBtn ? "inset 0 -1px 2px tomato":""}`}} onClick={()=>addToCartHandler(values?._id)} className="productAddToCartBtn">{addToCartBtn ? "ADDED" : "ADD TO CART"}</button> */}
                    {addToCartBtn ?

                        <button onClick={() => removeFromCartHandler(values?._id)} className="productAddToCartBtn">REMOVE</button>
                        :
                        <button onClick={() => addToCartHandler(values?._id)} className="productAddToCartBtn">{addToCartBtn ? "ADDED" : "ADD TO CART"}</button>
                    }
                </div>
                <div className="productStars">
                    <ReactStar
                        edit={false}
                        activeColor="tomato"
                        half={true}
                        size={window.innerWidth > 600 ? 13 : 10}
                        count={5}
                        isHalf={true}
                        value={values?.ratings}
                        classNames="reactStar"
                    />
                </div>

            </div>
        </div>
    );
}
export default Product;