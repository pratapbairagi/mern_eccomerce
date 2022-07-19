import { CLEAR_ERROR, CLEAR_SUCCESS, CREATE_PRODUCT_FAIL, CREATE_PRODUCT_REQUEST, CREATE_PRODUCT_SUCCESS, GET_ALL_PRODUCTS_FAIL, GET_ALL_PRODUCTS_REQUEST, GET_ALL_PRODUCTS_SUCCESS, GET_PRODUCT_FAIL, GET_PRODUCT_REQUEST, GET_PRODUCT_SUCCESS, REVIEW_FAIL, REVIEW_REQUEST, REVIEW_SUCCESS, UPDATE_PRODUCT_FAIL, UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_SUCCESS } from "../types/ProductTypes"

export const GetAllProductsReducer = (
    state = {
        loading: false,
        success: false,
        products: [],
        error: null
    },
    action) => {

    switch (action.type) {
        case GET_ALL_PRODUCTS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case GET_ALL_PRODUCTS_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                products: action.payload.products,
                totalProducts : action.payload.totalProducts,
                resultPerPage : action.payload.resultPerPage,
                resultFound : action.payload.resultFound,
                latestProducts : action.payload.latestProducts,
                topSellingProducts : action.payload.topSellingProducts
            }
        case GET_ALL_PRODUCTS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
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

export const ProductReducer = (
    state = {
        loading: false,
        success: false,
        product: {},
        error: null
    },
    action) => {

    switch (action.type) {
        case CREATE_PRODUCT_REQUEST
            // GET_PRODUCT_REQUEST
            :
            return {
                ...state,
                loading: true
            }
        case CREATE_PRODUCT_SUCCESS
            // GET_PRODUCT_SUCCESS
            :
            return {
                ...state,
                loading: false,
                success: true,
                product: action.payload.product
            }
        case CREATE_PRODUCT_FAIL
            // GET_PRODUCT_FAIL
            :
            return {
                ...state,
                loading: false,
                error: action.payload
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

// get single product
export const getSingleProductReducer = (
    state = {
        loading: false,
        success: false,
        product: {},
        error: null
    },
    action) => {

    switch (action.type) {
        case
            GET_PRODUCT_REQUEST
            :
            return {
                ...state,
                loading: true
            }
        case
            GET_PRODUCT_SUCCESS
            :
            return {
                ...state,
                loading: false,
                success: true,
                product: action.payload.product
            }
        case
            GET_PRODUCT_FAIL
            :
            return {
                ...state,
                loading: false,
                error: action.payload
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

// product update
export const ProductUpdateReducer = (
    state={
        loading : false,
        success : false,
        product : {},
        error : null
    }, 
    action) =>{
        
    switch(action.type){
        case UPDATE_PRODUCT_REQUEST:
            return {
                ...state,
                loading : true
            }
        case UPDATE_PRODUCT_SUCCESS:
            return{
                ...state,
                loading : false,
                success : true,
                product : action.payload
            }
        case UPDATE_PRODUCT_FAIL:
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
        case CLEAR_ERROR:
            return{
                ...state,
                loading : false,
                error : null
            }
        default : return state
    }
}

// review
export const ReviewReducer = (
    state = {
        loading: false,
        success: false,
        review: {},
        error: null
    },
    action) => {

    switch (action.type) {


        case REVIEW_REQUEST:
            return {
                ...state,
                loading: true
            }
        case REVIEW_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                review: action.payload.review
            }
        case REVIEW_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
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

