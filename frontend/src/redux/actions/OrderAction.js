import axios from "axios"
import { CLEAR_ORDER_ERROR, CLEAR_ORDER_SUCCESS, CREATE_NEW_ORDER_FAILED, CREATE_NEW_ORDER_REQUEST, CREATE_NEW_ORDER_SUCCESS, GET_ALL_ORDERS_FAILED, GET_ALL_ORDERS_REQUEST, GET_ALL_ORDERS_SUCCESS, GET_USER_ORDERS_FAIL, GET_USER_ORDERS_REQUEST, GET_USER_ORDERS_SUCCESS, UPDATE_ORDER_FAILED, UPDATE_ORDER_REQUEST, UPDATE_ORDER_SUCCESS } from "../types/OrderTypes"


export const CreateOrderAction = (newOrder) => async (dispatch) => {
    try {
        dispatch({
            type : CREATE_NEW_ORDER_REQUEST
        })
        const config = {
            headers:{ "Content-Type":"application/json"}
        }
        const { data } = await axios.post("/api/v1/order/create", newOrder, config)
        console.log(data)
        dispatch({
            type: CREATE_NEW_ORDER_SUCCESS,
            payload : data
        })
    } catch (error) {
        dispatch({
            type : CREATE_NEW_ORDER_FAILED,
            payload : error.response.data.message
        })
    }
}

export const GetAllOrderAction = () => async (dispatch) => {
    try {
        dispatch({
            type : GET_ALL_ORDERS_REQUEST
        })
        const {data} = await axios.get("/api/v1/orders")
        dispatch({
            type : GET_ALL_ORDERS_SUCCESS,
            payload : data.orders
        })
    } catch (error) {
        dispatch({
            type : GET_ALL_ORDERS_FAILED,
            payload : error.response.data.message
        })
    }
}

export const UpdateOrderAction = (orderStatus,orderId,productId) => async (dispatch)=>{
try {
    dispatch({
        type : UPDATE_ORDER_REQUEST
    })
    const config ={
        headers:{"Content-Type":"application/json"}
    }
    const { data } = await axios.post(`/api/v1/order/update`, {orderId,orderStatus, productId}, config)

    dispatch({
        type : UPDATE_ORDER_SUCCESS,
        payload : data
    })
} catch (error) {
    dispatch({
        type : UPDATE_ORDER_FAILED,
        payload : error.response.data.message
    })
}
}

export const GetUserOrdersAction = (userId) => async (dispatch) => {
    try {
        dispatch({
            type : GET_USER_ORDERS_REQUEST
        })

         const {data} = await axios.get("/api/v1/my/orders")

         console.log(data)

         dispatch({
             type : GET_USER_ORDERS_SUCCESS,
             payload : data
         })
    } catch (error) {
        dispatch({
            type : GET_USER_ORDERS_FAIL,
            payload : error.response.data.message
        })
    }

}

export const ClearOrderError = () => (dispatch)=>{
    dispatch({
        type : CLEAR_ORDER_ERROR
    })
}
export const ClearOrderSuccess = () => (dispatch)=>{
    dispatch({
        type : CLEAR_ORDER_SUCCESS
    })
}

