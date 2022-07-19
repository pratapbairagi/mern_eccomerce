import { CLEAR_ORDER_ERROR, CLEAR_ORDER_SUCCESS, CREATE_NEW_ORDER_FAILED, CREATE_NEW_ORDER_REQUEST, CREATE_NEW_ORDER_SUCCESS, GET_ALL_ORDERS_FAILED, GET_ALL_ORDERS_REQUEST, GET_ALL_ORDERS_SUCCESS, GET_USER_ORDERS_FAIL, GET_USER_ORDERS_REQUEST, GET_USER_ORDERS_SUCCESS, UPDATE_ORDER_FAILED, UPDATE_ORDER_REQUEST, UPDATE_ORDER_SUCCESS } from "../types/OrderTypes"

export const CreateOrderReducer = (
    state={
        loading: false,
        success:false,
        error:null,
        order:""
    }, 
    action) => {
    switch(action.type){
        case CREATE_NEW_ORDER_REQUEST :
        return{
            ...state,
            loading: true
        }
        case CREATE_NEW_ORDER_SUCCESS :
            return{
                ...state,
                loading : false,
                success : true,
                order : action.payload
            }
        case CREATE_NEW_ORDER_FAILED : 
            return{
                ...state,
                loading : false,
                error : action.payload
        }
        case CLEAR_ORDER_ERROR : 
        return{
            ...state,
            error : null
        }
        case CLEAR_ORDER_SUCCESS : return{
            ...state,
            success : false
        }
        default : return state
    }
}

export const GetAllOrderReducer = (
    state={
        loading : false,
        success : false,
        orders : [],
        error : null
    }, 
    action) => {
    switch(action.type){
        case GET_ALL_ORDERS_REQUEST :
            return {
                ...state,
                loading : true
            }
        case GET_ALL_ORDERS_SUCCESS : 
        return{
            ...state,
            loading : false,
            success : true,
            orders : action.payload
        }
        case GET_ALL_ORDERS_FAILED :
            return{
                ...state,
                loading: false,
                error : action.payload
            }
        case CLEAR_ORDER_SUCCESS :
            return{
                ...state,
                success : false
            }
        case CLEAR_ORDER_ERROR :
            return{
                ...state,
                loading : false,
                error : null
            }
        default : return state
    }
}

export const GetUserOrdersReducer = (
    state={
        loading : false,
        success : false,
        orders : [],
        error : null
    }, 
    action) => {
    switch(action.type){
        case GET_USER_ORDERS_REQUEST :
            return {
                ...state,
                loading : true
            }
        case GET_USER_ORDERS_SUCCESS : 
        return{
            ...state,
            loading : false,
            success : true,
            orders : action.payload.orders
        }
        case GET_USER_ORDERS_FAIL :
            return{
                ...state,
                loading: false,
                error : action.payload
            }
        case CLEAR_ORDER_SUCCESS :
            return{
                ...state,
                success : false
            }
        case CLEAR_ORDER_ERROR :
            return{
                ...state,
                loading : false,
                error : null
            }
        default : return state
    }
}

export const UpdateOrderReducer = (
    state={
        loading: false,
        success : false,
        order : null,
        error : null,
        message : ""
    },
    action
    ) =>{
        switch(action.type){
            case UPDATE_ORDER_REQUEST :
                return{
                    ...state,
                    loading : true
                }
            case UPDATE_ORDER_SUCCESS :
                return {
                    ...state,
                    loading : false,
                    success : true,
                    order : action.payload.order,
                    message : action.payload.message
                }
            case UPDATE_ORDER_FAILED :
                return{
                    ...state,
                    loading : false,
                    error : action.payload
                }
            case CLEAR_ORDER_SUCCESS :
                return{
                    ...state,
                    success : false
                }
            case CLEAR_ORDER_ERROR :
                return{
                    ...state,
                    error : null
                }
            default : return state
        }
    
}