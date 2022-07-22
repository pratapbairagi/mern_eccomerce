import axios from "axios"
import { ADD_TO_CART_FAIL, ADD_TO_CART_REQUEST, ADD_TO_CART_SUCCESS, ADJUST_CART_QUANTITY_FAIL, ADJUST_CART_QUANTITY_REQUEST, ADJUST_CART_QUANTITY_SUCCESS, CLEAR_ERROR, CLEAR_SUCCESS, REMOVE_FROM_CART_FAIL, REMOVE_FROM_CART_REQUEST, REMOVE_FROM_CART_SUCCESS } from "../types/CartTypes"

    export const AddToCartAction = (id) => async (dispatch, getState) =>{
        try {
            dispatch({
                type : ADD_TO_CART_REQUEST
            })
            const {data} = await axios.get(`/api/v1/product/${id}`)

            console.log(data)

            dispatch({
                type : ADD_TO_CART_SUCCESS,
                payload : {
                    name : data.product.name,
                    product : data.product._id,
                    category : data.product.category,
                    description : data.product.description,
                    price : data.product.price,
                    images : data.product.images,
                    offer : data.product.offer,
                    quantity : 1,
                }
            })

            localStorage.setItem("cart",JSON.stringify(getState().cart.cart))

        } catch (error) {
            dispatch({
                type : ADD_TO_CART_FAIL,
                payload : error.response.data.message
            })
        }
    }
    //  remove from cart
    export const RemoveFromCartAction = (id) => async (dispatch) =>{
        try {
            
        
            dispatch({
                type : REMOVE_FROM_CART_REQUEST
            })

            dispatch({
                type : REMOVE_FROM_CART_SUCCESS,
                payload : id
            })
        } catch (error) {
            
            dispatch({
                type : REMOVE_FROM_CART_FAIL
            })
        }
    }

    // adjust cart qty
    export const CartQtyAction = (qty,id) => async (dispatch) =>{
        dispatch({
            type : ADJUST_CART_QUANTITY_REQUEST
        })
        dispatch({
            type : ADJUST_CART_QUANTITY_SUCCESS,
            payload : { qty , id }

        })
        dispatch({
            type : ADJUST_CART_QUANTITY_FAIL
        })
    }

    //  clear success
    export const ClearSuccess = () => async(dispatch) =>{
        dispatch({
            type : CLEAR_SUCCESS
        })
    }

     //  clear error
     export const ClearError = () => async(dispatch) =>{
        dispatch({
            type : CLEAR_ERROR
        })
    }

