import { ADD_TO_CART_FAIL, ADD_TO_CART_REQUEST, ADD_TO_CART_SUCCESS, ADJUST_CART_QUANTITY_FAIL, ADJUST_CART_QUANTITY_REQUEST, ADJUST_CART_QUANTITY_SUCCESS, CLEAR_ERROR, CLEAR_SUCCESS, REMOVE_FROM_CART_FAIL, REMOVE_FROM_CART_REQUEST, REMOVE_FROM_CART_SUCCESS } from "../types/CartTypes";


export const CartReducer =  (
    state={
        loading : false,
        success : false,
        cart : [],
        error : null
    }
    , action) =>{

    switch(action.type){
        case ADD_TO_CART_REQUEST :
            return{
                ...state,
                loading : true
            }
        case ADD_TO_CART_SUCCESS :
            let item = state.cart.find(v=>v.product===action.payload.product)

            if( item ){
                return{
                    ...state,
                    loading : false,
                    success : true,
                    cart : state.cart.map(v=>v.product===item.product ? action.payload : v)
                }
            }
            else{
                return{
                    ...state,
                    loading : false,
                    success : true,
                    cart : [...state.cart, action.payload]
                }
            }

        case ADD_TO_CART_FAIL :
            return{
                loading : false,
                error : action.payload
            }
        case ADJUST_CART_QUANTITY_REQUEST :
            return{
                ...state,
                loading : true
            }
        case ADJUST_CART_QUANTITY_SUCCESS :
            return{
                ...state,
                loading : false,
                success : true,
                cart : state.cart.map(item=> item.product === action.payload.id ? {...item, quantity : action.payload.qty==="+" ? item.quantity+= +1 : item.quantity+= -1} : item)
            }
        case ADJUST_CART_QUANTITY_FAIL :
            return{
                ...state,
                loading : false,
                error : "Not able to add quantity !"
            }
        case REMOVE_FROM_CART_REQUEST :
            return{
                ...state,
                loading : true
            }
        case REMOVE_FROM_CART_SUCCESS :
            return{
                ...state,
                loading : false,
                success : true,
                cart : state.cart.filter(item=>item.product !== action.payload)
            }
        case REMOVE_FROM_CART_FAIL :
            return{
                ...state,
                loading : false,
                error : "Something went wrong !"
            }
        case CLEAR_SUCCESS :
            return{
                ...state,
                success : false
            }
        case CLEAR_ERROR :
            return{
                ...state,
                error : null
            }
        default : return state
            
    }
}

