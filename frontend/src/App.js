import './App.css';
import Login from './pages/login/Login';
import Registration from './pages/registration/Registration';
import { BrowserRouter, Route, Switch, useParams } from "react-router-dom"
import Header from './components/layout/header/Header';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UserLoggedAction } from './redux/actions/UserAction';
import ProtectedRoute from './protectedRoute/ProtectedRoute';
import Home from './pages/home/Home';
import CreateProductForm from './components/createProductForm/CreateProductForm';
import { GetAllProducts } from './redux/actions/ProductAction';

import ProductDetails from './components/productDetails/ProductDetails';
import Admin from './components/admin/Admin';
import EditProduct from './components/admin/adminContents/EditProduct';
import Cart from './pages/cart/Cart';
import ShippingInfo from './components/orderProcesses/shippingInfo/ShippingInfo';
import OrderConfirm from './components/orderProcesses/confirmOrder/ConfirmOrder';
import axios from 'axios';
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import OrderPayment from './components/orderProcesses/payment/OrderPayment';
import OrderSuccess from './components/orderProcesses/orderSuccess/OrderSuccess';
import Orders from './components/userOrders/Orders';
import Profile from './components/profile/Profile';
import FilterProduct from './components/filterProduct/FilterProduct';
import EditProfile from './components/editProfile/EditProfile';
import UpdateUserRole from './components/admin/adminContents/updateUserRole';
import ForgotPassword from './components/passwordRecovery/forgotPassword/ForgotPassword';
import ResetPasswordForm from './components/passwordRecovery/resetPassword/ResetPasswordForm';
import CreateProductCategory from './components/productCategory/CreateProductCategory';
import { GetProductCategoriesAction } from './redux/actions/ProductCategoryAction';
import EditProductCategory from './components/productCategory/EditProductCategory';
import Footer from './components/layout/footer/Footer';
import AboutMore from './pages/about/AboutMore';
import { GetAllMessageAction } from './redux/actions/MessageAction';

function App() {

  const [categoryFilter, setCategoryFilter] = useState("men")
  x = 10

  var x

  const { user, success, loading, error, authenticate } = useSelector(state => state.user)
  const  messages = useSelector(state=>state.allMessages)

  const dispatch = useDispatch()

  useEffect(()=>{
    if(user._id){
      dispatch(GetAllMessageAction(user._id))
    }
  },[user])

  useEffect(() => {
  
    dispatch(GetProductCategoriesAction())
    dispatch(UserLoggedAction())
    dispatch(GetAllProducts("",""))
  }, [dispatch])

  const [auth1, setAuth1] = useState(true)
  const [auth2, setAuth2] = useState(false)
  

  useEffect(() => {

    if (authenticate) {
      setAuth1(false)
      setAuth2(true)
    }
    else {
      setAuth1(true)
      setAuth2(false)
    }
  }, [authenticate])

  const [stripeKey, setStripeKey] = useState("")
  useEffect(() => {
    async function stripeKeyFun (){
      const { data } = await axios.get("/api/v1/getStripeApiKey")
      setStripeKey(data.stripeKey)
    }
    stripeKeyFun()
  }, [])

  return (<>
    <BrowserRouter>
      <Header user={authenticate ? user : null} />

      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/product/view/:id" component={ProductDetails} />
        <Route exact path="/products/:keyword" component={FilterProduct} />
        <Route exact path="/products/" component={FilterProduct} />
        <Route exact path="/about/more" component={AboutMore} />


        {/* <Route exact path="/registration"  component={Registration} /> */}

        

        <ProtectedRoute exact path="/login" auth={auth1} component={Login} />
        <ProtectedRoute exact path="/registration" auth={auth1} component={Registration} />
        <ProtectedRoute exact path="/product/create" auth={auth2} component={CreateProductForm} />
        <ProtectedRoute exact path="/admin" auth={auth2} component={Admin} />
        <ProtectedRoute exact path="/product/update/:id" auth={auth2} component={EditProduct} />
        <ProtectedRoute exact path="/cart" auth={auth2} component={Cart} />
        <ProtectedRoute exact path="/shipping/info" auth={auth2} component={ShippingInfo} />
        <ProtectedRoute exact path="/order/confirm" auth={auth2} component={OrderConfirm} />
        <ProtectedRoute exact path="/order/success" auth={auth2} component={OrderSuccess} />
        <ProtectedRoute exat path="/orders" auth={auth2} component={Orders} />
        <ProtectedRoute exact path="/profile" auth={auth2} component={Profile} />
        <ProtectedRoute exact path="/profile/edit" auth={auth2} component={EditProfile} />
        <ProtectedRoute exact path="/user/role/update/:id" auth={auth2} component={UpdateUserRole} />

        <ProtectedRoute exact path="/product/category/create" auth={auth2} component={CreateProductCategory} />
        <ProtectedRoute exact path="/product/category/edit/:id" auth={auth2} component={EditProductCategory} />



        <ProtectedRoute exact path="/password/forgot" auth={auth1} component={ForgotPassword} />
        <ProtectedRoute exact path="/password/reset/:token" auth={auth1} component={ResetPasswordForm} />



        


        {
          stripeKey && (<Elements stripe={loadStripe(stripeKey)} >
            <ProtectedRoute exact path="/order/payment" auth={auth2} component={OrderPayment} />
          </Elements>)
        }
      
      </Switch>
      <Footer/>

    </BrowserRouter>
  </>
  );
}

export default App;
