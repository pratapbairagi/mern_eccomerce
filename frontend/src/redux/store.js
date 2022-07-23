import { createStore, applyMiddleware, combineReducers} from "redux"
import {composeWithDevTools} from "redux-devtools-extension"
import thunk from "redux-thunk"
import { CartReducer } from "./reducers/CartReducer"
import { HomeBannerReducer } from "./reducers/HomeBannerReducers"
import { GetAllMessagesReducer } from "./reducers/MessageReducers"
import { CreateOrderReducer, GetAllOrderReducer, GetUserOrdersReducer, UpdateOrderReducer } from "./reducers/OrderReducers"
import { CreateProductCategoryReducer, GetProductCategoriesReducer, GetProductCategoryReducer } from "./reducers/ProductCategoryReducer"
import { GetAllProductsReducer, getSingleProductReducer, ProductReducer, ProductUpdateReducer, ReviewReducer } from "./reducers/ProductReducer"
import {EditUserReducers, getAllUsersReducers, GetSingleUserReducer, UpdateUserRoleReducers, userLogoutReducer, UserReducer} from "./reducers/UserReducer"

const reducers = combineReducers({
    productCategories : GetProductCategoriesReducer,
    singleProductCategory : GetProductCategoryReducer,
    productCategory : CreateProductCategoryReducer,
    user : UserReducer,
    editUser : EditUserReducers,
    userDetailsByAdmin : GetSingleUserReducer,
    updateUserRole : UpdateUserRoleReducers,
    logout : userLogoutReducer,
    productReducer : ProductReducer,
    getSingleProduct : getSingleProductReducer,
    getProducts : GetAllProductsReducer,
    productUpdate : ProductUpdateReducer,
    cart : CartReducer,
    review : ReviewReducer,
    users : getAllUsersReducers,
    createOrder : CreateOrderReducer,
    orders : GetAllOrderReducer,
    userOrders : GetUserOrdersReducer,
    updateOrder : UpdateOrderReducer,
    allMessages : GetAllMessagesReducer,
    homeBanners : HomeBannerReducer
})

const initialState = {
    cart : {
        cart : localStorage.getItem("cart") ? 
        JSON.parse(localStorage.getItem("cart")) : []
    }
}

const middleware = [thunk]

const store = createStore(reducers,initialState, composeWithDevTools(applyMiddleware(...middleware)) )

export default store