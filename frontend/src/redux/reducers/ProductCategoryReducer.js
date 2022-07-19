import { CLEAR_PRODUCT_CATEGORY_ERROR, CLEAR_PRODUCT_CATEGORY_SUCCESS, CREATE_PRODUCT_CATEGORY_FAIL, CREATE_PRODUCT_CATEGORY_REQUEST, CREATE_PRODUCT_CATEGORY_SUCCESS, GET_PRODUCT_CATEGORIES_FAIL, GET_PRODUCT_CATEGORIES_REQUEST, GET_PRODUCT_CATEGORIES_SUCCESS, GET_PRODUCT_CATEGORY_FAIL, GET_PRODUCT_CATEGORY_REQUEST, GET_PRODUCT_CATEGORY_SUCCESS } from "../types/ProductCategoryTypes"


export const CreateProductCategoryReducer = (
    state = {
        loading: false,
        success: false,
        category: [],
        error: null
    },
    action
) => {
    switch(action.type){
        case CREATE_PRODUCT_CATEGORY_REQUEST :
            return{
                ...state,
                loading : true
            }
        case CREATE_PRODUCT_CATEGORY_SUCCESS :
            return{
                ...state,
                loading : false,
                success : true,
                category : action.payload.category
            }
        case CREATE_PRODUCT_CATEGORY_FAIL :
            return{
                ...state,
                loading : false,
                error : action.payload
            }
        case CLEAR_PRODUCT_CATEGORY_SUCCESS :
            return{
                ...state,
                success : false
            }
        case CLEAR_PRODUCT_CATEGORY_ERROR :
            return{
                ...state,
                error : null
            }
        default : return state
    }
}

export const GetProductCategoriesReducer = (
    state = {
        loading: false,
        success: false,
        category: [],
        error: null
    },
    action
) => {
    switch(action.type){
        case GET_PRODUCT_CATEGORIES_REQUEST :
            return{
                ...state,
                loading : true
            }
        case GET_PRODUCT_CATEGORIES_SUCCESS :
            return{
                ...state,
                loading : false,
                success : true,
                category : action.payload.category
            }
        case GET_PRODUCT_CATEGORIES_FAIL :
            return{
                ...state,
                loading : false,
                error : action.payload
            }
        case CLEAR_PRODUCT_CATEGORY_SUCCESS :
            return{
                ...state,
                success : false
            }
        case CLEAR_PRODUCT_CATEGORY_ERROR :
            return{
                ...state,
                error : null
            }
        default : return state
    }
}

export const GetProductCategoryReducer = (
    state = {
        loading: false,
        success: false,
        category: {},
        error: null
    },
    action
) => {
    switch(action.type){
        case GET_PRODUCT_CATEGORY_REQUEST :
            return{
                ...state,
                loading : true
            }
        case GET_PRODUCT_CATEGORY_SUCCESS :
            return{
                ...state,
                loading : false,
                success : true,
                category : action.payload.category
            }
        case GET_PRODUCT_CATEGORY_FAIL :
            return{
                ...state,
                loading : false,
                error : action.payload
            }
        case CLEAR_PRODUCT_CATEGORY_SUCCESS :
            return{
                ...state,
                success : false
            }
        case CLEAR_PRODUCT_CATEGORY_ERROR :
            return{
                ...state,
                error : null
            }
        default : return state
    }
}

