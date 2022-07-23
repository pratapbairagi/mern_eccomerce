import { CLEAR_HOME_BANNERS_ERROR, CLEAR_HOME_BANNERS_SUCCESS, GET_HOME_BANNERS_FAIL, GET_HOME_BANNERS_REQUEST, GET_HOME_BANNERS_SUCCESS } from "../types/HomeBannerTypes"

export const HomeBannerReducer =(
    state={
        loading : false,
        success : false,
        banners : [],
        error : null
    },
    action
) =>{
    switch(action.type){
        case GET_HOME_BANNERS_REQUEST :
            return{
                ...state,
                loading : true
            }
        case GET_HOME_BANNERS_SUCCESS :
            return{
                ...state,
                loading: false,
                success : true,
                banners : action.payload.banners
            }
        case GET_HOME_BANNERS_FAIL :
            return{
                ...state,
                loading : false,
                error : action.payload
            }
        case CLEAR_HOME_BANNERS_SUCCESS :
            return{
                ...state,
                success : false,
            }
        case CLEAR_HOME_BANNERS_ERROR :
            return{
                ...state,
                error : null
            }
        default : return state
    }
}