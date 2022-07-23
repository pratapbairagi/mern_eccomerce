import Product from "../../components/product/Product"
import ProductBestSelling from "../../components/ProductBestSelling/ProductBestSelling"
import ProductCategory from "../../components/productCategory/ProductCategory"
import ProductFeatured from "../../components/productFeatured/ProductFeatured"
import ProductHeighestReviews from "../../components/ProductHighestReviews/ProductOffer"
import ProductLatest from "../../components/ProductLatest/ProductLatest"
import "./home.css"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { useAlert } from "react-alert"
import { ClearError, ClearSuccess, GetAllProducts } from "../../redux/actions/ProductAction"
import Loader from "../../components/loader/Loader"
import About from "../about/About"
import ProductOffer from "../../components/ProductHighestReviews/ProductOffer"

const Home = () => {



    const alert = useAlert()
    const dispatch = useDispatch()
    const { loading, success, error, products, latestProducts, topSellingProducts, offerProducts } = useSelector(state => state.getProducts)
    const { loading: bannerLoading, success: bannerSuccess, error: bannerError, banners } = useSelector(state => state.homeBanners)



    const price = {
        from: 0,
        to: 999999
    }
    useEffect(() => {
        if (success) {
            dispatch(ClearError())
        }
        if (error) {
            dispatch(ClearSuccess())
        }
        dispatch(GetAllProducts("", "", price))
    }, [alert, dispatch, success, error])

    return (
        <div className="homeContainer">

            <div className="homeBannerContainer">
                <div className="carousel slide" data-bs-ride="carousel" id="carouselContainer">
                    <ol className="carousel-indicators" >
                        {banners?.map((bnnr, bnnrI) => {
                            return <li className={`${bnnrI === 0 ? "active" : ""}`} key={bnnrI} data-bs-target="#carouselContainer" data-bs-slide-to={bnnrI}></li>
                        })}

                        {/* <li className="active" data-bs-target="#carouselContainer" data-bs-slide-to={0}></li>
                        <li data-bs-target="#carouselContainer" data-bs-slide-to={1}></li>
                        <li data-bs-target="#carouselContainer" data-bs-slide-to={2}></li> */}
                    </ol>

                    <div className="carousel-inner">

                        {/* <div className="carousel-item active" style={{border:"1px solid red", display:"flex", backfaceVisibility:"visible"}}> */}
                        {banners?.map((bnnr, bnnrI) => {

                            return <div key={bnnrI} className={`carousel-item ${bnnrI === 0 ? "active" : ""}`}>

                                <img src={bnnr.image.url} alt="" />

                                <div className="bannerPara" >
                                    <h1 style={{ width: "max-content", marginLeft: ".5rem", color: `${bnnr.categoryColor}` }}>{bnnr.category}</h1>
                                    <p style={{ color: `${bnnr.paragraphColor}` }}>{bnnr.paragraph}</p>

                                    <div className="homeBannerBtnsContainer" >
                                        <button >Shop Now</button>
                                        <button >Explore</button>
                                    </div>
                                </div>

                            </div>
                        })}

                        {/* <div className="carousel-item">
                            <img src={veg} alt="" />
                        </div>

                        <div className="carousel-item">
                            <img src={shirts} alt="" />
                        </div> */}

                    </div>

                    <a href="#carouselContainer" style={{ position: "absolute", zIndex: "3" }} data-bs-slide="prev" role="button" className="carousel-control-prev">
                        <span className="carousel-control-prev-icon"></span>
                    </a>
                    <a href="#carouselContainer" style={{ position: "absolute", zIndex: "3" }} data-bs-slide="next" role="button" className="carousel-control-next">
                        <span className="carousel-control-next-icon"></span>
                    </a>

                </div>
            </div>

            {loading ? <Loader /> :
                <div className="productsContainer">
                    <ProductCategory />
                    <ProductFeatured products={products} />
                    <ProductLatest products={latestProducts} />
                    <ProductBestSelling products={topSellingProducts} />
                    <ProductOffer products={offerProducts} />

                </div>
            }

            <About />
        </div>
    );
}
export default Home;