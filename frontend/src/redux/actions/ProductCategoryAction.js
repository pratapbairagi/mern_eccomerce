import axios from "axios"
import {  CLEAR_PRODUCT_CATEGORY_ERROR, CLEAR_PRODUCT_CATEGORY_SUCCESS, CREATE_PRODUCT_CATEGORY_FAIL, CREATE_PRODUCT_CATEGORY_REQUEST, CREATE_PRODUCT_CATEGORY_SUCCESS, DELETE_PRODUCT_CATEGORY_FAIL, DELETE_PRODUCT_CATEGORY_REQUEST, DELETE_PRODUCT_CATEGORY_SUCCESS, EDIT_PRODUCT_CATEGORY_FAIL, EDIT_PRODUCT_CATEGORY_REQUEST, EDIT_PRODUCT_CATEGORY_SUCCESS, GET_PRODUCT_CATEGORIES_FAIL, GET_PRODUCT_CATEGORIES_REQUEST, GET_PRODUCT_CATEGORIES_SUCCESS, GET_PRODUCT_CATEGORY_FAIL, GET_PRODUCT_CATEGORY_REQUEST, GET_PRODUCT_CATEGORY_SUCCESS } from "../types/ProductCategoryTypes"

export const CreateProductCategoryAction = (category) => async(dispatch) =>{

    try {
        dispatch({
            type : CREATE_PRODUCT_CATEGORY_REQUEST
        })
        const config = { headers : {"Content-Type":"application/json" } } 
        const { data } = await axios.post("/api/v1/product/category/create", category, config) 

        dispatch({
            type : CREATE_PRODUCT_CATEGORY_SUCCESS,
            payload : data
        })
    } catch (error) {
        dispatch({
            type : CREATE_PRODUCT_CATEGORY_FAIL,
            payload : error.response.data.message
        })
    }
}

export const GetProductCategoriesAction = () => async (dispatch) =>{
    try {
        dispatch({
            type : GET_PRODUCT_CATEGORIES_REQUEST
        })

        const { data } = await axios.get("/api/v1/products/categories")

        dispatch({
            type : GET_PRODUCT_CATEGORIES_SUCCESS,
            payload : data
        })
    } catch (error) {

        dispatch({
            type : GET_PRODUCT_CATEGORIES_FAIL,
            payload : error.response.data.message
        })
    }
}



export const GetProductCategoryAction = (id) => async (dispatch) =>{
    try {
        dispatch({
            type : GET_PRODUCT_CATEGORY_REQUEST
        })

        const { data } = await axios.get(`/api/v1/products/category/${id}`)

        dispatch({
            type : GET_PRODUCT_CATEGORY_SUCCESS,
            payload : data
        })
    } catch (error) {

        dispatch({
            type : GET_PRODUCT_CATEGORY_FAIL,
            payload : error.response.data.message
        })
    }
}

export const ClearProductCategorySuccess = () => (dispatch) =>{
    dispatch({
        type : CLEAR_PRODUCT_CATEGORY_SUCCESS
    })
}

export const ClearProductCategoryError = () => (dispatch) =>{
    dispatch({
        type : CLEAR_PRODUCT_CATEGORY_ERROR
    })
}