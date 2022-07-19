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
                                    <button><NavLink style={{ textDecoration: "none" }} to={`/product/update/${p._id}`}>Edit</NavLink></button>
                                </td>
                                <td s>
                                    <button onClick={() => deleteProducthandler(p._id)}>
                                        Delete
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
                                    <button><NavLink style={{ textDecoration: "none" }} to={`/product/category/edit/${p._id}`}>Edit</NavLink></button>
                                </td>
                                <td s>
                                    <button onClick={() => deleteProductCategoryhandler(p._id)}>
                                        Delete
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