
import Product from "../product/Product";
import offerBanner from "./image/offerBanner.svg"
import "./productOffer.css"

const ProductOffer = ({products}) => {
    return(
    <div className="ProductOfferContainer">
        <div className="ProductOfferHeadingContainer">
            {/* <h2 className="ProductOfferHeading">Offer Avail Products</h2> */}
            <h2 className="" style={{width:"100%", aspectRatio:"1/.3", background:"linear-gradient(to left, rgb(255, 156, 139), tomato, rgb(255, 66, 33))", maxWidth:"55rem", margin:"2% auto", color:"white", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>

                <h1>UPTO 40% OFF</h1>
                <h4>GTAB IT NOW</h4>
            </h2>

        </div>
        {products?.map((v,i)=>{
           return <Product values={v} key={i}/>
        })}

    </div>
    )
}
export default ProductOffer;