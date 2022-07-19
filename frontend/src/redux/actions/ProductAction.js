import axios from "axios"
import { CLEAR_ERROR, CLEAR_SUCCESS, CREATE_PRODUCT_FAIL, CREATE_PRODUCT_REQUEST, CREATE_PRODUCT_SUCCESS, GET_ALL_PRODUCTS_FAIL, GET_ALL_PRODUCTS_REQUEST, GET_ALL_PRODUCTS_SUCCESS, GET_PRODUCT_FAIL, GET_PRODUCT_REQUEST, GET_PRODUCT_SUCCESS, REVIEW_FAIL, REVIEW_REQUEST, REVIEW_SUCCESS, UPDATE_PRODUCT_FAIL, UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_SUCCESS } from "../types/ProductTypes"

export const GetAllProducts = (keyword = "", category = "", price = { from: 0, to: 999999 }, page = 1, sort="") => async (dispatch) => {

    try {

        dispatch({
            type: GET_ALL_PRODUCTS_REQUEST
        })

        const { data } = await axios.get(
            `/api/v1/products?keyword=${keyword}&category=${category}&price[gte]=${price.from}&price[lte]=${price.to}&page=${page}&sort=${sort}`
        )


        dispatch({
            type: GET_ALL_PRODUCTS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: GET_ALL_PRODUCTS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const ProductCreateAction = (product) => async (dispatch) => {

    try {
        dispatch({
            type: CREATE_PRODUCT_REQUEST
        })

        const config = {
            headers: { "Content-Type": "application/json" }
        }

        const { data } = await axios.post("/api/v1/product/create", product, config)

        dispatch({
            type: CREATE_PRODUCT_SUCCESS,
            payload: data
        })

    } catch (error) {

        dispatch({
            type: CREATE_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}

// update product
export const ProductUpdateAction = (product, id) => async (dispatch) => {

    try {
        dispatch({
            type: UPDATE_PRODUCT_REQUEST
        })

        const config = {
            headers: { "Content-Type": "application/json" }
        }

        const { data } = await axios.put(`/api/v1/product/update/${id}`, product, config)
        console.log(data)
        dispatch({
            type: UPDATE_PRODUCT_SUCCESS,
            payload: data
        })

    } catch (error) {
        console.log(error)

        dispatch({
            type: UPDATE_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}

export const GetSingleProductAction = (id) => async (dispatch) => {
    try {
        dispatch({
            type: GET_PRODUCT_REQUEST
        })

        const { data } = await axios.get(`/api/v1/product/${id}`)

        dispatch({
            type: GET_PRODUCT_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: GET_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}

// review product
export const ReviewAction = (id, review) => async (dispatch) => {
    try {
        dispatch({
            type: REVIEW_REQUEST
        })
        const config = {
            headers: { "Content-Type": "application/json" }
        }
        const { data } = await axios.put(`/api/v1/product/review/${id}`, review, config)

        dispatch({
            type: REVIEW_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: REVIEW_FAIL,
            payload: error.response.data.message
        })
    }
}

export const ClearSuccess = () => (dispatch) => {
    dispatch({
        type: CLEAR_SUCCESS
    })
}

export const ClearError = () => (dispatch) => {
    dispatch({
        type: CLEAR_ERROR
    })
}