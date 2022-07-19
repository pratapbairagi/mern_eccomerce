import axios from "axios"
import { CLEAR_ERROR, CLEAR_SUCCESS, EDIT_USER_REQUEST, EDIT_USER_SUCCESS, GET_SINGLE_USER_FAIL, GET_SINGLE_USER_REQUEST, GET_SINGLE_USER_SUCCESS, GET_USERS_FAIL, GET_USERS_REQUEST, GET_USERS_SUCCESS, LOGGED_USER_FAIL, LOGGED_USER_REQUEST, LOGGED_USER_SUCCESS, LOGIN_USER_FAIL, LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGOUT_USER_FAIL, LOGOUT_USER_REQUEST, LOGOUT_USER_SUCCESS, REGISTER_USER_FAIL, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, UPDATE_USER_ROLE_FAIL, UPDATE_USER_ROLE_REQUEST, UPDATE_USER_ROLE_SUCCESS } from '../types/UserTypes';

export const UserRegisterAction = (user) => async (dispatch) =>{
    try {
        dispatch({
            type : REGISTER_USER_REQUEST
        })
        const config ={
            headers :{"Content-Type": "application/json"}
        }
        const {data} = await axios.post("/api/v1/register", user, config)

        dispatch({
            type : REGISTER_USER_SUCCESS,
            payload : data
        })
    } catch (error) {
        dispatch({
            type : REGISTER_USER_FAIL,
            payload : error.response.data.message
        })
    }
}

// login user
export const UserLoginAction = (user) => async(dispatch) =>{
    try {
        dispatch({
            type : LOGIN_USER_REQUEST
        })

        const config ={
            headers:{"Content-Type":"application/json"}
        }
        const {data} = await axios.post("/api/v1/login", user, config)

        dispatch({
            type : LOGIN_USER_SUCCESS,
            payload : data
        })

    } catch (error) {
        dispatch({
            type : LOGIN_USER_FAIL,
            payload : error.response.data.message
        })
    }
}

// logged user
export const UserLoggedAction = () => async (dispatch) =>{
    try {
        dispatch({
            type :  LOGGED_USER_REQUEST
        })
     
        const {data} = await axios.get("/api/v1/userLogged")

        dispatch({
            type : LOGGED_USER_SUCCESS,
            payload : data
        })
    } catch (error) {
        dispatch({
            type : LOGGED_USER_FAIL,
            payload : error.response.data.message
        })
    }
}

export const UserLogoutAction = () => async(dispatch) =>{
    try {
        dispatch({
            type : LOGOUT_USER_REQUEST
        })
        const {data} = await axios.get("/api/v1/logout")

        dispatch({
            type : LOGOUT_USER_SUCCESS,
            payload : data
        })
    } catch (error) {
        dispatch({
            type : LOGOUT_USER_FAIL,
            payload : error.response.data.message
        })
    }
}

// get all users
export const GetAllUsersAction = () => async(dispatch) =>{
    try {
        dispatch({
            type : GET_USERS_REQUEST
        })
        const {data} = await axios.get("/api/v1/users")
        dispatch({
            type: GET_USERS_SUCCESS,
            payload : data
        })
    } catch (error) {
        dispatch({
            type : GET_USERS_FAIL,
            payload : error.response.data.message
        })
    }
}

export const GetSingleUserAction = (id) => async (dispatch) =>{
    try {
        dispatch({
            type : GET_SINGLE_USER_REQUEST
        })
        const {data} = await axios.get(`/api/v1/user/details/${id}`)

        dispatch({
            type : GET_SINGLE_USER_SUCCESS,
            payload : data
        })
    } catch (error) {
        dispatch({
            type : GET_SINGLE_USER_FAIL,
            payload : error.response.data.message
        })
    }
}

// edit profile by user
export const EditUserAction = (user) => async (dispatch) =>{
    try {
        dispatch({
            type : EDIT_USER_REQUEST
        })
        const config ={ 
            headers: {"Content-Type" : "multipart/form-data"} 
        }

        const { data } = await axios.put("/api/v1/profile/edit", user, config )

        dispatch({
            type : EDIT_USER_SUCCESS,
            payload : data
        })
    } catch (error) {
        dispatch({
            type : error.response.data.message,
            payload : error.response.data.message
        })
    }
}

export const UpdateUserRoleAction = (id, user) => async (dispatch) =>{
    try {
        dispatch({
            type : UPDATE_USER_ROLE_REQUEST
        })
       
        const { data } = await axios.put(`/api/v1/user/role/update/${id}`, user)

        dispatch({
            type : UPDATE_USER_ROLE_SUCCESS,
            payload : data
        })
    } catch (error) {
        dispatch({
            type : UPDATE_USER_ROLE_FAIL,
            payload : error.response.data.message
        })
    }
}



export const ClearSuccessAction = () => async(dispatch) =>{
    dispatch({
        type : CLEAR_SUCCESS
    })
}

export const ClearErrorAction = () => async(dispatch) =>{
    dispatch({
        type : CLEAR_ERROR
    })
}

