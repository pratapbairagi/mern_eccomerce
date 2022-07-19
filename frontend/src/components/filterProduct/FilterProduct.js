import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { GetAllProducts } from "../../redux/actions/ProductAction";
import Product from "../product/Product";
import "./filterProduct.css"
import { categ } from "../productCategory/ProductCategory";

const FilterProduct = () => {

    const dispatch = useDispatch()
    const { keyword } = useParams()
    const { loading, success, error, products, totalProducts, resultPerPage, resultFound } = useSelector(state => state.getProducts)
    const {loading:categoryLoading, success:categorySuccess, error:categoryError, category:productCategory} = useSelector(state=>state.productCategories)

    const [category, setCategory] = useState("")
    const [sort, setSort] = useState("")


    const [price, setPrice] = useState(
        {
            from: 0,
            to: 999999
        })

    let [page, setPage] = useState(1)
    let totalPages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
    let round = Math.round(totalProducts / resultPerPage)
    totalPages.length = round ? round : 20

    const selectPage_handler = (e) => {
        setPage(e.target.value)
    }

    const submitPriceRange_handler = (e) => {
        e.preventDefault()
        dispatch(GetAllProducts(keyword, category, price, page, sort))
    }

    useEffect(() => {
        dispatch(GetAllProducts(keyword, category , price, page, sort))
    }, [keyword, category, price, page, sort])

    return (
        <div className="filterProduct_container">

            <div className="col col-md-2 col-12 filterContainer">

                <div className="filterCategory_container">
                    <div style={{ fontWeight: "600" }}>Category</div>
                    <select onChange={(e) => setCategory(e.target.value.length > 0 ? e.target.value : "")}>
                        <option value="" >All</option>
                        {productCategory.length>0 && productCategory.map((v, i) => {
                            return <option key={i} value={v.category}>{v.category}</option>
                        })}
                    </select>
                </div>


                <form onSubmit={submitPriceRange_handler} className="priceRange_container" >
                    <div style={{ fontWeight: "600" }}>Price Range</div>
                    <div className="priceRange">
                        <input defaultValue={price.from} onChange={(e) => setPrice({ ...price, from: e.target.value })} type="number" name="" id="" />
                        <input defaultValue={price.to} onChange={(e) => setPrice({ ...price, to: e.target.value })} type="number" name="" id="" />
                        <button style={{ width: "4.5rem", display: "grid", placeItems: "center", border: "1px solid grey" }} type="submit">
                            <svg style={{ width: "1.2rem" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z" />
                            </svg>
                        </button>
                    </div>
                </form>


                <div className="sortingProductContainer">
                    <div style={{ fontWeight: "600" }}>Price Sorting</div>

                    <div className="switch" htmlFor="">
                        <input onChange={(e) => { setSort(e.target.checked ? -1 : 1) }} className="switchInput" type="checkbox" />
                        <div className="slider"></div>
                    </div>

                </div>


            </div>

            <div className="col col-md-10 col-12 products_filterProductContainer">
                {products?.map((v, i) => {
                    return <Product values={v} key={i} />
                })}
            </div>

            <div className="col col-12 pageFilter" style={{ width: "100%", display: "flex", justifyContent: "center", margin: "1rem 0" }}>
                <select onChange={selectPage_handler} style={{ width: "6rem" }}>
                    {totalPages.map((v, i) => {
                        return <option key={i} value={v}>PageNo. {v}</option>
                    })}

                </select>
            </div>

        </div>
    );
}
export default FilterProduct;