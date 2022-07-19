
import Product from "../product/Product";
import "./productFeatured.css"

const ProductFeatured = ({products}) => {
   return( 
       <>
       {products &&
   <div className="productFeaturedContainer">
        <div className="productFeaturedHeadingContainer">
            <h2 className="productFeaturedHeading">Feature Products</h2>
        </div>
        {products?.map((v,i)=>{
           return <Product values={v} key={i}  />
        })}
    </div>
}
    </> )
}
export default ProductFeatured;