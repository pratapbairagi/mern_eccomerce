import axios from "axios"
import { CLEAR_MESSAGE_ERROR, CLEAR_MESSAGE_SUCCESS, GET_ALL_MESSAGE_FAIL, GET_ALL_MESSAGE_REQUEST, GET_ALL_MESSAGE_SUCCESS } from "../types/MessageTypes"

export const GetAllMessageAction = (id) => async (dispatch) =>{
    try {
        dispatch({
            type : GET_ALL_MESSAGE_REQUEST
        })

        const {data} = await axios.get(`/api/v1/messages/${id}`)

        dispatch({
            type : GET_ALL_MESSAGE_SUCCESS,
            payload : data
        })
    } catch (error) {
        dispatch({
            type : GET_ALL_MESSAGE_FAIL,
            payload : error.response.data.message
        })
    }
}

export const Clear_message_success = () => (dispatch) =>{
    dispatch({
        type : CLEAR_MESSAGE_SUCCESS
    })
}

export const Clear_message_error = () => (dispatch) =>{
    dispatch({
        type : CLEAR_MESSAGE_ERROR
    })
}