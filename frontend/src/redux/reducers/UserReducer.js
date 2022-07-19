import { CLEAR_ERROR, CLEAR_SUCCESS, EDIT_USER_FAIL, EDIT_USER_REQUEST, EDIT_USER_SUCCESS, GET_SINGLE_USER_FAIL, GET_SINGLE_USER_REQUEST, GET_SINGLE_USER_SUCCESS, GET_USERS_FAIL, GET_USERS_REQUEST, GET_USERS_SUCCESS, LOGGED_USER_FAIL, LOGGED_USER_REQUEST, LOGGED_USER_SUCCESS, LOGIN_USER_FAIL, LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGOUT_USER_FAIL, LOGOUT_USER_REQUEST, LOGOUT_USER_SUCCESS, REGISTER_USER_FAIL, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, UPDATE_USER_ROLE_FAIL, UPDATE_USER_ROLE_REQUEST, UPDATE_USER_ROLE_SUCCESS } from '../types/UserTypes';

export const UserReducer = (
    state = {
        loading: false,
        success: false,
        user: {},
        error: null,
        authenticate: false
    },
    action) => {

        switch (action.type) {

        case REGISTER_USER_REQUEST :
            return {
                ...state,
                loading: true
            }
        case REGISTER_USER_SUCCESS :
            return {
                ...state,
                loading: false,
                success: true,
                user: action.payload.user,
                authenticate : true
            }
        case REGISTER_USER_FAIL :
            return {
                ...state,
                loading : false,
                error: action.payload
            }
            case LOGIN_USER_REQUEST :
            return {
                ...state,
                loading: true
            }
            case LOGIN_USER_SUCCESS :
            return {
                ...state,
                loading: false,
                success: true,
                user: action.payload.user,
                authenticate : true
            }
            case LOGIN_USER_FAIL :
            return {
                ...state,
                loading : false,
                error: action.payload
            }
        case LOGGED_USER_REQUEST:
            return {
                ...state,
                loading : true,
                authenticate : false
            }
        case LOGGED_USER_SUCCESS:
            return {
                ...state,
                loading : false,
                success : true,
                user : action.payload.user,
                authenticate : true
            }
        case LOGGED_USER_FAIL:
            return {
                ...state,
                loading : false,
                error : action.payload,
                authenticate : false
            }
        case CLEAR_SUCCESS:
            return {
                ...state,
                success: false
            }
        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            }
        default: return state
    }
}

//  user logout
export const userLogoutReducer = (
    state={
        loading : false,
        success : false,
        error : null
    }, 
    action) =>{

    switch(action.type){
        case LOGOUT_USER_REQUEST :
            return{
                ...state,
                loading : true
            }
        case LOGOUT_USER_SUCCESS :
            return{
                ...state,
                loading : false,
                success : true
            }
        case LOGOUT_USER_FAIL :
            return{
                ...state,
                error : action.payload
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

// get all users
export const getAllUsersReducers = (
    state={
        loading : false,
        success : false,
        users : [],
        error : null
    }, 
    action) =>{

    switch(action.type){
        case GET_USERS_REQUEST:
            return{
                ...state,
                loading : true
            }
            case GET_USERS_SUCCESS:
                return{
                    ...state,
                    loading : false,
                    success : true,
                    users : action.payload.users
                }
            case GET_USERS_FAIL:
                return{
                    ...state,
                    loading : false,
                    error : action.payload
                }
            case CLEAR_SUCCESS:
                 return{
                    ...state,
                    success : false
            }
            case CLEAR_ERROR :
                return{
                    ...state,
                    error : false
                }
            default : return state
    }

}

export const GetSingleUserReducer = (
    state={
        loading: false,
        success : false,
        user : {},
        error : null
    },
    action
) =>{
    switch(action.type){
        case GET_SINGLE_USER_REQUEST :
            return{
                ...state,
                loading : true
            }
        case GET_SINGLE_USER_SUCCESS :
            return{
                ...state,
                loading : false,
                success :true,
                user : action.payload.user
            }
        case GET_SINGLE_USER_FAIL :
            return{
                ...state,
                loading : false,
                error : action.payload
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

export const EditUserReducers = (
    state={
        loading : false,
        success : false,
        user :{},
        error : null
    },
    action ) =>{
        switch(action.type){
            case EDIT_USER_REQUEST :
                return{
                    ...state,
                    loading : true
                }
            case EDIT_USER_SUCCESS :
                return {
                    ...state,
                    loading : false,
                    success : true,
                    user : action.payload.user
                }
            case EDIT_USER_FAIL :
                return{
                    ...state,
                    loading : false,
                    error : action.payload
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

    export const UpdateUserRoleReducers = (
        state = {
            loading : false,
            success : false,
            user : {},
            error : null
        },
        action
    ) => {
        switch(action.type){
            case UPDATE_USER_ROLE_REQUEST :
                return{
                    ...state,
                    loading : true
                }
            case UPDATE_USER_ROLE_SUCCESS :
                return{
                    ...state,
                    loading : false,
                    success : true,
                    user : action.payload.user
                }
            case UPDATE_USER_ROLE_FAIL :
                return{
                    ...state,
                    loading : false,
                    error : action.payload
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