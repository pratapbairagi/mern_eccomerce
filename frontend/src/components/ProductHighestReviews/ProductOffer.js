
import Product from "../product/Product";
import "./productOffer.css"

const ProductOffer = () => {
    return(
    <div className="ProductOfferContainer">
        <div className="ProductOfferHeadingContainer">
            <h2 className="ProductOfferHeading">Offer Avail Products</h2>
        </div>
        {/* {products?.map((v,i)=>{
           return <Product values={v} key={i}/>
        })} */}

    </div>
    )
}
export default ProductOffer;