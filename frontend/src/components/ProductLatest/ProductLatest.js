import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAllProducts } from "../../redux/actions/ProductAction";
import Loader from "../loader/Loader";
import Product from "../product/Product";
import "./productLatest.css"

const ProductLatest = ({products}) => {

    // const dispatch = useDispatch()
    // const { loading, error, success, products, latestProducts} = useSelector(state=>state.getProducts)
    // useEffect(()=>{
    //     dispatch(GetAllProducts())
    // },[])
    return(
    <div className="productLatestContainer">
        <div className="ProductLatestHeadingContainer">
            <h2 className="productLatestHeading">Latest Products</h2>
        </div>
        {products &&
        products.map((v,i)=>{
            return  <Product key={i} values={v}/>
        })}
       
       


    </div>
);
}
export default ProductLatest;