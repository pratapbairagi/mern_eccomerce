import axios from "axios";
import { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom"
import { GetAllProducts } from "../../../redux/actions/ProductAction";
import { GetProductCategoriesAction } from "../../../redux/actions/ProductCategoryAction";


const ProductsList = () => {

    let [page, setPage] = useState(1)
    const dispatch = useDispatch()
    const history = useHistory()
    const alert = useAlert()



    const { loading, success, error, products, totalProducts, resultPerPage, resultFound } = useSelector(state => state.getProducts)
    const { loading: categoryLoading, success: categorySuccess, error: categoryError, category: productCategory } = useSelector(state => state.productCategories)

    const [filteredProducts, setFilteredProducts] = useState([])
    var [keyword, setKeyword] = useState("")

    const searchProductInputHandler = (e) => {
        setKeyword(e.target.value)
    }
    useEffect(() => {
        if (keyword.length > 0) {
            setFilteredProducts(products.filter(v => v.name.includes(keyword)))
        }
        else {
            setFilteredProducts(products)
        }
    }, [keyword, products])

    let totalPages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
    let round = Math.round(totalProducts / resultPerPage)
    totalPages.length = round ? round : 20

    const selectPage_handler = (e) => {
        setPage(e.target.value)
    }

    const category = ""
    const [price, setPrice] = useState(
        {
            from: 0,
            to: 999999
        })

    useEffect(() => {
        dispatch(GetAllProducts(keyword, category, price, page, ""))
    }, [page, dispatch])

    const deleteProducthandler = async (id) => {
        const { data } = await axios.delete(`/api/v1/product/delete/${id}`)

        if (data.success) {
            alert.success("product deleted successfully !", { "position": "bottom center" })
            dispatch(GetAllProducts(keyword, category, price, page, ""))
        }
    }

    const deleteProductCategoryhandler = async (id) => {
        const { data } = await axios.delete(`/api/v1/products/category/${id}`).then((res) => {
            alert.success("Product  category deleted successfully !", { "position": "bottom center" })
            dispatch(GetProductCategoriesAction())

        }).catch((err) => {
            alert.error(err.response.data.message, { "position": "bottom center" })

        })
    }

    return (
        <div className="usersList_container" style={{ width: "100%" }}>


            <div className="tableContainer" style={{ width: "100%", maxWidth: "100%", overflowX: "auto", overflowY: "hidden", boxShadow: "0 0 0 4px grey", padding: "1rem" }}>
                <input onChange={searchProductInputHandler} style={{ width: "100%", padding: "2px 10px", color: "grey", outline: "none", border: "none", borderBottom: "1px solid tomato", textAlign: "center" }} type="search" placeholder="Search Product name..." name="" id="" />

                <button style={{ width: "100%", padding: "3px 6px", background: "tomato", color: "white", margin: "5px 0", boxShadow: "0 1px 2px grey" }}>
                    <NavLink to="/product/create" style={{ textDecoration: "none", color: "white", fontWeight: "500" }}>ADD NEW PRODUCT</NavLink>
                </button>

                <table className="table" style={{ width: "100%", margin: ".5rem 0", boxShadow: "0 0 2px grey" }}>
                    <thead>
                        <tr>
                            <td>No</td>
                            <td>ID</td>
                            <td>Name</td>
                            <td>Category</td>
                            <td>Image</td>
                            <td>Price</td>
                            <td>Stock</td>

                            <td>Ratings</td>
                            <td>Reviews</td>

                            <td>Edit</td>
                            <td>Delete</td>
                        </tr>
                    </thead>
                    <tbody style={{ width: "100%", maxWidth: "100%", overflowY: "auto" }}>
                        {filteredProducts.map((p, i) => {
                            return <tr key={i} style={{ fontSize: "90%" }}>
                                <td>{i + 1}</td>
                                <td>{p._id}</td>
                                <td>{p.name}</td>
                                <td>{p.category}</td>

                                <td>
                                    <img style={{ width: "2rem" }} src={p.images[0].url} alt="" />
                                </td>
                                <td>{p.price}</td>
                                <td>{p.stock}</td>
                                <td>{(p.ratings).toFixed(2)}</td>
                                <td>{p.reviews.length}</td>

                                <td>
                                    <button>
                                        <NavLink style={{ textDecoration: "none" }} to={`/product/update/${p._id}`}>
                                            <svg width="1.6rem" fill="tomato" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                                <path d="M402.3 344.9l32-32c5-5 13.7-1.5 13.7 5.7V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h273.5c7.1 0 10.7 8.6 5.7 13.7l-32 32c-1.5 1.5-3.5 2.3-5.7 2.3H48v352h352V350.5c0-2.1.8-4.1 2.3-5.6zm156.6-201.8L296.3 405.7l-90.4 10c-26.2 2.9-48.5-19.2-45.6-45.6l10-90.4L432.9 17.1c22.9-22.9 59.9-22.9 82.7 0l43.2 43.2c22.9 22.9 22.9 60 .1 82.8zM460.1 174L402 115.9 216.2 301.8l-7.3 65.3 65.3-7.3L460.1 174zm64.8-79.7l-43.2-43.2c-4.1-4.1-10.8-4.1-14.8 0L436 82l58.1 58.1 30.9-30.9c4-4.2 4-10.8-.1-14.9z" />
                                            </svg>
                                        </NavLink>
                                    </button>
                                </td>
                                <td s>
                                    <button onClick={() => deleteProducthandler(p._id)}>
                                        <svg width="1.3rem" fill="red" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                            <path d="M268 416h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12zM432 80h-82.41l-34-56.7A48 48 0 0 0 274.41 0H173.59a48 48 0 0 0-41.16 23.3L98.41 80H16A16 16 0 0 0 0 96v16a16 16 0 0 0 16 16h16v336a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128h16a16 16 0 0 0 16-16V96a16 16 0 0 0-16-16zM171.84 50.91A6 6 0 0 1 177 48h94a6 6 0 0 1 5.15 2.91L293.61 80H154.39zM368 464H80V128h288zm-212-48h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12z" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        })}
                    </tbody>

                </table>

                <div className="col col-12 pageFilter" style={{ width: "100%", display: "flex", justifyContent: "center", margin: "1rem 0" }}>
                    <select onChange={selectPage_handler} style={{ width: "6rem" }}>
                        {totalPages.map((v, i) => {
                            return <option key={i} value={v}>PageNo. {v}</option>
                        })}

                    </select>
                </div>

            </div>



            <div className="productCategoryContainer" style={{ width: "100%", maxWidth: "100%", overflowX: "auto", overflowY: "hidden", padding: "2rem", boxShadow: "0 0 0 4px grey", margin: "3rem auto" }}>

                <button style={{ width: "100%", padding: "3px 6px", background: "tomato", color: "white", margin: "5px 0", boxShadow: "0 1px 2px grey" }}>
                    <NavLink to="/product/category/create" style={{ textDecoration: "none", color: "white", fontWeight: "500" }}>ADD PRODUCT CATEGORY</NavLink>
                </button>

                <table className="table" style={{ width: "100%", margin: ".5rem 0", boxShadow: "0 0 2px grey" }}>
                    <thead>
                        <tr>
                            <td>No</td>
                            <td>ID</td>
                            <td>Category</td>
                            <td>Image</td>


                            <td>Edit</td>
                            <td>Delete</td>
                        </tr>
                    </thead>
                    <tbody style={{ width: "100%", maxWidth: "100%", overflowY: "auto" }}>
                        {productCategory.length > 0 && productCategory.map((p, i) => {
                            return <tr key={i} style={{ fontSize: "90%" }}>
                                <td>{i + 1}</td>
                                <td>{p._id}</td>
                                <td>{p.category}</td>

                                <td>
                                    <img style={{ width: "2rem" }} src={p.image.url} alt="" />
                                </td>

                                <td>
                                    <button>
                                        <NavLink style={{ textDecoration: "none" }} to={`/product/category/edit/${p._id}`}>
                                            <svg width="1.6rem" fill="tomato" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                                <path d="M402.3 344.9l32-32c5-5 13.7-1.5 13.7 5.7V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h273.5c7.1 0 10.7 8.6 5.7 13.7l-32 32c-1.5 1.5-3.5 2.3-5.7 2.3H48v352h352V350.5c0-2.1.8-4.1 2.3-5.6zm156.6-201.8L296.3 405.7l-90.4 10c-26.2 2.9-48.5-19.2-45.6-45.6l10-90.4L432.9 17.1c22.9-22.9 59.9-22.9 82.7 0l43.2 43.2c22.9 22.9 22.9 60 .1 82.8zM460.1 174L402 115.9 216.2 301.8l-7.3 65.3 65.3-7.3L460.1 174zm64.8-79.7l-43.2-43.2c-4.1-4.1-10.8-4.1-14.8 0L436 82l58.1 58.1 30.9-30.9c4-4.2 4-10.8-.1-14.9z" />
                                            </svg>
                                        </NavLink>
                                    </button>
                                </td>
                                <td s>
                                    <button onClick={() => deleteProductCategoryhandler(p._id)}>
                                        <svg width="1.3rem" fill="red" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                            <path d="M268 416h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12zM432 80h-82.41l-34-56.7A48 48 0 0 0 274.41 0H173.59a48 48 0 0 0-41.16 23.3L98.41 80H16A16 16 0 0 0 0 96v16a16 16 0 0 0 16 16h16v336a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128h16a16 16 0 0 0 16-16V96a16 16 0 0 0-16-16zM171.84 50.91A6 6 0 0 1 177 48h94a6 6 0 0 1 5.15 2.91L293.61 80H154.39zM368 464H80V128h288zm-212-48h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12z" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>

        </div>
    );
}
export default ProductsList;