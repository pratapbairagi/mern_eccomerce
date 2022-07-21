import { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ClearError, ClearSuccess, GetSingleProductAction, ReviewAction } from "../../redux/actions/ProductAction";
import Loader from "../loader/Loader";
import "./productDetails.css"
import ReactStars from "react-rating-stars-component"
import { AddToCartAction, CartQtyAction, RemoveFromCartAction } from "../../redux/actions/CartAction";
import Button from "@mui/material/Button"
import { Dialog, DialogActions, DialogContent, DialogTitle, Rating } from "@mui/material";

const ProductDetails = () => {

    const { id } = useParams()
    const dispatch = useDispatch()
    const alert = useAlert()
    const { loading, success, error, product: productDetails } = useSelector(state => state.getSingleProduct)
    const { loading: CartLoading, success: CartSuccess, error: cartError, cart } = useSelector(state => state.cart)
    const { loading: reviewLoading, success: reviewSuccess, error: reviewError, review: ReviewResponse } = useSelector(state => state.review)

    // const [product, setProduct] = useState(null)
    const [carItemtQtyNo, setcartItemQtyNo] = useState(0)

    useEffect(() => {
        dispatch(GetSingleProductAction(id))
    }, [id, dispatch, reviewSuccess])

    // clearing success or error
    useEffect(() => {
        if (success) {
            // setProduct(productDetails)
            dispatch(ClearSuccess())
        }
        if (error) {
            dispatch(ClearError())
        }
    }, [success, error, alert, dispatch, productDetails])

    // dispatching increasing/decreasing qty to redux
    const qtyHandler = (qty) => {
        dispatch(CartQtyAction(qty, productDetails._id))
    }

    let qty = cart.find(v => v.product === id)

    // updating cart quantity in DOM element
    useEffect(() => {
        if (cart) {
            if (qty) {
                setcartItemQtyNo(qty.quantity)
            }
            else {
                setcartItemQtyNo(0)
            }
        }
    }, [cart, id, qty])
    // sn. 50 = hdwdc
    // center code - hrsik

    // updating redux cart quantity in every case like add,qty, increase qty, deccrease qty
    useEffect(() => {
        if (cart) {
            localStorage.setItem("cart", JSON.stringify(cart))
        }
    }, [id, cart, dispatch])

    // adding cart item to redux
    const addToCartHandler = () => {
        dispatch(AddToCartAction(id))
    }

    // adding cart item to redux
    const removeFromCartHandler = () => {
        dispatch(RemoveFromCartAction(productDetails._id))
    }


    const [review, setReview] = useState({
        comment: "",
        rating: ""
    })

    // review dispatch
    const submitReviewHandler = (id) => {
        if (review.rating && review.comment) {
            dispatch(ReviewAction(id, review))
            setOpenReviewBox(false)
        }
    }

    // review dialog box toggle
    const [openReviewBox, setOpenReviewBox] = useState(false)
    const reviewToggle = () => {
        openReviewBox ? setOpenReviewBox(false) : setOpenReviewBox(true)
    }

    // onchange handler for review
    const reviewChangeHandler = (e) => {
        const { name, value } = e.target
        setReview({ ...review, [name]: value })
    }

    // reset review success/error
    useEffect(() => {
        if (reviewSuccess) {
            dispatch(GetSingleProductAction(id))
            dispatch(ClearSuccess())
        }
        if (reviewError) {
            dispatch(ClearError())
        }
    }, [reviewSuccess, reviewError])

    return (
        <>
            {loading && <Loader />}
            {productDetails.category &&
                <div className="productDetails_container" style={{ padding: "4% 1%" }}>
                    <div className="productDetails">
                        <div className="col col-md-6 col-12 productDetails_imageContainer" >

                            <div className="carousel slide" style={{ width: "100%" }} data-bs-ride="carousel" id="carouselContainer2">
                                <ol className="carousel-indicators">
                                    {productDetails.images?.map((img, imgIndex) => {
                                        return <li key={imgIndex} style={{ background: "white", boxShadow: "0 1px 2px red", height: "2px", minHeight: "0px", borderRadius: "50%" }} className={`${imgIndex === 0 && "active"}`} data-bs-target="#carouselContainer2" data-bs-slide-to={imgIndex}></li>
                                    })}
                                </ol>
                                <div className="carousel-inner">

                                    {productDetails.images?.map((img, imgIndex) => {
                                        return <div key={imgIndex} className={`carousel-item ${imgIndex === 0 && "active"}`}>
                                            <img style={{ width: "100%", aspectRatio: "1/.7", objectFit: "contain" }} src={img.url} alt="" />
                                        </div>
                                    })}
                                    <a href="#carouselContainer2" className="carousel-control-prev" role="button" data-bs-slide="prev">
                                        <span className="carousel-control-prev-icon"></span>
                                    </a>
                                    <a href="#carouselContainer2" className="carousel-control-next" role="button" data-bs-slide="next">
                                        <span className="carousel-control-next-icon"></span>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="col col-md-6 col-12 productDetails_detailsContainer" >

                            <div className="productDetails_name">{productDetails.name}</div>
                            <div className="productDetails_category">{productDetails.category}</div>
                            <div className="productDetails_cartBtns">
                                {carItemtQtyNo > 0 ?
                                    <div className="productDetails_cartQtyBtns">
                                        <button onClick={() => carItemtQtyNo > 0 && qtyHandler("-")}>-</button>
                                        <div>{carItemtQtyNo}</div>
                                        <button onClick={() => qtyHandler("+")}>+</button>
                                    </div>
                                    :
                                    <button onClick={addToCartHandler} className="productDetails_addToCartBtn">ADD TO CART</button>
                                }
                                <div className="productDetails_removeBtn">
                                    <button disabled={carItemtQtyNo > 0 ? false : true} style={{ display: `${carItemtQtyNo > 0 ? "" : "none"}` }} onClick={removeFromCartHandler}>Remove</button>
                                </div>
                            </div>
                            <div className="stockContainer">
                                <div className="stockHead">Stock</div>
                                <div className="stockNo" style={{ color: `${productDetails.stock > 0 ? "tomato" : "grey"}` }}> {productDetails.stock > 0 ? `( Available ${productDetails.stock} )` : `( Not Available ${productDetails.stock} )`}</div>
                            </div>

                            <div className="productDetails_ratings">
                                <Rating
                                    precision={.1}
                                    color="tomato"
                                    value={productDetails.ratings}
                                    readOnly={true}
                                />
                                <div className="productDetails_numberOfReviews">( REVIEWS {productDetails.numberOfReviews} )</div>
                            </div>
                            <div className="productDetails_id"># {productDetails._id}</div>
                            <div className="productDetails_description">
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla adipisci nobis deleniti? Atque ducimus beatae, similique distinctio eligendi sint debitis possimus inventore earum animi! Id maxime repellat provident, veritatis voluptatum ea natus error pariatur fugiat molestias enim aspernatur debitis fuga numquam corporis, voluptas, fugit mollitia sit est ab esse nostrum?</p>
                            </div>
                            <button onClick={() => reviewToggle(productDetails._id)} className="reviewBtn">Review</button>

                            <Dialog
                                open={openReviewBox}
                                onClose={reviewToggle} // iska matlab bahar kahi bhi click krega toh dialog box close ho jayega
                            >
                                <DialogTitle style={{ padding: "4px 18px", color: "tomato", fontWeight: "600" }} >Your Review</DialogTitle>
                                <DialogContent style={{ padding: "0 18px" }}>
                                    <Rating
                                        // style={{ margin: "4px 0" }}
                                        onChange={(e) => reviewChangeHandler(e)}
                                        name="rating"
                                        precision={.1}
                                        defaultValue={review.rating}
                                        // defaultValue={4}
                                        

                                        readOnly={false}
                                        size={window.innerWidth > 500 ? "medium" : "small"}
                                    />
                                    <textarea defaultValue={review.comment} name="comment" onChange={(e) => reviewChangeHandler(e)} rows={5} cols={30} style={{ boxShadow: "0 0 2px tomato", borderRadius: "5px", outline: "none", border: "none", width: "100%", padding: "6px" }}></textarea>
                                    <DialogActions style={{ padding: "4px 8px" }}>
                                        <Button color="primary" onClick={() => submitReviewHandler(productDetails._id)} >submit</Button>
                                        <Button color="secondary" onClick={() => setOpenReviewBox(false)}>cancel</Button>
                                    </DialogActions>
                                </DialogContent>
                            </Dialog>

                        </div>

                    </div>
                    <div className="productDetails_reviewsContainer">
                        {productDetails.reviews.length === 0 && <h5 style={{width:"100%", textAlign:"center"}}>NO REVIEW YET</h5>  }
                        {productDetails.reviews.map((rev, revInd) => {
                            return <div key={revInd} className="col col-xl-3 col-md-lg-4 col-md-6 col-12 productDetails_reviewContainer" >
                                
                                <div className="productDetails_reviewInnerContainer" style={{}}>
                                    <img src={rev.userImage} className="productDetails_reviewerImage" alt="" />
                                    <div className="productDetails_reviewerName" >
                                        {rev.name}
                                    </div>
                                    <Rating
                                        style={{padding:"3px 4px", height:"1.5rem", background:"white",borderRadius:"4px", position:"absolute", bottom:"-.7rem", right:".7rem"}}
                                        readOnly={true} 
                                        precision={.1}
                                        value={rev.rating}
                                        color="tomato"
                                        size="small"
                                        />
                                    <div className="productDetails_reviewComment">{rev.comment}</div>


                                </div>

                            </div>
                        })}
                    </div>
                </div>
            }
        </>
    );
}
export default ProductDetails;