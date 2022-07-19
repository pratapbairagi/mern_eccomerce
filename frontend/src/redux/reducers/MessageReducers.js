import { CLEAR_MESSAGE_ERROR, CLEAR_MESSAGE_SUCCESS, GET_ALL_MESSAGE_FAIL, GET_ALL_MESSAGE_REQUEST, GET_ALL_MESSAGE_SUCCESS } from "../types/MessageTypes";

export const GetAllMessagesReducer = (
    state={
        loading : false,
        success : false,
        error : null,
        messages : []
    },
    action
) =>{
    switch(action.type){
        case GET_ALL_MESSAGE_REQUEST :
            return{
                ...state,
                loading : true
            }
        case GET_ALL_MESSAGE_SUCCESS :
            return{
                ...state,
                loading : false,
                success : true,
                messages : action.payload.messages
            }
        case GET_ALL_MESSAGE_FAIL :
            return{
                ...state,
                loading : false,
                error : action.payload
            }
        case CLEAR_MESSAGE_SUCCESS :
            return{
                ...state,
                success : false
            }
        case CLEAR_MESSAGE_ERROR :
            return{
                ...state,
                error : null
            }
        default : return state
    }
}