
import Product from "../product/Product";
import "./productBestSelling.css"

const ProductBestSelling = ({ products }) => {
    return (
        <>{products &&
            <div className="productBestSellingContainer">
                <div className="productBestSellingHeadingContainer">
                    <h2 className="productBestSellingHeading">Top Selling Products</h2>
                </div>
                {products.map((v, i) => {
                    return <Product key={i} values={v} />
                })}
            </div>
        }
        </>
    )
}
export default ProductBestSelling;