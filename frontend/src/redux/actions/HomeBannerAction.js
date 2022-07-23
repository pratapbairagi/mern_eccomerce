import axios from "axios"
import { CLEAR_HOME_BANNERS_ERROR, CLEAR_HOME_BANNERS_SUCCESS, GET_HOME_BANNERS_FAIL, GET_HOME_BANNERS_REQUEST, GET_HOME_BANNERS_SUCCESS } from "../types/HomeBannerTypes"

export const GetHomeBannersAction = () => async (dispatch) =>{
    try {
        dispatch({
            type : GET_HOME_BANNERS_REQUEST
        })

        const {data} = await axios.get("/api/v1/banners")

        dispatch({
            type : GET_HOME_BANNERS_SUCCESS,
            payload : data
        })
    } catch (error) {
        dispatch({
            type : GET_HOME_BANNERS_FAIL,
            payload : error.response.data.message
        })
    }
}

export const Clear_homeBannerSuccess = () => (dispatch) =>{
    dispatch({
        type : CLEAR_HOME_BANNERS_SUCCESS
    })
}

export const Clear_homeBannerError = () => (dispatch) =>{
    dispatch({
        type : CLEAR_HOME_BANNERS_ERROR
    })
}